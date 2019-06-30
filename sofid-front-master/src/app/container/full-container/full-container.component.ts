import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbsService } from 'ng6-breadcrumbs';
import { ConfigService } from 'src/app/config.service';
import { PageTitle } from 'src/app/core/pageTitle.service';
import { IMenuItem } from 'src/app/core/model/imenu-item';

@Component({
  selector: 'app-full-container',
  templateUrl: './full-container.component.html',
  styleUrls: ['./full-container.component.scss']
})
export class FullContainerComponent implements OnInit {

  defaultLanguage: any;
  isCollapsed: false;
  username = '';
  profilItems: Array<IMenuItem>;
  public title = '';
  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private config: ConfigService,
    private pageTitle: PageTitle

  ) {
    this.defaultLanguage = this.config.languages[0];
  }

  ngOnInit() {
    this.username = localStorage.getItem('FIRSTNAME') + ' ' + localStorage.getItem('LASTNAME');
    setTimeout(x => {
      this.breadcrumbsService.store([{ label: 'Accueil', url: '/home', params: [] }]);
    }, 200);
    this.pageTitle.currentTitle.subscribe(
      data => this.title = data
    );
    this.profilItems = [
      {
        text: 'SELFCARE.PROFIL',
        icon: './../../../assets/svg/profil_icon.svg',
        route: '/profil',
        submenu: null
      },
      {
        text: 'SELFCARE.SETTING',
        icon: './../../../assets/svg/parametres_icon.svg',
        route: '/setting',
        submenu: null
      },
      {
        text: 'SELFCARE.LOGOUT',
        icon: './../../../assets/svg/logout_icon.svg',
        route: '/authentication',
        submenu: null
      }
    ];
  }
  collapeEmiter(value) {
    this.isCollapsed = value;
  }
  action(val) {
    if (val === 'SELFCARE.LOGOUT') {
      localStorage.removeItem('FIRSTNAME');
      localStorage.removeItem('LASTNAME');
      localStorage.removeItem('TOKEN');
    }
  }
}
