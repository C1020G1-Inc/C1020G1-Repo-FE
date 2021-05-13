import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public API_URL = 'http://localhost:8080/api/transaction';

  constructor(public httpClient: HttpClient) {
  }

  public getAllTransaction(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/list');
  }

  public deleteTransaction(transactionId: number): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + transactionId);
  }
}
