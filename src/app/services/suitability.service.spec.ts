import { TestBed } from '@angular/core/testing';

import { SuitabilityService } from './suitability.service';

describe('SuitabilityService', () => {
  let service: SuitabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuitabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
