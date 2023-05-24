import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartProducts } from './cart-products.model';
import { Product } from './products.model';
import { User } from './users.model';

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
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
    example: 1000.0,
    description: 'Итоговая стоимость',
  })
  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  total: number;
  @BelongsTo(() => User, 'fk_cartid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_cartid: number;
  @BelongsToMany(() => Product, () => CartProducts)
  products: Product[];
}
