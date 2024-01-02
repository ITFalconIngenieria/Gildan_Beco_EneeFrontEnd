import { TestBed } from '@angular/core/testing';

import { SpinnerLoaderServiceService } from './spinner-loader-service.service';

describe('SpinnerLoaderServiceService', () => {
  let service: SpinnerLoaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerLoaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
