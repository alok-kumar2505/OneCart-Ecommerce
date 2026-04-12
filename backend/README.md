# Backend

This folder contains the Express API for OneCart. It handles customer and admin authentication, products, cart operations, order placement, payment verification, and Cloudinary image uploads.

## Setup

```bash
cd backend
npm install
npm run dev
```

The server starts on `PORT` from `.env`, or `6000` by default.

## Required Environment Variables

```env
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

## Main Responsibilities

- Connect to MongoDB
- Issue and verify JWT cookies
- Protect user and admin routes
- Upload product media to Cloudinary
- Create and verify Razorpay orders
- Store products, users, and orders in MongoDB

## API Surface

### `/api/auth`

- `POST /registration`
- `POST /login`
- `GET /logout`
- `POST /googlelogin`
- `POST /adminlogin`

### `/api/user`

- `GET /getcurrentuser`
- `GET /getadmin`

### `/api/product`

- `POST /addproduct`
- `GET /list`
- `POST /remove/:id`

### `/api/cart`

- `POST /get`
- `POST /add`
- `POST /update`

### `/api/order`

- `POST /placeorder`
- `POST /razorpay`
- `POST /verifyrazorpay`
- `POST /userorder`
- `POST /list`
- `POST /status`

## Notes

- Customer sessions are stored in HTTP-only cookies named `token`.
- Admin access is validated with the same cookie flow but is gated by admin credentials.
- The backend is configured with CORS for the deployed frontend and admin URLs in `index.js`.
