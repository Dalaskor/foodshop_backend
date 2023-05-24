import { CreateProfileDto, Profile } from '@app/models';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import {
  AbilityFactory,
  Action,
} from 'src/ability/ability.factory/ability.factory';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
    private jwtService: JwtService,
    private abilityFactory: AbilityFactory,
  ) {}
  /**
   * Создать профиль пользователя
   */
  async createProfile(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(dto);
    return profile;
  }
  /**
   * Получить профиль по ID
   */
  async getById(fk_profileid: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { fk_profileid },
      include: { all: true },
    });
    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }
    return profile;
  }
  /**
   * Обновить профиль
   */
  async updateProfile(
    userId: number,
    dto: CreateProfileDto,
    req: any,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { fk_profileid: userId },
      include: { all: true },
    });
    const user = this.getUserFromReq(req);
    const ability = this.abilityFactory.profileForUser(user);
    const isAllowed = ability.can(Action.Update, profile);
    if (!isAllowed) {
      throw new ForbiddenException('Нет доступа');
    }
    profile.name = dto.name ? dto.name : profile.name;
    profile.surname = dto.surname ? dto.surname : profile.surname;
    profile.phone = dto.phone ? dto.phone : profile.phone;
    await profile.save();
    return profile;
  }
  getUserFromReq(req: any) {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const user = this.jwtService.verify(token);

    return user;
  }
}
