import { SupplyItem } from "@prisma/client";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class InventoryService {
  public async create(supplyId: number, currentUser: UserPayload) {
    const supply = await prisma.supply.findFirst({
      where: { id: supplyId },
      include: {
        SupplyItem: true
      }
    });

    if (supply?.isDeliveredToInventory) {
      throw new BadRequestException('This supply already delivered to inventory');
    }


    // @ts-ignore
    for (const supplyItem of supply.SupplyItem) {
      const { ingredientItemId, quantity } = supplyItem as SupplyItem;
      const ingredient = await prisma.ingredientItem.findFirst({ where: { id: ingredientItemId } });
      if (ingredient?.isDry) {
        const inventoryDry = await prisma.inventory.findFirst({ where: { id: 1 } });
        const ingredientInventory = await prisma.ingredientInventory.create({
          data: { ingredientItemId, inventoryId: inventoryDry?.id!, quantity }
        })

        const inventoryTransaction = await prisma.inventoryTransaction.create({
          data: { inventoryId: inventoryDry?.id!, staffId: currentUser.id, ingredientItemId, stockType: 'STOCK_IN', quantity: ingredientInventory.quantity }
        })
      }

      else if (!ingredient?.isDry) {
        const inventoryDry = await prisma.inventory.findFirst({ where: { id: 2 } });
        const ingredientInventory = await prisma.ingredientInventory.create({
          data: { ingredientItemId, inventoryId: inventoryDry?.id!, quantity }
        })
        const inventoryTransaction = await prisma.inventoryTransaction.create({
          data: { inventoryId: inventoryDry?.id!, staffId: currentUser.id, stockType: 'STOCK_IN', quantity: ingredientInventory.quantity }
        })
      }
    }

    await prisma.supply.update({
      where: { id: supplyId },
      data: { isDeliveredToInventory: true }
    })
  }

  public async getAllTransaction(type: string) {
    return await prisma.inventoryTransaction.findMany({ where: { stockType: type } });
  }

  public async getIngredientInventory(ingredientItemId: number) {
    return await prisma.ingredientInventory.findFirst({ where: { ingredientItemId } });
  }
}

export const inventoryService: InventoryService = new InventoryService();