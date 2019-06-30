import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { AddFieldConfigComponent } from './add-field/add-field-conf.component';
import { ListFieldComponent } from './list-field/list-field-conf.component';
import { FieldRoutingModule } from './field-routing.module';
import { FieldService } from './field.service';
import { ShowFieldComponent } from './show-field/show-field-conf.component';

@NgModule({
  declarations: [AddFieldConfigComponent, ListFieldComponent , ShowFieldComponent],
  imports: [
  CommonModule,
    FieldRoutingModule,
    SharedModule
  ],
  providers: [FieldService]
})
export class FieldModule { }
