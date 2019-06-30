import { ChangeDetectorRef, Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-group',
  template: `
  <div class="mypanel">
    <div class="title d-flex justify-content-between" [ngClass]="{'title-open': opened}" (click)="toggle.emit()">
      {{title}}
      <span *ngIf="opened">
      <svg-icon src="../../../../../assets/svg/moins.svg"
      [applyCss]="true" class="icon-white "  [svgStyle]="{ 'width.px':15 }">
    </svg-icon>
      </span>
      <span *ngIf="!opened">
      <svg-icon src="../../../../../assets/svg/plus.svg"
      [applyCss]="true" class="icon-grey "  [svgStyle]="{ 'width.px':15 }">
    </svg-icon>
      </span>
    </div>
    <div class="body" [ngClass]="{'hidden': !opened}">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['accordion.component.scss'],
})
export class AccordionGroupComponent implements AfterViewChecked {
  @Input() opened = false;
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cdRef: ChangeDetectorRef) { }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
