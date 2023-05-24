import { CreateRoleDto, Role } from '@app/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  /**
   * Создать роль
   */
  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  /**
   * Получить все роли
   */
  async getAllRoles(): Promise<Role[]> {
    const roles = this.roleRepository.findAll();
    return roles;
  }
  /**
   * Получить роль по полю "value"
   */
  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
