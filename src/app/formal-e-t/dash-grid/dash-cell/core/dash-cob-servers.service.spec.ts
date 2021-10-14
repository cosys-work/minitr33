import { TestBed } from '@angular/core/testing';

import { DashCobServersService } from './dash-cob-servers.service';

describe('DashCobServersService', () => {
  let service: DashCobServersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashCobServersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
