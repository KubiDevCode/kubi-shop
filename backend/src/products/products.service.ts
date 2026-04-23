import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDetailResponse, ProductResponse } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findAll() {
    const findProducts: ProductResponse[] = await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        img: true,
      },
    })

    return findProducts
  }

  async findOne(id: string): Promise<ProductDetailResponse> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        img: true,
        brandId: true,
        categoryId: true,
      },
    })

    if (!product) {
      throw new NotFoundException('Продукт не найден')
    }

    return product
  }
}
