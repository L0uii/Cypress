import { utilsServiceStub } from 'services/utils.service.stub';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { PreviewService } from 'services/preview.service';
import { SnackbarService } from 'services/snackbar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from './utils.service';

describe(UtilsService.name, () => {
  let service: UtilsService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({});
    const snackbarServiceStub = () => ({

    });
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        UtilsService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    service = TestBed.inject(UtilsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
