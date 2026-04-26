import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBasketDto } from './dto/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(userId: string) {
    const basket = await this.prismaService.basket.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        productBaskets: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                img: true,
                brand: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    return basket;
  }

  async addProduct(userId: string, dto: UpdateBasketDto) {
    const basket = await this.getBasketByUserId(userId);

    const product = await this.prismaService.product.findUnique({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    return this.prismaService.productBasket.upsert({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId: dto.productId,
        },
      },
      update: {
        quantity: {
          increment: dto.quantity ?? 1,
        },
      },
      create: {
        basketId: basket.id,
        productId: dto.productId,
        quantity: dto.quantity ?? 1,
      },
    });
  }

  async updateProductQuantity(userId: string, dto: UpdateBasketDto) {
    if (!dto.quantity || dto.quantity < 1) {
      throw new BadRequestException('Количество товара должно быть больше 0');
    }

    const basket = await this.getBasketByUserId(userId);

    const productBasket = await this.prismaService.productBasket.findUnique({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId: dto.productId,
        },
      },
    });

    if (!productBasket) {
      throw new NotFoundException('Товар в корзине не найден');
    }

    return this.prismaService.productBasket.update({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId: dto.productId,
        },
      },
      data: {
        quantity: dto.quantity,
      },
    });
  }

  async removeProduct(userId: string, productId: string) {
    const basket = await this.getBasketByUserId(userId);

    const productBasket = await this.prismaService.productBasket.findUnique({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId,
        },
      },
    });

    if (!productBasket) {
      throw new NotFoundException('Товар в корзине не найден');
    }

    return this.prismaService.productBasket.delete({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId,
        },
      },
    });
  }

  async clear(userId: string) {
    const basket = await this.getBasketByUserId(userId);

    return this.prismaService.productBasket.deleteMany({
      where: {
        basketId: basket.id,
      },
    });
  }

  private async getBasketByUserId(userId: string) {
    const basket = await this.prismaService.basket.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    return basket;
  }
}