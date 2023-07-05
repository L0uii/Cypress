import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SearchDossierGeranceService } from './search-dossier-gerance.service';

describe('SearchDossierGeranceService', () => {
  let service: SearchDossierGeranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ]
    });
    service = TestBed.inject(SearchDossierGeranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
