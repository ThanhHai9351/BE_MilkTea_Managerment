import { User } from "@prisma/client";
import { prisma } from "~/prisma";
import jwt from 'jsonwebtoken';
import { BadRequestException, ForbiddenException, NotFoundException } from "~/globals/middlewares/error.middleware";
import bcrypt from 'bcrypt';
import { roleService } from "./role.service";
import { userRoleService } from "./userRole.service";

class AuthService {
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

    // Create JWT
    const payload = {
      id: newUser.id, name, idCard, phone
    }

    const accessToken: string = this.generateJWT(payload);

    // Create cart
    const cart = await prisma.shoppingCart.create({
      data: { userId: newUser.id, total_price: 0 }
    })

    // Add role
    userRoleService.assign(newUser.id, 'user')

    return accessToken;
  }

  public async login(requestBody: any) {
    // 1) Get user by email
    const user: User | null = await this.getUserByIdCard(requestBody.idCard);



    // 2) Check email exist
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is no longer exist');
    }

    // if (!user.isActive) {
    //   throw new ForbiddenException('This account was banned');
    // }

    // 3) Check password
    const isMatchPassword: boolean = await bcrypt.compare(requestBody.password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    // 4) Generate JWT -> Access Token

    const payload = {
      id: user.id, name: user.name, idCard: user.idcard, phone: user.phone
    }
    const accessToken: string = await this.generateJWT(payload);

    return accessToken;
  }

  public async getCurrentUser(currentUser: UserPayload) {
    return await prisma.user.findFirst({
      where: { id: currentUser.id },
      include: {
        userRoles: true
      }
    })
  }

  private async getUserByIdCard(idCard: string) {
    return await prisma.user.findFirst({
      where: {
        idcard: idCard
      }
    })
  }

  private generateJWT(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
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

export const authService: AuthService = new AuthService();