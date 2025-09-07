# E-commerce Backend (Node.js + Express + MongoDB + JWT)

## Features

- JWT authentication (signup/login)
- Items CRUD with filters (category, price range, text search), sort, pagination
- Cart APIs (server-side cart stored in User document) — persists after logout
- Validation, security headers (Helmet), CORS, logging

## Quick start

1. Clone repo
2. Copy `.env.example` to `.env` and update variables (MONGODB_URI, JWT_SECRET)
3. Install:
   npm install
4. Seed sample data (optional):
   npm run seed
5. Run:
   npm run dev

Server default: http://localhost:4001

## API endpoints (summary)

- `POST /auth/signup` — { name, email, password }
- `POST /auth/login` — { email, password } -> returns token
- `GET /items` — list with query params: search, category, minPrice, maxPrice, sort, page, limit
- `GET /items/:id` — single item
- `POST /items` — create
- `PATCH /items/:id` — update
- `DELETE /items/:id` — delete
- `GET /cart` — get cart for current user
- `POST /cart/add` — { itemId, qty? }
- `PATCH /cart/update` — { itemId, qty }
- `DELETE /cart/remove/:itemId`
- `DELETE /cart/clear`

## Notes

- JWT token must be sent in `Authorization: Bearer <token>` header.
- Cart is saved in the `User` document and therefore persists across logins/logouts.
