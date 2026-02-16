export * from './types.js';
export * from './jwt.js';
export * from './middleware.js';
export * from './password.js';

import type { AuthConfig } from './types.js';
import { createAuthMiddleware, protect, requireRole, optionalAuth } from './middleware.js';
import * as jwt from './jwt.js';
import * as password from './password.js';

export function auth(config: AuthConfig) {
  return {
    middleware: createAuthMiddleware(config),
    protect: protect(),
    requireRole,
    optionalAuth: optionalAuth(config),
    jwt,
    password,
  };
}
