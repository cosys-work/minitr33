import { TestBed } from '@angular/core/testing';

import { FieldRefsStoreService } from './field-refs-store.service';

describe('FieldRefsStoreService', () => {
  let service: FieldRefsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldRefsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
