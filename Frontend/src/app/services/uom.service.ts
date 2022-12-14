import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  constructor(private http: HttpClient,
    private apiService: ApiService
  ) { }

  getUoms(): Observable<any> {
    return this.apiService.getCall('/uom/getUoms').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createUom(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/uom/createUom', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUom(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/uom/updateUom/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUomById(id: any): Observable<any> {
    return this.apiService.getCall('/uom/getUomById' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
