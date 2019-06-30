import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseUrl = '';
  languages = [
    {
      'key': 'fr',
      'value': 'Français',
      'visible': false,
      'rtl': false
    },
    {
      'key': 'ar',
      'value': 'Arabe',
      'visible': false,
      'rtl': true
    },
    {
      'key': 'en',
      'value': 'Anglais',
      'visible': false,
      'rtl': false
    },
    {
      'key': 'es',
      'value': 'Espagnol',
      'visible': false,
      'rtl': false
    }

  ];
  constructor(
    private http: HttpClient,
    private config: AppConfigService) {
    this.baseUrl = this.config.getUrl() + 'language';
  }
  getLanguages(): Observable<any[]> {
    if (this.languages.length === 0) {
      return this.http.get<any[]>(this.baseUrl).pipe(
        tap(data => this.languages = data),
        catchError(this.handleError)
      );
    } else {
      return of(this.languages);
    }
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
