import {Account} from './Account';
import {Ward} from './Address';

export class Order {
  orderId: number;
  account: Account;
  ward: Ward;
  address: string;
  phone: string;
  guide: string;
  total: number;
  methodPay: number;
  userName: string;
  userEmail: string;
}

