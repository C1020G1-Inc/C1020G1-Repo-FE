import {Category} from './Category';
import {Status} from './Status';
import {Accounts} from './Account';


export class Product {
  productId: number;
  productName: string;
  category: Category;
  quantity: number;
  price: number;
  priceStep: number;
  description: string;
  productStatus: Status;
  accountId: Accounts;
  registerTime: Date;
  auctionTime: number;
}

