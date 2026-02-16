import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { User } from './types.js';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface JWTConfig {
  secret: string;
  expiresIn?: string;
  issuer?: string;
  audience?: string;
}

export interface JWTPayload {
  userId: string | number;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export function generateToken(user: User, secret: string, expiresIn: string = '7d'): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
}

export function verifyToken(token: string, secret: string): JWTPayload | null {
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}

export function createToken(payload: JWTPayload, config: JWTConfig): string {
  return jwt.sign(payload, config.secret, {
    expiresIn: config.expiresIn || '7d',
    issuer: config.issuer,
    audience: config.audience,
  });
}

export function createTokenPair(payload: JWTPayload, config: JWTConfig): TokenPair {
  const accessToken = jwt.sign(payload, config.secret, {
    expiresIn: config.expiresIn || '15m',
  });

  const refreshToken = jwt.sign(
    { userId: payload.userId, type: 'refresh' },
    config.secret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

export function refreshAccessToken(refreshToken: string, config: JWTConfig): string {
  const payload = verifyToken(refreshToken, config.secret);
  
  if (!payload || payload.type !== 'refresh') {
    throw new Error('Invalid refresh token');
  }

  return createToken({ userId: payload.userId }, config);
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
