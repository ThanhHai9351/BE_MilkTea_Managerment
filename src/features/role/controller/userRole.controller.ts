import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { userRoleService } from "~/services/db/userRole.service";

class UserRoleController {
  public async createUserRole(req: Request, res: Response) {
    const userRole = await userRoleService.assign(req.body.userId, req.body.role);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Assign user to role successfully',
      data: userRole
    })
  }

  public async getAllUserRoles(req: Request, res: Response) {
    const userRoles = await userRoleService.getAll();

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get all user roles',
      data: userRoles
    })
  }

  public async getUserRole(req: Request, res: Response) {
    const userRole = await userRoleService.getOne(parseInt(req.params.userId), req.params.role);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get all user roles',
      data: userRole
    })
  }

  public async deleteUserRole(req: Request, res: Response) {
    await userRoleService.delete(parseInt(req.params.userId), req.params.role);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Delete user roles successfully',
    })
  }
}

export const userRoleController: UserRoleController = new UserRoleController();