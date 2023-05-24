import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ShareCreationAttrs {
  name: string;
  description: string;
}
@Table({ tableName: 'shares' })
export class Share extends Model<Share, ShareCreationAttrs> {
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
    example: 'Акция на каши',
    description: 'Заголовок акции',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @ApiProperty({
    example: 'Усепей купить кашу до конца недели и получи скидку в 0.01%',
    description: 'Описание акции',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
