# Getting Started with Packet SDK

Welcome to Packet SDK! This guide will help you create your first full-stack application in under 2 minutes.

## Installation

```bash
npm install -g @packet/cli
```

## Early Access

Packet is currently in **paid early access** at $49 (one-time payment).

**Benefits:**
- Shape the product with your feedback
- Lifetime access to v1.0 when released
- 50% discount on v2.0 ($49 instead of $99)
- Priority support during beta

[Get Early Access →](https://packetsdk.dev/early-access)

## Create Your First Project

```bash
# Create a new project
packet create my-app

# Navigate to project
cd my-app

# Start development server
packet dev
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
├── packet.config.ts    # Packet configuration
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
// packet.config.ts
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
import { auth } from '@packet/auth';

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
import { db } from '@packet/db';

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
packet deploy
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
packet feature user-authentication

# List environments
packet env list

# Deploy to staging
packet deploy staging
```

## Next Steps

- [API Reference](./api/)
- [Deployment Guide](./deployment.md)
- [Examples](../examples/)
- [Join Discord](https://discord.gg/packet)

## Need Help?

- 📚 [Documentation](https://packetsdk.dev/docs)
- 💬 [Discord Community](https://discord.gg/packet)
- 🐛 [Report Issues](https://github.com/packet/sdk/issues)
- 📧 [Email Support](mailto:support@packetsdk.dev)
