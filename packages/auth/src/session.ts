import type { AuthConfig } from './types.js';

// Session middleware - requires express-session to be installed by the user
export function createSessionMiddleware(config: AuthConfig) {
  if (!config.session) {
    throw new Error('Session configuration is required');
  }

  try {
    // Dynamic import - express-session is an optional peer dependency
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const session = require('express-session');

    const sessionConfig = {
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    };

    return session(sessionConfig);
  } catch {
    throw new Error(
      'express-session is required for session auth. Install it with: npm install express-session'
    );
  }
}

export function requireSession() {
  return (req: { session?: { user?: unknown } }, res: { status: (code: number) => { json: (data: unknown) => void } }, next: () => void) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Session required',
      });
    }
    next();
  };
}
