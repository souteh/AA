import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from '../../../config.service';
import { ProfilService } from '../profil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  modalRef: NgbModalRef;
  passwordForm: FormGroup;
  passwordPattern = '';

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  typeOld = 'password';
  typeNew = 'password';
  typeConfirm = 'password';
  defaultLanguage: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private profilService: ProfilService,
    private modalService: NgbModal,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];
  }
  private createForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmationPassword: ['', [Validators.required]],
    }, { validator: this.passwordConfirming });
    this.profilService.getRegEx().subscribe(
      data => {
        this.passwordPattern = data.validationRegex;
        this.passwordForm.controls['newPassword'].setValidators([Validators.pattern(this.passwordPattern)]);
      },
    );
  }

  ngOnInit() {
    this.createForm();
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmationPassword').value) {
      c.get('confirmationPassword').setErrors({ confirm: true });
      return { invalid: true };
    }
  }
  openModal(template: TemplateRef<any>) {
    this.createForm();
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        return true;
      }
    };
    this.modalRef = this.modalService.open(template, options);
  }
  annulate() {
    this.modalRef.close();
  }
  savePassword() {
    if (localStorage.getItem('USERID')) {
      const userId = parseInt(localStorage.getItem('USERID'));
      this.profilService.changePassword(userId, this.passwordForm.value).subscribe(
        data => {
          this.modalRef.close();
          this.toastr.success(this.translate.instant('TOASTER.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
        },
        err => this.toastr.error(err, this.translate.instant('TOASTER.ERROR.TITLE')),
      );
    }
  }
  changepasswordStat(val) {
    if (val === 'old') {
      this.showOldPassword = !this.showOldPassword;
      if (this.showOldPassword) {
        this.typeOld = 'text';
      } else {
        this.typeOld = 'password';
      }
    }
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
}
