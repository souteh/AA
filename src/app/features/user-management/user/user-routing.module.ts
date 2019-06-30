import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent
  },
  {
    path: ':id',
    component: EditUserComponent,
  },
  {
    path: ':id/show',
    component: ShowUserComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
