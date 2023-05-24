import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from './user-roles.model';
import { User } from './users.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор профиля пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'USER',
    description: 'Наименование роли пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  @ApiProperty({
    example: 'Пользователь',
    description: 'Описание роли пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
