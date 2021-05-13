import {Category} from './Category';
import {Status} from './Status';


export class Product {
  public productName: string;
  public productType: Category;
  public productQuantity: number;
  public productPrice: number;
  public priceStep: number;
  public productDescription: string;
  public productStatus: Status;
  public accountId: number;
  public registerTime: string;

}

