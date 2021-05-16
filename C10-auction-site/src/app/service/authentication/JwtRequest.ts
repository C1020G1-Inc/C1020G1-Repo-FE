export default class JwtRequest {
    accountName: string;
    password: string;
    constructor(accountName: string, password: string) {
        this.accountName = accountName;
        this.password = password;
    }
}
