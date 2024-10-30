import express from 'express';
import { userController } from '../controller/user.controller';
import { validateSchema, } from '~/globals/middlewares/validate.middleware';
import { userSchemaCreate } from '../schema/user.schema';
import { asyncWrapper } from '~/globals/middlewares/error.middleware';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.post('/', userController.createUser);
userRoute.get('/', userController.getAllUser);
userRoute.get('/:id', userController.getUser);
userRoute.put('/:id', userController.updateUser);
userRoute.delete('/:id', userController.deleteUser);

export default userRoute;