import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { orderService } from "~/services/db/order.service";

class OrderController {
  public async createOrder(req: Request, res: Response) {
    await orderService.process(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Process order successfully!'
    })
  }

  public async approveOrder(req: Request, res: Response) {
    await orderService.approve(parseInt(req.params.id), req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Approved order successfully!'
    })
  }

  public async getAllOrder(req: Request, res: Response) {
    const orders = await orderService.getAllOrder();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    })
  }

  public async getOrder(req: Request, res: Response) {
    const order = await orderService.getOrder(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get order',
      data: order
    })
  }

  public async getMyOrder(req: Request, res: Response) {
    const orders = await orderService.getMyOrder(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    })
  }
}

export const orderController: OrderController = new OrderController();