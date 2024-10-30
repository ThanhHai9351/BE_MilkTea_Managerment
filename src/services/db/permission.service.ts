import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class PermissionService {
  public async grant(roleName: string, endpointId: number) {

    const permission = await prisma.grantPermission.findFirst({ where: { roleName, endpointId } });

    if (!permission) throw new NotFoundException('Permission not found');

    if (!permission.isPrivileged) {
      await prisma.grantPermission.update({
        where: { roleName_endpointId: { roleName, endpointId } },
        data: {
          isPrivileged: true
        }
      });
    }

    if (permission.isPrivileged) {
      await prisma.grantPermission.update({
        where: { roleName_endpointId: { roleName, endpointId } },
        data: {
          isPrivileged: false
        }
      });
    }
  }

  public async getAll(role: string) {
    return await prisma.grantPermission.findMany({ where: { roleName: role }, include: { endpoint: true } });
  }
}

export const permissionService: PermissionService = new PermissionService();