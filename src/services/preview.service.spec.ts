import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { PreviewService } from './preview.service';

describe(PreviewService.name, () => {
  let service: PreviewService;

  beforeEach(() => {
    const routerStub = () => ({
      navigate: array => ({}),
      serializeUrl: arg => ({}),
      createUrlTree: array => ({})
    });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        PreviewService,
        { provide: Router, useFactory: routerStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    service = TestBed.inject(PreviewService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
