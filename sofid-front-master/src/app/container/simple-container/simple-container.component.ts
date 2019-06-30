import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-simple-container',
  templateUrl: './simple-container.component.html',
  styleUrls: ['./simple-container.component.scss']
})
export class SimpleContainerComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

}
