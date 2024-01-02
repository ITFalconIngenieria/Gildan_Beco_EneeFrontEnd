import { TestBed } from '@angular/core/testing';

import { EndPointGobalService } from './end-point-gobal.service';

describe('EndPointGobalService', () => {
  let service: EndPointGobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndPointGobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
