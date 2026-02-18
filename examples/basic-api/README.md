# Basic API Example

A simple REST API built with Packet SDK.

## Features

- JWT authentication
- SQLite database
- CRUD operations for users
- File-system based routing

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Endpoints

- `GET /api/users` - List all users (requires auth)
- `GET /api/users/:id` - Get user by ID (requires auth)
- `PUT /api/users/:id` - Update user (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)

## Example Requests

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Users (with auth)

```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
basic-api/
├── routes/
│   └── api/
│       ├── auth/
│       │   ├── register.ts
│       │   └── login.ts
│       └── users/
│           ├── index.ts
│           └── [id].ts
├── src/
│   └── index.ts
├── packet.config.ts
└── package.json
```
