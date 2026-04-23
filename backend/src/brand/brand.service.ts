import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BrandDetailsResponse, BrandResponse } from './dto/brand.dto';


@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll() {
    const brand: BrandResponse[] = await this.prismaService.category.findMany(
      {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    )

    return brand
  }

  async findOne(slug: string): Promise<BrandDetailsResponse> {
    const brandCategory = await this.prismaService.category.findUnique({
      where: {
        slug
      },
      select: {
        id: true,
        name: true,
        slug: true,
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    if (!brandCategory) {
      throw new NotFoundException('Категория не найдена')
    }

    return brandCategory
  }
}
