import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class RoleService {
  public async create(role: string) {
    const roleEntity = await prisma.role.create({ data: { name: role } });

    const endpoints = await prisma.endpoint.findMany();

    for (const endpoint of endpoints) {
      await prisma.grantPermission.create({
        data: { roleName: roleEntity.name, endpointId: endpoint.id, isPrivileged: false }
      })
    }
  }

  public async getAll() {
    return await prisma.role.findMany();
  }

  public async getOne(role: string) {
    const roleEntity = await prisma.role.findFirst({ where: { name: role } });
    if (!roleEntity) throw new NotFoundException('Role not found');

    return roleEntity
  }

  public async delete(role: string) {
    const roleEntity = await this.getOne(role);

    await prisma.role.delete({ where: { name: role } })
  }
}

export const roleService: RoleService = new RoleService();