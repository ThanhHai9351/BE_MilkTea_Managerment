import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { addressController } from '../controller/address.controller';

const addressRoute = express.Router();

addressRoute.post('/', verifyUser, addressController.addAddress);
addressRoute.get('/', verifyUser, addressController.myAddress);
addressRoute.delete('/:id', verifyUser, addressController.deleteAddress);

export default addressRoute;