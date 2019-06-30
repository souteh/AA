import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTraductionComponent } from './input-traduction.component';

describe('InputTraductionComponent', () => {
  let component: InputTraductionComponent;
  let fixture: ComponentFixture<InputTraductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTraductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTraductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
