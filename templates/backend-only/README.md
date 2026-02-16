# {{PROJECT_NAME}}

A backend API built with Packet SDK.

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
```

## API Documentation

This is a REST API backend. Add your routes in the `routes/api/` directory.

Example route structure:
- `routes/api/users.ts` → `/api/users`
- `routes/api/posts/[id].ts` → `/api/posts/:id`

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL={{DATABASE_URL}}
JWT_SECRET=your-secret-key
PORT=3000
```
