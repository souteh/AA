import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '';
  baseUrlSearch = '';
  baseUrlUsers = '';
  baseUrlSearchUsers = '';
  constructor(private http: HttpClient,
    private config: AppConfigService
  ) {
    this.baseUrl = this.config.getUrl() + 'services/user/api/v1/users/form/create';
    this.baseUrlSearch = this.config.getUrl() + 'services/user/api/v1/users/form/search';
    this.baseUrlUsers = this.config.getUrl() + 'services/user/api/v1/users';
    this.baseUrlSearchUsers = this.config.getUrl() + 'services/userSearch/api/v1/search';
  }
  getForm(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  getSearch(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlSearch).pipe(
      catchError(this.handleError)
    );
  }
  create(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrlUsers, user)
      .pipe(
        catchError(this.handleError)
      );
  }
  update(user: any, id: string): Observable<any> {
    return this.http.put<any>(this.baseUrlUsers + '/' + id, user)
      .pipe(
        catchError(this.handleError)
      );
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrlUsers + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAll(): Observable<any> {
    const param = {
      'offset': 0,
      'size': 20,
      'filters': {
        'user.field.deleted': false
      },
      'sort': {
        'user.field.creation.date': 'desc',
      }
    };
    return this.http.post<any>(this.baseUrlSearchUsers, param)
      .pipe(
        catchError(this.handleError)
      );
  }
  getSearchUser(param) {
    return this.http.post<any>(this.baseUrlSearchUsers, param)
    .pipe(
      catchError(this.handleError)
    );
  }
  delete(id): Observable<any> {
    const url = `${this.baseUrlUsers}/${id}`;
    return this.http.delete<any>(url).pipe(
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
