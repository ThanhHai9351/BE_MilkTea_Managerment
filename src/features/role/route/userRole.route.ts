import express from 'express';
import { userRoleController } from '../controller/userRole.controller';

const userRoleRoute = express.Router();

userRoleRoute.post('/', userRoleController.createUserRole);
userRoleRoute.get('/', userRoleController.getAllUserRoles);
userRoleRoute.get('/:userId/:role', userRoleController.getUserRole);
userRoleRoute.delete('/:userId/:role', userRoleController.deleteUserRole);

export default userRoleRoute;