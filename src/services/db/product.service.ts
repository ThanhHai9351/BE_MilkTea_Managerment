import { Product } from "@prisma/client";
import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { uploadMainImage } from "~/globals/utils/upload.utils";
import { prisma } from "~/prisma";

class ProductService {
  public async add(requestBody: any, file: Express.Multer.File | undefined) {
    const { name, price } = requestBody;

    if (!file) {
      throw new BadRequestException('Please add an image')
    }

    const imageUrl = await uploadMainImage(file.path);

    const product = await prisma.product.create({
      data: { name, price: Number.parseFloat(price), mainImage: imageUrl }
    })

    return product;
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

    const products: Product[] = await prisma.product.findMany({
      where: { ...where, isDeleted: false },
      skip,
      take,
      orderBy: {
        [sortBy]: sortDir
      }
    });



    return products;
  }

  public async readOne(id: number) {
    const product = await prisma.product.findFirst({
      where: { id, isDeleted: false },
      include: {
        Recipe: {
          include: {
            product: true,
            ingredientItem: true
          }
        }
      }
    })

    if (!product) throw new NotFoundException('Product not found with ID: ' + id);

    return product;
  }

  public async updateProduct(id: number, requestBody: any, file: Express.Multer.File | undefined) {
    const { name, price } = requestBody;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) throw new NotFoundException(`Product not found with ID: ${id}`);

    let imageUrl = existingProduct.mainImage;

    if (file) {
      imageUrl = await uploadMainImage(file.path);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number.parseFloat(price),
        mainImage: imageUrl
      }
    });

    return updatedProduct;
  }

  public async delete(id: number) {
    const product = await prisma.product.update({ where: { id }, data: { isDeleted: true } });

    return product;

  }
}


export const productService: ProductService = new ProductService();