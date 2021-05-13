import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public API_PRODUCT = 'http://localhost:8080/api/product' ;
  public API_AUCTION = 'http://localhost:8080/api/auction' ;
  public API_PRODUCT_IMAGE = 'http://localhost:8080/api/productImage' ;
  // tslint:disable-next-line:variable-name
  public API_Recover_Password = 'http://localhost:8080/api/recover' ;
  constructor(private http: HttpClient) {}

  findProductById(id: number ): Observable<any> {
      return this.http.get(this.API_PRODUCT + '/' + id) ;
  }

  findAuctionById(id: number): Observable<any> {
    return this.http.get(this.API_AUCTION + '/' + id);
  }

  findProductImageById(id: number): Observable<any> {
    return this.http.get(this.API_PRODUCT_IMAGE + '/' + id);
  }

  recoverPage(accountEmail: string): Observable<any> {
    return this.http.get(this.API_Recover_Password + '/' + accountEmail) ;
  }
}
