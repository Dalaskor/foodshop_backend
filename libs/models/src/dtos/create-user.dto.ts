import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Электронная почта пользователя',
  })
  @IsString({ message: 'Поле "email" - должно быть строкой' })
  @IsEmail({}, { message: 'Поле "email" - некорректная электронная почта' })
  readonly email: string;
  @ApiProperty({
    example: 'password12345',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Поле "password" - должно быть строкой' })
  readonly password: string;
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
