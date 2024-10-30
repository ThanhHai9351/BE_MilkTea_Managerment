import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { cartController } from '../controller/cart.controller';

const cartRoute = express.Router();

cartRoute.post('/', verifyUser, cartController.addToCart);
cartRoute.delete('/:id', verifyUser, cartController.removeFromCart);
cartRoute.get('/', verifyUser, cartController.getMyCart);


export default cartRoute;