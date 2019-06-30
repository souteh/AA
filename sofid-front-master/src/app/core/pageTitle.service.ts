import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';



@Injectable()
export class PageTitle {
  private titleSource = new BehaviorSubject<string>('DASHBOARD.HOME');
  currentTitle = this.titleSource.asObservable();
  constructor() {
  }

  changeMessage(message: string) {
    this.titleSource.next(message);
  }
}
