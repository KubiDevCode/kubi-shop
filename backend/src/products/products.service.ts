import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDetailResponse, ProductPageResponse, ProductResponse } from './dto/product.dto';

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

  async findPage(page: number, limit: number = 12): Promise<ProductPageResponse> {

    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Страница или лимит должны быть положительные')
    }

    const productsPage = await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        img: true,
      },
    })

    return {
      page: page,
      limit: limit,
      products: productsPage.map(product => {
        return {
          ...product,
          img: product.img
            ? `data:image/jpeg;base64,${Buffer.from(product.img).toString('base64')}`
            : null,
        }
      })
    }
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
