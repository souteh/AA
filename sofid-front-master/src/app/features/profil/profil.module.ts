import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfilService } from './profil.service';

@NgModule({
  declarations: [ProfilComponent, SecretQuestionComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    SharedModule

  ],
  providers:[ProfilService]
})
export class ProfilModule { }
