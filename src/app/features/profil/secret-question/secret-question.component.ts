import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/config.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from '../profil.service';

@Component({
  selector: 'app-secret-question',
  templateUrl: './secret-question.component.html',
  styleUrls: ['./secret-question.component.scss']
})
export class SecretQuestionComponent implements OnInit {
  verificationForm: FormGroup;
  showQuestionForm: FormGroup;
  questionForm: FormGroup;
  modalRef: NgbModalRef;
  readOnly = true;
  validation: string;
  edit = false;
  submitted = false;
  passwordValid = false;
  passwordValidationKey: string;
  showPassword = false;
  typePassword = 'password';


  defaultLanguage: any;


  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private profilService:ProfilService,
    private translate: TranslateService,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];
    this.verificationForm = this.fb.group({
      password: [''],
    });
    this.showQuestionForm = this.fb.group({
      showquestion: [''],
      showresponse: [''],
    });
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      response: ['', Validators.required],
    });
    this.edit = false;
  }
  ngOnInit() {
    this.edit = false;
    this.validation = 'PROFIL.SECURITY.EDIT';
    this.submitted = false;
  }
  openModal(template: TemplateRef<any>) {
    const options: NgbModalOptions = {
      beforeDismiss: () => {
        this.initialize();
        return true;
      }
    };
    this.modalRef = this.modalService.open(template, options);

  }
  verifyPAssword(): any {
    this.submitted = true;
    const password = this.verificationForm.controls.password;
    const correctPassword = '';
    if (password.value === correctPassword) {
      return this.passwordValid = true;
    } else {
      this.passwordValidationKey = 'PROFIL.SECURITY.INVALID-PASSWORD';
      return this.passwordValid = false;
    }


  }
  editer() {
    this.edit = true;
    this.readOnly = !this.readOnly;
    this.validation = 'PROFIL.SECURITY.SAVE';
  }
  save() {
    this.modalRef.close();
    this.readOnly = !this.readOnly;
    this.edit = false;
    this.validation = 'PROFIL.SECURITY.EDIT';
    this.submitted = false;
    this.passwordValid = false;
    this.verificationForm.controls.password.patchValue('');

  }
  initialize() {
    this.submitted = false;
    this.passwordValid = false;
    this.edit = false;
    this.readOnly = true;
    this.verificationForm.controls.password.patchValue('');
    this.validation = 'PROFIL.SECURITY.EDIT';
  }
  annulate() {
    this.initialize();

    this.modalRef.close();

  }
  changepasswordStat() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }

}
