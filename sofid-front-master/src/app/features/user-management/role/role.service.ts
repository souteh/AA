import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../../../core/model/role';
import { AppConfigService } from '../../../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = '';
  private baseUrlDomaine = '';
  currentPage = 1;
  constructor(private http: HttpClient,
    private config: AppConfigService
  ) {
    this.baseUrl = this.config.getUrl() + 'services/user/api/v1/roles';
    this.baseUrlDomaine = this.config.getUrl() + 'services/user/api/v1/domains';
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, role)
      .pipe(
        catchError(this.handleError)
      );
  }
  update(role: Role, id: string): Observable<Role> {
    return this.http.put<Role>(this.baseUrl + '/' + id, role)
      .pipe(
        catchError(this.handleError)
      );
  }
  getById(id): Observable<Role> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Role>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  deleteRoles(id): Observable<Role[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Role[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  getDomain(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlDomaine).pipe(
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
