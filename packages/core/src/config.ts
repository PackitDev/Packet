import { config as loadEnv } from 'dotenv';
import type { EffecTConfig } from './types.js';

// Load environment variables
loadEnv();

export function loadConfig(userConfig: Partial<EffecTConfig> = {}): EffecTConfig {
  const defaultConfig: EffecTConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || '0.0.0.0',
    routes: {
      dir: './routes',
    },
    middleware: [],
  };

  return {
    ...defaultConfig,
    ...userConfig,
    auth: userConfig.auth ? { ...defaultConfig.auth, ...userConfig.auth } : defaultConfig.auth,
    database: userConfig.database
      ? { ...defaultConfig.database, ...userConfig.database }
      : defaultConfig.database,
    routes: userConfig.routes
      ? { ...defaultConfig.routes, ...userConfig.routes }
      : defaultConfig.routes,
  };
}

export function validateConfig(config: EffecTConfig): void {
  if (config.auth?.provider === 'jwt' && !config.auth.jwt?.secret) {
    throw new Error('JWT secret is required when using JWT authentication');
  }

  if (config.auth?.provider === 'session' && !config.auth.session?.secret) {
    throw new Error('Session secret is required when using session authentication');
  }

  if (config.database && !config.database.url) {
    throw new Error('Database URL is required when using database');
  }
}
