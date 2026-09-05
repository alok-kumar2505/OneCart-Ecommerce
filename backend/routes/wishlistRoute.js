import express from 'express';
import { addToWishlist, removeFromWishlist, getUserWishlist } from '../controller/wishlistController.js';
import isAuth from '../middleware/isAuth.js';

const wishlistRouter = express.Router();

wishlistRouter.post('/add', isAuth, addToWishlist);
wishlistRouter.post('/remove', isAuth, removeFromWishlist);
wishlistRouter.post('/get', isAuth, getUserWishlist);

export default wishlistRouter;
