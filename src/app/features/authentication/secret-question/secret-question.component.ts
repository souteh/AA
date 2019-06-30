import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-secret-question',
  templateUrl: './secret-question.component.html',
  styleUrls: ['./secret-question.component.scss']
})
export class SecretQuestionComponent implements OnInit {
  questionForm: FormGroup;
  defaultLanguage: any;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private configService: ConfigService) {
      this.defaultLanguage = this.configService.languages[0];

 }

  ngOnInit() {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  saveQuestion() {
    this.authenticationService.addSecretQuestion(this.questionForm.value).subscribe();
  }

}
