import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product/product';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {ProductDto} from '../model/product/product_dto';
import {TokenStorageService} from "./authentication/token-storage";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public httpOptions: any;

  constructor(public httpClient: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllProduct(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/list_product',this.httpOptions);
  }

  approvedProduct(productId: number): Observable<any> {
    console.log(this.httpOptions);
    return this.httpClient.get('http://localhost:8080/api/account/admin/approve/' + productId,this.httpOptions);
  }

  getProductBySearch(productName, categoryId: number, userName, productStatusId: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/search?productName=' + productName + '' +
      '&categoryId=' + categoryId + '' +
      '&userName=' + userName + '' +
      '&productStatusId=' + productStatusId,this.httpOptions);
  }

  getProductByDate(monthSearch, yearSearch): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/statistic?monthSearch=' + monthSearch + '' +
      '&yearSearch=' + yearSearch,this.httpOptions);
  }

  getProductById(productId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/product/' + productId,this.httpOptions);
  }

  getAllCategory(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/product_category',this.httpOptions);
  }

  getCategoryById(categoryId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/account/admin/product_category/' + categoryId,this.httpOptions);
  }

  updateProduct(productDTO: ProductDto): Observable<any>{
    return this.httpClient.put('http://localhost:8080/api/account/admin/edit_product' , productDTO,this.httpOptions);
  }
}
