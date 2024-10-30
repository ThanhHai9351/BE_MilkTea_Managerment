import express from 'express';
import { verifyUser } from '~/globals/middlewares/auth.middleware';
import { endpointController } from '../controller/endpoint.controller';

const endpointRoute = express.Router();

endpointRoute.post('/', endpointController.createEndpoint);
endpointRoute.get('/', endpointController.getAllEndpoints);
endpointRoute.get('/:id', endpointController.getOneEndpoint);
endpointRoute.delete('/:id', endpointController.deleteEndpoint);

export default endpointRoute;