import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({
        example: 'Иван',
        description: 'Имя пользователя',
    })
    @IsString({ message: '"name" - Должно быть строкой' })
    @IsOptional()
    readonly name?: string;
    @ApiProperty({
        example: 'Иванов',
        description: 'Фамилия пользователя',
    })
    @IsString({ message: '"surname" - Должно быть строкой' })
    @IsOptional()
    readonly surname?: string;
    @ApiProperty({
        example: '+7(666)777-2343',
        description: 'Номер телефона пользователя',
    })
    @IsString({ message: '"phone" - Должно быть строкой' })
    @IsOptional()
    readonly phone?: string;
}
