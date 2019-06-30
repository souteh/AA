import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrls: ['./reinit-password.component.scss']
})
export class ReinitPasswordComponent implements OnInit {

  loginForm: FormGroup;
  questionForm: FormGroup;
  passwordForm: FormGroup;
  passwordPattern = '^[a-z0-9_-]{8,15}$';
  showNewPassword = false;
  showConfirmPassword = false;
  typeNew = 'password';
  typeConfirm = 'password';
  saveLogin = false;
  loginStep = true;
  questionStep = false;
  passwordStep = false;
  defaultLanguage: any;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
    });
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
    this.passwordForm = this.fb.group({
      new: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirm: ['', [Validators.required]],
    }, { validator: this.passwordConfirming });
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('new').value !== c.get('confirm').value) {
      c.get('confirm').setErrors({ confirm: true });
      return { invalid: true };
    }
  }
  changepasswordStat(val) {
    if (val === 'new') {
      this.showNewPassword = !this.showNewPassword;
      if (this.showNewPassword) {
        this.typeNew = 'text';
      } else {
        this.typeNew = 'password';
      }
    }
    if (val === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
      if (this.showConfirmPassword) {
        this.typeConfirm = 'text';
      } else {
        this.typeConfirm = 'password';
      }
    }
  }
  submitLogin() {
    this.authenticationService.login(this.loginForm.value);
    this.loginStep = false;
    this.questionStep = true;
    this.passwordStep = false;
  }
  verifyQuestion() {
    this.loginStep = false;
    this.questionStep = false;
    this.passwordStep = true;
  }
  savePassword() {

  }

}
