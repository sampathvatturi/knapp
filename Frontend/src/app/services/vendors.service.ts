import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private http: HttpClient,
    private apiService: ApiService) { }
  getVendors(): Observable<any>{
    return this.apiService.getCall('/vendor/getVendors').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // getVendorById(id: any): Observable<any>{
  //   return this.apiService.getCall(''+id).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }
}
