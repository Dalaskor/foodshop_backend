import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class AddProductToDelivery {
  @ApiProperty({
      example: 1,
      description: 'ID доставки(пользователя)',
  })
  @IsInt({message: '"delivery_id" - должно быть целым числом'})
  delivery_id: number;
  @ApiProperty({
      example: 1,
      description: 'ID товара',
  })
  @IsInt({message: '"product_id" - должно быть целым числом'})
  product_id: number;
}
