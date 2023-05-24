import {
  Cart,
  CartProducts,
  Category,
  Delivery,
  DeliveryProducts,
  Product,
  ProductCategories,
} from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      ProductCategories,
      Cart,
      CartProducts,
      Delivery,
      DeliveryProducts,
    ]),
    CategoriesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
