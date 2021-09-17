import { TestBed } from '@angular/core/testing';

import { FormalFieldsStoreService } from './formal-fields-store.service';

describe('FormalFieldsStoreService', () => {
  let service: FormalFieldsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalFieldsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
