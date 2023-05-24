import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DeliveryProducts } from './delivery-products.model';
import { Product } from './products.model';
import { User } from './users.model';

@Table({ tableName: 'deliveries' })
export class Delivery extends Model<Delivery> {
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
  @BelongsTo(() => User, 'fk_deliveryid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_deliveryid: number;
  @BelongsToMany(() => Product, () => DeliveryProducts)
  products: Product[];
}
