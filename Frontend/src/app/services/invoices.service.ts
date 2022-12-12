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
    return this.apiService.getCall('/invoice/getInvoices').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createInvoice(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/invoice/createInvoice', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateInvoice(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/invoice/updateInvoice/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getInvoicesById(id: any): Observable<any> {
    return this.apiService.getCall('/invoice/getInvoicesById' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
