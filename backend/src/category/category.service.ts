import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CategoryDetailsResponse, CategoryResponse } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(): Promise<CategoryResponse[]> {
    const categories = await this.prismaService.category.findMany(
      {
        select: {
          id: true,
          name: true,
          img: true,
          slug: true
        }
      }
    )

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      img: category.img
        ? `data:image/jpeg;base64,${Buffer.from(category.img).toString('base64')}`
        : null,
    }));
  }

  async findOne(slug: string): Promise<CategoryDetailsResponse> {
    const findCategory = await this.prismaService.category.findUnique({
      where: {
        slug
      },
      select: {
        id: true,
        name: true,
        slug: true,
        img: true,
        brands: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    if (!findCategory) {
      throw new NotFoundException('Категория не найдена')
    }

    return {
      id: findCategory.id,
      name: findCategory.name,
      slug: findCategory.slug,
      img: findCategory.img
        ? `data:image/jpeg;base64,${Buffer.from(findCategory.img).toString('base64')}`
        : null,
      brands: findCategory.brands,
    };
  }

}
