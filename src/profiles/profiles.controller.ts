import { Profile } from '@app/models';
import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AbilityFactory,
  Action,
} from 'src/ability/ability.factory/ability.factory';
import { ProfileService } from './profiles.service';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private abilityFactory: AbilityFactory,
  ) {}
  @ApiOperation({ summary: 'Получить профиль по ID пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: Profile })
  @Get('/:id')
  getById(@Req() req: Request, @Param('id') id: number) {
    const user = this.profileService.getUserFromReq(req);
    const ability = this.abilityFactory.profileForUser(user);
    const isAllowed = ability.can(Action.Read, Profile);
    if (!isAllowed) {
      throw new ForbiddenException('Нет доступа');
    }
    return this.profileService.getById(id);
  }
}
