import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDetailResponse, ProductRespons } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findAll() {
    const findProducts: ProductRespons[] = await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    })

    if (!findProducts) {
      throw new NotFoundException('Продукты не найдены')
    }

    return findProducts
  }

  async findOne(id: string) {
    const findProduct = await this.prismaService.product.findUnique({
      where: { id }
    })

    if (!findProduct) {
      throw new UnauthorizedException('Продукт не найден')
    }

    const product: ProductDetailResponse = {
      id: findProduct.id,
      name: findProduct.name,
      price: findProduct.price,
      image: findProduct.img,
      brandId: findProduct.brandId,
      categoryId: findProduct.categoryId
    }

    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
