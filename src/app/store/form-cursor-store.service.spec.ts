import { TestBed } from '@angular/core/testing';

import { FormCursorStoreService } from './form-cursor-store.service';

describe('FormCursorStoreService', () => {
  let service: FormCursorStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCursorStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
