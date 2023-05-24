import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { Product } from './products.model';

@Table({ tableName: 'product_categories', createdAt: false, updatedAt: false })
export class ProductCategories extends Model<ProductCategories> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;
}
