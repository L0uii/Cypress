import { TestBed } from '@angular/core/testing';
import { ContextSearchMrService } from './context-search-mr.service';

describe(ContextSearchMrService.name, () => {
  let service: ContextSearchMrService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContextSearchMrService] });
    service = TestBed.inject(ContextSearchMrService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
