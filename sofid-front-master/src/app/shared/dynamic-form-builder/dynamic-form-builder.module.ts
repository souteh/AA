import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './atoms/text-box/text-box.component';
import { TranslateModule } from '@ngx-translate/core';
import { SingleCheckboxComponent } from './atoms/single-checkbox/single-checkbox.component';
import { CustomSelectComponent } from './atoms/custom-select/custom-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RefDataService } from './ref-data.service';
import { PasswordComponent } from './atoms/password/password.component';
import { DateComponent } from './atoms/date/date.component';
import { NumberComponent } from './atoms/number/number.component';


@NgModule({
  declarations: [DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    SingleCheckboxComponent,
    CustomSelectComponent,
    PasswordComponent,
    DateComponent,
    NumberComponent],
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    AngularSvgIconModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule
  ],
  exports: [DynamicFormBuilderComponent, FieldBuilderComponent],
  providers: [RefDataService]
})
export class DynamicFormBuilderModule { }
