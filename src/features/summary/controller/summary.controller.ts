import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { recipeService } from "~/services/db/recipe.service";
import { summaryService } from "~/services/db/summary.service";

class SummaryController {
  public async createSummary(req: Request, res: Response) {
    const summary = await summaryService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create summary successfully',
      data: summary
    })
  }

  public async getAll(req: Request, res: Response) {
    const summary = await summaryService.getAll();

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get all summary successfully',
      data: summary
    })
  }

}

export const summaryController: SummaryController = new SummaryController();
