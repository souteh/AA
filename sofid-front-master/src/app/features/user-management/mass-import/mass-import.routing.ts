import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MassImportComponent } from './mass-import.component';
const routes: Routes = [
  {
    path: '',
    component: MassImportComponent
  },
  {
    path: ':id',
    component: MassImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MassImportRoutingModule { }
