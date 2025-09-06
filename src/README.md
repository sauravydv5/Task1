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

Server will start on `http://localhost:4000` by default.

## API Reference

### Auth

- `POST /auth/signup` `{ name, email, password }`
