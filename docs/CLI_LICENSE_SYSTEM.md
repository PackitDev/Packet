# Packet CLI & License System

## Overview
The Packet CLI is now fully functional with a secure, hardware-locked license validation system. The system is designed to be **ultra closed-source** with strict activation limits.

## ✅ What's Completed

### 1. License System (`@packet/license`)
- **Hardware Fingerprinting**: Uses `node-machine-id` to bind licenses to specific machines
- **Backend Validation**: Connects to `https://packet-backend.onrender.com`
- **Activation Limits**: Maximum of **2 machines per license** (ultra restrictive)
- **Grace Period**: 7-day offline grace period (reduced from 30 days for security)
- **Caching**: 24-hour cache duration for license validation
- **Offline Support**: Works offline within grace period using cached license data

### 2. CLI Commands (`@packet/cli`)
The CLI is now branded as `packet` and includes:

#### Available Commands:
- `packet license <key>` - Activate a license key
- `packet license --status` - Check current license status
- `packet license --deactivate` - Deactivate current license
- `packet version` - Show version and check for updates
- `packet upgrade` - View upgrade options
- `packet create <name>` - Create new project (ready to implement)
- `packet dev` - Start dev server (ready to implement)
- `packet build` - Build for production (ready to implement)

### 3. Backend API Updates
- **Activation Endpoint**: `POST /api/licenses/activate`
  - Validates license key
  - Checks machine ID
  - Enforces 2-machine limit
  - Tracks activations in database

- **Validation Endpoint**: `POST /api/licenses/validate`
  - Verifies license status
  - Returns version info
  - Checks activation count

### 4. Database Schema
```typescript
licenses {
  id: uuid
  key: string (unique)
  userId: uuid
  version: string
  status: 'active' | 'inactive' | 'revoked'
  isEarlyAccess: boolean
  activations: number (max 2)
  maxActivations: number (2)
}

machineActivations {
  id: uuid
  licenseId: uuid
  machineId: string (hardware fingerprint)
  activatedAt: timestamp
}
```

## 🔒 Security Features

### Ultra Closed-Source Design
1. **Hardware Binding**: Each license is tied to specific machine hardware IDs
2. **Strict Limits**: Only 2 machines can use the same license
3. **Server-Side Validation**: All license checks go through the backend
4. **Short Grace Period**: Only 7 days offline before re-validation required
5. **Activation Tracking**: Every machine activation is logged with timestamp

### How It Works
```
User signs in via GitHub OAuth
  ↓
Dashboard displays license key
  ↓
User runs: packet license <key>
  ↓
CLI gets machine ID (hardware fingerprint)
  ↓
Backend checks:
  - Is license valid?
  - Is machine already activated?
  - Are we under 2 activations?
  ↓
If approved: License cached locally
  ↓
CLI can now run (validates on each use)
```

## 📦 Package Structure

```
packages/
├── cli/              # Command-line interface
│   ├── src/
│   │   ├── index.ts           # Main entry point
│   │   ├── commands/
│   │   │   ├── license.ts     # License management ✅
│   │   │   ├── version.ts     # Version checking ✅
│   │   │   ├── upgrade.ts     # Upgrade info ✅
│   │   │   ├── create.ts      # Project creation 🚧
│   │   │   ├── dev.ts         # Dev server 🚧
│   │   │   └── build.ts       # Production build 🚧
│   │   └── utils/
│   │       ├── logger.ts      # Colored logging
│   │       └── spinner.ts     # Loading spinners
│   └── package.json
│
└── license/          # License validation library
    ├── src/
    │   ├── index.ts           # Main exports
    │   ├── validate.ts        # License validation logic ✅
    │   ├── machine.ts         # Hardware fingerprinting ✅
    │   ├── cache.ts           # Local license caching ✅
    │   ├── config.ts          # Configuration ✅
    │   └── types.ts           # TypeScript types ✅
    └── package.json
```

## 🧪 Testing the CLI

### 1. Install Globally
```bash
cd packages/cli
npm link
```

### 2. Check Status
```bash
packet license --status
# Output: No active license found
```

### 3. Activate License
```bash
packet license <your-license-key>
# Output: License activated successfully!
```

### 4. Verify Activation
```bash
packet license --status
# Output:
# License Status:
#   Version: 1.0.0-beta.1
#   Status: active
#   Activations: 1/2
#   Early Access: Yes
```

## 🚀 Next Steps

### Phase 1: Core Commands (Ready to Build)
1. **`packet create`** - Project scaffolding
   - Choose template (fullstack, backend-only)
   - Initialize git repo
   - Install dependencies
   - Setup config files

2. **`packet dev`** - Development server
   - Start hot-reload dev server
   - Watch for file changes
   - Auto-restart on crashes

3. **`packet build`** - Production build
   - Compile TypeScript
   - Optimize for production
   - Generate deployment artifacts

### Phase 2: Advanced Features
- `packet deploy` - One-command deployment
- `packet test` - Run test suite
- `packet db migrate` - Database migrations
- `packet db seed` - Seed database

## 📝 Configuration

### Environment Variables
```bash
# CLI uses these automatically
PACKET_LICENSE_API=https://packet-backend.onrender.com
```

### Cache Location
```
~/.packet/license.json
```

### License Cache Structure
```json
{
  "key": "PKT-XXXX-XXXX-XXXX",
  "cachedAt": 1708123456789,
  "license": {
    "version": "1.0.0-beta.1",
    "status": "active",
    "isEarlyAccess": true,
    "activations": 1,
    "maxActivations": 2
  },
  "version": {
    "version": "1.0.0-beta.1",
    "features": ["auth", "db", "router"]
  }
}
```

## 🔐 License Key Format
```
PKT-XXXX-XXXX-XXXX-XXXX
```
- Generated on user signup via GitHub OAuth
- Stored in PostgreSQL (Neon)
- Displayed in user dashboard
- Validated against backend on every CLI use

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| License System | ✅ Complete | Hardware-locked, 2-machine limit |
| CLI Structure | ✅ Complete | Branded as `packet` |
| License Commands | ✅ Complete | activate, status, deactivate |
| Backend API | ✅ Complete | Deployed on Render |
| Database | ✅ Complete | PostgreSQL on Neon |
| Dashboard | ✅ Complete | Shows license key |
| OAuth Flow | ✅ Complete | GitHub authentication |
| Create Command | 🚧 Ready to Build | Project scaffolding |
| Dev Command | 🚧 Ready to Build | Development server |
| Build Command | 🚧 Ready to Build | Production build |

## 🎯 Design Philosophy

This license system is designed to be **more closed-source than macOS**:
- No source code distribution
- Hardware-locked licenses
- Server-side validation required
- Strict activation limits
- Short grace periods
- Comprehensive tracking

Users get:
- Pre-compiled binaries only
- License key from dashboard
- 2 machine activations
- 7-day offline grace period
- Automatic updates (when implemented)

This ensures maximum control over distribution while still providing a great developer experience.
