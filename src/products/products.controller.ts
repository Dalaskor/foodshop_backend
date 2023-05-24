import { ProductOptionResponse } from '@app/common/response/product.response';
import { CreateProductDto, PageProductsDto, Product } from '@app/models';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Товары')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductsService) {}
  @ApiOperation({ summary: 'Создать товар' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Product })
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @ApiOperation({ summary: 'Получить список товаров' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Get()
  async getPage(@Query() options: PageProductsDto, @Res() res: any) {
    const page = await this.productService.getAll(options);
    await res.header('x-total-count', page.count);
    await res.send(page.products);
  }
  @ApiOperation({ summary: 'Получить товар по ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productService.getOne(id);
  }
  @ApiOperation({ summary: 'Удалить товар по ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.productService.delete(id);
  }
}
