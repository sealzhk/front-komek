import { TestBed } from '@angular/core/testing';

import { FundraisingService } from './fundraising.service';

describe('FundraisingService', () => {
  let service: FundraisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundraisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
