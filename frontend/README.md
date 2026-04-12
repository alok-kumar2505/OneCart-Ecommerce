# Frontend

This folder contains the customer-facing storefront for OneCart.

## What It Does

- Customer registration and login
- Google sign-in through Firebase
- Product browsing and product detail views
- Cart management and checkout
- Cash on delivery and Razorpay payment flow
- Order history
- Voice-driven navigation helper

## Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in `frontend/`:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Backend Connection

The app currently points to the deployed backend URL in `src/context/AuthContext.jsx`. Update that value if you want to run the frontend against a local or different backend.

## Main Routes

- `/` - home
- `/login` - login
- `/signup` - registration
- `/about` - about page
- `/collection` - product collections
- `/product` - product listing
- `/productdetail/:productId` - product detail page
- `/cart` - cart
- `/placeorder` - checkout
- `/order` - orders

