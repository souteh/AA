import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { NgxUiLoaderModule} from 'ngx-ui-loader';
import { ExportUserComponent } from './export-user.component';
import { ExportUserRoutingModule } from './export-user.routing';

@NgModule({
    declarations: [ExportUserComponent ],
    imports: [
        CommonModule,
        ExportUserRoutingModule,
        SharedModule,
        NgxUiLoaderModule
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class ExportUserModule { }
