import express from 'express';
import { ingredientItemController } from '../controller/IngredientItemController';

const ingredientItemRoute = express.Router();

ingredientItemRoute.post('/', ingredientItemController.addIngredientItem);
ingredientItemRoute.get('/', ingredientItemController.getAllIngredientItems);
ingredientItemRoute.get('/:id', ingredientItemController.getOneIngredientItem);
ingredientItemRoute.put('/:id', ingredientItemController.updateIngredientItem);
ingredientItemRoute.delete('/:id', ingredientItemController.deleteIngredientItem);

export default ingredientItemRoute;