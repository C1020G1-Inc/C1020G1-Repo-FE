import {User} from './user';

export class Account {
  accountId: number;
  accountName: string;
  password: string;
  email: string;
  enable: boolean;
  logoutTime: Date;
  user: User;
}
