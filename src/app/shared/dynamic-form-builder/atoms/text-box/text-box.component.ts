import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../field';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {

  @Input() field: IField;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.id].valid; }
  get isDirty() { return this.form.controls[this.field.id].dirty; }
  constructor() { }

}
