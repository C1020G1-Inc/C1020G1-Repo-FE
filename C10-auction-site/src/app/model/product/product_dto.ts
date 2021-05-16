import {Product} from './product';
import {ProductImage} from './product_image';

export class ProductDto {
  product: Product;
  productImageList = new Array<ProductImage>();
}
