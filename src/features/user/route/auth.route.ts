import express from 'express';
import { userController } from '../controller/user.controller';
import { validateSchema, } from '~/globals/middlewares/validate.middleware';
import { userSchemaCreate } from '../schema/user.schema';
import { authController } from '../controller/auth.controller';
import { verifyUser } from '~/globals/middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.get('/me', verifyUser, authController.getCurrentUser);


export default authRoute;