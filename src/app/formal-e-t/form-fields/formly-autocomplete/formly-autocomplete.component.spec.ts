import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyAutocompleteComponent } from './formly-autocomplete.component';

describe('FormlyAutocompleteComponent', () => {
  let component: FormlyAutocompleteComponent;
  let fixture: ComponentFixture<FormlyAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
