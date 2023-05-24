import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'password12345',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Поле "password" - должно быть строкой' })
  @IsOptional()
  readonly password?: string;
  @ApiPropertyOptional({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Поле "name" - должно быть строкой' })
  @IsOptional()
  readonly name?: string;
  @ApiPropertyOptional({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @IsString({ message: 'Поле "surname" - должно быть строкой' })
  @IsOptional()
  readonly surname?: string;
  @ApiPropertyOptional({
    example: '79998882233',
    description: 'Номер телефона пользователя',
  })
  @IsString({ message: 'Поле "phone" - должно быть строкой' })
  @IsOptional()
  readonly phone?: string;
}
