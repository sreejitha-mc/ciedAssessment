import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private route: Router) {}

  proceedLogin(usercred: any): Observable<any> {
    Object.assign(usercred, { device_id: 'test' });
    return this.http
      .post(`${this.baseUrl}accounts/login/`, usercred)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Incorrect username or password`;
      if(error.error.error_code=='500')
      {
        errorMessage = `Server Error`;   
      }
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  GetToken() {
    return localStorage.getItem('token') || '';
  }

  GetUserId() {
    console.log("id", localStorage.getItem('USER-ID'))
    return localStorage.getItem('USER-ID') || '';
  }

  Logout() {
    alert('Your session is expired');
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
