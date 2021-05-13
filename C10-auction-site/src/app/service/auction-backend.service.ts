import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuctionSubmit} from '../model/auction-bidding.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionBackendService {
  public API_PRODUCT = 'http://localhost:8080/api/product';
  public API_AUCTION = 'http://localhost:8080/api/auction';

  constructor(public http: HttpClient) {
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get(this.API_PRODUCT + '/detail/' + productId);
  }

  public getListAuction(productId): Observable<any> {
    return this.http.get(this.API_AUCTION + '/list/' + productId);
  }

  public submitAuction(auctionSubmit: AuctionSubmit) {
    return this.http.post(this.API_AUCTION + '/bidding/', auctionSubmit);
  }

  public getListTransaction(): Observable<any> {
    return this.http.get(this.API_AUCTION + '/cart');
  }
}
