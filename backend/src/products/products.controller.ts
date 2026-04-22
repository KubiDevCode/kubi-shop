import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('product:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
