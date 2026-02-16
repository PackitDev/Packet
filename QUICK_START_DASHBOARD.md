# Quick Start: User Dashboard

## 🎯 To Get Dashboard Working (5 Steps)

### 1. Create GitHub OAuth App (2 minutes)
```
1. Go to: https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - Name: Packet SDK
   - Homepage: https://packet-site.vercel.app
   - Callback: https://packet-site.vercel.app/auth/callback
4. Click "Register application"
5. Copy Client ID and generate Client Secret
```

### 2. Set Up Backend Environment (1 minute)
Create `license-server/.env`:
```env
GITHUB_CLIENT_ID=paste_your_client_id
GITHUB_CLIENT_SECRET=paste_your_client_secret
JWT_SECRET=run_command_below_to_generate
DATABASE_URL=your_postgres_url
FRONTEND_URL=https://packet-site.vercel.app
PORT=4000
```

Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Update Database Schema (1 minute)
```bash
cd license-server
npm install jsonwebtoken @types/jsonwebtoken
pnpm drizzle-kit push:pg
```

### 4. Deploy Backend (5 minutes)
Deploy `license-server` to Railway/Render/Heroku. Get the URL.

### 5. Configure Vercel (1 minute)
In Vercel dashboard → Packet-Site → Settings → Environment Variables:
```
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_API_URL=https://your-backend-url.com
```

Then redeploy.

## ✅ Done!

Users can now:
- Click "Sign In" on the website
- Authenticate with GitHub
- View their dashboard
- Get their license key
- Manage their account

## 🧪 Test Locally

**Terminal 1 (Backend):**
```bash
cd license-server
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd website
npm install
npm run dev
```

Create `website/.env.local`:
```env
VITE_GITHUB_CLIENT_ID=your_client_id
VITE_API_URL=http://localhost:4000
```

Then test at http://localhost:3001

## 📞 Need Help?

Check `DASHBOARD_IMPLEMENTATION_SUMMARY.md` for full details and troubleshooting.
