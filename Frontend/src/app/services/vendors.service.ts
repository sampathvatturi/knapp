import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getVendors(): Observable<any>{
    return this.apiService.getCall('/vendor/getVendors').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createVendor(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/vendor/createVendor', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateVendor(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/vendor/updateVendor/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getVendorById(id: any): Observable<any>{
    return this.apiService.getCall('/vendor/getVendorById'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
