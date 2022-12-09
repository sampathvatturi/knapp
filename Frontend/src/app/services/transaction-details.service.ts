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
}
