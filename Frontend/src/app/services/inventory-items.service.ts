import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemsService {

  apiURL = environment.apiUrl;


  constructor(private apiService: ApiService, private http: HttpClient) { }

  getInventoryItems(): Observable<any> {

    return this.apiService.getCall('/inventory/getInventory').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createInventoryItem(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/inventory/createInventory', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateInventoryItem(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/inventory/updateInventory/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getInventoryItemsById(id: any): Observable<any>{
    return this.apiService.getCall('/inventory/getInventoryById'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
