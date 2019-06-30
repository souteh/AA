import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { changePassword } from 'src/app/core/model/changePassword';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  baseUrl = '';
  baseUrlUsers = '';
  baseUrlRegEx = '';
  constructor(
    private http: HttpClient,
    private config: AppConfigService
  ) {
    this.baseUrl = this.config.getUrl() + 'services/user/api/v1/users/changePassword';
    this.baseUrlUsers = this.config.getUrl() + 'services/user/api/v1/users';
    this.baseUrlRegEx = this.config.getUrl() + 'services/user/api/v1/field/i18n/user.field.password';

  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + id)
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
  changePassword(id, val: changePassword): Observable<changePassword> {
    return this.http.post<changePassword>(this.baseUrl + '/' + id, val)
      .pipe(
        catchError(this.handleError)
      );
  }

  identification(val): Observable<any> {
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
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = err.error.message;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
