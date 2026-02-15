import { verifyToken } from './jwt.js';
import type { AuthConfig, AuthRequest } from './types.js';

export function createAuthMiddleware(config: AuthConfig) {
  return async (req: AuthRequest, res: unknown, next: () => void) => {
    if (config.provider === 'jwt') {
      const authHeader = (req.headers as Record<string, string>)['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token, config.jwt!.secret);

      if (payload) {
        req.user = {
          id: payload.id,
          email: payload.email,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    }

    next();
  };
}

export function protect(handler: (req: AuthRequest) => Promise<unknown>) {
  return async (req: AuthRequest) => {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    return handler(req);
  };
}
