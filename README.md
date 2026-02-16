# Packet SDK

> The full-stack TypeScript framework that eliminates boilerplate

**Status**: 🚧 In Active Development

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
- **Website**: Modern landing page with React + Vite + Tailwind
  - Location: `website/`
  - Run: `cd website && npm install && npm run dev`
  - Live at: [packit.dev](https://packit.dev) (coming soon)

### 🚧 What's Being Built
- **Core SDK**: Full-stack framework packages
  - CLI tool for project scaffolding
  - Database ORM
  - Authentication system
  - Auto-routing
  - Deployment tools

## Repository Structure

```
packet-sdk/
├── website/           # Landing page (WORKING)
├── packages/          # SDK packages (IN DEVELOPMENT)
│   ├── cli/          # Command-line interface
│   ├── core/         # Core runtime
│   ├── auth/         # Authentication
│   ├── db/           # Database ORM
│   ├── router/       # Auto-routing
│   ├── deploy/       # Deployment
│   ├── git/          # Git workflows
│   └── testing/      # Testing utilities
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

# Run website locally
cd website
npm install
npm run dev
```

## Roadmap

**Phase 1: Foundation** (Current)
- [ ] Fix package dependencies
- [ ] Get CLI working
- [ ] Basic project scaffolding

**Phase 2: Core Features**
- [ ] Database ORM implementation
- [ ] Authentication system
- [ ] File-based routing
- [ ] Development server

**Phase 3: Polish**
- [ ] Deployment integrations
- [ ] Documentation
- [ ] Example projects
- [ ] Testing suite

**Phase 4: Launch**
- [ ] Beta release
- [ ] Community feedback
- [ ] v1.0 release

## Contributing

This is an active work-in-progress. If you want to contribute or follow along:
- Star the repo
- Watch for updates
- Open issues for bugs/suggestions

## License

Proprietary - Early Access

© 2026 Packet SDK. All rights reserved.
