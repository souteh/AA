import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationShellComponent } from './authentication-shell/authentication-shell.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentiacation-routing.module';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { PasswordComponent } from './password/password.component';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AuthenticationShellComponent, LoginComponent, SecretQuestionComponent, PasswordComponent, ReinitPasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
