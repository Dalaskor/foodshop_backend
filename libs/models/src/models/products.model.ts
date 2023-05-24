import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartProducts } from './cart-products.model';
import { Cart } from './cart.model';
import { Category } from './category.model';
import { DeliveryProducts } from './delivery-products.model';
import { Delivery } from './delivery.model';
import { ProductCategories } from './product-categories.model';

interface ProductCreationAttrs {
  name: string;
  description: string;
  price: number;
}
@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Каша',
    description: 'Название товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    example: 'Гречневая',
    description: 'Описание продукта',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
  @ApiProperty({
    example: 1000,
    description: 'Стоимость товара',
  })
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  price: number;
  @ApiProperty({
    example: 'www.google.com',
    description: 'URL адрес до изображения',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img_url: string;
  @BelongsToMany(() => Category, () => ProductCategories)
  categories: Category[];
  @BelongsToMany(() => Cart, () => CartProducts)
  carts: Cart[];
  @BelongsToMany(() => Delivery, () => DeliveryProducts)
  deliveries: Delivery[];
}
