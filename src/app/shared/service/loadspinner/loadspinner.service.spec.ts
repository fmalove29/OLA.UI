import { TestBed } from '@angular/core/testing';

import { LoadspinnerService } from './loadspinner.service';

describe('LoadspinnerService', () => {
  let service: LoadspinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadspinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
