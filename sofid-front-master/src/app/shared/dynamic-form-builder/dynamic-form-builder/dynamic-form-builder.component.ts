import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { IField } from '../field';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit, AfterViewInit {
  @Output()
  onsubmit = new EventEmitter();
  @Output()
  oncancel = new EventEmitter();
  @Output()
  onupdate = new EventEmitter();
  @Input() fields: IField[] = [];
  @Input() cssClass: string;
  @Input() type: string;
  @Input() InitValue: any;
  @Input()
  readOnly = false;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
    });
    this.setFields(this.fields);
  }
  ngAfterViewInit() {
  }
  setFields(formDefinition: Array<IField>) {
    if (this.InitValue) {
        formDefinition.forEach(field => {
          if (field.fieldType === 'DATE') {
            this.form.addControl(field.id, new FormControl(new Date(this.InitValue[field.id]), this.consposeValidaror(field)));
          } else {
            this.form.addControl(field.id, new FormControl({value: this.InitValue[field.id], disabled: this.readOnly},
              this.consposeValidaror(field)));
          }
        });
    } else {
      formDefinition.forEach(field => {
        if (field.fieldType === 'CHECKBOX') {
          this.form.addControl(field.id, new FormControl(false, this.consposeValidaror(field)));
        } else if (field.fieldType === 'DATE') {
          this.form.addControl(field.id, new FormControl(null, this.consposeValidaror(field)));
        } else {
          this.form.addControl(field.id, new FormControl('', this.consposeValidaror(field)));
        }
      });
    }
  }
  consposeValidaror(feild: IField): ValidatorFn | null {
    const fieldValidators: ValidatorFn[] = [];
    if (feild.isMandatory) {
      fieldValidators.push(Validators.required);
    }
    if (feild.validationRegex) {
      fieldValidators.push(Validators.pattern(feild.validationRegex));
    }
    if (fieldValidators.length > 0) {
      return Validators.compose(fieldValidators);
    } else {
      return null;
    }
  }
  cancel() {
    this.oncancel.emit();
  }
  update() {
    this.onupdate.emit();
  }
}
