import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from '../authentication/account-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public API_PRODUCT = 'http://localhost:8080/api/product' ;
  public API_AUCTION = 'http://localhost:8080/api/auction' ;
  public API_PRODUCT_IMAGE = 'http://localhost:8080/api/productImage' ;
  public API_RECOVER_PASSWORD = 'http://localhost:8080/api/recover' ;

  constructor(private http: HttpClient) {
  }

  findProductById(id: number ): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/read/' + id) ;
  }

  findAuctionById(id: number): Observable<any> {
    return this.http.get(this.API_AUCTION + '/read/' + id);
  }

  findProductImageById(id: number): Observable<any> {
    return this.http.get(this.API_PRODUCT_IMAGE + '/read/' + id);
  }

  recoverPage(accountEmail: string): Observable<any> {
    return this.http.get(this.API_RECOVER_PASSWORD + '/' + accountEmail) ;
  }
}
