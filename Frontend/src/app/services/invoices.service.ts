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

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getInvoices(): Observable<any> {
    return this.apiService.getCall('/invoicedetails/getInvoicelogs').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createInvoice(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/invoicedetails/createInvoicelog', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateInvoice(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/invoicedetails/updateInvoicelog/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getInvoicesById(id: any): Observable<any> {
    return this.apiService.getCall('/invoicedetails/getInvoicelogsById' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
