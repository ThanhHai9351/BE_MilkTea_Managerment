import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class SummaryService {
  public async create(requestBody: any, currentUser: UserPayload) {
    const { ingredientItemId, quantity } = requestBody;

    const summary = await prisma.ingredientSummary.create({
      data: { ingredientItemId, quantity }
    });


    return summary;
  }

  public async getAll() {

    const results = await prisma.ingredientSummary.findMany({ include: { ingredientItem: true } });


    return results;
  }

}

export const summaryService: SummaryService = new SummaryService();