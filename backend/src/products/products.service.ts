import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brand, Category, ProductDetailResponse, ProductPageResponse, ProductResponse, Tag } from './dto/product.dto';
import { Prisma } from '@prisma/client';


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

    return findProducts.map(product => this.mapProductsResponse(product))
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

    const total = await this.prismaService.product.count()

    return {
      page: page,
      limit: limit,
      total,
      totalPage: Math.ceil(total / limit),
      products: productsPage.map(product => this.mapProductsResponse(product))
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

  async findPageByCategory(categories: Category[] | [], page: number, limit: number = 12): Promise<ProductPageResponse> {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Страница или лимит должны быть положительные')
    }

    const where = categories.length === 0 ? {} : {
      category: {
        slug: {
          in: categories,
        },
      },
    }

    const [total, productsPage] = await Promise.all([
      this.prismaService.product.count({ where }),
      this.prismaService.product.findMany({
        skip: limit * (page - 1),
        take: limit,
        where,
        select: {
          id: true,
          name: true,
          price: true,
          img: true,
        },
      })
    ])

    return {
      page: page,
      limit: limit,
      total,
      categories: categories,
      totalPage: Math.ceil(total / limit),
      products: productsPage.map(product => this.mapProductsResponse(product))
    }
  }

  async findPageByBrand(brands: Brand[] | [], page: number, limit: number = 12): Promise<ProductPageResponse> {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Страница или лимит должны быть положительные')
    }

    const where = brands.length === 0 ? {} : {
      brand: {
        slug: {
          in: brands,
        },
      },
    }

    const [total, productsPage] = await Promise.all([
      this.prismaService.product.count({ where }),
      this.prismaService.product.findMany({
        skip: limit * (page - 1),
        take: limit,
        where,
        select: {
          id: true,
          name: true,
          price: true,
          img: true,
        },
      })
    ])

    return {
      page: page,
      limit: limit,
      total,
      brands: brands,
      totalPage: Math.ceil(total / limit),
      products: productsPage.map(product => this.mapProductsResponse(product))
    }
  }

  async findPageByFilters(
    brands: Brand[] | [],
    categories: Category[] | [],
    tags: Tag[],
    page: number,
    limit: number = 12) {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Страница или лимит должны быть положительные')
    }

    let where: Prisma.ProductWhereInput = {}

    if (brands.length > 0) {
      where.brand = {
        slug: {
          in: brands,
        },
      };
    }

    if (categories.length > 0) {
      where.category = {
        slug: {
          in: categories,
        },
      };
    }

    if (tags.length > 0) {
      where.tags = {
        some: {
          slug: {
            in: tags,
          },
        },
      };
    }

    const [total, productsPage] = await Promise.all([
      this.prismaService.product.count({ where }),
      this.prismaService.product.findMany({
        skip: limit * (page - 1),
        take: limit,
        where,
        select: {
          id: true,
          name: true,
          price: true,
          img: true,
        },
      })
    ])

    return {
      page: page,
      limit: limit,
      total,
      brands: brands,
      categories: categories,
      tags: tags,
      totalPage: Math.ceil(total / limit),
      products: productsPage.map(product => this.mapProductsResponse(product))
    }
  }

  private mapProductsResponse(product: {
    id: string;
    name: string;
    price: number;
    img: Uint8Array | null;
  }) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img
        ? `data:image/svg+xml;base64,${Buffer.from(product.img).toString('base64')}`
        : null,
    }
  }
}
