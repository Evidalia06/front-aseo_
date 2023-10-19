import { TestBed } from '@angular/core/testing';

import { ConductorsService } from './conductors.service';

describe('ConductorsService', () => {
  let service: ConductorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
