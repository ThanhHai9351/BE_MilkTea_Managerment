import { IngredientItem } from "@prisma/client";
import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class IngredientItemService {
  public async add(requestBody: any) {
    const { name, price, unit, isDry } = requestBody;

    if (!name || !price) {
      throw new BadRequestException('Name and price are required');
    }

    const ingredientItem = await prisma.ingredientItem.create({
      data: { name, price: parseFloat(price), unit, isDry: Boolean(isDry) }
    });

    return ingredientItem;
  }

  public async read(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'name',
    sortDir: string = 'asc',
    where = {},
  ) {
    const skip: number = (page - 1) * pageSize;
    const take: number = pageSize;

    const ingredientItems: IngredientItem[] = await prisma.ingredientItem.findMany({
      where: { ...where, isDeleted: false },
      skip,
      take,
      orderBy: {
        [sortBy]: sortDir
      }
    });

    return ingredientItems;
  }

  public async readOne(id: number) {
    const ingredientItem = await prisma.ingredientItem.findFirst({
      where: { id, isDeleted: false }
    });

    if (!ingredientItem) throw new NotFoundException('Ingredient item not found with ID: ' + id);

    return ingredientItem;
  }

  public async updateIngredientItem(id: number, requestBody: any) {
    const { name, price } = requestBody;

    const ingredientItem = await prisma.ingredientItem.update({
      where: { id },
      data: { name, price: parseFloat(price) }
    });

    if (!ingredientItem) throw new NotFoundException(`Ingredient item not found with ID: ${id}`);

    return ingredientItem;
  }

  public async delete(id: number) {
    const ingredientItem = await prisma.ingredientItem.update({ where: { id }, data: { isDeleted: true } });

    return ingredientItem;
  }
}

export const ingredientItemService: IngredientItemService = new IngredientItemService();
