import {Order} from './Order';
import {Product} from './Product';

export class OrderDTO {
  order: Order;
  products: Array<Product>;
}

