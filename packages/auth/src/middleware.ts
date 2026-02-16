import { verifyToken } from './jwt.js';
import type { AuthConfig, AuthRequest } from './types.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function createAuthMiddleware(config: AuthConfig) {
  return async (req: AuthRequest, _res: unknown, next: () => void) => {
    if (config.provider === 'jwt') {
      const headers = req.headers as unknown as Record<string, string>;
      const authHeader = headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token, config.jwt!.secret);

      if (payload) {
        req.user = payload;
      }
    }

    next();
  };
}

export function protect(req: AuthRequest, res: any, next: () => void) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
    });
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: any, next: () => void) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
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
      const headers = req.headers as unknown as Record<string, string>;
      const authHeader = headers['authorization'];
      
      if (authHeader && authHeader.startsWith('Bearer ') && config.jwt?.secret) {
        const token = authHeader.substring(7);
        const payload = verifyToken(token, config.jwt.secret);
        if (payload) {
          req.user = payload;
        }
      }

      next();
    } catch (error) {
      next();
    }
  };
}
