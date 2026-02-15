# Contributing to Effec-t SDK

Thank you for your interest in contributing to Effec-t SDK!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/effec-t/sdk.git
cd sdk

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Project Structure

- `packages/` - Core SDK packages
- `license-server/` - License and payment server
- `templates/` - Project templates
- `docs/` - Documentation
- `examples/` - Example projects

## Making Changes

1. Create a new branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linter: `pnpm lint`
5. Format code: `pnpm format`
6. Commit changes: `git commit -m "feat: add new feature"`
7. Push to branch: `git push origin feature/my-feature`
8. Create a Pull Request

## Commit Convention

We use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

- Use TypeScript for all code
- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features
- Document public APIs

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Building

```bash
# Build all packages
pnpm build

# Build specific package
cd packages/cli
pnpm build
```

## Publishing

Packages are published using Changesets:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm version-packages

# Publish to npm
pnpm release
```

## Questions?

- Join our [Discord](https://discord.gg/effec-t)
- Email us at [dev@effec-t.dev](mailto:dev@effec-t.dev)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
