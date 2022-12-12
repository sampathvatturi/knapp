import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getDepartments(): Observable<any> {
    return this.apiService.getCall('/dept/getDepts').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createDepartment(data: any): Observable<any> {
    return this.apiService.postCall('/dept/createDept/', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateDepartment(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/dept/updateDept/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getDepartmentById(id: any): Observable<any> {
    return this.apiService.getCall('/department/getDepartmentById/' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
