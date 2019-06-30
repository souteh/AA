import { Component, OnInit } from '@angular/core';
import { IField } from '../../../../shared/dynamic-form-builder/field';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user.service';
import { PageTitle } from 'src/app/core/pageTitle.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  fields: IField[];
  id: string;
  user: any;
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle
  ) { }

  ngOnInit() {
    this.titleService.changeMessage('USER.DISPLAY.PAGE_TITLE');
    this.userService.getForm().subscribe(
      data => this.fields = data,
    );

    this.route.params.subscribe(params => {
      this.id = params['id'];
      setTimeout(x => {
        this.breadcrumbsService.store([{
          label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
          params: []
        }, { label: this.translate.instant('USER.LISTING.BREADCRUMB'), url: '/user', params: [] },
        { label: this.translate.instant('USER.DISPLAY.BREADCRUMB'), url: '/user/' + params['id'], params: [] }]);
      }, 200);
      this.userService.getById(params['id']).subscribe(
        data => this.user = data,
      );
    });
  }
  cancel() {
    this.router.navigate(['/user']);
  }
  update() {
    this.router.navigate(['/user', this.id]);
  }
}
