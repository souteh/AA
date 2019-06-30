import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationShellComponent } from './authentication-shell.component';

describe('AuthenticationShellComponent', () => {
  let component: AuthenticationShellComponent;
  let fixture: ComponentFixture<AuthenticationShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
