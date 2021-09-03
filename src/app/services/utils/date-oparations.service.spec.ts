import { TestBed } from '@angular/core/testing';

import { DateOparationsService } from './date-oparations.service';

describe('DateOparationsService', () => {
  let service: DateOparationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateOparationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
