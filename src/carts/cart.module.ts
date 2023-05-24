import { Cart, CartProducts, Product, User } from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { CartsControllers } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartsControllers],
  providers: [CartService],
  imports: [
    SequelizeModule.forFeature([Cart, User, Product, CartProducts]),
    forwardRef(() => AuthModule),
    ProductsModule,
  ],
  exports: [CartService],
})
export class CartModule {}
