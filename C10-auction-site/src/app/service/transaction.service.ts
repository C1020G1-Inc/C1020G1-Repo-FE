import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./authentication/token-storage";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public API_URL = 'http://localhost:8080/api/transaction';

  public httpOptions: any;

  constructor(public httpClient: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public getAllTransaction(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/list' , this.httpOptions);
  }

  public deleteTransaction(transactionId: number): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + transactionId , this.httpOptions);
  }

  public getTransactionBySearch(namePost, nameBuy, productName, price: number, status): Observable<any> {
    return this.httpClient.get(this.API_URL + '/search?namePost=' + namePost + '&nameBuy=' + nameBuy + '&productName=' + productName
      + '&price=' + price + '&status=' + status , this.httpOptions);
  }
}
