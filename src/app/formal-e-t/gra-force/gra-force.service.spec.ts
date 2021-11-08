import { TestBed } from '@angular/core/testing';

import { GraForceService } from './gra-force.service';

describe('GraForceService', () => {
  let service: GraForceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(GraForceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
