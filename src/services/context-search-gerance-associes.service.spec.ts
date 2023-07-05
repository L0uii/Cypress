import { TestBed } from '@angular/core/testing';
import { ContextSearchGeranceAssociesService } from './context-search-gerance-associes.service';

describe(ContextSearchGeranceAssociesService.name, () => {
  let service: ContextSearchGeranceAssociesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextSearchGeranceAssociesService]
    });
    service = TestBed.inject(ContextSearchGeranceAssociesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
