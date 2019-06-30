import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { MenuService } from './menu.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageTitle } from './pageTitle.service';

@NgModule({
  declarations: [FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    BreadcrumbsModule,
    RouterModule
  ],
  exports: [SharedModule, SidebarComponent, FooterComponent, BreadcrumbsModule],
  providers: [MenuService, PageTitle],
})
export class CoreModule { }
