import { Delivery, DeliveryProducts, Product } from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from 'src/products/products.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [
    SequelizeModule.forFeature([Delivery, Product, DeliveryProducts]),
    forwardRef(() => AuthModule),
    ProductsModule,
  ],
  exports: [DeliveryService],
})
export class DeliveryModule {}
