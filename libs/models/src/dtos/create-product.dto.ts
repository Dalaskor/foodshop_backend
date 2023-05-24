import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Каша',
    description: 'Наименование товара',
  })
  @IsString({ message: '"name" - Должно быть строкой' })
  readonly name: string;
  @ApiProperty({
    example: 'Жесть какая каша',
    description: 'Описание товара',
  })
  @IsString({ message: '"description" - Должно быть строкой' })
  readonly description: string;
  @ApiProperty({
    example: 100,
    description: 'Стоимость товара',
  })
  @IsNumber({}, { message: '"price" - Должно быть числом' })
  readonly price: number;
  @ApiProperty({
    example: 'google.com',
    description: 'URL адрес до изображения товара',
  })
  @IsString({ message: '"imgUrl" - Должно быть строкой' })
  @IsOptional()
  readonly img_url?: string;
  @ApiProperty({
    example: 1,
    description: 'ID категории товара',
  })
  @IsInt({ message: '"categoryId" - Должно быть целым числом' })
  categoryId: number;
}
