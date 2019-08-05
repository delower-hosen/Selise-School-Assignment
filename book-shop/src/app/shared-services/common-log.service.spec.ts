import { TestBed } from '@angular/core/testing';

import { CommonLogService } from './common-log.service';

describe('CommonLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonLogService = TestBed.get(CommonLogService);
    expect(service).toBeTruthy();
  });
});
