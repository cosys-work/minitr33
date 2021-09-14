import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLogicComponent } from './dash-logic.component';

describe('DashLogicComponent', () => {
  let component: DashLogicComponent;
  let fixture: ComponentFixture<DashLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashLogicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
