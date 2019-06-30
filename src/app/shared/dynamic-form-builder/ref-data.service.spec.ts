import { TestBed } from '@angular/core/testing';

import { RefDataService } from './ref-data.service';

describe('RefDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefDataService = TestBed.get(RefDataService);
    expect(service).toBeTruthy();
  });
});
