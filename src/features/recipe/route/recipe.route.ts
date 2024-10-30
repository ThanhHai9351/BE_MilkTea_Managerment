import express from 'express';
import { recipeController } from '../controller/recipe.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const recipeRoute = express.Router();

recipeRoute.post('/', verifyUser, recipeController.createRecipe);
recipeRoute.delete('/:id', verifyUser, recipeController.removeRecipe);

export default recipeRoute;