import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  signup(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/user/signup', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllUsers(): Observable<any>{
    return this.apiService.getCall('/user/getUsers').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUserById(id: any): Observable<any>{
    return this.apiService.getCall('/user/getUserById/'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  checkToken(): Observable<any> {
    return this.apiService.getCall('/user/checkToken').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  login(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/user/login', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
