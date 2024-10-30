import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { userService } from "~/services/db/user.service";

class UserController {
  public async createUser(req: Request, res: Response) {
    const user = await userService.addUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'User has been created',
      data: user
    })
  }

  public async getAllUser(req: Request, res: Response) {
    const users = await userService.getAll();

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get all users',
      data: users
    })
  }

  public async getUser(req: Request, res: Response) {
    const user = await userService.get(parseInt(req.params.id));

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Get user',
      data: user
    })
  }

  public async updateUser(req: Request, res: Response) {
    const user = await userService.update(parseInt(req.params.id), req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Update user',
      data: user
    })
  }

  public async deleteUser(req: Request, res: Response) {
    await userService.delete(parseInt(req.params.id));

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Delete user',
    })
  }
}

export const userController: UserController = new UserController();