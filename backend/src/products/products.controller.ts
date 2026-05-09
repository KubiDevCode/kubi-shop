import { Controller, Get, Param, Query, ParseIntPipe, Post, ParseArrayPipe, BadRequestException, DefaultValuePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Brand, CATEGORIES, Category } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('page')
  findPage(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return this.productsService.findPage(page, limit)
  }

  @Get('page/category')
  findPageByCategory(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(
      'categories',
      new DefaultValuePipe([]),
      ParseArrayPipe,
    )
    categories: Category[],
  ) {
    return this.productsService.findPageByCategory(categories, page, limit);
  }

  @Get('page/brand')
  findPageByBrand(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(
      'brands',
      new DefaultValuePipe([]),
      ParseArrayPipe,
    )
    brands: Brand[],
  ) {
    return this.productsService.findPageByBrand(brands, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

}
