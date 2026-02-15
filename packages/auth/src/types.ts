export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthConfig {
  provider: 'jwt' | 'session' | 'oauth' | 'magic-link';
  jwt?: {
    secret: string;
    expiresIn?: string;
  };
  session?: {
    secret: string;
    store?: 'memory' | 'redis';
  };
  oauth?: {
    google?: {
      clientId: string;
      clientSecret: string;
      callbackURL: string;
    };
    github?: {
      clientId: string;
      clientSecret: string;
      callbackURL: string;
    };
  };
}

export interface AuthRequest extends Request {
  user?: User;
}
