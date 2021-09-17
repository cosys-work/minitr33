import { TestBed } from '@angular/core/testing';

import { DashUpdatesService } from './dash-updates.service';

describe('DashUpdatesService', () => {
  let service: DashUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
