import {User} from './user';

export class Account {
  accountId: number;
  accountName: string;
  password: string;
  email: string;
  enable: number;
  logoutTime: Date;
  user: User;
}
