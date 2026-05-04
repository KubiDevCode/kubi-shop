import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDetailResponse, ProductResponse } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findAll(): Promise<ProductResponse[]> {
    const findProducts = await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        img: true,
      },
    })

    return findProducts.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img
        ? `data:image/jpeg;base64,${Buffer.from(item.img).toString('base64')}`
        : null,
    }))
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

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      brandId: product.brandId,
      img: product.img
        ? `data:image/jpeg;base64,${Buffer.from(product.img).toString('base64')}`
        : null,
    }
  }
}
