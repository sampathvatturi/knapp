import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TenderDetailsService {

  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  getTenderDetails(): Observable<any>{
    return this.apiService.getCall('/tendor/getTendors').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createTenderDetail(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/tendor/createTendor', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateTenderDetail(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/tendor/updateTendor' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getTenderDetailById(id: any): Observable<any>{
    return this.apiService.getCall('/tendor/getTendor/:id'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
