import { Injectable } from '@angular/core';
import { SelectItem } from 'src/app/core/model/selectItem';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { catchError } from 'rxjs/operators';
import { Field } from 'src/app/core/model/field';
import { FieldLight } from 'src/app/core/model/fieldLight';
import { FieldPatch } from 'src/app/core/model/fieldPatch';




@Injectable({
    providedIn: 'root'
})
export class FieldService {

    private baseUrl = '';
    private baseUrlCommmun = '';
    currentPage = 1;

    constructor(private http: HttpClient,
        private config: AppConfigService
    ) {
        this.baseUrl = this.config.getUrl() + 'services/user/api/v1/field';
        this.baseUrlCommmun = this.config.getUrl() + 'services/refData/api/v1/refdatatypes';
    }

    selectItems(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.baseUrl + '/select')
            .pipe(
                catchError(this.handleError)
            );
    }

    sourceSelectItems(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.baseUrlCommmun + '/select')
            .pipe(
                catchError(this.handleError)
            );
    }


    saveField(field: Field): Observable<Field> {
        if (!field.isMandatory) {
            if (field.mandatoryCondition != null &&
                (this.isEmpty(field.mandatoryCondition.fieldId)
                    || this.isEmpty(field.mandatoryCondition.operation) || this.isEmpty(field.mandatoryCondition.value))) {
                field.mandatoryCondition = null;
            }
        }
        if (!field.isVisible) {
            if (field.visibilityCondition != null &&
                (this.isEmpty(field.visibilityCondition.fieldId)
                    || this.isEmpty(field.visibilityCondition.operation) || this.isEmpty(field.visibilityCondition.value))) {
                field.visibilityCondition = null;
            }
        }

        if (field.isMandatory) {
            field.isVisible = true;
        }

        return this.http.post<Field>(this.baseUrl + ' ', field)
            .pipe(
                catchError(this.handleError)
            );
    }


    updateField(field: Field, idField: number): Observable<Field> {
        field.id = idField;
        if (!field.isVisible) {
            if (field.visibilityCondition != null &&
                (this.isEmpty(field.visibilityCondition.fieldId)
                    || this.isEmpty(field.visibilityCondition.operation) || this.isEmpty(field.visibilityCondition.value))) {
                field.visibilityCondition = null;
            }
        }
        if (!field.isMandatory) {
            if (field.mandatoryCondition != null &&
                (this.isEmpty(field.mandatoryCondition.fieldId)
                    || this.isEmpty(field.mandatoryCondition.operation) || this.isEmpty(field.mandatoryCondition.value))) {
                field.mandatoryCondition = null;
            }
        }
        return this.http.put<Field>(this.baseUrl + '/' + idField, field)
            .pipe(
                catchError(this.handleError)
            );
    }

    getFields(): Observable<FieldLight[]> {
        return this.http.get<FieldLight[]>(this.baseUrl).pipe(
            catchError(this.handleError)
        );
    }

    getFieldByID(idField: number): Observable<Field> {
        return this.http.get<Field>(this.baseUrl + '/' + idField).pipe(
            catchError(this.handleError)
        );
    }

    deleteField(id): Observable<Field[]> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete<Field[]>(url).pipe(
            catchError(this.handleError)
        );
    }

    updateStatus(idField: number, fieldPatch: FieldPatch) {
        return this.http.patch<Field>(this.baseUrl + '/' + idField, fieldPatch).pipe(
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

    isEmpty(val: any): boolean {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }


}
