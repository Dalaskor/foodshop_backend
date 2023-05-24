import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Смеси',
    description: 'Название категории товара',
  })
  @IsString({ message: '"name" - Должно быть строкой' })
  readonly name: string;
}
