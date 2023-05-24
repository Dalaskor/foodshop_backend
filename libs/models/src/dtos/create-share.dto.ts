import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShareDto {
  @ApiProperty({
    example: 'Купи кашу',
    description: 'Заголовок акции',
  })
  @IsString({ message: '"title" - должно быть строкой' })
  title: string;
  @ApiProperty({
    example: 'Именно вот эту кашу',
    description: 'Описание акции',
  })
  @IsString({ message: '"description" - должно быть строкой' })
  description: string;
}
