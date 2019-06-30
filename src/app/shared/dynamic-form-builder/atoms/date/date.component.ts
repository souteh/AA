import { Component, OnInit, Input, Injectable } from '@angular/core';
import { IField } from '../../field';
import { FormGroup } from '@angular/forms';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';

export class FrenchIntl extends OwlDateTimeIntl {
  upSecondLabel = 'ajouter une seconde';
  downSecondLabel = 'moins une seconde';
  upMinuteLabel = 'ajouter une minute';
  downMinuteLabel = 'moins une minute';
  upHourLabel = 'ajouter une heure';
  downHourLabel = 'moins une heure';
  prevMonthLabel = 'le mois précédent';
  nextMonthLabel = 'le mois prochain';
  prevYearLabel = 'année précédente';
  nextYearLabel = 'l\'année prochaine';
  prevMultiYearLabel = 'Previous 21 years';
  nextMultiYearLabel = 'Next 21 years';
  switchToMonthViewLabel = 'Change to month view';
  switchToMultiYearViewLabel = 'Choose month and year';
  cancelBtnLabel = 'Annuler';
  setBtnLabel = 'Confirmer';
  rangeFromLabel = 'Depuis';
  rangeToLabel = 'A';
  hour12AMLabel = 'AM';
  hour12PMLabel = 'PM';
}

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'Fr'},
    {provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform]},
    {provide: OwlDateTimeIntl, useClass: FrenchIntl},
],
})
export class DateComponent implements OnInit {
  @Input() field: IField;
  @Input() form: FormGroup;
  @Input() type: string;
  get isValid() { return this.form.controls[this.field.id].valid; }
  get isDirty() { return this.form.controls[this.field.id].dirty; }
  constructor() { }
  ngOnInit() {
  }
}
