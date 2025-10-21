import { TestBed } from '@angular/core/testing';

import { SelectedUserRolesService } from './selected-user-roles.service';

describe('SelectedUserRolesService', () => {
  let service: SelectedUserRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedUserRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
