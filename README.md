# OneCart E-Commerce Platform

OneCart is a full-stack e-commerce application built with a separate customer storefront, an admin dashboard, and an Express/MongoDB backend.

## Live Demo

Visit the deployed storefront here:

- [OneCart Live Website](https://onecart-ecommerce-frontend.onrender.com/)

## Demo Credentials

Use these credentials to sign in and explore the app:

- Email: `test@gmail.com`
- Password: `test@123`

The repository is organized as a three-app monorepo:

- `frontend` - customer storefront for browsing products, managing cart items, placing orders, and tracking purchases
- `admin` - admin panel for managing products and orders
- `backend` - REST API, authentication, order processing, image upload, and payment integration

## Project Overview

The system supports:

- User registration and login with email/password
- Google sign-in for customers
- Admin login with protected dashboard access
- Product listing, product details, and category-based shopping flow
- Cart management and checkout
- Cash on delivery and Razorpay payment flow
- Order history for users
- Product creation, product removal, and order status updates for admins
- Cloudinary-based image upload for product media

## Quick Access

- Live site: [onecart-ecommerce-frontend.onrender.com](https://onecart-ecommerce-frontend.onrender.com/)
- Demo email: `test@gmail.com`
- Demo password: `test@123`

## Tech Stack

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.8-38B2AC?logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-7.6.2-CA4245?logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-1.9.0-5A29E4?logo=axios)
![Firebase](https://img.shields.io/badge/Firebase-11.9.0-FFCA28?logo=firebase)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB(Mongoose)-8.15.1-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.6.1-3448C5?logo=cloudinary)
![Razorpay](https://img.shields.io/badge/Razorpay-2.9.6-0C2451?logo=razorpay)

## Repository Structure

```text
backend/
  controller/
  config/
  middleware/
  model/
  routes/
frontend/
  src/
    component/
    context/
    pages/
    utils/
admin/
  src/
    component/
    context/
    pages/
```

## Getting Started

Install dependencies separately inside each app folder.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Customer Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

## Environment Variables

### Backend

Create a `.env` file in `backend/` with the following values:

```env
PORT=6000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend

Create a `.env` file in `frontend/` with:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin

The admin app currently uses a backend URL defined in `admin/src/context/AuthContext.jsx`. Update that value if you want to run the dashboard against a different backend URL locally.

## Backend API Summary

### Authentication

- `POST /api/auth/registration` - register a customer
- `POST /api/auth/login` - customer login
- `GET /api/auth/logout` - clear login cookie
- `POST /api/auth/googlelogin` - Google-based customer login
- `POST /api/auth/adminlogin` - admin login

### User

- `GET /api/user/getcurrentuser` - fetch the authenticated customer
- `GET /api/user/getadmin` - fetch the authenticated admin

### Products

- `POST /api/product/addproduct` - create a product with uploaded images
- `GET /api/product/list` - list all products
- `POST /api/product/remove/:id` - remove a product

### Cart

- `POST /api/cart/get` - get cart data for the current user
- `POST /api/cart/add` - add an item to the cart
- `POST /api/cart/update` - update cart quantity and size data

### Orders

- `POST /api/order/placeorder` - create a cash-on-delivery order
- `POST /api/order/razorpay` - create a Razorpay order
- `POST /api/order/verifyrazorpay` - verify a Razorpay payment
- `POST /api/order/userorder` - fetch the current user's orders
- `POST /api/order/list` - fetch all orders for admin
- `POST /api/order/status` - update order status for admin

## Application Notes

- Customer authentication uses HTTP-only cookies.
- Product images are uploaded to Cloudinary from the backend.
- Razorpay is used for online checkout in the customer flow.
- The customer app includes a voice-driven assistant for navigation.
- The admin dashboard shows product and order counts and provides management screens for catalog and orders.

## Related Docs

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Admin README](admin/README.md)
