import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, of, concat } from 'rxjs';
import { RefDataService } from '../../ref-data.service';
import {  debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit {
  refData$: Observable<any[]>;
  autoCompliteData$: Observable<any[]>;
  autoCompliteDataLoading = false;
  autoCompliteDatainput$ = new Subject<string>();
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  constructor(private refdata: RefDataService) { }

  ngOnInit() {
    this.refData$ = this.refdata.getRefDate(this.field.dataEndPoint);
    this.loadautoCompliteData();
  }


  private loadautoCompliteData() {
     this.autoCompliteData$ = concat(
       of([]),
       this.autoCompliteDatainput$.pipe(
         debounceTime(200),
         distinctUntilChanged(),
         tap(() => this.autoCompliteDataLoading = true),
         switchMap(term => this.refdata.getAutoComplite(this.field.dataEndPoint, term).pipe(
           catchError(() => of([])),
           tap(() => this.autoCompliteDataLoading = false)
         ))
       )
     );
  }
}
