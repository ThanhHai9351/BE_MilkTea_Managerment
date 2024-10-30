import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class UserService {
  public async addUser(requestBody: any) {
    const {
      name, idCard, phone, password
    } = requestBody;

    const userByIdCard: User | null = await this.getUserByIdCard(idCard);
    if (userByIdCard) {
      throw new NotFoundException('Id must be unique');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: User = await prisma.user.create({
      data: {
        name, idcard: idCard, phone, password: hashedPassword
      }
    });

    // Create cart
    const cart = await prisma.shoppingCart.create({
      data: { userId: newUser.id, total_price: 0 }
    })

    // Add role
    await prisma.userRole.create({
      data: { userId: newUser.id, roleName: 'user' }
    })


    return newUser;
  }

  public async getAll() {
    return await prisma.user.findMany();
  }

  public async get(id: number) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      }
    });

    if (!user) throw new NotFoundException('User does not exist');

    return user;

  }

  public async update(id: number, requestBody: any) {
    const {
      name, phone
    } = requestBody;

    const user = await this.get(id);

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { name, idcard: phone }
    })

    return updatedUser
  }

  public async delete(id: number) {

    await this.get(id);

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { isActive: false }
    })

  }


  private async getUserByIdCard(idCard: string) {
    return await prisma.user.findFirst({
      where: {
        idcard: idCard
      }
    })
  }

  public async isIdCardAlreadyExist(idCard: string) {
    const userByEmail = await prisma.user.findFirst({
      where: {
        idcard: idCard
      }
    })

    return userByEmail != null;
  }

}

export const userService: UserService = new UserService();