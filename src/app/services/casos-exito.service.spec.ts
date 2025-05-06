import { TestBed } from '@angular/core/testing';

import { CasosExitoService } from './casos-exito.service';

describe('CasosExitoService', () => {
  let service: CasosExitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasosExitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
