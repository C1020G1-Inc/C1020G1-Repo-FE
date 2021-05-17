import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProductAuctionService {
  public API_PRODUCT = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {
  }

  public showAllProductAuction(categoryId: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/category/' + categoryId);
  }

  public showAllProductEndAuction(categoryId: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/end/category/' + categoryId);
  }

  public showAllProductResultAuction(categoryId: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/result/category/' + categoryId);
  }

  public showTop5ProductAuction(categoryId: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/top/category/' + categoryId);
  }

  public searchProductAuction(keySearch: string, categoryId: number, priceRange: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/search?keySearch=' + keySearch + '&&category=' + categoryId + '&&priceRange=' + priceRange);
  }
}
