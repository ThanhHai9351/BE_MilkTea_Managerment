import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class UserRoleService {
  public async assign(userId: number, role: string) {
    const userRole = await prisma.userRole.create({
      data: {
        userId,
        roleName: role
      }
    });


  }

  public async getAll() {
    return await prisma.userRole.findMany({ include: { user: true } });
  }

  public async getOne(userId: number, role: string) {
    const userRole = await prisma.userRole.findFirst({
      where: {
        userId,
        roleName: role
      }
    });

    if (!userRole) throw new NotFoundException('No user role');

    return userRole;
  }

  public async delete(userId: number, role: string) {
    await this.getOne(userId, role);

    await prisma.userRole.delete({
      where: { userId_roleName: { roleName: role, userId } }
    })
  }
}

export const userRoleService: UserRoleService = new UserRoleService();