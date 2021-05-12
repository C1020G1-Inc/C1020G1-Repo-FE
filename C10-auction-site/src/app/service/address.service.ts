import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District, Province, Ward} from '../model/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private BASE_URL = 'http://localhost:8080/api/address';

  constructor(private http: HttpClient) {
  }

  public getAllProvinces(): Observable<any> {
    return this.http.get(this.BASE_URL + '/' + 'province');
  }

  public getDistrictByProvince(provinceId): Observable<any> {
    return this.http.get(this.BASE_URL + '/district/' + provinceId);
  }

  public getWardByDistrict(districtId): Observable<any> {
    return this.http.get(this.BASE_URL + '/ward/' + districtId);
  }
}
