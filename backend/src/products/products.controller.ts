import { Controller, Get, Param, Query, ParseIntPipe, Post, ParseArrayPipe, BadRequestException, DefaultValuePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Brand, Category, type SortPriceType, Tag } from './dto/product.dto';

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

  @Get('page/filters')
  findPageByFilters(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(
      'brands',
      new DefaultValuePipe([]),
      ParseArrayPipe,
    )
    brands: Brand[],
    @Query(
      'categories',
      new DefaultValuePipe([]),
      ParseArrayPipe,
    )
    categories: Category[],
    @Query(
      'tags',
      new DefaultValuePipe([]),
      ParseArrayPipe,
    )
    tags: Tag[],
    @Query(
      'minprice',
      new DefaultValuePipe(0),
      ParseIntPipe,
    )
    minprice: number,
    @Query(
      'maxprice',
      new DefaultValuePipe(99999999),
      ParseIntPipe,
    )
    maxprice: number,
    @Query(
      'sort',
      new DefaultValuePipe(undefined),
    )
    sort: SortPriceType,
  ) {
    return this.productsService.findPageByFilters(brands, categories, tags, page, minprice, maxprice, sort, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

}
