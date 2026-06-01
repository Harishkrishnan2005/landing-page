# Vertex Wholesale Partners

Production-ready MERN project for a wholesale distribution business landing page and secure admin dashboard.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, JWT cookies, bcrypt, Helmet, rate limiting
- Data export: `xlsx`

## Features

- Corporate-style responsive landing page
- Contact and appointment forms saved to MongoDB
- Hidden admin login at `/admin/login`
- JWT authentication stored in HTTP-only cookies
- Protected admin dashboard, contacts, appointments, and profile routes
- Dashboard analytics for total, daily, and monthly requests
- Search, filter, delete, and appointment status management
- Separate Excel exports for contacts and appointments
- Strict CORS, Helmet headers, rate limiting, input validation, XSS and NoSQL injection protection

## Environment Variables

### Backend

Copy [backend/.env.example](/e:/udhaya/backend/.env.example) to `backend/.env` and fill in:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `COOKIE_NAME`
- `COOKIE_MAX_AGE`
- `FRONTEND_URL`
- `BACKEND_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Frontend

Copy [frontend/.env.example](/e:/udhaya/frontend/.env.example) to `frontend/.env` and set:

- `VITE_API_URL`
- `VITE_APP_NAME`

## Run Locally

1. Install frontend dependencies in `frontend` with `npm install`
2. Install backend dependencies in `backend` with `npm install`
3. Start backend with `npm run dev`
4. Start frontend with `npm run dev`

## Deployment

### Frontend on Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL` pointing to your Render backend
- [frontend/vercel.json](/e:/udhaya/frontend/vercel.json) enables SPA routing

### Backend on Render

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all variables from [backend/.env.example](/e:/udhaya/backend/.env.example)
- [backend/render.yaml](/e:/udhaya/backend/render.yaml) provides a starter service definition

## Notes

- The backend seeds an initial admin from environment variables if that email does not already exist.
- JWTs are never stored in `localStorage` or `sessionStorage`.
- In production, cookies automatically use `secure: true`.
