import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCellComponent } from './dash-cell.component';

describe('DashCellComponent', () => {
  let component: DashCellComponent;
  let fixture: ComponentFixture<DashCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
