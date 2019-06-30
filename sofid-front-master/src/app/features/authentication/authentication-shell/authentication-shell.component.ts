import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authentication-shell',
  templateUrl: './authentication-shell.component.html',
  styleUrls: ['./authentication-shell.component.scss']
})
export class AuthenticationShellComponent implements OnInit {
  @Input()
  title = '';
  @Input()
  background = '1';
  @Input()
  isLoginPage = false;
  constructor() { }

  ngOnInit() {
  }

}
