export interface EffecTConfig {
  auth?: {
    provider: 'jwt' | 'session' | 'oauth' | 'magic-link';
    jwt?: {
      secret: string;
      expiresIn?: string;
    };
    session?: {
      secret: string;
      store?: 'memory' | 'redis';
      redis?: {
        host: string;
        port: number;
      };
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
  };
  database?: {
    type: 'postgres' | 'mysql' | 'sqlite' | 'mongodb';
    url: string;
  };
  routes?: {
    dir: string;
  };
  middleware?: Array<(...args: unknown[]) => unknown>;
  port?: number;
  host?: string;
}

export interface EffecTApp {
  config: EffecTConfig;
  start(): Promise<void>;
  stop(): Promise<void>;
  getServer(): unknown;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}
