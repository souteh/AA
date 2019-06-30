import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = '';
  baseUrlInitPassWord = '';
  baseUrlRegEx = '';
  constructor(
    private http: HttpClient,
    private config: AppConfigService
  ) {
    this.baseUrl = this.config.getUrl() + 'api/authenticate';
    this.baseUrlRegEx = this.config.getUrl() + 'services/user/api/v1/field/i18n/user.field.password';
    this.baseUrlInitPassWord = this.config.getUrl() + 'services/user/api/v1/users/changePassword/';
  }
  login(val): Observable<any> {
    return this.http.post<any>(this.baseUrl, val)
      .pipe(
        catchError(this.handleError)
      );
  }
  addSecretQuestion(val): Observable<any> {
    return this.http.post<any>(this.baseUrl, val)
      .pipe(
        catchError(this.handleError)
      );
  }
  initPassword(id, val): Observable<any> {
    return this.http.post<any>(this.baseUrlInitPassWord + id, val)
      .pipe(
        catchError(this.handleError)
      );
  }
  getRegEx(): Observable<any> {
    return this.http.get<any>(this.baseUrlRegEx)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = err.error;
    }
    return throwError(errorMessage);
  }
}
