import { verifyToken } from './jwt.js';
import type { AuthConfig, AuthRequest, User } from './types.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export function createAuthMiddleware(config: AuthConfig) {
  return async (req: AuthRequest, _res: unknown, next: () => void) => {
    if (config.provider === 'jwt') {
      const headers = req.headers as Record<string, string> | undefined;
      const authHeader = headers?.['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token, config.jwt!.secret);

      if (payload) {
        req.user = payload as unknown as User;
      }
    }

    next();
  };
}

export function protect(req: AuthRequest, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
    });
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    const userRole = req.user.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions',
      });
    }

    next();
  };
}

export function optionalAuth(config: AuthConfig) {
  return async (req: AuthRequest, _res: unknown, next: () => void) => {
    try {
      const headers = req.headers as Record<string, string> | undefined;
      const authHeader = headers?.['authorization'];
      
      if (authHeader && authHeader.startsWith('Bearer ') && config.jwt?.secret) {
        const token = authHeader.substring(7);
        const payload = verifyToken(token, config.jwt.secret);
        if (payload) {
          req.user = payload as unknown as User;
        }
      }

      next();
    } catch {
      next();
    }
  };
}
