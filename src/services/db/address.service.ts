import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class AddressService {
  public async add(requestBody: any, currentUser: UserPayload) {
    const { street, district, city } = requestBody;

    const address = await prisma.shippingAddress.create({
      data: { street, district, city, userId: currentUser.id }
    })

    return address;
  }

  public async getMyAddresses(currentUser: UserPayload) {
    return await prisma.shippingAddress.findMany({ where: { userId: currentUser.id } });
  }

  public async delete(id: number) {
    const address = await prisma.shippingAddress.findFirst({ where: { id } });
    if (!address) throw new NotFoundException('The address not found');

    await prisma.shippingAddress.delete({ where: { id } });
  }

}

export const addressService: AddressService = new AddressService();

