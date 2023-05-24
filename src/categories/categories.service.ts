import { Category, CreateCategoryDto } from '@app/models';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}
  async Create(dto: CreateCategoryDto): Promise<Category> {
    const category: Category = await this.categoryRepository.create(dto);
    if (!category) {
      throw new BadRequestException('Ошибка создания категории');
    }
    return category;
  }
  async getAll(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.findAll();
    return categories;
  }
  async getOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    return category;
  }
  async delete(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new BadRequestException('Ошибка создания категории');
    }
    await category.destroy();
    return category;
  }
}
