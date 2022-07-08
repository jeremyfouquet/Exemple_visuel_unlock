import { TestBed } from '@angular/core/testing';
import { IndiceService } from './indice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IndiceService', () => {
  let service: IndiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IndiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
