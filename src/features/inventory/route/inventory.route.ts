import express from 'express';
import { inventoryController } from '../controller/inventory.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const inventoryRoute = express.Router();

inventoryRoute.post('/stock-in/:supplyId', verifyUser, inventoryController.stockIn);
inventoryRoute.get('/transactions/:type', inventoryController.getAllTransaction);
inventoryRoute.get('/ingredient-inventories/:ingredientItemId', inventoryController.getIngredientInventory);


export default inventoryRoute;