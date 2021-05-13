import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './Category';
import {Product} from './Product';

@Injectable({
  providedIn: 'root'
})
export class CreateServiceService {

  public API_URL = 'http://localhost:8080/api/product';

  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'localhost:8080', 'Access-Control-Allow-Methods': '*'
    };
  }

  public getCategory(): Observable<Category> {
    return this.httpClient.get<Category>(this.API_URL + '/category');
  }

  public createProduct(product): Observable<Product>{
    return this.httpClient.post<Product>(this.API_URL + '/create', product);
  }
}
