
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { TranslateService } from '@ngx-translate/core';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-role-show',
  templateUrl: './role-show.component.html',
  styleUrls: ['./role-show.component.scss']
})
export class RoleShowComponent implements OnInit {
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
    private roleService: RoleService,
    private breadcrumbsService: BreadcrumbsService,
    private titleService: PageTitle,
    private configService: ConfigService) {
      this.defaultLanguage = this.configService.languages[0];

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
      if (params['id'] !== '0') {
        setTimeout(x => {
          this.breadcrumbsService.store([{
            label: this.translate.instant('DASHBOARD.HOME'), url: '/home',
            params: []
          }, { label: this.translate.instant('ROLE.LISTING.BREADCRUMB'), url: '/role', params: [] },
          { label: this.translate.instant('ROLE.SHOW.BREADCRUMB'), url: '/role/' + params['id'] + '/show', params: [] }]);
        }, 200);
        this.titleService.changeMessage('ROLE.SHOW.PAGE_TITLE');
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
              },
            );
          }
        );
      }
    });
  }

  updateRole() {
    this.router.navigate(['/role', this.id]);
  }

}
