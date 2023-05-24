import { Category, CreateCategoryDto } from '@app/models';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @ApiOperation({summary: 'Создать категорию товара'})
  @ApiResponse({status: HttpStatus.CREATED, type: Category})
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.Create(dto);
  }
  @ApiOperation({summary: 'Получить все категории'})
  @ApiResponse({status: HttpStatus.OK, type: Category})
  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }
  @ApiOperation({summary: 'Получить одну категорию'})
  @ApiResponse({status: HttpStatus.OK, type: Category})
  @Get('/:id')
  getOne(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.categoriesService.getOne(id);
  }
  @ApiOperation({summary: 'Удалить категорию'})
  @ApiResponse({status: HttpStatus.OK, type: Category})
  @Delete('/:id')
  delete(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.categoriesService.delete(id);
  }
}
