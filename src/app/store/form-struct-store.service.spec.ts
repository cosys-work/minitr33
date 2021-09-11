import { TestBed } from '@angular/core/testing';

import { FormStructStoreService } from './form-struct-store.service';

describe('FormStructStoreService', () => {
  let service: FormStructStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStructStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
