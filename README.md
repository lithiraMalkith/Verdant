# Verdant Estates

A boutique Real Estate Management System built with Next.js 14 (App Router), MongoDB, Tailwind CSS, GSAP, and a custom WebGL hero. Includes a public-facing website and a separate admin panel under `/admin`.

## Stack

- **Next.js 14** (App Router) — pages + API routes
- **MongoDB + Mongoose** — Contact Messages collection
- **JWT (httpOnly cookie)** — Admin authentication
- **Tailwind CSS** — White & green theme
- **GSAP** — Headline/word reveal & card animations
- **OGL (WebGL)** — Animated organic hero background
- **react-hot-toast** — Notifications

## Pages

| Path | Description |
|------|-------------|
| `/` | Home (WebGL hero, featured properties) |
| `/about` | About the studio |
| `/properties` | Filterable property listings |
| `/agents` | Agent grid |
| `/contact` | Contact form → MongoDB |
| `/admin/login` | Admin sign-in |
| `/admin/dashboard` | Admin landing |
| `/admin/messages` | Table of contact submissions (view + delete) |

## API

| Route | Method | Auth |
|-------|--------|------|
| `/api/contact` | POST | public |
| `/api/admin/login` | POST / DELETE | public / cookie |
| `/api/admin/messages` | GET | admin cookie |
| `/api/admin/messages/[id]` | DELETE | admin cookie |

## Getting started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 3. Run dev server
npm run dev
```

Open <http://localhost:3000>.

### Default admin

```
Email:    admin@verdant.com
Password: admin123
```

Change these in `.env.local`.

## Project structure

```
app/
  page.tsx              # Home
  about/                # About
  properties/           # Listings (client-side filter)
  agents/               # Agent grid
  contact/              # Contact form
  admin/                # Separate admin panel
    login/
    dashboard/
    messages/           # server-rendered table from MongoDB
  api/
    contact/            # POST submissions
    admin/
      login/            # JWT cookie auth
      messages/         # list + delete
components/
  Sidebar.tsx           # Left slide-in nav with hamburger
  PageLoader.tsx        # Cool loading animation
  HeroCanvas.tsx        # WebGL organic background
  HomeClient.tsx        # GSAP-animated home
  MessagesTable.tsx     # Admin table + modal
  LogoutButton.tsx
lib/
  db.ts                 # Cached mongoose connection
  auth.ts               # JWT helpers
  data.ts               # Static property + agent data
models/
  Contact.ts            # ContactMessage schema
```

## Design notes

- **Theme**: ivory white + verdant greens (`forest-50` → `forest-950`).
- **Typography**: Cormorant Garamond display + Inter body.
- **Navigation**: hamburger → left-side slide-in drawer.
- **Loading**: full-screen rotating leaf with progress meter.
- **Hero**: animated WebGL fbm noise reacting to cursor.
