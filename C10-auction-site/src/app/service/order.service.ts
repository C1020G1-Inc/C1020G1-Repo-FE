import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {TokenStorageService} from './authentication/token-storage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL = 'http://localhost:8080/api/order';
  totalInVND: number;
  products : Array<Product>;
  public httpOptions: any;

  constructor(public http: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  /**
   * Author : CaoLPT
   * Add new order to db
   */
  public createOrder(orderDTO): Observable<any> {
    return this.http.post(this.BASE_URL, orderDTO, this.httpOptions);
  }
}
