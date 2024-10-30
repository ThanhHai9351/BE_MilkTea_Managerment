import { prisma } from "~/prisma";
import { cartService } from "./cart.service";
import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { OrderItem, ShoppingCartItem } from "@prisma/client";

class OrderService {
  public async process(requestBody: any, currentUser: UserPayload) {
    const { shippingAddressId } = requestBody;

    const cart: any | null = await cartService.getMyCart(currentUser);


    for (const cartItem of cart.items) {
      const product = await prisma.product.findFirst({
        where: { id: cartItem.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product not found`);
      }

      // if (product?.quantity <= 0) {
      //   throw new BadRequestException(`Product ${product.name} has out of stock`);
      // }

      // if (cartItem.quantity > product.quantity) {
      //   throw new BadRequestException(`Product ${product.name} does not enough`);

      // }
    }

    const address = await prisma.shippingAddress.findFirst({ where: { id: shippingAddressId } });
    if (!address) throw new BadRequestException('Address not found');

    const newOrder = await prisma.order.create({
      data: {
        shippingAddress: JSON.stringify(address),
        totalPrice: 0,
        orderStatus: 'pending',
        userId: currentUser.id,
        orderType: 'online'
      }
    });

    const orderItems = [];
    let totalQuantity: number = 0;

    for (const cartItem of cart.items) {
      orderItems.push({
        orderId: newOrder.id,
        productId: cartItem.productId,
        price: cartItem.price,
        quantity: cartItem.quantity,
      });

      const product = await prisma.product.findFirst({
        where: {
          id: cartItem.productId
        },
        include: {
          Recipe: true
        }
      })

      // @ts-ignore
      for (const recipe of product.Recipe) {
        console.log(recipe) // ingredientItemId
        const { ingredientItemId, quantity } = recipe
        const ingredient = await prisma.ingredientItem.findFirst({ where: { id: ingredientItemId } });
        const inventoryId = ingredient?.isDry ? 1 : 2;

        const ingredientInventory = await prisma.ingredientInventory.findFirst({
          where: { ingredientItemId, inventoryId: inventoryId }
        })

        const quantityResult = ingredientInventory?.quantity! - quantity;

        console.log('check quantity result: ', { quantityResult })

        if (quantityResult < 0) {
          throw new BadRequestException('Not enough ingredient in inventory');
        }

        const ingredientInventoryUpdate = await prisma.ingredientInventory.update({
          where: { id: ingredientInventory?.id! },
          data: {
            quantity: quantityResult
          }
        })

        console.log('check ', { ingredientInventoryUpdate })

        // Update quantity to product
        // await prisma.product.update({
        //   where: {id: productId},

        // })

        await prisma.inventoryTransaction.create({
          data: { inventoryId: inventoryId, staffId: currentUser.id, ingredientItemId, stockType: 'STOCK_OUT', quantity: quantity }
        })

      }

      totalQuantity += cartItem.quantity
    }
    await prisma.orderItem.createMany({
      data: orderItems
    })


    // update total price of order
    await prisma.order.update({
      where: { id: newOrder.id },
      data: {
        totalPrice: cart.total_price
      }
    })

    // Clear carts
    cartService.clear(cart.id);
  }

  public async approve(id: number, currentUser: UserPayload) {
    const order = await prisma.order.findFirst({ where: { id } });
    if (!order) throw new NotFoundException('Not found order');

    await prisma.order.update({
      where: { id },
      data: { staffId: currentUser.id, orderStatus: 'approved' }
    })
  }

  public async getAllOrder() {
    return await prisma.order.findMany();
  }

  public async getOrder(id: number) {
    return await prisma.order.findFirst({ where: { id }, include: { OrderItems: { include: { product: true } } } })
  }

  public async getMyOrder(currentUser: UserPayload) {
    return await prisma.order.findMany({ where: { userId: currentUser.id } })
  }
}

export const orderService: OrderService = new OrderService();