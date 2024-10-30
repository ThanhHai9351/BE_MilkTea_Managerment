import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { orderController } from '../controller/order.controller';

const orderRoute = express.Router();

orderRoute.post('/', verifyUser, orderController.createOrder);
orderRoute.get('/my-orders', verifyUser, orderController.getMyOrder);
orderRoute.post('/approved/:id', verifyUser, orderController.approveOrder);
orderRoute.get('/', orderController.getAllOrder);
orderRoute.get('/:id', orderController.getOrder);

export default orderRoute;