import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class AddProductToCart {
  @ApiProperty({
      example: 1,
      description: 'ID корзины',
  })
  @IsInt({message: '"cart_id" - должно быть целым числом'})
  cart_id: number;
  @ApiProperty({
      example: 1,
      description: 'ID товара',
  })
  @IsInt({message: '"product_id" - должно быть целым числом'})
  product_id: number;
  @ApiProperty({
      example: 1,
      description: 'количество',
      default: 1
  })
  @IsInt({message: '"count" - должно быть целым числом'})
  count: number = 1;
}
