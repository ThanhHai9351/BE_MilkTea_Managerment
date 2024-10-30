import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { permissionService } from "~/services/db/permission.service";

class PermissionController {
  public async assignPermission(req: Request, res: Response) {
    const permission = await permissionService.grant(req.body.role, req.body.endpointId);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Assign permission successfully',
      data: permission
    })
  }

  public async getAllPermissions(req: Request, res: Response) {
    const permissions = await permissionService.getAll(req.params.role);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all permissions successfully',
      data: permissions
    })
  }
}

export const permissionController: PermissionController = new PermissionController();