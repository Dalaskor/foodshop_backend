import {
  AddProductToDelivery,
  Delivery,
  DeliveryProducts,
  Product,
} from '@app/models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private deliveryRepository: typeof Delivery,
    private productService: ProductsService,
  ) {}
  async create(): Promise<Delivery> {
    const delivery = await this.deliveryRepository.create();
    if (!delivery) {
      throw new BadRequestException('Ошибка создания');
    }
    return delivery;
  }
  async getById(id: number): Promise<Delivery> {
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: id },
      include: { model: Product },
    });
    if (!delivery) {
      throw new NotFoundException('Доставка не найдена');
    }
    return delivery;
  }
  async getProductsFromDelivery(cart_id: number): Promise<Product[]> {
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: cart_id },
      include: { all: true },
    });
    if (!delivery) {
      throw new NotFoundException('Доставка не найдена');
    }
    const products: Product[] = delivery.products;
    return products;
  }
  async addProductToCart(dto: AddProductToDelivery): Promise<Delivery> {
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: dto.delivery_id },
      include: { all: true },
    });
    if (!delivery) {
      throw new NotFoundException('Доставка не найдена');
    }
    const product: Product = await this.productService.getOne(dto.product_id);
    if (!delivery.products) {
      await delivery.$set('products', []);
      delivery.products = [];
    }
    await delivery.$add('products', product.id);
    delivery.products.push(product);
    await delivery.save();
    return delivery;
  }
  async removeProductFromDelivery(
    dto: AddProductToDelivery,
  ): Promise<Delivery> {
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: dto.delivery_id },
      include: { all: true },
    });
    if (!delivery) {
      throw new NotFoundException('Доставка не найдена');
    }
    const product: Product = await this.productService.getOne(dto.product_id);
    await delivery.$remove('products', product.id);
    return delivery;
  }
  async clearDelivery(id: number): Promise<Delivery> {
    const delivery: Delivery = await this.deliveryRepository.findOne({
      where: { fk_deliveryid: id },
      include: { all: true },
    });
    if (!delivery) {
      throw new NotFoundException('Доставка не найдена');
    }
    await delivery.$set('products', []);
    await delivery.save();
    return delivery;
  }
}
