export * from './types.js';
export { generateToken, verifyToken, createToken, createTokenPair, refreshAccessToken, decodeToken } from './jwt.js';
export type { JWTConfig, JWTPayload, TokenPair } from './jwt.js';
export { createAuthMiddleware, protect, requireRole, optionalAuth } from './middleware.js';
export { hashPassword, comparePassword, validatePasswordStrength } from './password.js';
export { setupOAuth, getOAuthMiddleware, authenticateGoogle, authenticateGitHub } from './oauth.js';
export type { OAuthUser } from './oauth.js';

import type { AuthConfig } from './types.js';
import { createAuthMiddleware, protect, requireRole, optionalAuth } from './middleware.js';
import * as jwtUtils from './jwt.js';
import * as passwordUtils from './password.js';

export function auth(config: AuthConfig) {
  return {
    middleware: createAuthMiddleware(config),
    protect,
    requireRole,
    optionalAuth: optionalAuth(config),
    jwt: jwtUtils,
    password: passwordUtils,
  };
}
