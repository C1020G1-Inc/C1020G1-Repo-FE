import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuctionSubmit} from '../../model/auction-bidding.model';
import {TokenStorageService} from '../authentication/token-storage';

@Injectable({
  providedIn: 'root'
})
export class AuctionBackendService {
  public API_PRODUCT = 'http://localhost:8080/api/product';
  public API_AUCTION = 'http://localhost:8080/api/auction';
  public httpOptions: any;

  constructor(public http: HttpClient,
              public tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/detail/' + productId, this.httpOptions);
  }

  public getListAuction(productId): Observable<any> {
    return this.http.get(this.API_AUCTION + '/list/' + productId, this.httpOptions);
  }

  public submitAuction(auctionSubmit: AuctionSubmit) {
    return this.http.post(this.API_AUCTION + '/bidding/', auctionSubmit, this.httpOptions);
  }

  public getListTransaction(): Observable<any> {
    return this.http.get(this.API_AUCTION + '/cart', this.httpOptions);
  }

  public getFullProductById(productId : number) : Observable<any>{
    return this.http.get(this.API_PRODUCT + '/' + productId, this.httpOptions);
  }
}
