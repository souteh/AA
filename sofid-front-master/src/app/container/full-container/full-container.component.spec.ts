import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullContainerComponent } from './full-container.component';

describe('FullContainerComponent', () => {
  let component: FullContainerComponent;
  let fixture: ComponentFixture<FullContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
