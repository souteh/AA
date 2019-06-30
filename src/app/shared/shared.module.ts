import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule, ButtonsModule, DatepickerModule, BsDropdownModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputTraductionComponent } from './input-traduction/input-traduction.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionGroupComponent } from './accordion/accordion-group.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupMenuComponent } from './../core/sidebar/accordion-sidbar/accordion-group-menu.component';
import { AccordionMenuComponent } from './../core/sidebar/accordion-sidbar/accordion-menu.component';
import { DatatableModule } from './datatable/datatable.module';
import { DynamicFormBuilderModule } from './dynamic-form-builder/dynamic-form-builder.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    InputTraductionComponent,
    AccordionGroupComponent,
    AccordionComponent,
    AccordionGroupMenuComponent,
    AccordionMenuComponent
  ],
  imports: [
    CommonModule,
    DatatableModule,
    SatPopoverModule,
    NgbModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    AngularSvgIconModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DynamicFormBuilderModule,
    TranslateModule
  ],
  exports: [
    AlertModule,
    ButtonsModule,
    DatepickerModule,
    BsDropdownModule,
    TabsModule,
    PaginationModule,
    CollapseModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    NgxDatatableModule,
    DatatableModule,
    ModalModule,
    InputTraductionComponent,
    AngularSvgIconModule,
    AccordionGroupComponent,
    AccordionComponent,
    AccordionGroupMenuComponent,
    AccordionMenuComponent,
    NgSelectModule,
    NgbModule,
    SatPopoverModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DynamicFormBuilderModule

  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
