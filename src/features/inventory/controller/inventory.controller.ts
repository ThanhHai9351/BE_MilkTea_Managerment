import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { inventoryService } from "~/services/db/inventory.service";
import { predictTree } from "~/services/db/tree.service";

class InventoryController {
  public async stockIn(req: Request, res: Response) {
    const inventory = await inventoryService.create(parseInt(req.params.supplyId), req.currentUser);

    res.status(HTTP_STATUS.OK).json({
      message: 'Add to inventory successfully',
      data: inventory
    })
  }

  public async getAllTransaction(req: Request, res: Response) {
    const transactions = await inventoryService.getAllTransaction(req.params.type);

    res.status(HTTP_STATUS.OK).json({
      message: 'Get All Transaction successfully',
      data: transactions
    })
  }

  public async getIngredientInventory(req: Request, res: Response) {
    const transactions = await inventoryService.getIngredientInventory(parseInt(req.params.ingredientItemId));

    console.log(predictTree());

    res.status(HTTP_STATUS.OK).json({
      message: 'Get All Transaction successfully',
      data: transactions
    })
  }
}

export const inventoryController: InventoryController = new InventoryController();