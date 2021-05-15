import { TestBed } from '@angular/core/testing';

import { AuctionBackendService } from './auction-backend.service';

describe('AuctionBackendService', () => {
  let service: AuctionBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
