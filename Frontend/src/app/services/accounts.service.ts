import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient,
    private apiService: ApiService) { }

    getAccountHeads(): Observable<any>{
      return this.apiService.getCall('/account/getAccountHeads').pipe(
        map((response: any) => {
          return response;
        })
      );
    }
    
    createAccountHead(postDataObj: any):Observable<any>{
      return this.apiService.postCall('/account/createAccountHead', postDataObj).pipe(
        map((response: any) => {
          return response;
        })
      );
    }

    updateAccountHead(id: any, postDataObj: any): Observable<any> {
      return this.apiService.patchCall('/account/updateAccountHead/' + id, postDataObj).pipe(
        map((response: any) => {
          return response;
        })
      );
    }

}
