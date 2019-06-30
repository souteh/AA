import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss']
})
export class LanguageSettingComponent implements OnInit {

  defaultLanguage: any;
  languageForm: FormGroup;
  languages: Array<any> = new Array<any>();
  selectedDefaultLanguage: Array<any> = new Array<any>();
  otherLanguage: Array<any> = new Array<any>();
  otherLanguagesList: Array<any> = new Array<any>();

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle,
    private configService: ConfigService,
  ) {
    this.defaultLanguage = this.configService.languages[0];
  }

  ngOnInit() {
    this.languages = this.configService.languages;
    this.otherLanguagesList = this.languages;
    this.titleService.changeMessage('LANGUAGE-SETTING.PAGE_TITLE');
    setTimeout(x => {
      this.breadcrumbsService.store([{
        label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
        params: []
      }, { label: this.translate.instant('LANGUAGE-SETTING.BREADCRUMB'), url: '/language', params: [] },
      ]);
    }, 200);
  }
  changeDefaultSelection($event) {
    this.otherLanguagesList = this.languages.filter(item => item.key !== this.selectedDefaultLanguage);
    this.otherLanguage = this.otherLanguage.filter(item => item.key !== this.selectedDefaultLanguage);
  }
  changeOtherSelection($event) {
  }
}
