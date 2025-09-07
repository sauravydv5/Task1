# README.md

- `CORS_ORIGIN` – comma-separated allowed origins (e.g., `http://localhost:5173`)

3. **Seed (optional)**

```bash
npm run seed
```

4. **Run**

```bash
npm run dev
# or
npm start
```

Server will start on `http://localhost:4001` by default.

## API Reference

### Auth

- `POST /auth/signup` `{ name, email, password }`
- `POST /auth/login` `{ email, password }`

- `GET /auth/me` — use to verify token (requires `Authorization: Bearer <token>`) but returns `{ ok: true }` (can be extended)

### Items (protected; admin for write operations)

- `GET /items?search=&category=electronics,fashion&minPrice=1000&maxPrice=5000&sort=price,-createdAt&page=1&limit=12`
- `GET /items/:id`
- `POST /items` _(admin)_ — create item
- `PATCH /items/:id` _(admin)_ — update item
- `DELETE /items/:id` _(admin)_ — delete item
