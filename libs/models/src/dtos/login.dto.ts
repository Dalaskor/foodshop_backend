import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
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
}
