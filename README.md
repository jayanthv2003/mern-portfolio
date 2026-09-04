# Personal Portfolio Website — MERN Stack

A full-stack, production-ready personal portfolio website built with **MongoDB, Express.js, React (Vite), and Node.js**. It includes a public-facing portfolio site (hero, about, skills, projects, certifications, contact form) and a JWT-protected admin dashboard for managing projects, certificates, and incoming messages.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Creating the Admin Account](#creating-the-admin-account)
- [API Reference](#api-reference)
- [Deployment Guide](#deployment-guide)
- [Screenshots](#screenshots)
- [Security](#security)
- [License](#license)

---

## Features

**Public site**
- Hero section with animated typing effect, resume download, and social links
- About section (bio, education, experience, career objective)
- Categorized skills with animated progress bars
- Projects loaded dynamically from MongoDB
- Certifications loaded dynamically from MongoDB
- Validated contact form that saves to the database **and** sends an email notification (Nodemailer)
- Dark / light theme toggle (persisted to `localStorage`, respects OS preference)
- Fully responsive — mobile, tablet, laptop, desktop
- SEO: meta title/description, Open Graph + Twitter card tags, favicon
- Toast notifications, loading spinners, custom 404 page
- Route-based code splitting + lazy loading, optimized/lazy-loaded images

**Admin dashboard** (`/admin/login` → `/admin/dashboard`)
- JWT-based authentication (bcrypt-hashed passwords)
- Create / edit / delete projects
- Create / edit / delete certificates
- View, mark-as-read, and delete contact messages

**Backend**
- REST API with full CRUD for Projects, Certificates, and Contact messages
- Centralized error handling and request validation (`express-validator`)
- Security: Helmet, CORS allow-list, rate limiting (general + strict login/contact limits), environment-variable secrets

---

## Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React 18, Vite, React Router, Tailwind CSS, Framer Motion, React Icons, Axios, react-hot-toast, react-helmet-async |
| Backend     | Node.js, Express.js, Mongoose |
| Database    | MongoDB Atlas |
| Auth        | JSON Web Tokens (JWT), bcrypt.js |
| Email       | Nodemailer |
| Security    | Helmet, CORS, express-rate-limit, express-validator |
| Deployment  | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## Project Structure

```
portfolio/
├── client/                    # React + Vite frontend
│   ├── public/                 # favicon, resume.pdf, profile.jpg, og-image.png
│   └── src/
│       ├── api/                 # axios instance
│       ├── context/             # Theme & Auth React context
│       ├── hooks/                # useTheme, useAuth, useTypewriter
│       ├── components/
│       │   ├── layout/            # Navbar, Footer, ThemeToggle
│       │   ├── common/            # Loader, SEO, ProtectedRoute
│       │   ├── home/              # Hero, About, Skills, Projects, Certifications, Contact
│       │   └── admin/             # Project/Certificate forms & tables, Messages table
│       ├── pages/                # Home, AdminLogin, AdminDashboard, NotFound
│       └── App.jsx / main.jsx
│
├── server/                    # Express backend
│   ├── config/db.js             # MongoDB connection
│   ├── models/                  # User, Project, Certificate, Contact
│   ├── controllers/             # Route handlers
│   ├── routes/                  # Express routers
│   ├── middleware/              # auth, error handling, rate limiting
│   ├── utils/                   # JWT + Nodemailer helpers
│   ├── seed/seedAdmin.js        # creates the first admin user
│   └── server.js
│
└── README.md
```

---

## Prerequisites

- Node.js **v18+** and npm
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier is fine) and its connection string
- An email account for Nodemailer (a Gmail address with an **App Password** is the simplest option)

---

## Installation

Clone the repo, then install each app's dependencies separately:

```bash
git clone <your-repo-url>
cd portfolio

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

---

## Environment Variables

Copy the example files and fill in your own values.

```bash
# from the server/ folder
cp .env.example .env

# from the client/ folder
cp .env.example .env
```

**`server/.env`**

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Port the API listens on (default `5000`) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string used to sign JWTs |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used once by `npm run seed:admin` to create the first admin user |
| `EMAIL_SERVICE` / `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials for Nodemailer |
| `EMAIL_RECEIVER` | Inbox that receives contact-form notifications |
| `CLIENT_URL` | Frontend origin(s), comma-separated, used for CORS |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX` | General API rate limit config |

**`client/.env`**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL, e.g. `http://localhost:5000/api` |
| `VITE_SITE_NAME` / `VITE_SITE_URL` | Used in SEO tags |
| `VITE_GITHUB_URL` / `VITE_LINKEDIN_URL` / `VITE_EMAIL` | Social links shown in the Hero and Footer |

---

## Running Locally

In two terminals:

```bash
# Terminal 1 - backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 - frontend (http://localhost:5173)
cd client
npm run dev
```

Add your own **`resume.pdf`**, **`profile.jpg`**, and **`og-image.png`** to `client/public/` — they're referenced directly by the Hero, About, and SEO components.

## Creating the Admin Account

The signup flow is intentionally left out of the public UI for security. Create the first (and only) admin from the CLI, using the `ADMIN_*` values in `server/.env`:

```bash
cd server
npm run seed:admin
```

Then log in at `http://localhost:5173/admin/login`.

---

## API Reference

Base URL: `/api`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Log in, returns a JWT |
| GET | `/auth/me` | Private | Get the logged-in admin's profile |
| GET | `/projects` | Public | List all projects |
| GET | `/projects/:id` | Public | Get a single project |
| POST | `/projects` | Admin | Create a project |
| PUT | `/projects/:id` | Admin | Update a project |
| DELETE | `/projects/:id` | Admin | Delete a project |
| GET | `/certificates` | Public | List all certificates |
| POST | `/certificates` | Admin | Create a certificate |
| PUT | `/certificates/:id` | Admin | Update a certificate |
| DELETE | `/certificates/:id` | Admin | Delete a certificate |
| POST | `/contact` | Public | Submit the contact form (saves + emails) |
| GET | `/contact` | Admin | List all contact messages |
| PUT | `/contact/:id/read` | Admin | Mark a message as read |
| DELETE | `/contact/:id` | Admin | Delete a message |

Admin routes require an `Authorization: Bearer <token>` header.

---

## Deployment Guide

### 1. Database — MongoDB Atlas
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Add a database user and allow network access from anywhere (`0.0.0.0/0`) or Render's IPs.
3. Copy the connection string into `MONGO_URI`.

### 2. Backend — Render
1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **New Web Service** pointing at the `server/` folder (set **Root Directory** to `server`).
3. Build command: `npm install` — Start command: `npm start`.
4. Add all variables from `server/.env.example` in Render's Environment tab (use your real `MONGO_URI`, `JWT_SECRET`, email credentials, and set `CLIENT_URL` to your Vercel domain once you have it).
5. Deploy. Note the resulting URL, e.g. `https://your-api.onrender.com`.

### 3. Frontend — Vercel
1. On [Vercel](https://vercel.com), import the repo and set **Root Directory** to `client`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add `VITE_API_URL=https://your-api.onrender.com/api` (and the other `VITE_*` vars) in Vercel's Environment Variables.
4. Deploy, then go back to Render and update `CLIENT_URL` to your new Vercel domain so CORS allows it.

### 4. Seed the admin user
Run `npm run seed:admin` once, either locally against the Atlas connection string, or via Render's shell.

---

## Screenshots

> Add screenshots of the Hero, Projects, Skills, and Admin Dashboard sections here once you've customized the content and deployed the site, e.g.:
>
> `![Hero section](./client/public/screenshots/hero.png)`

---

## Security

- Passwords hashed with **bcrypt** before storage
- **JWT** authentication for all admin/write routes
- **Helmet** for secure HTTP headers
- **CORS** restricted to an explicit origin allow-list
- **express-rate-limit** on all API routes, with stricter limits on login and the contact form
- Input validation on every write route via **express-validator**
- Secrets kept out of source control via `.env` (see `.env.example` files)

---

## License

MIT — free to use and adapt for your own portfolio.
