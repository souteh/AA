import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../config.service';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { PageTitle } from 'src/app/core/pageTitle.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
  roleForm: FormGroup;
  isCollapsed = true;
  domain = [];
  id: string;
  defaultLanguage: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private toastr: ToastrService,
    private roleService: RoleService,
    private config: ConfigService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle) {
    this.defaultLanguage = this.config.languages[0];

    this.roleForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }
  private addCheckboxes(action, controlArray, domain?: any[]) {
    if (!domain) {
      action.map((o, i) => {
        const control = new FormControl(false);
        (this.roleForm.controls[controlArray] as FormArray).push(control);
      });
    } else {
      action.map((o, i) => {
        let control: FormControl;
        if (domain[controlArray] && domain[controlArray].includes(o.id)) {
          control = new FormControl(true);
        } else {
          control = new FormControl(false);
        }
        (this.roleForm.controls[controlArray] as FormArray).push(control);
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] === '0') {
        this.titleService.changeMessage('ROLE.ADDITION.PAGE_TITLE');
        setTimeout(x => {
          this.breadcrumbsService.store([{
            label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
            params: []
          }, { label: this.translate.instant('ROLE.LISTING.BREADCRUMB'), url: '/role', params: [] },
          { label: this.translate.instant('ROLE.ADDITION.BREADCRUMB'), url: '/role/0', params: [] }]);
        }, 200);

        this.roleService.getDomain().subscribe(
          data => {
            this.domain = data;
            this.domain.forEach(x => {
              this.roleForm.setControl(x.id, new FormArray([]));
              this.addCheckboxes(x.actions, x.id);
            });
          },
        );

      } else {
        this.titleService.changeMessage('ROLE.EDITION.TITLE');
        setTimeout(x => {
          this.breadcrumbsService.store([{
            label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
            params: []
          }, { label: this.translate.instant('ROLE.LISTING.BREADCRUMB'), url: '/role', params: [] },
          { label: this.translate.instant('ROLE.EDITION.BREADCRUMB'), url: '/role/' + params['id'], params: [] }]);
        }, 200);
        this.roleService.getById(params['id']).subscribe(
          data => {
            this.roleForm.controls['code'].setValue(data.code);
            this.roleForm.controls['name'].setValue(data.i18nTextName.translations['fr']);
            this.roleForm.controls['i18nTextName']['controls']['translations'].patchValue(data.i18nTextName.translations);
            this.roleForm.controls['description'].setValue(data.i18nTextDescription.translations['fr']);
            this.roleForm.controls['i18nTextDescription']['controls']['translations'].patchValue(data.i18nTextDescription.translations);
            this.roleService.getDomain().subscribe(
              res => {
                this.domain = res;
                this.domain.forEach(x => {
                  this.roleForm.setControl(x.id, new FormArray([]));
                  this.addCheckboxes(x.actions, x.id, data.domainActions);
                });
                Object.keys(data.domainActions).forEach(function (value, i) {
                  const keyElement = res.find(x => x.id === +Object.keys(data.domainActions)[i]).name;
                  const domainLength = res.find(x => x.id === +Object.keys(data.domainActions)[i]).actions.length;
                  const domainActionLength = data.domainActions[Object.keys(data.domainActions)[i]].length;
                  if (domainLength === domainActionLength) {
                    setTimeout(() => {
                      document.getElementById(keyElement)['checked'] = 'true';
                    }, 0);
                  }
                });
              },
            );
          }
        );
      }
    });
  }

  createRole() {
    const test: any = {};
    this.roleForm.value['domainActions'] = {};
    this.domain.forEach((x, j) => {
      if (this.roleForm.value[x.id]) {
        test[x.id] = this.roleForm.value[x.id]
          .map((v, i) => v ? this.domain[j].actions[i].id : null)
          .filter(v => v !== null);
      }
      delete this.roleForm.value[x.id];
      this.roleForm.value['domainActions'] = test;
    });
    if (this.id === '0') {
      this.roleService.create(this.roleForm.value).subscribe(
        data => {
          this.toastr.success(this.translate.instant('TOASTER.SUCCESS.BODY'), this.translate.instant('TOASTER.SUCCESS.TITLE'));
          this.router.navigate(['/role']);
        },
        err => this.toastr.error(err, this.translate.instant('TOASTER.ERROR.TITLE')),
      );
    } else {
      this.roleForm.value['id'] = this.id;
      this.roleService.update(this.roleForm.value, this.id).subscribe(
        data => {
          this.toastr.success(this.translate.instant('TOASTER.UPDATE.SUCCESS.BODY'),
            this.translate.instant('TOASTER.UPDATE.SUCCESS.TITLE'));
          this.router.navigate(['/role']);
        },
        err => this.toastr.error(err, this.translate.instant('TOASTER.UPDATE.ERROR.TITLE')),
      );
    }
  }
  reset() {
    this.roleForm.reset();
  }
  selectAll(event, val) {
    this.roleForm.controls[val.id]['controls'].forEach(element => {
      element.setValue(event.srcElement.checked);
    });
  }
  selectAction(event, val) {
    const selectedDomainlength = this.roleForm.value[val.id].filter(x => x === true).length;
    const actionLength = val.actions.length;
    if (selectedDomainlength === actionLength) {
     document.getElementById(val.name)['checked'] = true;
    } else {
      document.getElementById(val.name)['checked'] = false;
    }
  }
}
