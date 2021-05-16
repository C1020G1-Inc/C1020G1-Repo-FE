import {Data} from '@angular/router';
import {ProductStatus} from './ProductStatus';

export interface ProductRegister {
  productId: number;
  productName: string;
  description: string;
  registerTime: Date;
  productStatus: ProductStatus;
  price: number;
}
