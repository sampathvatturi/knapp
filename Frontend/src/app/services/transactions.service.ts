import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private apiService: ApiService) { }
  getTransactions(postDataObj: any): Observable<any> {
    // return this.apiService.getCall('/transaction/getTransactions').pipe(
    //   map((response: any) => {
    //     return response;
    //   })
    // );
    return this.apiService.postCall('/transaction/getTransactions', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createTransaction(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/transaction/createTransaction', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
