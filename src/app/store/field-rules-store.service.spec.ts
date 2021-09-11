import { TestBed } from '@angular/core/testing';

import { FieldRulesStoreService } from './field-rules-store.service';

describe('FieldRulesStoreService', () => {
  let service: FieldRulesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldRulesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
