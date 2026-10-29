<<<<<<< HEAD
# URL Shortener API

A backend URL shortener built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and Zod.

## Features

- Create short URLs from valid URLs
- Validate input using Zod
- Generate unique short codes
- Store URLs in a PostgreSQL database
- Redirect short URLs to their original destinations
- Track click counts
- Retrieve URL analytics
- Delete short URLs
- Handle invalid inputs and missing URLs

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL (Neon)
- Prisma ORM
- Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=8000
BASE_URL="http://localhost:8000"
DATABASE_URL="your-pooled-database-connection"
DATABASE_URL_UNPOOLED="your-direct-database-connection"
```

Replace the database placeholders with your own Neon connection strings. Never commit `.env` to GitHub.

### 3. Generate Prisma Client

Run the Prisma generation command used by your project:

```bash
npx prisma generate
```

If your project uses Prisma 7 and requires an explicit version, use the same version configured in your project.

### 4. Start the development server

```bash
npm run dev
```

The API will run at `http://localhost:8000` unless you configure another port.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/shorten` | Create a short URL |
| GET | `/api/analytics/:shortCode` | Retrieve URL analytics |
| GET | `/:shortCode` | Redirect to the original URL |
| DELETE | `/api/shorten/:shortCode` | Delete a short URL |

### Create a short URL

Request body:

```json
{
  "url": "https://www.google.com"
}
```

## Project Structure

```text
src/
├── controllers/
│   └── url.controller.ts
├── routes/
│   └── url.routes.ts
├── services/
│   └── url.service.ts
├── prisma.ts
├── server.ts
└── validation.ts
prisma/
└── schema.prisma
```

## Future Improvements

- Automated API tests
- Rate limiting
- User authentication
- Custom short codes
- Deployment to a production hosting platform
=======
# url-shortener
>>>>>>> bb38ce9eaf79daaa1b1d41b7a2fa7f67b56a22ca
