import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { recipeService } from "~/services/db/recipe.service";

class RecipeController {
  public async createRecipe(req: Request, res: Response) {
    const recipe = await recipeService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create recipe successfully',
      data: recipe
    })
  }

  public async removeRecipe(req: Request, res: Response) {
    const recipe = await recipeService.delete(parseInt(req.params.id), req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create recipe successfully',
      data: recipe
    })
  }
}

export const recipeController: RecipeController = new RecipeController();
