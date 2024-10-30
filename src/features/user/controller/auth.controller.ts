import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { authService } from "~/services/db/auth.service";

class AuthController {
  public async register(req: Request, res: Response) {
    const accessToken = await authService.addUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Register successfully',
      accessToken
    })
  }

  public async login(req: Request, res: Response) {
    const accessToken = await authService.login(req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Login successfully',
      accessToken
    })
  }

  public async getCurrentUser(req: Request, res: Response) {
    const user = await authService.getCurrentUser(req.currentUser);

    console.log(user);

    return res.status(HTTP_STATUS.OK).json({
      message: 'User information',
      data: user
    })
  }
}

export const authController: AuthController = new AuthController();