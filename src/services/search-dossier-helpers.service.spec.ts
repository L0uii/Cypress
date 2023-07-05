import { TestBed } from '@angular/core/testing';

import { SearchDossierHelpersService } from './search-dossier-helpers.service';

describe('SearchDossierHelpersService', () => {
  let service: SearchDossierHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDossierHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
