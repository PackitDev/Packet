# Getting Started with Packet SDK

Welcome to Packet SDK! This guide will help you create your first full-stack application in under 2 minutes.

## Installation

### Option 1: Standalone Executable (Recommended)

**No Node.js or npm required!** Download a single file and start building.

1. **Download for your platform:**
   - [Windows](https://packetsdk.dev/downloads/standalone/packet-windows-x64.exe) (~45 MB)
   - [macOS Intel](https://packetsdk.dev/downloads/standalone/packet-macos-x64) (~45 MB)
   - [macOS Apple Silicon](https://packetsdk.dev/downloads/standalone/packet-macos-arm64) (~45 MB)
   - [Linux](https://packetsdk.dev/downloads/standalone/packet-linux-x64) (~45 MB)

2. **Make it executable (macOS/Linux only):**
   ```bash
   chmod +x packet-macos-arm64  # or your platform
   ```

3. **Use it directly:**
   ```bash
   # Windows
   .\packet-windows-x64.exe create my-app
   
   # macOS/Linux
   ./packet-macos-arm64 create my-app
   ```

4. **Optional: Install system-wide for easier access**
   ```bash
   # Windows (as Administrator)
   copy packet-windows-x64.exe C:\Windows\System32\packet.exe
   
   # macOS/Linux
   sudo cp packet-macos-arm64 /usr/local/bin/packet
   sudo chmod +x /usr/local/bin/packet
   
   # Then use from anywhere:
   packet create my-app
   ```

### What You Get

✅ **Self-contained** - Everything bundled in one file  
✅ **No dependencies** - Node.js runtime included  
✅ **Works offline** - After initial license activation  
✅ **Portable** - Copy to USB, cloud storage, anywhere  
✅ **Fast startup** - Optimized for performance  

## Early Access

Packet is currently in **paid early access** at $49 (one-time payment).

**Benefits:**
- Shape the product with your feedback
- Lifetime access to v1.0 when released
- 50% discount on v2.0 ($49 instead of $99)
- Priority support during beta
- 2 machine activations per license

[Get Early Access →](https://packetsdk.dev/early-access)

## Activate Your License

Before creating projects, activate your license:

```bash
packet license YOUR-LICENSE-KEY
```

You'll receive your license key after purchase via email and in your dashboard.

## Create Your First Project

```bash
# Create a new project
packet create my-app

# Navigate to project
cd my-app

# Start development server
packet dev
```

Your app will be running at `http://localhost:3000` 🎉

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

## Standalone Executable Features

### Check System Status

Verify your installation and license:

```bash
packet doctor
```

This shows:
- Executable version and platform
- Project detection status
- License status and activations
- Environment information

### View Executable Info

```bash
packet --info
```

Shows build information, platform details, and standalone features.

### Available Commands

```bash
packet create <name>          # Create new project
packet dev                    # Start development server
packet build                  # Build for production
packet license <key>          # Activate license
packet license --status       # Check license status
packet license --deactivate   # Deactivate license
packet version                # Show version
packet upgrade                # View upgrade options
packet feature <name>         # Create feature branch
packet env <environment>      # Switch environment
packet doctor                 # System diagnostics
packet --help                 # Show all commands
```

### Troubleshooting

**Windows: "Windows protected your PC"**
1. Click "More info"
2. Click "Run anyway"
3. This warning appears because the executable is not code-signed (yet)

**macOS: "Cannot be opened because the developer cannot be verified"**
```bash
sudo xattr -r -d com.apple.quarantine packet-macos-arm64
```
Or: System Preferences → Security & Privacy → Click "Allow"

**Linux: "Permission denied"**
```bash
chmod +x packet-linux-x64
```

**License Issues**
```bash
# Check license status
packet license --status

# Reactivate if needed
packet license YOUR-LICENSE-KEY
```

## Project-Local Usage

You can also place the executable in your project folder for version control:

```
my-project/
├── packet.exe          # Windows
├── packet              # macOS/Linux
├── src/
├── routes/
└── package.json
```

Then use it locally:
```bash
# Windows
.\packet.exe dev

# macOS/Linux
./packet dev
```

This is useful when:
- Different projects need different Packet versions
- You want to commit the executable to git
- Working on a team with specific version requirements

## Next Steps

- [API Reference](./api/)
- [Deployment Guide](./deployment.md)
- [Standalone Executables Guide](./STANDALONE_EXECUTABLES.md)
- [Examples](../examples/)
- [Join Discord](https://discord.gg/packet)

## Need Help?

- 📚 [Documentation](https://packetsdk.dev/docs)
- 💬 [Discord Community](https://discord.gg/packet)
- 🐛 [Report Issues](https://github.com/packet/sdk/issues)
- 📧 [Email Support](mailto:support@packetsdk.dev)

## Why Standalone Executables?

**Traditional approach:**
1. Install Node.js (100+ MB)
2. Install npm packages (node_modules can be 500+ MB)
3. Deal with version conflicts
4. Troubleshoot installation issues

**Packet approach:**
1. Download one file (~45 MB)
2. Start building

That's it! No installation, no dependencies, no problems.
