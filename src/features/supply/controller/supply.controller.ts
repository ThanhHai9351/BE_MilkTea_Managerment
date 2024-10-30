import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { supplyService } from "~/services/db/supply.service";

class SupplyController {
  public async createSupply(req: Request, res: Response) {
    const supply = await supplyService.createSupply(req.body, req.currentUser);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Create supply successfully!',
      data: supply
    })
  }

  public async getAllSupplies(req: Request, res: Response) {
    const supply = await supplyService.getAllSupplies();
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Get all supply successfully!',
      data: supply
    })
  }
}

export const supplyController: SupplyController = new SupplyController();