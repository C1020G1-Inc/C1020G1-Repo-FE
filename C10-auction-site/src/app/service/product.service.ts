import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product/product';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {ProductDto} from '../model/product/product_dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<any> {
    return this.http.get('http://localhost:8080/admin/list_product');
  }

  approvedProduct(productId: number): Observable<any> {
    // @ts-ignore
    return this.http.put('http://localhost:8080/admin/approve/' + productId);
  }

  getProductBySearch(productName, categoryId: number, userName, productStatusId: number): Observable<any> {
    return this.http.get('http://localhost:8080/admin/search?productName=' + productName + '' +
      '&categoryId=' + categoryId + '' +
      '&userName=' + userName + '' +
      '&productStatusId=' + productStatusId);
  }

  getProductByDate(monthSearch, yearSearch): Observable<any> {
    return this.http.get('http://localhost:8080/admin/statistic?monthSearch=' + monthSearch + '' +
      '&yearSearch=' + yearSearch);
  }

  getProductById(productId): Observable<any> {
    return this.http.get('http://localhost:8080/admin/product/' + productId);
  }

  getAllCategory(): Observable<any> {
    return this.http.get('http://localhost:8080/admin/product_category');
  }

  getCategoryById(categoryId): Observable<any> {
    return this.http.get('http://localhost:8080/admin/product_category/' + categoryId);
  }

  updateProduct(productDTO: ProductDto): Observable<any>{
    console.log(productDTO);
    return this.http.put('http://localhost:8080/admin/edit_product' , productDTO);
  }
}