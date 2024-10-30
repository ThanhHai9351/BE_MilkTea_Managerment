import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { ingredientItemService } from "~/services/db/IngredientItemService";

class IngredientItemController {
  public async addIngredientItem(req: Request, res: Response) {
    const ingredientItem = await ingredientItemService.add(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create ingredient item successfully!',
      data: ingredientItem
    });
  }

  public async getAllIngredientItems(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const sortBy = req.query.sortBy as string || 'name';
    const sortDir = req.query.sortDir as string || 'asc';

    const where: any = {};
    const filterBy: string = req.query.filterBy as string;
    const filterValueParams: string = req.query.filterValue as string;

    if (filterValueParams) {
      const [filterCondition, filterValue] = filterValueParams.split('.');

      const operations = ['lt', 'lte', 'gt', 'gte'];
      if (filterCondition === 'eq') {
        where[filterBy] = parseFloat(filterValue);
      }
      operations.forEach(operation => {
        if (filterCondition === operation) {
          where[filterBy] = {};
          where[filterBy][filterCondition] = parseFloat(filterValue);
        }
      });
    }

    const ingredientItems = await ingredientItemService.read(page, pageSize, sortBy, sortDir, where);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all ingredient items',
      totalCount: ingredientItems.length,
      data: ingredientItems
    });
  }

  public async getOneIngredientItem(req: Request, res: Response) {
    const ingredientItem = await ingredientItemService.readOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get ingredient item successfully!',
      data: ingredientItem
    });
  }

  public async updateIngredientItem(req: Request, res: Response) {
    const ingredientItem = await ingredientItemService.updateIngredientItem(parseInt(req.params.id), req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update ingredient item successfully!',
      data: ingredientItem
    });
  }

  public async deleteIngredientItem(req: Request, res: Response) {
    const ingredientItem = await ingredientItemService.delete(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete ingredient item successfully!',
      data: ingredientItem
    });
  }
}

export const ingredientItemController: IngredientItemController = new IngredientItemController();
