import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { MassImportRoutingModule } from './mass-import.routing';
import { MassImportComponent } from './mass-import.component';
import { NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
    declarations: [MassImportComponent ],
    imports: [
        CommonModule,
        MassImportRoutingModule,
        SharedModule,
        NgxUiLoaderModule
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class MassImportModule { }
