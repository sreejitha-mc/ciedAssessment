import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject: Injector) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let login = this.inject.get(LoginService);
    let token = this.addTokenHeader(req, login.GetToken(), login.GetUserId());
    return next.handle(token).pipe(
      catchError(err => {
        if(err.status === 401){
          //need to impliment Logout
          login.Logout();
          //need to impliment refresh token
        }
        return throwError(err);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: any, id: any){
    return req.clone({headers: req.headers
      .set('BEARER', token)
      .set('USER-ID', id)
    });
  }
}
