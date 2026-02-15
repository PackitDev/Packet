export * from './types.js';
export * from './jwt.js';
export * from './middleware.js';

import type { AuthConfig } from './types.js';
import { createAuthMiddleware, protect } from './middleware.js';

export function auth(config: AuthConfig) {
  return {
    middleware: createAuthMiddleware(config),
    protect,
  };
}
