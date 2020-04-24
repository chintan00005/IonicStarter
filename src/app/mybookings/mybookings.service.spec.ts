import { TestBed } from '@angular/core/testing';

import { MybookingsService } from './mybookings.service';

describe('MybookingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MybookingsService = TestBed.get(MybookingsService);
    expect(service).toBeTruthy();
  });
});
