import {Product} from './Product';
import {ProductImage} from './product/product_image';

export class ProductDTO {
  product: Product;
  productImageList = new Array<ProductImage>()
}
