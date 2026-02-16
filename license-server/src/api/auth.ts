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

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'GitHub OAuth failed' });
    }

    const { access_token } = tokenData;

    // Get user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await profileResponse.json();

    // Get user emails
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const emails = await emailResponse.json();
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

        // Generate license key for new user
        const licenseKey = `PACKET-${nanoid(16).toUpperCase()}`;
        await db.insert(licenses).values({
          key: licenseKey,
          version: 'v1.0-beta',
          userId: user.id,
          status: 'active',
          purchasePrice: 0, // Free early access
          isEarlyAccess: true,
          activations: 0,
        });
      }
    }

    // Get license key
    const license = await db.query.licenses.findFirst({
      where: eq(licenses.userId, user.id),
    });

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
        licenseKey: license?.key,
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

    const license = await db.query.licenses.findFirst({
      where: eq(licenses.userId, req.userId),
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        licenseKey: license?.key,
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
