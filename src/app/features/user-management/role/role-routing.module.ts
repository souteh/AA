import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleShowComponent } from './role-show/role-show.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent
  },
  {
    path: ':id/show',
    component: RoleShowComponent
},
  {
    path: ':id',
    component: RoleEditComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
