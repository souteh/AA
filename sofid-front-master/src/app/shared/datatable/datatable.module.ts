import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from './datatable.component';
import { DataService } from './data.service';
import { SortableDirective } from './sortable.directive';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ActionComponent } from '../datatable/action/action.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
@NgModule({
  declarations: [DatatableComponent, SortableDirective, ActionComponent],
  exports: [DatatableComponent],
  imports: [
    CommonModule,
    NgbModule,
    AngularSvgIconModule,
    TranslateModule,
    PerfectScrollbarModule,
    FormsModule
  ],
  providers: [DataService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class DatatableModule { }
