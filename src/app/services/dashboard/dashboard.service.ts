import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.apiBaseURL;

  constructor(private http: HttpClient, private route: Router) {}

  getDashboardGraph(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}leads/dashboard/graph/?stage_type=active`)
      .pipe(catchError(this.errorHandler));
  }

  getUserData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}accounts/user/85NPW/`)
      .pipe(catchError(this.errorHandler));
  }

  getProbabilty(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}leads/probability/analysis/?stage_type=active`)
      .pipe(catchError(this.errorHandler));
  }

  getLeadList(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}leads/?stage_type=active&limit=10&offset=0&search=&ordering=-probability`)
      .pipe(catchError(this.errorHandler));
  }

  getActiveLead(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}leads/dashboard/graph/?stage_type=active`)
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
}
