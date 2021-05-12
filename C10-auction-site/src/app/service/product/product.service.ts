import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {
  }

  /**
   * Author : SonPH
   * find product by product
   */
  findProductById(productId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + productId);
  }
}
