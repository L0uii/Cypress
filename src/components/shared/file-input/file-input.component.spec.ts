import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SnackbarService } from 'services/snackbar.service';
import { UtilsService } from 'services/utils.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input.component';
import { utilsServiceStub } from 'services/utils.service.stub';

describe(FileInputComponent.name, () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openInfo: (string1, string2) => ({})
    });
    const routerStub = () => ({});
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FileInputComponent],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('nextStep', () => {
    it('makes expected calls', () => {
      const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
        SnackbarService
      );
      spyOn(snackbarServiceStub, 'openInfo').and.callThrough();
      component.nextStep();
      expect(snackbarServiceStub.openInfo).toHaveBeenCalled();
    });
  });
});
