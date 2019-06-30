import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimpleContainerComponent } from './container/simple-container/simple-container.component';
import { FullContainerComponent } from './container/full-container/full-container.component';

const routes: Routes = [

  // { path: '**', redirectTo: 'home',pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: FullContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',

      },
      {
        path: 'role',
        loadChildren: './features/user-management/role/role.module#RoleModule',

      },
      {
        path: 'fields',
        loadChildren: './features/user-management/config-field/field.module#FieldModule',

      },
      {
        path: 'user',
        loadChildren: './features/user-management/user/user.module#UserModule',
      },
      {
        path: 'massImports',
        loadChildren: './features/user-management/mass-import/mass-import.module#MassImportModule',

      },
      {
        path: 'profil',
        loadChildren: './features/profil/profil.module#ProfilModule',

      },
      {
        path: 'language',
        loadChildren: './features/settings/language-setting/language-setting.module#LanguageSettingModule',
      },
      {
        path: 'exportUser',
        loadChildren: './features/user-management/export-user/export-user.module#ExportUserModule',
      }
    ]
  },
  {
    path: '',
    component: SimpleContainerComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: 'src/app/features/authentication/authentication.module#AuthenticationModule',

      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
