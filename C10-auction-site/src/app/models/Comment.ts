import {Account} from './Account';
import {Product} from './Product';

export class Comment {
  commentId: number;
  content: string;
  image: string;
  commentTime: string;
  product: Product;
  account: Account;
}
