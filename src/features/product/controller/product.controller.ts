import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { productService } from "~/services/db/product.service";

class ProductController {
  public async addProduct(req: Request, res: Response) {
    const product = await productService.add(req.body, req.file);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create product successfully!',
      data: product
    })
  }

  public async getAllProducts(req: Request, res: Response) {
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
        where[filterBy] = parseInt(filterValue)
      }
      operations.forEach(operation => {
        if (filterCondition === operation) {
          console.log({ filterBy, filterCondition, filterValue });
          where[filterBy] = {};
          where[filterBy][filterCondition] = parseInt(filterValue);
        }
      })
    }

    const products = await productService.read(page, pageSize, sortBy, sortDir, where);
    const productsAll = await productService.read();


    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all products',
      totalCount: productsAll.length,
      data: products
    })
  }

  public async getOneProduct(req: Request, res: Response) {
    const product = await productService.readOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Create product successfully!',
      data: product
    })
  }

  public async updateProduct(req: Request, res: Response) {
    const product = await productService.updateProduct(parseInt(req.params.id), req.body, req.file);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Update product successfully!',
      data: product
    })
  }

  public async deleteProduct(req: Request, res: Response) {
    const product = await productService.delete(parseInt(req.params.id));

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Delete product successfully!',
      data: product
    })
  }
}

export const productController: ProductController = new ProductController();