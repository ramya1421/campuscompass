# 🎓 CampusCompass

CampusCompass is a modern full-stack college discovery and discussion platform designed to help students explore, compare, and discuss colleges through intelligent search, AI-style recommendations, and community-driven discussions.

The platform combines the experience of college discovery portals like Careers360 and Collegedunia with interactive discussion systems inspired by Reddit-style communities.

Built as a production-oriented internship project, the application focuses heavily on scalable architecture, clean engineering practices, responsive design, and reliable backend systems.

---

# 🚀 Features

## 🔍 College Discovery & Search

* Search colleges with intelligent filtering and sorting
* Filter by:

  * state/location
  * fees
  * ratings
  * course type
* Server-side pagination
* Responsive college cards
* Modern search experience with debounced queries

---

## 🏫 College Detail Pages

Each college has a dedicated detail page containing:

* overview
* fee structure
* courses
* placement statistics
* facilities
* student reviews
* discussion threads

Additional features:

* placement charts
* statistics cards
* comparison support
* save college functionality

---

## ⚖️ College Comparison System

Users can compare multiple colleges side-by-side based on:

* fees
* placements
* ratings
* location
* courses

The comparison interface highlights better values and provides a clean decision-making experience.

---

## 💬 Discussion & Q&A System

A Reddit-style discussion platform where students can:

* create discussions
* ask questions
* comment on posts
* interact with communities

Discussion categories:

* placements
* academics
* hostel life
* admissions
* campus life

---

## 🔐 Authentication System

Secure authentication with:

* signup/login
* protected routes
* session management
* password hashing
* user-specific saved data

Users can bookmark colleges and manage personalized dashboards.

---

## 🤖 AI-style College Predictor

A recommendation engine that suggests colleges based on:

* exam
* rank
* preferred state
* branch preference

The system uses rule-based recommendation logic to simulate an intelligent admission predictor.

---

# 🛠️ Tech Stack

## Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* TailwindCSS
* shadcn/ui

## Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL

## Authentication & Validation

* NextAuth/Auth.js
* React Hook Form
* Zod

## Additional Libraries

* Axios
* React Hot Toast
* Recharts
* TanStack Table
* Lucide Icons

---

# 🧩 Architecture Highlights

* Modular and scalable folder structure
* Reusable component architecture
* Server-side filtering and pagination
* Responsive design across all devices
* Robust validation and error handling
* Skeleton loaders and loading states
* Production-oriented relational database schema
* Separation of concerns using services and utilities

---

# 📂 Project Structure

```bash
src/
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── colleges/
 │    ├── discussions/
 │    ├── compare/
 │    ├── predictor/
 │    └── shared/
 ├── lib/
 ├── hooks/
 ├── services/
 ├── actions/
 ├── prisma/
 ├── types/
 └── utils/
```

---

# ⚡ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/ramya1421/campuscompass.git
cd campuscompass
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Run Prisma Migrations

```bash
npx prisma migrate dev
```

---

## Seed Database

```bash
npm run seed
```

---

## Start Development Server

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:3000
```

---

# 🗄️ Database Models

Main Prisma models:

* User
* College
* Course
* Review
* Discussion
* Comment
* SavedCollege
* Comparison
* PredictorHistory

---

# 🎯 Engineering Decisions

* Prisma ORM used for type-safe database operations
* Next.js App Router for scalable routing and server components
* Zod validation for reliable API and form validation
* JWT/session authentication using NextAuth
* Modular service architecture for maintainability
* Reusable UI system with shadcn/ui

---

# 🔒 Error Handling & Reliability

The application includes:

* graceful error handling
* loading skeletons
* empty states
* API validation
* protected routes
* responsive fallbacks
* invalid route handling

---

# 🌟 Future Improvements

Potential future enhancements:

* OAuth login (Google/GitHub)
* Real AI recommendation engine
* Redis caching
* Real-time discussions
* Notification system
* Advanced analytics dashboard
* Image CDN optimization

---

# 👩‍💻 Author

Developed by Ramya Varshini as a production-oriented full-stack internship project.

---

# 📜 License

This project is for educational and internship evaluation purposes.
