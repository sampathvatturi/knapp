import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  postCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.post(url, postDataObj, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getCall(urlPath: string): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.post(url,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.put(url, postDataObj, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  patchCall(urlPath: string, postDataObj: any): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.patch(url, postDataObj, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCall(urlPath: string): Observable<any> {
    const url = this.apiURL + urlPath;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    console.log("===API errorHandler===", error);
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error?.error?.message;
    } else {
      errorMessage = error?.error;
    }
    return throwError(errorMessage);
  }

}
