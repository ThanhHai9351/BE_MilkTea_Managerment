import express from 'express';
import { permissionController } from '../controller/permission.controller';

const permissionRoute = express.Router();

permissionRoute.post('/', permissionController.assignPermission);
permissionRoute.get('/:role', permissionController.getAllPermissions);

export default permissionRoute;