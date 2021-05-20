import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from './authentication/account-service';
import {Observable} from 'rxjs';
import {ProductDTO} from "../model/ProductDTO";
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public API_URL = 'http://localhost:8080/api/product';
  httpOption: any
  constructor(private httpClient: HttpClient, private accountService: AccountService) {
    this.httpOption = this.accountService.httpOptions;
  }
  public getCategory(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/categories', this.httpOption);
  }
  public createProduct(productDTO:ProductDTO): Observable<any>{
    productDTO.product.productStatus = {
      id: 1,
      statusName: "pending"
    };
    console.log(productDTO);
    return this.httpClient.post<any>(this.API_URL+"/create", productDTO, this.httpOption);
  }
}
