# Deployment Guide

Deploy your Packet application to production.

## Quick Deploy

```bash
packet deploy
```

## Supported Platforms

### Docker

Deploy with Docker and docker-compose:

```bash
packet deploy --platform docker
```

This generates:
- `Dockerfile`
- `docker-compose.yml`

Run with:

```bash
docker-compose up -d
```

### Vercel (Coming Soon)

```bash
packet deploy --platform vercel
```

### AWS (Coming Soon)

```bash
packet deploy --platform aws --region us-east-1
```

### Railway (Coming Soon)

```bash
packet deploy --platform railway
```

### Fly.io (Coming Soon)

```bash
packet deploy --platform fly
```

## Environment Configuration

Configure deployment in `packet.config.ts`:

```typescript
export default {
  deploy: {
    development: {
      platform: 'local',
      port: 3000,
    },
    staging: {
      platform: 'docker',
      env: {
        DATABASE_URL: process.env.STAGING_DATABASE_URL,
      },
    },
    production: {
      platform: 'aws',
      region: 'us-east-1',
      env: {
        DATABASE_URL: process.env.PRODUCTION_DATABASE_URL,
      },
    },
  },
};
```

## Environment Variables

Set environment variables for each environment:

```bash
# .env.production
DATABASE_URL=postgresql://...
JWT_SECRET=your-production-secret
NODE_ENV=production
```

## Database Migrations

Run migrations before deploying:

```bash
packet db migrate --env production
```

## Health Checks

Packet automatically provides health check endpoints:

- `GET /health` - Basic health check
- `GET /health/ready` - Readiness check
- `GET /health/live` - Liveness check

## CI/CD Integration

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: packet deploy --platform docker
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## Monitoring

Monitor your deployed application:

```bash
# View logs
packet logs --env production

# View metrics
packet metrics --env production
```

## Rollback

Rollback to previous version:

```bash
packet rollback --env production
```

## Best Practices

1. **Use environment variables** for sensitive data
2. **Run migrations** before deploying
3. **Test in staging** before production
4. **Monitor logs** after deployment
5. **Set up health checks** for load balancers
6. **Use CI/CD** for automated deployments
7. **Keep backups** of your database
