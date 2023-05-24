import { CreateProfileDto, CreateUserDto, LoginDto, User } from '@app/models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CartService } from 'src/carts/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private profileService: ProfileService,
    private cartService: CartService,
    private jwtService: JwtService,
  ) {}
  /**
   * Авторизация
   */
  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  /**
   * Регистрация
   */
  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmailWithoutCheck(
      dto.email,
    );
    if (candidate) {
      throw new BadRequestException(
        'Пользователь с такой электронной почтой уже существует',
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.CreateUser({
      email: dto.email,
      password: hashPassword,
    });
    const profileDto: CreateProfileDto = {
      name: dto.name,
      surname: dto.surname,
      phone: dto.phone,
    };
    const profile = await this.profileService.createProfile(profileDto);
    const cart = await this.cartService.create();
    user.$set('profile', profile);
    user.$set('cart', cart);
    return this.generateToken(user);
  }
  /**
   * Генерация токена
   */
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  /**
   * Валидация пользователя
   */
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Неккоректные электронная почта или пароль',
    });
  }
}
