# 🎓 CampusCompass

CampusCompass is a modern full-stack college discovery and discussion platform where students can explore, compare, and discuss colleges through intelligent search, AI-style recommendations, and community-driven discussions.

The platform combines college discovery (Careers360 / Collegedunia style) with Reddit-style student discussions.

Built as a production-oriented internship project with scalable architecture, clean engineering practices, and reliable backend systems.

---

## 🌐 Live Demo

| Resource | Link |
|----------|------|
| **Production app** | [https://campuscompass-three.vercel.app](https://campuscompass-three.vercel.app) |
| **GitHub repository** | [https://github.com/ramya1421/campuscompass](https://github.com/ramya1421/campuscompass) |
| **Vercel dashboard** | [https://vercel.com/vrv1421-5049s-projects/campuscompass](https://vercel.com/vrv1421-5049s-projects/campuscompass) |

**Deployed on:** [Vercel](https://vercel.com) · **Stack:** Next.js 16, PostgreSQL, Prisma, NextAuth

> **Note:** Set production `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` in Vercel and run `npm run db:seed` for full data and auth on the live site. See [DEPLOYMENT.md](./DEPLOYMENT.md).

### Demo credentials (after database seed)

- **Email:** `aarav@campuscompass.dev`
- **Password:** `Password@123`

---

## 🚀 Features

- **College discovery** — search, filter (state, fees, rating, course type), sort, pagination
- **College detail pages** — overview, courses, placements charts, fees, reviews, facilities, discussions
- **Compare** — side-by-side comparison of 2–3 colleges with highlighted winners
- **Discussions** — categories, threaded comments, likes
- **Authentication** — signup, login, protected routes, bcrypt passwords
- **Saved colleges** — personalized bookmarks dashboard
- **AI predictor** — rule-based admission recommendations
- **UX** — dark mode, skeleton loaders, toast notifications, responsive layout

---

## 🛠️ Tech Stack

| Layer | Technologies |
|--------|----------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn-style UI |
| Backend | Next.js API Routes |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth (Credentials + JWT) |
| Libraries | React Hook Form, Zod, Axios, React Hot Toast, Recharts, TanStack Table, Lucide |

---

## 📂 Project Structure

```txt
src/
 ├── app/                 # Pages + API routes
 ├── components/          # UI + feature components
 ├── hooks/
 ├── lib/
 ├── services/
 ├── actions/
 ├── types/
prisma/
 ├── schema.prisma
 ├── seed.ts
```

---

## ⚡ Installation & Setup

### Clone repository

```bash
git clone https://github.com/ramya1421/campuscompass.git
cd campuscompass
```

### Install dependencies

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env`:

```env
DATABASE_URL="your_postgresql_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Database setup

```bash
npm run db:push
npm run db:seed
```

Or in one step:

```bash
npm run db:setup
```

### Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Models

- User, College, Course, Review, Discussion, Comment
- SavedCollege, Comparison, PredictorHistory
- NextAuth: Account, Session, VerificationToken

Seed includes **56+ Indian colleges** with courses, reviews, and discussions.

---

## 🎯 Engineering Decisions

- **Service layer** — business logic separated from API routes
- **Zod validation** — shared schemas for forms and APIs
- **Server-side filtering** — debounced search with Prisma `where` / `orderBy`
- **JWT sessions** — fewer DB round-trips (tradeoff: harder instant revocation)
- **Modular components** — feature folders under `components/`

---

## 🚢 Deployment

This project is deployed on **Vercel**:

- **Live URL:** https://campuscompass-three.vercel.app
- **Build command:** `prisma generate && next build`
- **Config:** [`vercel.json`](./vercel.json)

Full setup, environment variables, and database seeding: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 📜 License

Educational and internship evaluation purposes.

## 👩‍💻 Author

Developed by **Ramya Varshini** as a production-oriented full-stack internship project.
