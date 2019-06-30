import { ChangeDetectorRef, Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-group-menu',
  template: `
  <div class="mypanel  " [class.active]="active" >
    <div class="title d-flex justify-content-between " (click)="toggle.emit()">
    <div class=" icon-menu ">
    <svg-icon
    src="{{icon}}"
    [applyCss]="true"
    class="icon-white "
    [svgStyle]="{ 'width.px':18, 'height.px':15 }"
    >
    </svg-icon>
    <span class="ml-1">{{title}}</span>
</div>
      <svg-icon src="../../../../../assets/svg/arrow_icon.svg"
      [applyCss]="true" class="icon-white "  [ngClass]="{'svg-rotate-side': !opened}" [svgStyle]="{ 'width.px':9,'height.px' :9 }" >
    </svg-icon>
    </div>
    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  styleUrls: ['accordion-menu.component.scss'],
})
export class AccordionGroupMenuComponent implements AfterViewChecked {
  @Input() opened = false;
  @Input() title: string;
  @Input() icon: string;
  active = false;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cdRef: ChangeDetectorRef) { }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  change() {
    this.opened = !this.opened;
  }
}
