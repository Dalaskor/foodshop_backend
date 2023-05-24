import { Profile, User } from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AbilityModule } from 'src/ability/ability.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    forwardRef(() => AuthModule),
    AbilityModule,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
