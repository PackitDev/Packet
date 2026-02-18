# Packet SDK Folder Structure

## Root Directory Organization

```
Effec-t SDK/
├── .changeset/          # Changesets for versioning
├── .cursor/             # Cursor IDE configuration
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── reports/        # Test reports and summaries
│   ├── CLI_LICENSE_SYSTEM.md
│   ├── deployment.md
│   └── getting-started.md
├── Epoxy/               # Desktop GUI application (Electron)
├── examples/            # Example projects
├── license-server/      # Backend license validation server
├── node_modules/        # Dependencies
├── packages/            # SDK packages (monorepo)
│   ├── auth/           # Authentication package
│   ├── cli/            # Command-line interface
│   ├── core/           # Core framework
│   ├── db/             # Database abstraction
│   ├── deploy/         # Deployment utilities
│   ├── git/            # Git workflow management
│   ├── license/        # License validation
│   ├── router/         # File-system routing
│   └── testing/        # Testing utilities
├── scripts/             # Build and utility scripts
├── templates/           # Project templates
│   ├── fullstack-ts/   # Full-stack TypeScript template
│   └── backend-only/   # Backend-only template
├── test-projects/       # Test and demo projects (not in git)
│   ├── epoxytest/
│   ├── obf-test-app/
│   ├── packet-framework-demo/
│   ├── packet-test-app/
│   ├── pet-shelter-api/
│   ├── task-manager-api/
│   └── testapp/
├── website/             # Marketing website
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore rules
├── .prettierrc          # Prettier configuration
├── LICENSE              # MIT License
├── package.json         # Root package configuration
├── pnpm-lock.yaml       # pnpm lock file
├── pnpm-workspace.yaml  # pnpm workspace configuration
├── README.md            # Main project README
├── tsconfig.base.json   # Base TypeScript configuration
└── vitest.config.ts     # Vitest configuration
```

## Key Folders

### `/packages` - SDK Packages
The core SDK packages in a pnpm monorepo structure. Each package is independently versioned and published.

### `/docs` - Documentation
- **`/api`** - API documentation for each package
- **`/reports`** - Test reports and implementation summaries
- Root-level markdown files for getting started, deployment, and license system

### `/test-projects` - Test Projects (Git Ignored)
Local test and demo projects for development. Not committed to git.

### `/templates` - Project Templates
Scaffolding templates used by `packet create` command.

### `/Epoxy` - Desktop Application
Electron-based visual package and module manager for Packet SDK.

### `/license-server` - License Server
Backend Express server for license validation and activation.

### `/website` - Marketing Website
Landing page and documentation site.

## Cleanup Summary

### Moved to `/test-projects`:
- epoxytest
- framework-test (locked, needs manual move)
- obf-test-app
- packet-framework-demo
- packet-test-app
- pet-shelter-api
- task-manager-api
- testapp

### Moved to `/docs/reports`:
- SDK_TEST_REPORT.md
- TASK_MANAGER_TEST_REPORT.md
- TEST_RESULTS.md
- FRAMEWORK_REFACTOR_COMPLETE.md
- DASHBOARD_IMPLEMENTATION_SUMMARY.md
- EPOXY_SETUP_COMPLETE.md

### Moved to `/docs`:
- CLI_LICENSE_SYSTEM.md

## Git Ignore Updates

Added to `.gitignore`:
- `test-projects/` - Local test projects
- `.packet/` - New license cache location (alongside `.effec-t/`)

## Status

✅ Root directory is clean and organized
✅ Test projects isolated in `/test-projects`
✅ Documentation consolidated in `/docs`
✅ Core packages remain in `/packages`
✅ `.gitignore` updated for new structure
