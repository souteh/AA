import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';

@Component({
  selector: 'app-accordion',
  template: `
    <ng-content></ng-content>
`,
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(AccordionGroupComponent)
  groups: QueryList<AccordionGroupComponent>;

  ngAfterContentInit() {
    setTimeout(() => {
      this.groups.toArray()[0].opened = true;
    }, 10);
    this.groups.toArray().forEach((t) => {
      t.toggle.subscribe(() => {
        this.openGroup(t);
      });
    });
  }
  openGroup(group: any) {
    this.groups.toArray().forEach((t) => t.opened = false);
    group.opened = true;
  }
}
