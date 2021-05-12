import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL = 'http://localhost:8080/api/order';

  constructor(private http: HttpClient) {
  }

  public createOrder(orderDTO): Observable<any> {
    return this.http.post(this.BASE_URL, orderDTO);
  }
}
