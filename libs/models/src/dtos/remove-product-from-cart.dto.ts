import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class RemoveProductFromCart {
    @ApiProperty({
        example: 1,
        description: 'ID корзины'
    })
    @IsInt({message: '"cart_id" - должно быть целым числом'})
    cart_id: number;
    @ApiProperty({
        example: 1,
        description: 'ID товара'
    })
    @IsInt({message: '"product_id" - должно быть целым числом'})
    product_id: number;
}
