import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageSettingRoutingModule } from './language-setting-routing.module';
import { LanguageSettingComponent } from './language-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LanguageSettingComponent],
  imports: [
    CommonModule,
    LanguageSettingRoutingModule,
    SharedModule
  ]
})
export class LanguageSettingModule { }
