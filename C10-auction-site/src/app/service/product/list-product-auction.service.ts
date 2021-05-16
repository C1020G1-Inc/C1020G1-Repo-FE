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

  public showAllProductAuction(category: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/category/' + category);
  }
  public showAllProductEndAuction(category: number): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/end/category/' + category);
  }
}
