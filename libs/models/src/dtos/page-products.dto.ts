import { Order } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageProductsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.ASC,
    description: 'Сортировка (по цене)',
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Номер страницы',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Количество объектов на 1 страницу',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 50;

  @ApiPropertyOptional({
    default: [],
    example: ['каши'],
    description: 'Фильтр по списку категорий',
  })
  @Type(() => Array<string>)
  @IsOptional()
  readonly categories?: string[] = [];

  @ApiPropertyOptional({
    default: '',
    example: 'каша',
    description: 'Поиск по строке',
  })
  @IsString({message: '"search" - должно быть строкой'})
  @IsOptional()
  readonly search?: string = '';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
