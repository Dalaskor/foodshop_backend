import { JwtTokenResponse } from '@app/common';
import { CreateUserDto, LoginDto } from '@app/models';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Авторизация пользователия' })
  @ApiResponse({ status: HttpStatus.CREATED, type: JwtTokenResponse })
  @Post('/login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: 'Регистрация нового пользователия' })
  @ApiResponse({ status: HttpStatus.CREATED, type: JwtTokenResponse })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
