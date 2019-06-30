import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from 'src/app/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordPattern = '';
  errorMsg = '';
  showcurrentPasswordPassword = false;
  shownewPasswordPassword = false;
  showconfirmationPasswordPassword = false;
  typecurrentPassword = 'password';
  typenewPassword = 'password';
  typeconfirmationPassword = 'password';
  defaultLanguage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];
  }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmationPassword: ['', [Validators.required]],
    }, { validator: this.passwordconfirmationPasswording });
    this.authenticationService.getRegEx().subscribe(
      data => {
        this.passwordPattern = data.validationRegex;
        this.passwordForm.controls['newPassword'].setValidators([Validators.pattern(this.passwordPattern)]);
      },
    );
  }

  savePassword() {
    const idUser = +localStorage.getItem('USERID');
    this.authenticationService.initPassword(idUser, this.passwordForm.value).subscribe(
      data => this.router.navigate(['/home']),
      error => this.errorMsg = error.message
    );
  }

  passwordconfirmationPasswording(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmationPassword').value) {
      c.get('confirmationPassword').setErrors({ confirmationPassword: true });
      return { invalid: true };
    }
  }
  changepasswordStat(val) {
    if (val === 'currentPassword') {
      this.showcurrentPasswordPassword = !this.showcurrentPasswordPassword;
      if (this.showcurrentPasswordPassword) {
        this.typecurrentPassword = 'text';
      } else {
        this.typecurrentPassword = 'password';
      }
    }
    if (val === 'newPassword') {
      this.shownewPasswordPassword = !this.shownewPasswordPassword;
      if (this.shownewPasswordPassword) {
        this.typenewPassword = 'text';
      } else {
        this.typenewPassword = 'password';
      }
    }
    if (val === 'confirmationPassword') {
      this.showconfirmationPasswordPassword = !this.showconfirmationPasswordPassword;
      if (this.showconfirmationPasswordPassword) {
        this.typeconfirmationPassword = 'text';
      } else {
        this.typeconfirmationPassword = 'password';
      }
    }
  }
}
