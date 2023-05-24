import { AddProductToDelivery, Delivery } from '@app/models';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';

@ApiTags('Доставка')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}
  @ApiOperation({ summary: 'Получить доставку пользователя' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Get('/:id')
  @ApiResponse({
    type: Delivery,
    description: 'Доставка пользователя',
  })
  async getById(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.deliveryService.getById(id);
  }
  @ApiOperation({ summary: 'Очистить доставку' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Delete('/:id')
  @ApiResponse({
    type: Delivery,
    description: 'Доставка пользователя',
  })
  async clearCart(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.deliveryService.clearDelivery(id);
  }

  @ApiOperation({ summary: 'Добавить товар в доставку' })
  @ApiBody({
    type: AddProductToDelivery,
  })
  @Post('/products')
  @ApiResponse({
    type: Delivery,
    description: 'Доставка пользователя',
  })
  async addProductToCart(@Body() dto: AddProductToDelivery) {
    return await this.deliveryService.addProductToCart(dto);
  }

  @ApiOperation({ summary: 'Получить все товары из доставки' })
  @ApiParam({
    name: 'id',
    example: 1,
    type: Number,
    description: 'ID пользователя',
  })
  @Get('/products/:id')
  @ApiResponse({
    type: Delivery,
    description: 'Доставка пользователя',
  })
  async getProductsFromCart(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return await this.deliveryService.getProductsFromDelivery(id);
  }
  @ApiOperation({ summary: 'Удалить товар из доставки' })
  @ApiParam({
    name: 'delivery_id',
    example: 1,
    type: Number,
    description: 'ID пользователя (доставки)',
  })
  @ApiParam({
    name: 'product_id',
    example: 1,
    type: Number,
    description: 'ID товара',
  })
  @Delete('/products/:delivery_id/:product_id')
  @ApiResponse({
    type: Delivery,
    description: 'Корзина пользователя',
  })
  async RemoveProductFromCart(
    @Param('delivery_id') delivery_id: number,
    @Param('product_id') product_id: number,
  ) {
    if (!Number(delivery_id) || !Number(product_id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    const dto: AddProductToDelivery = {
      delivery_id,
      product_id,
    };
    return await this.deliveryService.removeProductFromDelivery(dto);
  }
}
