import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import type { Request } from 'express';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req: Request,) {
    return this.basketService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  addProduct(@Req() req: Request, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.addProduct(req.user.id, updateBasketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProductQuantity(@Req() req: Request, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.updateProductQuantity(req.user.id, updateBasketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeProduct(@Req() req: Request, @Body() productId: string) {
    return this.basketService.removeProduct(req.user.id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clear(@Req() req: Request, @Body() productId: string) {
    return this.basketService.clear(req.user.id);
  }
}
