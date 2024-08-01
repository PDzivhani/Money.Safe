import { TestBed } from '@angular/core/testing';

import { BalanceTrackingService } from './balance-tracking.service';

describe('BalanceTrackingService', () => {
  let service: BalanceTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
