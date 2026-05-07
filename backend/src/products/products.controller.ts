import { Controller, Get, Param, Query, ParseIntPipe, Post, ParseArrayPipe, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CATEGORIES, Category } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // @Get('page')
  // findPage(
  //   @Query('page', ParseIntPipe) page: number,
  //   @Query('limit', ParseIntPipe) limit: number
  // ) {
  //   return this.productsService.findPage(page, limit)
  // }

  @Get('page')
  findPageByCategory(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('categories', ParseArrayPipe) categories: Category[] | []) {
      
    // const invalidCategory = categories.filter(category => !CATEGORIES.includes(category))

    // if (invalidCategory.length > 0) {
    //   throw new BadRequestException(`Несуществующие категории: ${invalidCategory.join(', ')}`)
    // }

    return this.productsService.findPageByCategory(categories, page, limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

}
