# GitHub OAuth Setup Instructions

## Steps to Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "OAuth Apps" in the left sidebar
3. Click "New OAuth App"
4. Fill in the details:
   - **Application name**: Packet SDK
   - **Homepage URL**: https://packet-site.vercel.app
   - **Authorization callback URL**: https://packet-site.vercel.app/auth/callback
   - **Application description**: Full-stack TypeScript framework
5. Click "Register application"
6. Copy the **Client ID**
7. Click "Generate a new client secret" and copy the **Client Secret**

## Add to Environment Variables

Create `website/.env.local`:
```
VITE_GITHUB_CLIENT_ID=your_client_id_here
VITE_API_URL=http://localhost:4000
```

Create `license-server/.env` (or update existing):
```
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
JWT_SECRET=your_random_secret_key_here
FRONTEND_URL=https://packet-site.vercel.app
```

## Generate JWT Secret

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
