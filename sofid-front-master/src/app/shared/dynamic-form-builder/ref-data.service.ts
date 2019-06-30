import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {
  private baseUrl = '';
  constructor(private http: HttpClient,
    private config: AppConfigService) {
    this.baseUrl = this.config.getUrl() + 'services/user';
  }

  getRefDate(endPoint: string) {
    return this.http.get<any[]>(this.baseUrl + endPoint).pipe(
      catchError(this.handleError)
    );
  }


  getAutoComplite(endPoint: string, term: string): Observable<any[]> {
    const params = {
      keyword: term
    };
    return this.http.get<any[]>(this.baseUrl + endPoint, { params: params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
