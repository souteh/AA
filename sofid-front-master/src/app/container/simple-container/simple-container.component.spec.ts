import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleContainerComponent } from './simple-container.component';

describe('SimpleContainerComponent', () => {
  let component: SimpleContainerComponent;
  let fixture: ComponentFixture<SimpleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
