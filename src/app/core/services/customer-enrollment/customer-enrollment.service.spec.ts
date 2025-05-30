import { TestBed } from '@angular/core/testing';

import { CustomerEnrollmentService } from './customer-enrollment.service';

describe('CustomerEnrollmentService', () => {
  let service: CustomerEnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerEnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
