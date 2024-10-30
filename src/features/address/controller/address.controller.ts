import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { addressService } from "~/services/db/address.service";

class AddressController {
  public async addAddress(req: Request, res: Response) {
    const address = await addressService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Created address',
      data: address
    })
  }

  public async myAddress(req: Request, res: Response) {
    const address = await addressService.getMyAddresses(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my addresses',
      data: address
    })
  }

  public async deleteAddress(req: Request, res: Response) {
    await addressService.delete(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete address',
    })
  }
}

export const addressController: AddressController = new AddressController();