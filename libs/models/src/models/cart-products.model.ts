import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Product } from './products.model';

@Table({ tableName: 'cart_products', createdAt: false, updatedAt: false })
export class CartProducts extends Model<CartProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cartId: number;
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @ApiProperty({
    example: 1,
    description: 'Количество товара',
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  count: number;
}
