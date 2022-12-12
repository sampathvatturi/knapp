import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private http: HttpClient,
              private apiService: ApiService) { }
              
  getWorks(): Observable<any>{
    return this.apiService.getCall('/work/getWorks').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createWorks(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/work/createWork', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateWorks(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/work/updateWork/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // getWorkById(id: any): Observable<any>{
  //   return this.apiService.getCall('/work/getWork/'+id).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }
}
