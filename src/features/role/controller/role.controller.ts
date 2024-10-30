import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { roleService } from "~/services/db/role.service";

class RoleController {
  public async createRole(req: Request, res: Response) {
    const role = await roleService.create(req.body.role);
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create role successfully',
      data: role
    });
  }

  public async getAllRoles(req: Request, res: Response) {
    const role = await roleService.getAll();
    return res.status(HTTP_STATUS.OK).json({
      message: 'Get roles successfully',
      data: role
    });
  }

  public async getRole(req: Request, res: Response) {
    const role = await roleService.getOne(req.params.role);
    return res.status(HTTP_STATUS.OK).json({
      message: 'Get role successfully',
      data: role
    });
  }

  public async deleteRole(req: Request, res: Response) {
    await roleService.delete(req.params.role);
    return res.status(HTTP_STATUS.OK).json({
      message: 'delete role successfully',
    });
  }
}

export const roleController: RoleController = new RoleController();