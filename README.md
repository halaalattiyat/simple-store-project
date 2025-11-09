# Simple Store (Express + EJS + JSON files)

## Setup
1. `npm install`
2. `npm start` (or `npm run dev` with nodemon)

Server runs on http://localhost:5000

## Routes
- Public (HTML):
  - `/` home
  - `/products` products list
  - `/products/:id` product detail (HTML)
- API (JSON):
  - `/api/products`
  - `/api/products/:id`
  - `/api/users`
  - `/api/orders`

Example: `GET /api/products` returns JSON.
