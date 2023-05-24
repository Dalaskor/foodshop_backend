import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from './users.model';

interface ProfileCreationAttrs {
  surname: string;
  middlename: string;
  phone: string;
}
@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
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
  @ApiPropertyOptional({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;
  @ApiPropertyOptional({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname: string;
  @ApiPropertyOptional({
    example: '79999998877',
    description: 'Номер телефона пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;
  @BelongsTo(() => User, 'fk_profileid')
  user: User;
  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  fk_profileid: number;
}
