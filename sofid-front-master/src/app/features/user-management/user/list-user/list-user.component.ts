import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableConfig } from '../../../../shared/datatable/table-config';
import { UserService } from '../user.service';
import { IColumn } from '../../../../shared/datatable/column';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IField } from '../../../../shared/dynamic-form-builder/field';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { ToastrService } from 'ngx-toastr';
import { IAction } from '../../../../shared/datatable/action/IAction';
import { ModalDirective } from 'ngx-bootstrap';
import { PageTitle } from 'src/app/core/pageTitle.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  config: ITableConfig = {
    showFilterHeader: true,
    serverSide: true,
    custumWidth: '2500px',
    actionWidth: '6%'
  };
  @ViewChild('childModal') childModal: ModalDirective;
  fields: IField[];
  actions: IAction[];
  columns: IColumn[];
  rows = [];
  currentPage = 1;
  selectedUser: any;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private breadcrumbsService: BreadcrumbsService,
    private translate: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private titleService: PageTitle) {
    userService.getSearch().subscribe(
      data => {
        this.columns = data['columns'];
        this.fields = data['searchPanel'];
        userService.getAll().subscribe(
          res => this.rows = res,
        );
      }
    );
  }

  ngOnInit() {
    this.titleService.changeMessage('USER.LISTING.TITLE');
    setTimeout(x => {
      this.breadcrumbsService.store([{
        label: this.translate.instant('DASHBOARD.HOME'),
        url: '/home', params: []
      }, { label: this.translate.instant('USER.LISTING.BREADCRUMB'), url: '/user', params: [] }]);
    }, 200);
    this.actions = [
      {
        title: 'ROLE.LISTING.ACTION.DISPLAY',
        icon: 'see',
        visible: true,
        actionevent: 'show',
        cssClass: 'icon-info'
      },
      {
        title: 'ROLE.LISTING.ACTION.EDIT',
        icon: 'edit',
        visible: true,
        actionevent: 'edit',
        cssClass: 'icon-success'
      },
      {
        title: 'ROLE.LISTING.ACTION.DELETE',
        icon: 'delete',
        visible: true,
        actionevent: 'delete',
        cssClass: 'icon-danger',
        desabelProp: 'isMain'
      }
    ];
  }
  openWindowCustomClass(content) {
    this.modalService.open(content,
      {
        size: 'lg',
        windowClass: 'myCustomModalClass'
      });

  }
  getAction(value) {
    switch (value.action) {
      case 'show': { this.show(value.data); break; }
      case 'edit': { this.edit(value.data); break; }
      case 'delete': { this.delete(value.data); break; }
      default: { break; }
    }
  }
  show(value) {
    this.router.navigate(['user', value.id, 'show']);
  }

  edit(value) {
    this.router.navigate(['/user', value.id]);
  }
  delete(value) {
    this.selectedUser = value;
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  deleteUser(): void {
    this.userService.delete(this.selectedUser.id).subscribe(
      data => {
        this.toastr.success(this.translate.instant('TOASTER.DELETE.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
        this.childModal.hide();
        this.userService.getAll().subscribe(
          res => this.rows = res,
        );
      },
      err => this.toastr.error(err, this.translate.instant('TOASTER.ERROR.TITLE')),
    );

  }
  search(val) {
    const param = {
      'offset': 0,
      'size': 20,
      'filters': {},
      'sort': {
        'user.field.creation.date': 'desc',
      }
    };
    const value = this.removeEmpty(val);
    param.filters = value;
    this.userService.getSearchUser(param).subscribe(
      res => this.rows = res,
    );
  }
  removeEmpty(obj) {
    const newObj = {};
    Object.keys(obj).forEach(function (prop) {
      if (obj[prop] !== '' && obj[prop] !== null && obj[prop] !== false) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  }
}
