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


  constructor(private api:ApiService,private http:HttpClient) { }

  getInventoryItems():Observable<any>{

    return this.api.getCall('/inventory/getInventory').pipe(
      map((response: any) => {
        return response;
      })
    );

  }

  // getInventoryItemsById(id: any): Observable<any>{
  //   return this.api.getCall('/inventory/getInventory'+id).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }


}
