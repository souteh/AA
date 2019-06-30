import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';
import { IAction } from 'src/app/shared/datatable/action/IAction';
import { Role } from 'src/app/core/model/role';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { ITableConfig } from '../../../../shared/datatable/table-config';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IColumn } from '../../../../shared/datatable/column';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  columns: IColumn[];
  rows = [];
  actions: IAction[];
  SelectedRole: Role;
  @ViewChild('childModal') childModal: ModalDirective;
  config: ITableConfig = {
    showFilterHeader: false
  };
  etiquette: string;
  currentPage = 1;
  defaultLanguage: any;

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    private breadcrumbsService: BreadcrumbsService,
    private translate: TranslateService,
    private router: Router,
    private titleService: PageTitle,
    private configService: ConfigService
  ) {
    this.defaultLanguage = this.configService.languages[0];
   }

  ngOnInit() {
    this.titleService.changeMessage('ROLE.LISTING.PAGE_TITLE');
    this.getRoles();
    this.currentPage = this.roleService.currentPage;
    setTimeout(x => {
      this.breadcrumbsService.store([{
        label: this.translate.instant('DASHBOARD.HOME'),
        url: '/home', params: []
      }, { label: this.translate.instant('ROLE.LISTING.BREADCRUMB'), url: '/role', params: [] }]);
    }, 200);
    this.columns =
      [
        {
          label: 'ROLE.LISTING.CODE', property: 'code', type: 'string', val: '', filter: { type: 'text' }
        },
        {
          label: 'ROLE.LISTING.NAME', property: 'name', type: 'string', val: '', filter: { type: 'text' }
        },
        {
          label: 'ROLE.LISTING.DESCRIPTION', property: 'description', type: 'string', val: '', filter: { type: 'text' }
        },

      ];

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


  getAction(value) {
    switch (value.action) {
      case 'show': { this.show(value.data); break; }
      case 'edit': { this.edit(value.data); break; }
      case 'delete': { this.delete(value.data); break; }
      default: { break; }
    }
  }

  getRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.rows = data;
      },
    );
  }

  show(value) {
    this.router.navigate(['role', value.id, 'show']);
  }

  edit(value) {
    this.router.navigate(['/role', value.id]);
  }
  delete(value) {
    this.SelectedRole = value;
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  deleteRole(): void {
    this.roleService.deleteRoles(this.SelectedRole.id).subscribe(
      data => {
        this.toastr.success(this.translate.instant('TOASTER.DELETE.SUCCESS.BODY'), this.translate.instant('TOASTER.DELETE.SUCCESS.TITLE'));
        this.childModal.hide();
        this.getRoles();
      },
      err => this.toastr.error(err, this.translate.instant('TOASTER.DELETE.ERROR.TITLE')),
    );

  }
}
