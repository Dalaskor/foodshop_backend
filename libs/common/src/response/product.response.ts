import { Product } from "@app/models";

export interface ProductOptionResponse {
  products: Product[];
  count: number;
}
