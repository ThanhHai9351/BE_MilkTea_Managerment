import express from 'express';
import { roleController } from '../controller/role.controller';

const roleRoute = express.Router();

roleRoute.post('/', roleController.createRole);
roleRoute.get('/', roleController.getAllRoles);
roleRoute.get('/:role', roleController.getRole);
roleRoute.delete('/:role', roleController.deleteRole);

export default roleRoute;