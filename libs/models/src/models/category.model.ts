import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductCategories } from './product-categories.model';
import { Product } from './products.model';

interface CategoryCreationAttrs {
  name: string;
}
@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
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
  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
  @BelongsToMany(() => Product, () => ProductCategories)
  products: Product[];
}
