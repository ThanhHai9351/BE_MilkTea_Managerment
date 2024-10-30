import { NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class EndpointService {
  public async add(url: string) {
    const endpoint = await prisma.endpoint.create({ data: { url } });
    return endpoint;
  }

  public async getAll() {
    return await prisma.endpoint.findMany();
  }

  public async getOne(id: number) {
    const endpoint = await prisma.endpoint.findFirst({ where: { id } });
    if (!endpoint) throw new NotFoundException('The endpoint not found');
  }

  public async delete(id: number) {
    const endpoint = this.getOne(id);

    await prisma.endpoint.delete({ where: { id } })
  }
}

export const endpointService: EndpointService = new EndpointService();