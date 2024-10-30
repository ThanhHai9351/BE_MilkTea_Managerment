import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { cartService } from "~/services/db/cart.service";

class CartController {
  public async addToCart(req: Request, res: Response) {
    await cartService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add to cart successfully!'
    })
  }

  public async removeFromCart(req: Request, res: Response) {
    await cartService.removeItem(parseInt(req.params.id));

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Remove cart item successfully!'
    })
  }

  public async getMyCart(req: Request, res: Response) {
    const carts = await cartService.getMyCart(req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get my cart successfully!',
      data: carts
    })
  }
}

export const cartController: CartController = new CartController();