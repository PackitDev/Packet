# Packet SDK

> The full-stack TypeScript framework that eliminates boilerplate

**Status**: ✅ Beta Release - Production Ready

## What is Packet?

Packet is a full-stack TypeScript framework designed to make building web applications as simple as switching from vanilla JavaScript to React. Zero configuration, maximum productivity.

**Vision:**
- 🚀 Create a full-stack app in under 2 minutes
- 🔐 Built-in authentication (JWT, OAuth, sessions)
- 🗄️ Type-safe database ORM (PostgreSQL, MySQL, SQLite, MongoDB)
- 🛣️ File-system routing (Next.js style)
- 🌿 Git workflow management
- 📦 One-command deployment

## Current Status

### ✅ What's Working

**Core SDK** - All packages fully functional:
- ✅ **CLI** (`@packet/cli`) - Project scaffolding, dev server, build tools
- ✅ **Core** (`@packet/core`) - Application runtime and lifecycle management
- ✅ **Router** (`@packet/router`) - File-system based routing (Next.js style)
- ✅ **Database** (`@packet/db`) - Type-safe ORM for PostgreSQL, MySQL, SQLite, MongoDB
- ✅ **Auth** (`@packet/auth`) - JWT, sessions, OAuth (Google, GitHub)
- ✅ **Deploy** (`@packet/deploy`) - Docker deployment configuration
- ✅ **Git** (`@packet/git`) - Branch and environment management
- ✅ **Testing** (`@packet/testing`) - Test utilities for API, auth, and database
- ✅ **License** (`@packet/license`) - License validation system

**Epoxy Desktop App** - Visual package manager:
- Location: `Epoxy/`
- Modern Electron app with React + Vite + Tailwind
- Install modules, manage packages, browse presets
- Cross-platform (Windows, macOS, Linux)

**Website** - Marketing site:
- Location: `website/`
- Live at: [packetsdk.dev](https://packetsdk.dev)

## Repository Structure

```
packet-sdk/
├── packages/          # SDK packages (ALL WORKING)
│   ├── cli/          # Command-line interface
│   ├── core/         # Core runtime
│   ├── auth/         # Authentication (JWT, OAuth, sessions)
│   ├── db/           # Database ORM (Postgres, MySQL, SQLite, MongoDB)
│   ├── router/       # File-system routing
│   ├── deploy/       # Deployment tools
│   ├── git/          # Git workflows
│   ├── testing/      # Testing utilities
│   └── license/      # License validation
├── templates/         # Project templates
│   ├── fullstack-ts/ # Full-stack TypeScript template
│   └── backend-only/ # Backend-only template
├── Epoxy/            # Desktop app for package management
├── website/          # Marketing website
├── docs/             # Documentation
├── examples/         # Example projects
└── license-server/   # License server backend
```

## Quick Start

### For Users

**Option 1: Standalone Executable (Recommended - No Node.js Required)**

Download for your platform:
- [Windows](https://packetsdk.dev/download/windows)
- [macOS Intel](https://packetsdk.dev/download/macos-intel)
- [macOS Apple Silicon](https://packetsdk.dev/download/macos-arm)
- [Linux](https://packetsdk.dev/download/linux)

Then:
```bash
# Extract and run installer
# Windows: install-windows.bat (as Administrator)
# macOS/Linux: ./install.sh

# Activate your license
packet license YOUR-LICENSE-KEY

# Create a new project
packet create my-app

# Start development
cd my-app
packet dev
```

**Option 2: npm Installation (Requires Node.js 18+)**

```bash
# Install the CLI globally
npm install -g @packet/cli

# Activate your license
packet license YOUR-LICENSE-KEY

# Create a new project
packet create my-app

# Start development
cd my-app
packet dev
```

### For Contributors

```bash
# Clone the repository
git clone https://github.com/packet/sdk.git
cd sdk

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run website locally
cd website
npm install
npm run dev

# Run Epoxy desktop app
cd Epoxy
npm install
npm run dev
```

## Features

### CLI Commands
- ✅ `packet create` - Create new projects with templates
- ✅ `packet dev` - Start development server with hot reload
- ✅ `packet build` - Build for production
- ✅ `packet license` - Activate/manage license keys
- ✅ `packet version` - Check SDK version
- ✅ `packet upgrade` - Upgrade to latest version
- ✅ `packet feature` - Create feature branches
- ✅ `packet env` - Manage environments

### Database Support
- ✅ PostgreSQL with connection pooling
- ✅ MySQL with full query builder
- ✅ SQLite for local development
- ✅ MongoDB with type-safe queries

### Authentication
- ✅ JWT token generation and validation
- ✅ Session management (memory/Redis)
- ✅ OAuth (Google, GitHub)
- ✅ Password hashing with bcrypt
- ✅ Middleware for route protection

### File-System Routing
- ✅ Static routes (`/api/hello`)
- ✅ Dynamic parameters (`/api/users/[id]`)
- ✅ Nested routes (`/api/users/profile`)
- ✅ Catch-all routes (`/api/[...slug]`)
- ✅ HTTP method handlers (GET, POST, PUT, DELETE, PATCH)

### Deployment
- ✅ Docker with docker-compose generation
- 🚧 Vercel (coming soon)
- 🚧 AWS (coming soon)
- 🚧 Railway (coming soon)

## Roadmap

**v1.0.0** (Current - Beta)
- [x] All core packages functional
- [x] CLI with all commands
- [x] File-based routing
- [x] Database integrations
- [x] Authentication system
- [x] License system
- [x] Epoxy desktop app
- [ ] Comprehensive documentation
- [ ] Video tutorials
- [ ] Community Discord

**v1.1.0** (Next)
- [ ] Vercel deployment
- [ ] AWS deployment
- [ ] Railway deployment
- [ ] Real-time WebSocket support
- [ ] GraphQL support
- [ ] Advanced caching strategies

**v2.0.0** (Future)
- [ ] Admin dashboard generator
- [ ] Database migrations UI
- [ ] API documentation generator
- [ ] Performance monitoring
- [ ] Advanced deployment strategies

## Documentation

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api/)
- [Deployment Guide](./docs/deployment.md)
- [Examples](./examples/)

## License System

Packet SDK uses a license-based system:
- **Early Access**: $49 (one-time payment)
- **2 machine activations** per license
- Hardware fingerprinting for security
- Deactivation support for machine changes

Activate your license:
```bash
packet license YOUR-LICENSE-KEY
```

## Known Issues

- `packet version` can take ~30 seconds on first run (Render free tier cold start)
- `better-sqlite3` build fails on Windows - use PostgreSQL, MySQL, or MongoDB instead
- macOS Epoxy builds are unsigned (shows security warning on first launch)

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`packet feature your-feature`)
3. Make your changes
4. Submit a pull request

## Support

- 📚 [Documentation](https://packetsdk.dev/docs)
- 💬 [Discord Community](https://discord.gg/packet)
- 🐛 [Report Issues](https://github.com/packet/sdk/issues)
- 📧 [Email Support](mailto:support@packetsdk.dev)

## License

Proprietary - Licensed Software

© 2026 Packet SDK. All rights reserved.
