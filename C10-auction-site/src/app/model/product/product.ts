import {Category} from './category';
import {ProductStatus} from './product_status';
import {Account} from './account';

export class Product {
  productId: number;
  productName: string;
  price: number;
  priceStep: number;
  serviceFee?: number;
  quantity: number;
  lastPrice?: number;
  description: string;
  registerTime?: Date;
  auctionTime: number;
  endTime?: Date;
  account: Account;
  category: Category;
  productStatus: ProductStatus;
}
