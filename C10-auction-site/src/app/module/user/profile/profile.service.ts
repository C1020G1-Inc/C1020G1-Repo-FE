import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public API = 'http://localhost:8080';
  constructor(
    public  http: HttpClient) { }

  getAllProductAuction(accountId, pageNumber: number): Observable<any>{
    return this.http.get(this.API + '/product-auction/' + accountId + '?page=' + pageNumber);
  }
  getAllProductRegister(accountId, pageNumber: number): Observable<any> {
    return this.http.get(this.API + '/product-register/' + accountId + '?page=' + pageNumber);
  }
  setStatusProduct(id): Observable<any>{
    return this.http.put(this.API + '/product-register/update/' + id, null);
  }

  setProduct(price, description, id): Observable<any>{
    return this.http.put(this.API + '/product-register/update/' + price + '/' + description + '/' + id, null);
  }

  // searchProductRegister(name, time, price): Observable<any>{
  //   return this.http.get(this.API + '/product-register/search/' + name + '/' + time + '/' + price);
  // }
}
