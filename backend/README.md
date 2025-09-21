# CardKey Manager - Backend

This is the backend service for the CardKey Manager system. It's built with Node.js, Express, and connects to a MySQL database.

## Project Structure

```
backend/
├── server.js          # Main entry point
├── database.js        # Database connection module
├── cardGenerator.js   # Card key generation logic
├── routes/
│   └── cards.js       # API routes for card management
├── tests/
│   └── basic.test.js  # Basic API tests
├── package.json       # Dependencies and scripts
└── .env               # Environment variables
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   DB_HOST=mysql
   DB_USER=cardkey_user
   DB_PASSWORD=cardkey_password
   DB_NAME=cardkey_db
   DB_PORT=3306
   SERVER_PORT=3000
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production, start the server with:
   ```
   npm start
   ```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/cards/generate` - Generate a new card key
- `GET /api/cards` - Get all card keys (with pagination)
- `GET /api/cards/:code` - Get a specific card key by code

## Running Tests

```
npm test
```
