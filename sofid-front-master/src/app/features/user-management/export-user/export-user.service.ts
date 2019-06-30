import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { Observable, throwError } from 'rxjs';
import { HistoryExport } from 'src/app/core/model/historyExport';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ExportUserService {

    configLoader: NgxUiLoaderConfig;
    private baseUrl = '';
    currentPage = 1;

    constructor(private http: HttpClient,
        private config: AppConfigService,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.baseUrl = this.config.getUrl() + 'services/userSearch/api/v1/exportUser';
        this.configLoader = this.ngxUiLoaderService.getDefaultConfig();
    }

    getHistory(param): Observable<HistoryExport[]> {
        return this.http.get<HistoryExport[]>(this.baseUrl + '/historyOperation' , { params: param }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(err);
    }

}
