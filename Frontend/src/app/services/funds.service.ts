import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(private http: HttpClient,
    private apiService: ApiService
  ) { }

  getFunds(): Observable<any> {
    return this.apiService.getCall('/fund/getFunds').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createFund(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/fund/createFund', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateFund(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/fund/updateFund/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFundById(id: any): Observable<any> {
    return this.apiService.getCall('/fund/getFundById' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
