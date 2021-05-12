import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public API_PRODUCT = 'http://localhost:8080/api/product' ;
  public API_AUCTION = 'http://localhost:8080/api/auction' ;
  constructor(private http: HttpClient) {}

  findProductById(id: number ): Observable<any> {
      return this.http.get(this.API_PRODUCT + '/' + id) ;
  }

  findAuctionById(id: number): Observable<any> {
    return this.http.get(this.API_AUCTION + '/' + id);
  }
}
