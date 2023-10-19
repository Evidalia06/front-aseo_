import { TestBed } from '@angular/core/testing';

import { ComunasService } from './comunas.service';

describe('ComunasService', () => {
  let service: ComunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
