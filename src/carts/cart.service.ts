import {
  AddProductToCart,
  Cart,
  CartProducts,
  Product,
  RemoveProductFromCart,
} from '@app/models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepository: typeof Cart,
    @InjectModel(CartProducts) private cartProductRepo: typeof CartProducts,
    private productService: ProductsService,
  ) {}
  async create(): Promise<Cart> {
    const cart: Cart = await this.cartRepository.create();
    if (!cart) {
      throw new BadRequestException('Ошибка создания');
    }
    return cart;
  }
  async getById(id: number): Promise<Cart> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: id },
      include: { model: Product },
    });
    if (!cart) {
      throw new NotFoundException('Коризна не найдена');
    }
    return cart;
  }
  async getProductsFromCart(cart_id: number): Promise<Product[]> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: cart_id },
      include: { all: true },
    });
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    const products: Product[] = cart.products;
    return products;
  }
  async addProductToCart(dto: AddProductToCart): Promise<Cart> {
    let count = 1;
    if (Number(dto.count) > 1) {
      count = dto.count;
    }
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: dto.cart_id },
      include: { all: true },
    });
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    const product: Product = await this.productService.getOne(dto.product_id);
    if (!cart.products) {
      await cart.$set('products', []);
      cart.products = [];
    }
    await cart.$add('products', product.id);
    cart.products.push(product);
    if (!cart.total) {
      cart.total = 0;
    }
    cart.total += product.price * count;
    await cart.save();
    const cartProduct: CartProducts = await this.cartProductRepo.findOne({
      where: { cartId: cart.id, productId: dto.product_id },
    });
    cartProduct.count = count;
    await cartProduct.save();
    console.log('====COUNT====', count);
    return cart;
  }
  async removeProductFromCart(dto: RemoveProductFromCart): Promise<Cart> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: dto.cart_id },
      include: { all: true },
    });
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    const product: Product = await this.productService.getOne(dto.product_id);
    const cartProduct = await this.cartProductRepo.findOne({
      where: { productId: product.id, cartId: cart.id },
    });
    if (!cartProduct) {
      throw new NotFoundException('Связь корзины и товара не найдена');
    }
    if (cartProduct.count > 1) {
      cartProduct.count -= 1;
      cart.total -= product.price;
    } else {
      cart.total -= product.price;
      await cart.$remove('products', product.id);
    }
    await cart.save();
    await cartProduct.save();
    return cart;
  }
  async clearCart(id: number): Promise<Cart> {
    const cart: Cart = await this.cartRepository.findOne({
      where: { fk_cartid: id },
      include: { all: true },
    });
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    await cart.$set('products', []);
    cart.total = 0;
    await cart.save();
    return cart;
  }
}
