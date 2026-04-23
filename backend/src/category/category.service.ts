import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CategoryDetailsResponse, CategoryResponse } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const categories: CategoryResponse[] = await this.prismaService.category.findMany(
      {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    )

    return categories
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

    return findCategory
  }

}
