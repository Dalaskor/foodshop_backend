import { ResultResponse, ROLES } from '@app/common';
import {
    Cart,
  CreateRoleDto,
  CreateUserDto,
  Profile,
  Role,
  UpdateUserDto,
  User,
} from '@app/models';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  /**
   * Создать пользователя
   */
  async CreateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    let role = await this.roleService.getRoleByValue(ROLES.USER);
    if (!role) {
      const roleDto: CreateRoleDto = {
        value: ROLES.USER,
        description: 'Обычнй пользователь (покупатель)',
      };
      role = await this.roleService.createRole(roleDto);
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    await user.save();
    return user;
  }
  /**
   * Получить всех пользователей
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
  /**
   * Получить пользователя по ID
   */
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: [{model: Profile}, {model: Role}, {model: Cart}],
    });
    this.checkFoundUser(user);
    return user;
  }
  /**
   * Получить пользователя по email
   */
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    this.checkFoundUser(user);
    return user;
  }
  async getUserByEmailWithoutCheck(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  /**
   * Обновить данные пользователя
   */
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    this.checkFoundUser(user);
    if (dto.password) {
      const hashPassword = await bcrypt.hash(dto.password, 5);
      user.password = hashPassword;
    }
    user.profile.name = dto.name ? dto.name : user.profile.name;
    user.profile.surname = dto.surname ? dto.surname : user.profile.surname;
    user.profile.phone = dto.phone ? dto.phone : user.profile.phone;
    await user.save();
    return user;
  }
  /**
   * Удалить пользователя по ID
   */
  async deleteUser(id: number): Promise<ResultResponse> {
    const user = await this.userRepository.findByPk(id);
    this.checkFoundUser(user);
    await user.destroy();
    const resultResponse: ResultResponse = {
      status: HttpStatus.OK,
      message: 'Пользователь успешно удален',
    };
    return resultResponse;
  }
  /**
   * Проверка найденного пользователя
   */
  private checkFoundUser(user: any): any {
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return true;
  }
}
