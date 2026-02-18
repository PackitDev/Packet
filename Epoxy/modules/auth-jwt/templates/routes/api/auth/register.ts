import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../src/middleware/auth';

/**
 * Check if user already exists
 * 
 * CUSTOMIZE THIS: Replace with your actual database query
 */
async function userExists(email: string): Promise<boolean> {
  // Example implementation (replace with your database):
  // import { db } from '../../../src/db';
  // const user = await db.query.users.findFirst({
  //   where: (users, { eq }) => eq(users.email, email)
  // });
  // return !!user;
  
  return false; // For testing - replace with actual check
}

/**
 * Create new user in database
 * 
 * CUSTOMIZE THIS: Replace with your actual database insert
 * Examples:
 * - PostgreSQL: db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password])
 * - MongoDB: db.collection('users').insertOne({ email, password })
 * - Prisma: prisma.user.create({ data: { email, password } })
 */
async function createUser(email: string, hashedPassword: string) {
  // Example implementation (replace with your database):
  // import { db, users } from '../../../src/db';
  // const [user] = await db.insert(users).values({
  //   email,
  //   password: hashedPassword,
  //   createdAt: new Date(),
  // }).returning();
  // return user;
  
  // For testing purposes - replace with actual database insert
  return { 
    id: 'new-user-id', 
    email,
    createdAt: new Date(),
  } as any;
}

/**
 * POST /api/auth/register
 * 
 * Registers a new user and returns a JWT token
 * 
 * Request body:
 * - email: string (required, must be valid email)
 * - password: string (required, min 8 characters)
 * - name: string (optional)
 * 
 * Response:
 * - token: JWT token for authentication
 * - user: User object (without password)
 */
export async function POST(req: Request, res: Response) {
  const { email, password, name } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  // Check if user already exists
  const exists = await userExists(email);
  if (exists) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Hash password (12 rounds is a good balance of security and performance)
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Create user in database
  const user = await createUser(email, hashedPassword);

  // Generate JWT token
  const token = generateToken({ id: user.id, email: user.email });
  
  // Return token and user info (never return password)
  res.status(201).json({ 
    token, 
    user: { 
      id: user.id, 
      email: user.email,
      name: name || null,
      createdAt: user.createdAt,
    } 
  });
}
