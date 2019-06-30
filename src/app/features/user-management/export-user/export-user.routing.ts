import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportUserComponent } from './export-user.component';
const routes: Routes = [
  {
    path: '',
    component: ExportUserComponent
  },
  {
    path: ':type',
    component: ExportUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportUserRoutingModule { }
