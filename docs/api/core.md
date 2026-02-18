# @packet/core API Reference

The core runtime framework for Packet SDK.

## createApp

Create a new Packet application.

```typescript
import { createApp } from '@packet/core';

const app = createApp({
  auth: {
    provider: 'jwt',
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    },
  },
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
  },
  routes: {
    dir: './routes',
  },
  port: 3000,
});

await app.start();
```

## Configuration

### PacketConfig

```typescript
interface PacketConfig {
  auth?: AuthConfig;
  database?: DatabaseConfig;
  routes?: RouterConfig;
  middleware?: Array<Function>;
  port?: number;
  host?: string;
}
```

### AuthConfig

```typescript
interface AuthConfig {
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
    google?: OAuthConfig;
    github?: OAuthConfig;
  };
}
```

### DatabaseConfig

```typescript
interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'sqlite' | 'mongodb';
  url: string;
}
```

## Lifecycle Hooks

```typescript
const app = createApp(config);

app.getLifecycle().onBeforeStart(async () => {
  console.log('App is starting...');
});

app.getLifecycle().onAfterStart(async () => {
  console.log('App started!');
});

app.getLifecycle().onBeforeStop(async () => {
  console.log('App is stopping...');
});

await app.start();
```

## Logger

```typescript
import { logger } from '@packet/core';

logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

Set log level:

```bash
LOG_LEVEL=debug packet dev
```
