import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../src/middleware/auth';

/**
 * Find user by email in database
 * 
 * CUSTOMIZE THIS: Replace with your actual database query
 * Examples:
 * - PostgreSQL: db.query('SELECT * FROM users WHERE email = $1', [email])
 * - MongoDB: db.collection('users').findOne({ email })
 * - Prisma: prisma.user.findUnique({ where: { email } })
 */
async function findUserByEmail(email: string) {
  // Example implementation (replace with your database):
  // import { db } from '../../../src/db';
  // return await db.query.users.findFirst({
  //   where: (users, { eq }) => eq(users.email, email)
  // });
  
  // For testing purposes, return null (no user found)
  // Remove this and add your database query
  return null as any;
}

/**
 * POST /api/auth/login
 * 
 * Authenticates a user and returns a JWT token
 * 
 * Request body:
 * - email: string (required)
 * - password: string (required)
 * 
 * Response:
 * - token: JWT token for authentication
 * - user: User object (without password)
 */
export async function POST(req: Request, res: Response) {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Find user in database
  const user = await findUserByEmail(email);
  if (!user) {
    // Don't reveal whether email exists (security best practice)
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = generateToken({ id: user.id, email: user.email });
  
  // Return token and user info (never return password)
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      email: user.email,
      // Add other user fields as needed (name, role, etc.)
    } 
  });
}
