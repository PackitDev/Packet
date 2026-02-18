import jwt from 'jsonwebtoken';
import type { User } from './types.js';

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
  [key: string]: unknown;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export function generateToken(user: User, secret: string, expiresIn = '7d'): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    } as object,
    secret,
    { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] }
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
  return jwt.sign(payload as object, config.secret, {
    expiresIn: (config.expiresIn || '7d') as jwt.SignOptions['expiresIn'],
    issuer: config.issuer,
    audience: config.audience,
  });
}

export function createTokenPair(payload: JWTPayload, config: JWTConfig): TokenPair {
  const accessToken = jwt.sign(payload as object, config.secret, {
    expiresIn: (config.expiresIn || '15m') as jwt.SignOptions['expiresIn'],
  });

  const refreshToken = jwt.sign(
    { userId: payload.userId, type: 'refresh' } as object,
    config.secret,
    { expiresIn: '7d' as jwt.SignOptions['expiresIn'] }
  );

  return { accessToken, refreshToken };
}

export function refreshAccessToken(refreshToken: string, config: JWTConfig): string {
  const payload = verifyToken(refreshToken, config.secret);
  
  if (!payload || (payload as Record<string, unknown>).type !== 'refresh') {
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
