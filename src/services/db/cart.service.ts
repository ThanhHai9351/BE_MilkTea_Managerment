import { prisma } from "~/prisma";
import { productService } from "./product.service";
import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { ShoppingCart, ShoppingCartItem } from "@prisma/client";

class CartService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { productId, quantity } = requestBody;

    const foundProduct = await productService.readOne(productId);

    const cart = await prisma.shoppingCart.findFirst({ where: { userId: currentUser.id }, include: { items: true } });

    if (!cart) throw new BadRequestException(`The user does not have any cart`);

    // Create cart item
    const itemIndex: number | undefined = cart?.items?.findIndex((item: any) => item.productId === productId);
    let cartItem: ShoppingCartItem;

    if (itemIndex == undefined || itemIndex <= -1) {
      cartItem = await prisma.shoppingCartItem.create({
        data: { productId, quantity, price: foundProduct.price, shoppingCartId: cart.id }
      })
    } else {
      const currentCartItem = await this.getCartItemByProduct(cart.id, productId);

      cartItem = await prisma.shoppingCartItem.update({
        where: { id: currentCartItem?.id },
        data: {
          quantity: {
            increment: quantity
          }
        }
      })
    }


    // Update total price
    await prisma.shoppingCart.update({
      where: { id: cartItem.shoppingCartId },
      data: {
        total_price: await this.calcTotalPrice(currentUser)
      }
    })
  }

  public async removeItem(cartItemId: number) {
    const cartItem: any | null = await this.getCartItem(cartItemId, { shoppingCart: true });

    if (!cartItem) {
      throw new NotFoundException(`Cart item id: ${cartItemId} not found`);
    }

    const cart = await this.getCart(cartItem.shoppingCartId) as ShoppingCart;

    await prisma.shoppingCart.update({
      where: {
        id: cart.id
      },
      data: {
        total_price: cart.total_price - (cartItem.price * cartItem.quantity)
      }
    })

    await prisma.shoppingCartItem.delete({
      where: { id: cartItemId }
    })
  }

  public async clear(cartId: number) {
    const cart = await this.getCart(cartId);

    if (!cart) {
      throw new NotFoundException(`Cart id: ${cartId} not found`);
    }

    await prisma.shoppingCartItem.deleteMany({
      where: {
        shoppingCartId: cartId
      }
    })

    await prisma.shoppingCart.update({
      where: { id: cartId },
      data: { total_price: 0 }
    })
  }

  private async calcTotalPrice(currentUser: UserPayload) {
    const cart = await this.get(currentUser);

    let totalPrice = 0;
    for (const cartItem of cart!.items) {
      totalPrice += (cartItem.price * cartItem.quantity)
    }

    return totalPrice
  }

  public async getMyCart(currentUser: UserPayload) {
    const cart = await prisma.shoppingCart.findFirst({
      where: { userId: currentUser.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return cart
  }

  public async get(currentUser: UserPayload) {
    const cart = await prisma.shoppingCart.findFirst({
      where: { userId: currentUser.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return cart
  }

  private async getCartItemByProduct(cartId: any, productId: number) {
    const cartItem = await prisma.shoppingCartItem.findFirst({
      where: { shoppingCartId: cartId, productId }
    });

    return cartItem;
  }

  private async getCart(cartId: number, include = {}) {
    const cart = await prisma.shoppingCart.findFirst({
      where: { id: cartId },
      include
    });

    return cart;
  }

  private async getCartItem(cartItemId: number, include = {}) {
    const cartItem = await prisma.shoppingCartItem.findFirst({
      where: { id: cartItemId },
      include
    });

    return cartItem;
  }
}

export const cartService: CartService = new CartService();