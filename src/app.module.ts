import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from './ability/ability.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './carts/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profiles/profiles.module';
import { RolesModule } from './roles/roles.module';
import { SharesModule } from './shares/shares.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.${process.env.NODE_ENV}.env`,
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProfileModule,
    AbilityModule,
    SharesModule,
    CategoriesModule,
    ProductsModule,
    CartModule,
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
