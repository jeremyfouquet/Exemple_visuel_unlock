import { TestBed } from '@angular/core/testing';
import { JeuxService } from './jeux.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JeuxService', () => {
  let service: JeuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(JeuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
