import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPreviewComponent } from './dash-preview.component';

describe('DashPreviewComponent', () => {
  let component: DashPreviewComponent;
  let fixture: ComponentFixture<DashPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DashPreviewComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
