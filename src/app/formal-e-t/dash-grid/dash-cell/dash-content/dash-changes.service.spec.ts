import { TestBed } from '@angular/core/testing';

import { DashChangesService } from './dash-changes.service';

describe('DashChangesService', () => {
  let service: DashChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
