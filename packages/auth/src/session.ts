import session from 'express-session';
import type { AuthConfig } from './types.js';

export function createSessionMiddleware(config: AuthConfig) {
  if (!config.session) {
    throw new Error('Session configuration is required');
  }

  const sessionConfig: session.SessionOptions = {
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  // TODO: Add Redis store support
  if (config.session.store === 'redis' && config.session.redis) {
    // Will implement when needed
    console.warn('Redis session store not yet implemented, using memory store');
  }

  return session(sessionConfig);
}

export function requireSession() {
  return (req: any, res: any, next: () => void) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Session required',
      });
    }
    next();
  };
}
