import {Account} from './Account';

export class Category {
  id: number;
  categoryName: string;
}

export class ProductStatus {
  id: number;
  statusName: string;
}

export class Product {
  productId: number;
  productName: string;
  price: number;
  category: Category;
  priceStep: number;
  serviceFee: number;
  quantity: number;
  lastPrice: number;
  description: string;
  productStatus: ProductStatus;
  registerTime: string;
  auctionTime: number;
  endTime: string;
  account: Account;
}

