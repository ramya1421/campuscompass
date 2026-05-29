# Deploy CampusCompass to Vercel

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

## Step 2 — Deploy on Vercel (recommended: GitHub import)

1. Open https://vercel.com/new
2. Import **ramya1421/campuscompass**
3. Framework: **Next.js** (auto-detected)
4. Root directory: `.` (repo root)
5. Add **Environment Variables**:

   | Name | Value |
   |------|--------|
   | `DATABASE_URL` | Your Neon pooled connection string |
   | `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` or use a long random string |
   | `NEXTAUTH_URL` | `https://YOUR-PROJECT.vercel.app` (update after first deploy if needed) |

6. Click **Deploy**

---

## Step 3 — Apply database schema

After the first deploy, run locally (with production `DATABASE_URL`):

```bash
cd campuscompass
# Temporarily set DATABASE_URL to your Neon URL, then:
npm run db:push
npm run db:seed
```

Or use Neon SQL editor — schema is applied via `prisma db push`.

---

## Step 4 — Fix NEXTAUTH_URL (if login fails)

1. Vercel → Project → **Settings** → **Environment Variables**
2. Set `NEXTAUTH_URL` to your live URL, e.g. `https://campuscompass.vercel.app`
3. **Redeploy** (Deployments → ⋯ → Redeploy)

---

## Alternative — Deploy with CLI

```bash
cd campuscompass
npx vercel login
npx vercel link
npx vercel env add DATABASE_URL
npx vercel env add NEXTAUTH_SECRET
npx vercel env add NEXTAUTH_URL
npx vercel --prod
```

Then run `db:push` and `db:seed` against production `DATABASE_URL`.

---

## Demo login (after seed)

- Email: `aarav@campuscompass.dev`
- Password: `Password@123`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails: `DATABASE_URL is not set` | Add env vars in Vercel before deploy |
| Empty colleges list | Run `npm run db:seed` with production URL |
| Login redirect loop | `NEXTAUTH_URL` must match live domain exactly |
| DB connection errors | Use **pooled** Neon URL; `sslmode=require` |
