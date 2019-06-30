import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageSettingComponent } from './language-setting.component';


const routes: Routes = [
  {
    path: '',
    component: LanguageSettingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageSettingRoutingModule { }
