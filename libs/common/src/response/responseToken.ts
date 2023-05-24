import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenResponse {
  @ApiProperty({ example: 'asdfqowihljkhnqwejkgna', description: 'JWT токен' })
  token: string;
}
