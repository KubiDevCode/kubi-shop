import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async findAll() {
    const products = await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    })

    if (!products) {
      throw new NotFoundException('Продукты не найдены')
    }

    return products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
