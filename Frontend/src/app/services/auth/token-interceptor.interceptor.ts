import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { GlobalConstants } from 'src/app/shared/global_constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }    
    // this.ngxUiLoaderService.start();
    return next.handle(request).pipe(         
      // finalize(() => this.ngxUiLoaderService.stop()),
      catchError((error) => {  
        if(error instanceof HttpErrorResponse){
          console.log("Interceptor Error: ", error.url);
          if(error.status === 401 || error.status === 402){
            if(this.router.url === '/'){}
            else{
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          } 
        }
        if(error.status === 0) {
          error.error.message = "ERR_INTERNET_DISCONNECTED";
        }
        if(!request.url.includes('user/login')){
          this.notificationService.createNotification('error', error.error.message ?? GlobalConstants.genericError);  
        }
        return throwError(error);
      })   
    );
  }
}
