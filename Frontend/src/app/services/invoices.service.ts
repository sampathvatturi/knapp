import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  apiURL = environment.apiUrl;

  constructor(private api:ApiService,private http:HttpClient) { }

  getInvoices():Observable<any>{

    return this.api.getCall('/invoicedetails/getInvoicelogs').pipe(
      map((response: any) => {
        return response;
      })
    );

  }
  

  // getInvoicesById(id: any): Observable<any>{
  //   return this.api.getCall('//'+id).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }

}
