import { Component, OnInit, Output, EventEmitter, QueryList, AfterContentInit, ViewChildren } from '@angular/core';
import { MenuService } from '../menu.service';
import { IMenuItem } from '../model/imenu-item';
import { AccordionMenuComponent } from './accordion-sidbar/accordion-menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterContentInit {
  isCollapsed: boolean;
  textMenu: string;
  textSubMenu: string;
  menuItems: Array<IMenuItem>;
  @ViewChildren(AccordionMenuComponent) groups: QueryList<AccordionMenuComponent>;
  @Output()
  collapseProp: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentGroup: AccordionMenuComponent;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.isCollapsed = false;
    this.menuItems = this.menuService.items;

  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.groups.toArray().forEach((t) => {
        t.toggele.subscribe(() => {
          this.openGroup(t);
          this.currentGroup = t;
        });
      });
    }, 10);
  }
  openGroup(group: any) {
    this.groups.toArray().forEach((t) => {
      t.groups.toArray()[0].opened = false;
    });
    group.groups.toArray()[0].opened = true;
  }
  SidebarCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseProp.emit(this.isCollapsed);
  }
  SidebarOpen() {
    this.isCollapsed = false;
    this.collapseProp.emit(false);

  }
  activateParent() {
    this.groups.toArray().forEach((t) => {
      t.groups.toArray()[0].active = false;
    });
    this.currentGroup.groups.toArray()[0].active = true;
  }
  cloeseSubmenu() {
    this.groups.toArray().forEach((t) => {
      t.groups.toArray()[0].active = false;
      t.groups.toArray()[0].opened = false;
    });
  }
}
