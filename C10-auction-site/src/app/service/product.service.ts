import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product/product';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any>{
    return this.http.get('http://localhost:8080/admin/list_product');
  }

  approvedProduct(idProduct: number): Observable<any>{
    // @ts-ignore
    return this.http.put('http://localhost:8080/admin/approve/' + idProduct);
  }

  getProductBySearch(productName, categoryId: number, userName, productStatusId: number): Observable<any>{
    return this.http.get('http://localhost:8080/admin/search?productName=' + productName + '' +
      '&categoryId=' + categoryId + '' +
      '&userName=' + userName + '' +
      '&productStatusId=' + productStatusId);
  }
}
