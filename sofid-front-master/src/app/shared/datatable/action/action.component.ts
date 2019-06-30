import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAction } from './IAction';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input()
  action: IAction;
  @Input()
  item: any;

  @Output()
  clickAction = new EventEmitter();

  actionName(actionevent) {
    this.clickAction.emit(actionevent);
  }

  constructor() { }

  ngOnInit() {
  }

}
