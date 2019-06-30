import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { ShowUserComponent } from './show-user/show-user.component';
@NgModule({
  declarations: [EditUserComponent, ListUserComponent, ShowUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
],
providers: [UserService]
})
export class UserModule { }
