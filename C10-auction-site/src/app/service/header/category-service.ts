import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryHeaderService {
    baseURL = 'http://localhost:8080/';
    constructor( private http: HttpClient) {
    }

    findAll(): Observable<any> {
        return this.http.get<any>(this.baseURL + 'api/product/guest/category');
    }
}
