# Deploy CampusCompass to Vercel

## 🌐 Current deployment

| Item | URL |
|------|-----|
| **Live app** | https://campuscompass-three.vercel.app |
| **GitHub** | https://github.com/ramya1421/campuscompass |
| **Vercel project** | https://vercel.com/vrv1421-5049s-projects/campuscompass |
| **Latest deployment** | https://vercel.com/vrv1421-5049s-projects/campuscompass/CXpXw679YqCh9VsZNW5pkY8vXNUM |

**Platform:** Vercel · **Framework:** Next.js 16 (App Router) · **Region:** Washington, D.C. (iad1)

### Production environment variables (Vercel)

Set these in [Project Settings → Environment Variables](https://vercel.com/vrv1421-5049s-projects/campuscompass/settings/environment-variables):

| Variable | Production value |
|----------|------------------|
| `DATABASE_URL` | PostgreSQL connection string (Neon/Supabase **pooled** URL recommended) |
| `NEXTAUTH_URL` | `https://campuscompass-three.vercel.app` |
| `NEXTAUTH_SECRET` | Long random secret (e.g. `openssl rand -base64 32`) |

After changing env vars, **redeploy** from the Vercel dashboard.

### Seed production database (one-time)

```bash
cd campuscompass
$env:DATABASE_URL="YOUR_PRODUCTION_DATABASE_URL"   # PowerShell
npm run db:push
npm run db:seed
```

### Demo login (after seed)

- **Email:** `aarav@campuscompass.dev`
- **Password:** `Password@123`

---

## Prerequisites

- GitHub repo: https://github.com/ramya1421/campuscompass
- [Vercel account](https://vercel.com/signup) (free)
- [Neon](https://neon.tech) or [Supabase](https://supabase.com) PostgreSQL (free tier)

---

## Step 1 — Create production database (Neon)

1. Go to https://console.neon.tech and create a project.
2. Copy the **connection string** (use the **pooled** connection string for serverless).
3. It should look like:
   ```txt
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

---

## Step 2 — Deploy on Vercel

### Option A: GitHub import (recommended for auto-deploy)

1. Open https://vercel.com/new
2. Import **ramya1421/campuscompass**
3. Add environment variables (see table above)
4. Click **Deploy**

### Option B: Vercel CLI (already used for initial deploy)

```bash
cd campuscompass
npx vercel login
npx vercel link
npx vercel env add DATABASE_URL
npx vercel env add NEXTAUTH_SECRET
npx vercel env add NEXTAUTH_URL
npx vercel --prod
```

---

## Step 3 — Apply database schema

```bash
npm run db:push
npm run db:seed
```

Use your production `DATABASE_URL` when running these commands.

---

## Step 4 — Fix NEXTAUTH_URL (if login fails)

1. Vercel → Project → **Settings** → **Environment Variables**
2. Set `NEXTAUTH_URL` to `https://campuscompass-three.vercel.app`
3. **Redeploy**

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails: `DATABASE_URL is not set` | Add env vars in Vercel before deploy |
| Empty colleges list | Run `npm run db:seed` with production URL |
| Login redirect loop | `NEXTAUTH_URL` must match live domain exactly |
| DB connection errors | Use **pooled** Neon URL; `sslmode=require` |
| Local `.env` uploaded to Vercel | Remove localhost values; use Vercel env vars only |

---

## Redeploy

```bash
npx vercel --prod
```

Or push to `main` on GitHub (after connecting the repo in Vercel).
