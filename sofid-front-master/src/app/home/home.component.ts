import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageTitle } from '../core/pageTitle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle,
    private translate: TranslateService,
    private modalService: NgbModal) { }

  ngOnInit() {

    setTimeout(x => {
      this.breadcrumbsService.store([{ label: this.translate.instant('DASHBOARD.HOME'), url: '/home', params: [] }]);
    }, 200);
    this.titleService.changeMessage('DASHBOARD.HOME');
  }
}
