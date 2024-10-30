import { prisma } from "~/prisma";
import { ingredientItemService } from "./IngredientItemService";

class SupplyService {
  public async createSupply(requestBody: any, currentUser: UserPayload) {
    const { ingredients, quantities } = requestBody;

    const totalLength = ingredients.length;

    // Create supply
    const supply = await prisma.supply.create({
      data: { staffId: 1, totalPrice: 0 }
    })
    // Create supply items

    let totalPrice = 0;
    for (let i = 0; i < totalLength; i++) {
      const ingredientItemId = ingredients[i];
      const quantity = quantities[i];

      const ingredient = await ingredientItemService.readOne(ingredientItemId);

      await prisma.supplyItem.create({
        data: {
          ingredientItemId: ingredientItemId,
          supplyId: supply.id,
          quantity: quantity,
          price: ingredient.price
        }
      });

      totalPrice += ingredient.price * quantity
    }

    const supplyUpdate = await prisma.supply.update({
      where: { id: supply.id },
      data: { totalPrice }
    })

    return supplyUpdate
  }


  public async getAllSupplies() {
    return await prisma.supply.findMany({ include: { staff: true } });
  }
}

export const supplyService: SupplyService = new SupplyService();