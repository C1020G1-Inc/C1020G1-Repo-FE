import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../../../service/authentication/token-storage";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public API = 'http://localhost:8080';
  public httpOptions: any;

  constructor(public http: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.tokenStorage.getToken()
      })
      ,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllProductAuction(accountId, pageNumber: number): Observable<any> {
    return this.http.get(this.API + '/product-auction/' + accountId + '?page=' + pageNumber, this.httpOptions);
  }

  getAllProductRegister(accountId, pageNumber: number): Observable<any> {
    return this.http.get(this.API + '/product-register/' + accountId + '?page=' + pageNumber, this.httpOptions);
  }

  setStatusProduct(id): Observable<any> {
    return this.http.put(this.API + '/product-register/update/' + id, null, this.httpOptions);
  }

  setProduct(price, description, id): Observable<any> {
    return this.http.put(this.API + '/product-register/update/' + price + '/' + description + '/' + id, null, this.httpOptions);
  }

  // searchProductRegister(name, time, price): Observable<any>{
  //   return this.http.get(this.API + '/product-register/search/' + name + '/' + time + '/' + price);
  // }
}
