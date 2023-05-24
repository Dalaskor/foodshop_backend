import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Delivery } from './delivery.model';
import { Profile } from './profiles.model';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Электронная почта пользователя',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({
    example: 'password12345',
    description: 'Пароль пользователя',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @HasOne(() => Profile, 'fk_profileid')
  profile: Profile;
  @HasOne(() => Cart, 'fk_cartid')
  cart: Cart;
  @HasOne(() => Delivery, 'fk_deliveryid')
  delivery: Delivery;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
