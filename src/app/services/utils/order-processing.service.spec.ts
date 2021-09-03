import { TestBed } from '@angular/core/testing';

import { OrderProcessingService } from './order-processing.service';

describe('OrderProcessingService', () => {
  let service: OrderProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
