import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { User } from './types.js';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User, secret: string, expiresIn: string = '7d'): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (expiresIn === '7d' ? 7 * 24 * 60 * 60 : 24 * 60 * 60),
    },
    secret
  );
}

export function verifyToken(token: string, secret: string): { id: string; email: string } | null {
  try {
    return jwt.verify(token, secret) as { id: string; email: string };
  } catch (error) {
    return null;
  }
}
