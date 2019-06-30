import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecretQuestionComponent } from './secret-question/secret-question.component';
import { PasswordComponent } from './password/password.component';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'secretQuestion',
    component: SecretQuestionComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'reinitpassword',
    component: ReinitPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
