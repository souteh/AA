import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  url: string;

  constructor(private http: HttpClient) { }
  public getUrl(): string {
    return this.url;
  }
  load() {
    return new Promise((resolve, reject) => {
      this.http
        .get('assets/config/env.json')
        .subscribe(response => {
          this.url = response['apiUrl'];
          resolve(true);
        });
    });
  }
}
