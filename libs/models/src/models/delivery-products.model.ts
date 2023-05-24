import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Delivery } from './delivery.model';
import { Product } from './products.model';

@Table({ tableName: 'delivery_products', createdAt: false, updatedAt: false })
export class DeliveryProducts extends Model<DeliveryProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Delivery)
  @Column({ type: DataType.INTEGER })
  deliveryId: number;
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
}
