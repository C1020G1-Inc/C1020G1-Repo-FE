import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from './authentication/account-service';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public API_URL = 'http://localhost:8080/api/product';
  httpOption: any

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
    this.httpOption = this.accountService.httpOptions;
  }

  public getCategory(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/categories', this.httpOption);
  }
  public createProduct(product:Product): Observable<any>{
    product.productStatus = {
      id: 1,
      statusName: "pending"
    };
    return this.httpClient.post<any>(this.API_URL+"/create", product, this.httpOption);
  }
}
