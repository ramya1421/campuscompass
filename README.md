# CampusCompass

Modern college discovery + discussion platform built with Next.js App Router, Prisma, PostgreSQL, and NextAuth.

## Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn-style UI
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth (Credentials + JWT sessions)
- **Libraries:** React Hook Form, Zod, Axios, React Hot Toast, Lucide, TanStack Table, Recharts

## Features

- Authentication (signup, login, logout, protected routes)
- Searchable college listing with filters, sorting, pagination
- College detail pages with tabs, charts, reviews, facilities
- Compare 2–3 colleges side-by-side
- Reddit-style discussions with threaded comments and likes
- Saved colleges dashboard
- AI-style college predictor (rule-based engine)
- Dark mode, responsive layout, loading states, error handling

## Project Structure

```txt
src/
 ├── app/                 # App Router pages + API routes
 ├── components/          # UI + feature components
 ├── hooks/
 ├── lib/
 ├── services/
 ├── types/
prisma/
 ├── schema.prisma
 ├── seed.ts
```

## Getting Started

### 1. Install dependencies

```bash
cd campuscompass
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` (PostgreSQL connection string)
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### 3. Setup database

```bash
npm run db:push
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email:** `aarav@campuscompass.dev`
- **Password:** `Password@123`

## Deployment (Vercel)

1. Push repository to GitHub
2. Import project in Vercel
3. Add environment variables (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
4. Use a managed PostgreSQL provider (Neon, Supabase, Railway, etc.)
5. Deploy

Recommended deploy command:

```bash
npx prisma migrate deploy && npm run build
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Generate Prisma client and build app |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed 50+ Indian colleges and demo content |
| `npm run db:setup` | Push schema + seed in one step |

## Seed Data

Includes 50+ Indian colleges across multiple states, courses, reviews, discussions, comments, saved colleges, comparisons, and predictor history.
