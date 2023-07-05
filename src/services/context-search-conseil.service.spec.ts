import { TestBed } from '@angular/core/testing';
import { ContextSearchConseilService } from './context-search-conseil.service';

describe(ContextSearchConseilService.name, () => {
  let service: ContextSearchConseilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextSearchConseilService]
    });
    service = TestBed.inject(ContextSearchConseilService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
