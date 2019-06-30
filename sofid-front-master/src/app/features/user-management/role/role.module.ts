import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { RoleRoutingModule } from './role-routing.module';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './role.service';
import { RoleShowComponent } from './role-show/role-show.component';

@NgModule({
  declarations: [RoleEditComponent, RoleListComponent, RoleShowComponent],
  imports: [
  CommonModule,
    RoleRoutingModule,
    SharedModule
  ],
  providers: [RoleService]
})
export class RoleModule { }
