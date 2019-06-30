import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { throwError, Observable } from 'rxjs';
import { InfoUserImport } from 'src/app/core/model/info-user-import';
import { catchError } from 'rxjs/operators';
import { BulkOperationLog } from 'src/app/core/model/bulkOperationLog';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader';



@Injectable({
    providedIn: 'root'
})
export class MassImportService {

    configLoader: NgxUiLoaderConfig;
    private baseUrl = '';


    constructor(private http: HttpClient,
        private config: AppConfigService,
        private ngxUiLoaderService: NgxUiLoaderService
    ) {
        this.baseUrl = this.config.getUrl() + 'services/user/api/v1/users';
        this.configLoader = this.ngxUiLoaderService.getDefaultConfig();
    }




    generateTemplate(operationType: string): any {
        window.open(this.baseUrl + '/generate?operationType=' + operationType, '_self');
    }

    getGlobalInfo(operationType: string): Observable<InfoUserImport> {
        return this.http.get<InfoUserImport>(this.baseUrl + '/getUserImportInfos?operationType=' + operationType)
            .pipe(
                catchError(this.handleError)
            );

    }

    uploadFile(file: File, operationType: string): Observable<BulkOperationLog> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        });
        const options = {
            headers: headers
        };
        return this.http.post<BulkOperationLog>(this.baseUrl + '/bulk/' + operationType, formData)
            .pipe(
                catchError(this.handleError)
            );
    }

    checkStatus(operationId: number): Observable<BulkOperationLog> {
        return this.http.get<BulkOperationLog>(this.baseUrl + '/bulk/' + operationId)
            .pipe(
                catchError(this.handleError)
            );
    }


    handleError(err) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(err);
    }

}
