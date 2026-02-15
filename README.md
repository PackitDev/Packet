# Effec-t SDK

> The full-stack TypeScript SDK that eliminates boilerplate setup work

**Version**: 1.0.0 (Beta - Early Access)

## What is Effec-t?

Effec-t SDK is a comprehensive full-stack framework that makes building web applications as easy as changing from vanilla JavaScript to React. It provides:

- 🚀 **Zero-config setup** - Full-stack app in under 2 minutes
- 🔐 **Built-in authentication** - JWT, OAuth, sessions, magic links
- 🗄️ **Database ORM** - Type-safe queries for PostgreSQL, MySQL, SQLite, MongoDB
- 🛣️ **File-system routing** - Next.js-style routing for both frontend and backend
- 🌿 **Git workflow management** - Branch-to-environment mapping with auto-deployment
- 📦 **One-command deployment** - Deploy to Vercel, AWS, Docker, Railway, Fly.io
- 🧪 **Testing framework** - Built-in utilities for API, database, and auth testing

## Quick Start

```bash
# Install the CLI
npm install -g @effec-t/cli

# Create a new project
effec-t create my-app

# Start development
cd my-app
effec-t dev
```

## Early Access

Effec-t is currently in **paid early access** at $49 (one-time payment).

**Early Access Benefits:**
- Shape the product with your feedback
- Lifetime access to v1.0 when released
- 50% discount on v2.0 ($49 instead of $99)
- Early adopter badge
- Priority support during beta

[Get Early Access →](https://effec-t.dev/early-access)

## Version Roadmap

- **v1.0** (Coming Soon) - FREE for everyone
- **v2.0** (Future) - $99 with GraphQL, real-time features, monitoring
- **v3.0+** - Continued innovation with older versions becoming free

## Monorepo Structure

```
effec-t-sdk/
├── packages/
│   ├── cli/           # CLI tool
│   ├── core/          # Core runtime framework
│   ├── auth/          # Authentication module
│   ├── db/            # Database abstraction
│   ├── router/        # Auto-routing system
│   ├── git/           # Git workflow management
│   ├── deploy/        # Deployment utilities
│   ├── testing/       # Testing framework
│   └── license/       # License validation
├── license-server/    # License & payment API
├── templates/         # Project templates
├── docs/             # Documentation
└── examples/         # Example projects
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## License

Proprietary - Early Access License

© 2026 Effec-t SDK. All rights reserved.
