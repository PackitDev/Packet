# Testing the Effec-t SDK

## Important: Packages Are Not Published Yet

The `@effec-t/*` packages are **not published to npm** yet. They only exist in this monorepo workspace.

## How to Test the SDK

### Option 1: Link the CLI Globally (Recommended)

This allows you to use the `effec-t` command from anywhere:

```bash
# From the SDK root directory
cd packages/cli

# Build the CLI
pnpm build

# Link it globally
npm link

# Now you can use it anywhere
cd ../../..
effec-t create my-test-app
```

### Option 2: Use npx with Local Path

```bash
# From the SDK root
cd packages/cli
pnpm build

# Use npx to run it
npx . create my-test-app
```

### Option 3: Test Within the Monorepo

Create a test project inside the monorepo:

```bash
# From SDK root
mkdir test-projects
cd test-projects

# Create a test app (after linking CLI)
effec-t create my-app
```

## Common Issues

### ❌ Error: `@effec-t/auth` not found

**Problem**: Trying to `npm install` in a directory outside the monorepo

**Solution**: 
- The packages aren't published to npm yet
- Use the CLI to create projects (it handles dependencies)
- Or work within the monorepo workspace

### ❌ Error: `effec-t: command not found`

**Problem**: CLI not linked globally

**Solution**:
```bash
cd packages/cli
pnpm build
npm link
```

### ❌ Error: Cannot find module '@effec-t/core'

**Problem**: Packages not built

**Solution**:
```bash
# From SDK root
pnpm build
```

## Testing the Complete Flow

### 1. Build Everything

```bash
# From SDK root
pnpm install
pnpm build
```

### 2. Link the CLI

```bash
cd packages/cli
npm link
cd ../..
```

### 3. Create a Test Project

```bash
# Create outside the SDK directory
cd ..
effec-t create my-test-app

# Follow the prompts:
# - Template: fullstack-ts
# - Database: sqlite (easiest for testing)
# - Auth: jwt
```

### 4. Run the Test Project

```bash
cd my-test-app
npm install
npm run dev
```

### 5. Test the API

```bash
# In another terminal
curl http://localhost:3000/api/hello
```

## Testing License Features

### Without License Server Running

The SDK works in "offline mode" - it assumes free version and continues.

### With License Server Running

1. Start the license server:
```bash
cd license-server
cp .env.example .env
# Configure DATABASE_URL and STRIPE keys
pnpm dev
```

2. Test license activation:
```bash
effec-t license TEST-LICENSE-KEY
```

3. Check license status:
```bash
effec-t license --status
```

## Publishing to npm (Future)

When ready to publish:

```bash
# 1. Create npm organization
npm login
npm org create effec-t

# 2. Update package.json access
# Add to each package.json:
# "publishConfig": { "access": "public" }

# 3. Publish
pnpm changeset
pnpm version-packages
pnpm release
```

## Development Tips

### Watch Mode for Development

```bash
# Build packages in watch mode
pnpm dev
```

### Test Individual Packages

```bash
cd packages/core
pnpm build
pnpm test
```

### Clean Build

```bash
# Remove all dist folders
Get-ChildItem -Recurse -Directory -Filter dist | Remove-Item -Recurse -Force

# Rebuild
pnpm build
```

## Summary

- ✅ SDK is fully functional
- ✅ All packages build successfully
- ✅ CLI can create projects
- ⚠️ Packages not published to npm (use local linking)
- ⚠️ License server needs configuration before testing license features

**To test**: Link the CLI globally and create a test project outside the SDK directory.
