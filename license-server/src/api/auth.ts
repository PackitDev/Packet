import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { db, users, licenses } from '../db/index.js';
import { eq } from 'drizzle-orm';

const router: Router = Router();

// GitHub OAuth - Exchange code for JWT
router.post('/github', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData: any = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'GitHub OAuth failed' });
    }

    const { access_token } = tokenData;

    // Get user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile: any = await profileResponse.json();

    // Get user emails
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const emails: any = await emailResponse.json();
    const primaryEmail = emails.find((e: any) => e.primary)?.email || profile.email;

    if (!primaryEmail) {
      return res.status(400).json({ error: 'No email found in GitHub account' });
    }

    // Create or update user
    let user = await db.query.users.findFirst({
      where: eq(users.githubId, profile.id.toString()),
    });

    if (!user) {
      // Check if user exists with this email
      user = await db.query.users.findFirst({
        where: eq(users.email, primaryEmail),
      });

      if (user) {
        // Update existing user with GitHub info
        const [updatedUser] = await db
          .update(users)
          .set({
            githubId: profile.id.toString(),
            githubUsername: profile.login,
            name: profile.name || profile.login,
            avatar: profile.avatar_url,
          })
          .where(eq(users.id, user.id))
          .returning();
        user = updatedUser;
      } else {
        // Create new user
        const [newUser] = await db
          .insert(users)
          .values({
            email: primaryEmail,
            githubId: profile.id.toString(),
            githubUsername: profile.login,
            name: profile.name || profile.login,
            avatar: profile.avatar_url,
            isEarlyAccessUser: true,
          })
          .returning();
        user = newUser;

        // Generate license keys for new user (Packet + Epoxy)
        const licenseKey = `PACKET-${nanoid(16).toUpperCase()}`;
        await db.insert(licenses).values({
          key: licenseKey,
          version: '1.0.0-beta.1',
          product: 'packet',
          userId: user.id,
          status: 'active',
          purchasePrice: 0, // Free early access
          isEarlyAccess: true,
          activations: 0,
        });
        const epoxyKey = `EPOXY-${nanoid(16).toUpperCase().replace(/(.{4})/g, '$1-').slice(0, -1)}`;
        await db.insert(licenses).values({
          key: epoxyKey,
          version: '1.0.0-beta.1',
          product: 'epoxy',
          userId: user.id,
          status: 'active',
          purchasePrice: 0, // Free
          isEarlyAccess: true,
          activations: 0,
        });
      }
    }

    // Get license keys
    const userLicenses = await db.query.licenses.findMany({
      where: eq(licenses.userId, user.id),
      columns: { key: true, product: true },
    });
    const packetLicense = userLicenses.find((l) => l.product !== 'epoxy');
    const epoxyLicense = userLicenses.find((l) => l.product === 'epoxy');

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default-secret-change-this',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        licenseKey: packetLicense?.key,
        epoxyLicenseKey: epoxyLicense?.key,
      },
    });
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user (requires JWT)
router.get('/me', authenticateToken, async (req: any, res: Response) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.userId),
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userLicenses = await db.query.licenses.findMany({
      where: eq(licenses.userId, req.userId),
      columns: { key: true, product: true },
    });

    const packetLicense = userLicenses.find((l) => l.product !== 'epoxy');
    const epoxyLicense = userLicenses.find((l) => l.product === 'epoxy');
    const packetKey = packetLicense?.key ?? null;
    let epoxyKey = epoxyLicense?.key ?? null;

    // Create free Epoxy license for existing users who don't have one
    if (!epoxyKey && packetKey) {
      const newEpoxyKey = `EPOXY-${nanoid(16).toUpperCase().replace(/(.{4})/g, '$1-').slice(0, -1)}`;
      await db.insert(licenses).values({
        key: newEpoxyKey,
        version: '1.0.0-beta.1',
        product: 'epoxy',
        userId: user.id,
        status: 'active',
        purchasePrice: 0,
        isEarlyAccess: true,
        activations: 0,
      });
      epoxyKey = newEpoxyKey;
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        licenseKey: packetKey || packetLicense?.key,
        epoxyLicenseKey: epoxyKey,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Middleware to authenticate JWT
function authenticateToken(req: any, res: Response, next: any) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default-secret-change-this', (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

export default router;
