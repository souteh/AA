import { Component } from '@angular/core';
import { MenuService } from './core/menu.service';
import { initiMenuItems } from './app.menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nomad-fe';


  constructor(private menuService: MenuService,
    public translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');

    this.menuService.items = initiMenuItems;
  }
}
