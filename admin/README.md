# Admin

This folder contains the OneCart admin dashboard.

## What It Does

- Admin authentication
- Product management
- Order management
- Dashboard counts for products and orders

## Setup

```bash
cd admin
npm install
npm run dev
```

## Backend Connection

The admin app currently points to the deployed backend URL in `src/context/AuthContext.jsx`. Update that value if you want to run the dashboard against a local or different backend.

## Main Routes

- `/` - admin dashboard
- `/add` - add product
- `/lists` - product list
- `/orders` - orders list
- `/login` - admin login

