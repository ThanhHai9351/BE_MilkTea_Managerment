import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { endpointService } from "~/services/db/endpoint.service";

class EndpointController {
  public async createEndpoint(req: Request, res: Response) {
    const endpoint = await endpointService.add(req.body.url);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create endpoint successfully',
      data: endpoint
    });
  }

  public async getAllEndpoints(req: Request, res: Response) {
    const endpoints = await endpointService.getAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all endpoints successfully',
      data: endpoints
    });
  }

  public async getOneEndpoint(req: Request, res: Response) {
    const endpoint = await endpointService.getOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get endpoint successfully',
      data: endpoint
    });
  }

  public async deleteEndpoint(req: Request, res: Response) {
    await endpointService.delete(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete endpoint successfully',

    });
  }
}

export const endpointController: EndpointController = new EndpointController();