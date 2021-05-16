import {User} from "./User";


export interface Account {
    accountId: number;
    accountName: string;
    password: string;
    email: string;
    enable: boolean;
    logoutTime: Date;
    user: User;
}
