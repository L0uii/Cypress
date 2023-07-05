import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RhExportService } from './rh-export.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UntypedFormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

describe('RhExportService', () => {
  let service: RhExportService;

  beforeEach(() => {
    const translateServiceStub = () => ({ currentLang: 'fr' });
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        UntypedFormBuilder,
        { provide: TranslateService, useFactory: translateServiceStub },
      ]
    });
    service = TestBed.inject(RhExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
