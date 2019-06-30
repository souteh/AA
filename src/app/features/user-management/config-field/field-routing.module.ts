import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFieldComponent } from './list-field/list-field-conf.component';
import { AddFieldConfigComponent } from './add-field/add-field-conf.component';
import { ShowFieldComponent } from './show-field/show-field-conf.component';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: ListFieldComponent
    },
    {
        path: ':id',
        component: AddFieldConfigComponent
    },
    {
        path: ':id/show',
        component: ShowFieldComponent
    },
    {
        path: ':id/edit',
        component: AddFieldConfigComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FieldRoutingModule {

    constructor(private translate: TranslateService) { }

 }
