import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {

  constructor(private apiService:ApiService) { }

  getTransactions(): Observable<any>{
    return this.apiService.getCall('/transaction/getTransactions').pipe(
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

  updateTransaction(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/transaction/updateTransaction/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getTransactionById(id: any): Observable<any>{
    return this.apiService.getCall('/transaction/getTransactionById'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
