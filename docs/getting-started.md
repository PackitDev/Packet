# Getting Started with Effec-t SDK

Welcome to Effec-t SDK! This guide will help you create your first full-stack application in under 2 minutes.

## Installation

```bash
npm install -g @effec-t/cli
```

## Early Access

Effec-t is currently in **paid early access** at $49 (one-time payment).

**Benefits:**
- Shape the product with your feedback
- Lifetime access to v1.0 when released
- 50% discount on v2.0 ($49 instead of $99)
- Priority support during beta

[Get Early Access →](https://effec-t.dev/early-access)

## Create Your First Project

```bash
# Create a new project
effec-t create my-app

# Navigate to project
cd my-app

# Start development server
effec-t dev
```

The CLI will guide you through:
1. Choosing a template (full-stack, backend-only, or frontend-only)
2. Selecting a database (PostgreSQL, MySQL, SQLite, MongoDB)
3. Configuring authentication (JWT, sessions, OAuth)

## Project Structure

```
my-app/
├── routes/              # File-system based routing
│   ├── api/            # API endpoints
│   │   └── hello.ts    # GET/POST /api/hello
│   └── pages/          # Frontend pages (if full-stack)
├── src/
│   └── index.ts        # Application entry point
├── effec-t.config.ts   # Effec-t configuration
├── .env                # Environment variables
└── package.json
```

## Creating API Routes

Routes are automatically generated from your file structure:

```typescript
// routes/api/users/[id].ts
export const GET = async (req, { params }) => {
  return {
    user: {
      id: params.id,
      name: 'John Doe',
    },
  };
};

export const PUT = async (req, { params }) => {
  return {
    message: 'User updated',
    id: params.id,
  };
};
```

This creates:
- `GET /api/users/:id`
- `PUT /api/users/:id`

## Authentication

Add authentication to your app:

```typescript
// effec-t.config.ts
export default {
  auth: {
    provider: 'jwt',
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    },
  },
};
```

Protect routes:

```typescript
import { auth } from '@effec-t/auth';

export const GET = auth.protect(async (req) => {
  return {
    user: req.user,
    message: 'This is a protected route',
  };
});
```

## Database

Define models with type-safe queries:

```typescript
import { db } from '@effec-t/db';

const User = db.model('User', {
  id: db.uuid().primary(),
  email: db.string().unique(),
  name: db.string(),
  createdAt: db.timestamp().default('now'),
});

// Type-safe queries
const users = await User.find({ email: 'test@example.com' });
const user = await User.create({ email: '...', name: '...' });
```

## Deployment

Deploy your app with one command:

```bash
effec-t deploy
```

Supported platforms:
- Docker
- Vercel (coming soon)
- AWS (coming soon)
- Railway (coming soon)
- Fly.io (coming soon)

## Git Workflow

Manage branches and environments:

```bash
# Create feature branch
effec-t feature user-authentication

# List environments
effec-t env list

# Deploy to staging
effec-t deploy staging
```

## Next Steps

- [API Reference](./api/)
- [Deployment Guide](./deployment.md)
- [Examples](../examples/)
- [Join Discord](https://discord.gg/effec-t)

## Need Help?

- 📚 [Documentation](https://effec-t.dev/docs)
- 💬 [Discord Community](https://discord.gg/effec-t)
- 🐛 [Report Issues](https://github.com/effec-t/sdk/issues)
- 📧 [Email Support](mailto:support@effec-t.dev)
