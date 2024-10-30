import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class RecipeService {
  public async create(requestBody: any, currentUser: UserPayload) {
    const { productId, ingredientItemId, quantity } = requestBody;

    const recipe = await prisma.recipe.create({
      data: { productId, ingredientItemId, quantity }
    });


    return recipe;
  }

  public async delete(recipeId: number, currentUser: UserPayload) {
    const recipe = await prisma.recipe.findFirst({ where: { id: recipeId } });

    if (!recipe) throw new NotFoundException('Recipe not found')

    const { productId, ingredientItemId, quantity } = recipe;


    const ingredient = await prisma.ingredientItem.findFirst({ where: { id: ingredientItemId } });
    const inventoryId = ingredient?.isDry ? 1 : 2;

    const ingredientInventory = await prisma.ingredientInventory.findFirst({
      where: { ingredientItemId, inventoryId: inventoryId }
    })

    const quantityResult = ingredientInventory?.quantity! + quantity;

    const ingredientInventoryUpdate = await prisma.ingredientInventory.update({
      where: { id: ingredientInventory?.id! },
      data: {
        quantity: quantityResult
      }
    })

    await prisma.inventoryTransaction.create({
      data: { inventoryId: inventoryId, staffId: currentUser.id, stockType: 'STOCK_IN', quantity: quantity }
    })

    await prisma.recipe.delete({ where: { id: recipeId } });
  }
}

export const recipeService: RecipeService = new RecipeService();