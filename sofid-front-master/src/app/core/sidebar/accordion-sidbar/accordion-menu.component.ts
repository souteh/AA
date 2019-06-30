import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { AccordionGroupMenuComponent } from './accordion-group-menu.component';

@Component({
    selector: 'app-accordion-menu',
    template: `
    <ng-content></ng-content>
`,
    styleUrls: ['./accordion-menu.component.scss']
})
export class AccordionMenuComponent implements AfterContentInit {
    @ContentChildren(AccordionGroupMenuComponent)
    groups: QueryList<AccordionGroupMenuComponent>;
    @Output()
    toggele: EventEmitter<boolean> = new EventEmitter<boolean>();
    ngAfterContentInit() {
        setTimeout(() => {
            this.groups.toArray()[0].opened = false;
        }, 10);
        this.groups.toArray().forEach((t) => {
            t.toggle.subscribe(() => {
                this.toggele.emit(true);
                this.openGroup(t);
            });
        });
    }
    openGroup(group: any) {
        this.groups.toArray().forEach((t) => t.opened = false);
        group.opened = true;
    }
}
