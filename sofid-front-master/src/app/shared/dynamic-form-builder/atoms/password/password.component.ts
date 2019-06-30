import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../field';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() field: IField;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.id].valid; }
  get isDirty() { return this.form.controls[this.field.id].dirty; }
  constructor() { }

  ngOnInit() {
  }

}
