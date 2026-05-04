import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketResponseDto, BasketItemResponseDto } from './dto/basket-respons.dto';

const productSelect = {
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
      img: true,
    },
  },
}

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) { }

  async findOne(userId: string): Promise<BasketResponseDto> {
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
              select: productSelect
            },
          },
        },
      },
    });

    if (!basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    return {
      id: basket.id,
      productBaskets: basket.productBaskets.map((item) =>
        this.mapBasketItem(item),
      ),
    };
  }

  async addProduct(
    userId: string,
    dto: UpdateBasketDto,
  ): Promise<BasketItemResponseDto> {
    const basket = await this.getOrCreateBasket(userId);

    const product = await this.prismaService.product.findUnique({
      where: {
        id: dto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    const item = await this.prismaService.productBasket.upsert({
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
      select: {
        id: true,
        quantity: true,
        product: {
          select: productSelect,
        },
      },
    });

    return this.mapBasketItem(item);
  }

  async updateProductQuantity(
    userId: string,
    dto: UpdateBasketDto,
  ): Promise<BasketItemResponseDto> {
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

    const item = await this.prismaService.productBasket.update({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId: dto.productId,
        },
      },
      data: {
        quantity: dto.quantity,
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: productSelect,
        },
      },
    });

    return this.mapBasketItem(item);
  }

  async removeProduct(
    userId: string,
    productId: string,
  ): Promise<BasketItemResponseDto> {
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

    const item = await this.prismaService.productBasket.delete({
      where: {
        basketId_productId: {
          basketId: basket.id,
          productId,
        },
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: productSelect,
        },
      },
    });

    return this.mapBasketItem(item);
  }

  async clear(userId: string): Promise<{ count: number }> {
    const basket = await this.getBasketByUserId(userId);

    return this.prismaService.productBasket.deleteMany({
      where: {
        basketId: basket.id,
      },
    });
  }

  private async getBasketByUserId(userId: string): Promise<{ id: string }> {
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

  private async getOrCreateBasket(userId: string): Promise<{ id: string }> {
    return this.prismaService.basket.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
      select: {
        id: true,
      },
    });
  }

  private bytesToBase64Image(img?: Uint8Array | null): string | null {
    return img
      ? `data:image/jpeg;base64,${Buffer.from(img).toString('base64')}`
      : null;
  }

  private mapBasketItem(item: any): BasketItemResponseDto {
    return {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        img: this.bytesToBase64Image(item.product.img),
        brand: item.product.brand,
        category: {
          id: item.product.category.id,
          name: item.product.category.name,
          slug: item.product.category.slug,
          img: this.bytesToBase64Image(item.product.category.img),
        },
      },
    };
  }
}