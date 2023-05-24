import { Share } from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';

@Module({
  providers: [SharesService],
  controllers: [SharesController],
  imports: [SequelizeModule.forFeature([Share]), forwardRef(() => AuthModule)],
  exports: [SharesService],
})
export class SharesModule {}
