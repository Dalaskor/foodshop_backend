import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from 'src/carts/cart.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { ProfileModule } from 'src/profiles/profiles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => CartModule),
    forwardRef(() => DeliveryModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
