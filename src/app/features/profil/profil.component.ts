import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  defaultLanguage: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle,
    private configService: ConfigService) {
    this.defaultLanguage = this.configService.languages[0];

  }

  ngOnInit() {
    this.titleService.changeMessage('PROFIL.PAGE_TITLE');
    setTimeout(x => {
      this.breadcrumbsService.store([{
        label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
        params: []
      }, { label: this.translate.instant('PROFIL.BREADCRUMB'), url: '/profil', params: [] },
      ]);
    }, 200);
  }

}
