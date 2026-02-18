export interface PacketConfig {
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

export interface PacketApp {
  config: PacketConfig;
  start(): Promise<void>;
  stop(): Promise<void>;
  getServer(): unknown;
  getHttpServer(): unknown;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}
