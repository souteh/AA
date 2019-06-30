import { Component, OnInit } from '@angular/core';
import { IField } from '../../../../shared/dynamic-form-builder/field';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user.service';
import { PageTitle } from 'src/app/core/pageTitle.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  fields: IField[];
  id: string;
  user: any;
  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private toastr: ToastrService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle) { }

  ngOnInit() {
    this.userService.getForm().subscribe(
      data => this.fields = data,
    );
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] === '0') {
        this.titleService.changeMessage('USER.ADDITION.PAGE_TITLE');
        setTimeout(x => {
          this.breadcrumbsService.store([{
            label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
            params: []
          }, { label: this.translate.instant('USER.LISTING.BREADCRUMB'), url: '/user', params: [] },
          { label: this.translate.instant('USER.ADDITION.BREADCRUMB'), url: '/user/0', params: [] }]);
        }, 200);


      } else {
        this.titleService.changeMessage('USER.EDITION.TITLE');
        setTimeout(x => {
          this.breadcrumbsService.store([{
            label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
            params: []
          }, { label: this.translate.instant('USER.LISTING.BREADCRUMB'), url: '/user', params: [] },
          { label: this.translate.instant('USER.EDITION.BREADCRUMB'), url: '/user/' + params['id'], params: [] }]);
        }, 200);
        this.userService.getById(params['id']).subscribe(
          data => this.user = data,
        );
      }
    });
  }
  create(value) {
    const val = this.removeEmpty(value);
    if (this.id === '0') {
      this.userService.create(val).subscribe(
        data => {
          this.toastr.success(this.translate.instant('TOASTER.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
          this.router.navigate(['/user']);
        },
        err => this.toastr.error(err, this.translate.instant('TOASTER.ERROR.TITLE')),
      );
    } else {
      this.userService.update(val, this.id).subscribe(
        data => {
          this.toastr.success(this.translate.instant('TOASTER.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
          this.router.navigate(['/user']);
        },
        err => this.toastr.error(err, this.translate.instant('TOASTER.ERROR.TITLE')),
      );
    }

  }
  removeEmpty(obj) {
    const newObj = {};
    Object.keys(obj).forEach(function (prop) {
      if (obj[prop] !== '' && obj[prop] !== null) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  }
  cancel() {
    this.router.navigate(['/user']);
  }
}
