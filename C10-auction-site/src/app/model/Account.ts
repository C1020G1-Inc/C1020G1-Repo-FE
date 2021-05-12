import {User} from './User';

export class Account {
  accountId: number;
  accountName: string;
  password: string;
  email: string;
  enable: boolean;
  logoutTime: string;
  user: User;
}
