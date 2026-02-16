# {{PROJECT_NAME}}

A full-stack application built with Packet SDK.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy
npm run deploy
```

## Project Structure

```
{{PROJECT_NAME}}/
├── routes/              # API routes
│   └── api/            # API endpoints
│       ├── health.ts   # Health check endpoint
│       ├── users.ts    # User CRUD operations
│       └── auth/       # Authentication endpoints
├── src/                # Source code
│   └── index.ts        # Application entry point
├── effec-t.config.ts   # Packet SDK configuration
└── package.json        # Dependencies
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `POST /api/auth/login` - User login

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL={{DATABASE_URL}}
JWT_SECRET=your-secret-key
PORT=3000
```

## Documentation

Visit [packetsdk.dev/docs](https://packetsdk.dev/docs) for full documentation.
