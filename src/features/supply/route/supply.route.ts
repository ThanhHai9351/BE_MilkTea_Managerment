import express from 'express';
import { supplyController } from '../controller/supply.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const supplyRoute = express.Router();

supplyRoute.post('/', verifyUser, supplyController.createSupply);
supplyRoute.get('/', supplyController.getAllSupplies);

export default supplyRoute;