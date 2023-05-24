import { Order } from '@app/common';
import { ProductOptionResponse } from '@app/common/response/product.response';
import {
  Category,
  CreateProductDto,
  PageProductsDto,
  Product,
} from '@app/models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    private categoryService: CategoriesService,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product: Product = await this.productRepository.create(dto);
    if (!product) {
      throw new BadRequestException('Ошибка создания товара');
    }
    const category = await this.categoryService.getOne(dto.categoryId);
    await product.$set('categories', [category]);
    return product;
  }
  async getOne(id: number): Promise<Product> {
    const product: Product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }
    return product;
  }
  async delete(id: number): Promise<Product> {
    const product: Product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }
    await product.destroy();
    return product;
  }
  async getAll(options: PageProductsDto): Promise<ProductOptionResponse> {
    const order: string = options.order ? options.order : Order.ASC;
    const take: number = options.take ? options.take : 10;
    const page: number = options.page ? options.page : 1;
    const skip = (page - 1) * take;
    let where = {};
    if (options.search) {
      const finder = `%${options.search}%`;
      where = {
        name: {
          [Op.iLike]: finder,
        },
      };
    }
    let categoryFilter: string[] = options.categories ? options.categories : [];
    if (!Array.isArray(categoryFilter)) {
      categoryFilter = [categoryFilter];
    }
    const includes = [];
    if (categoryFilter.length > 0) {
      includes.push({
        model: Category,
        as: 'categories',
        where: {
          name: {
            [Op.or]: categoryFilter,
          },
        },
      });
    }
    const products = await this.productRepository.findAll({
      order: [['price', order]],
      include: includes,
      where,
      offset: skip,
      limit: take,
      group: ['id', 'name'],
    });
    const count = await this.productRepository.count({
      include: includes,
      where,
    });
    return { products, count };
  }
}
