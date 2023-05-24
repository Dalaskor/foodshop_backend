import { AddProductToCart, Cart, RemoveProductFromCart } from '@app/models';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('Корзина')
@Controller('cart')
export class CartsControllers {
  constructor(private cartService: CartService) {}
  @ApiOperation({ summary: 'Получить корзину пользователя' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Get('/:id')
  @ApiResponse({
    type: Cart,
    description: 'Корзина пользователя',
  })
  async getById(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.cartService.getById(id);
  }
  @ApiOperation({ summary: 'Очистить корзину' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Delete('/:id')
  @ApiResponse({
    type: Cart,
    description: 'Корзина пользователя',
  })
  async clearCart(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.cartService.clearCart(id);
  }

  @ApiOperation({ summary: 'Добавить товар в корзины' })
  @ApiBody({
      type: AddProductToCart,
  })
  @Post('/products')
  @ApiResponse({
    type: Cart,
    description: 'Корзина пользователя',
  })
  async addProductToCart(@Body() dto: AddProductToCart) {
    return await this.cartService.addProductToCart(dto);
  }

  @ApiOperation({ summary: 'Получить все товары из корзины' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Get('/products/:id')
  @ApiResponse({
    type: Cart,
    description: 'Корзина пользователя',
  })
  async getProductsFromCart(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.cartService.getProductsFromCart(id);
  }
  @ApiOperation({ summary: 'Удалить товар из корзины' })
  @ApiParam({
    name: 'cart_id',
    example: 1,
    type: Number,
    description: 'ID пользователя (корзины)',
  })
  @ApiParam({
    name: 'product_id',
    example: 1,
    type: Number,
    description: 'ID товара',
  })
  @Delete('/products/:cart_id/:product_id')
  @ApiResponse({
    type: Cart,
    description: 'Корзина пользователя',
  })
  async RemoveProductFromCart(
    @Param('cart_id') cart_id: number,
    @Param('product_id') product_id: number,
  ) {
    const dto: RemoveProductFromCart = {
      cart_id,
      product_id,
    };
    return await this.cartService.removeProductFromCart(dto);
  }
}
