import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from '../../../config.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  type = 'password';
  error = '';
  rememberMe = false;
  loader = false;
  showError = false;
  langueges: Array<any> = new Array<any>();
  defaultLanguage: any;


  constructor(
    private fb: FormBuilder,
    private config: ConfigService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];

  }

  ngOnInit() {
    this.langueges = this.config.languages;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      language: [''],
      rememberMe: ['']
    });
    if (localStorage.getItem('USERNAME')) {
      this.loginForm.controls['username'].setValue(localStorage.getItem('USERNAME'));
      this.loginForm.controls['rememberMe'].setValue(true);
      this.rememberMe = true;
    } else {
      this.loginForm.controls['rememberMe'].setValue(false);
      this.rememberMe = false;
    }
  }
  changepasswordStat() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  submitLogin() {
    this.loader = true;
    setTimeout(() => {
      this.authenticationService.login(this.loginForm.value).subscribe(
        data => {
          this.loader = false;
          localStorage.setItem('TOKEN', data.token);
          localStorage.setItem('FIRSTNAME', data.user.lastName);
          localStorage.setItem('LASTNAME', data.user.firstName);
          localStorage.setItem('USERID', data.user.id);
          if (data.user.credentialsNonExpired) {
            this.router.navigate(['/authentication/password']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.loader = false;
          this.showError = true;
          this.error = error.AuthenticationException;
        }
      );
    }, 1000);
    if (this.rememberMe) {
      localStorage.setItem('USERNAME', this.loginForm.value.username);
    }
  }
  changeLogin() {
    this.rememberMe = !this.rememberMe;
    if (!this.rememberMe) {
      localStorage.removeItem('USERNAME');
    }
  }
}
