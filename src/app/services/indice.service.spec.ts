import { TestBed } from '@angular/core/testing';

import { IndiceService } from './indice.service';

describe('IndiceService', () => {
  let service: IndiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
