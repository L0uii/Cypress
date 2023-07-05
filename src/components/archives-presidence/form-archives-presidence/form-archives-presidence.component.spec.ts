import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ArchivesPresidenceService } from 'services/archives-presidence.service';
import { UtilsService } from 'services/utils.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { SnackbarService } from 'services/snackbar.service';
import { FormArchivesPresidenceComponent } from './form-archives-presidence.component';
import { SPACE } from '@angular/cdk/keycodes';
import { utilsServiceStub } from 'services/utils.service.stub';

describe(FormArchivesPresidenceComponent.name, () => {
  let component: FormArchivesPresidenceComponent;
  let fixture: ComponentFixture<FormArchivesPresidenceComponent>;

  beforeEach(() => {
    const archivesPresidenceServiceStub = () => ({
      onChangeState: (value, inputs, uploadForm) => ({}),
      onChangeLocalisation: (value, inputs, uploadForm) => ({}),
      onChangeLocal: (value, inputs, uploadForm) => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (message, string, string1) => ({})
    });
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FormArchivesPresidenceComponent, KeyValueMockPipe, CallbackMockPipe],
      providers: [
        {
          provide: ArchivesPresidenceService,
          useFactory: archivesPresidenceServiceStub
        },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FormArchivesPresidenceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: UntypedFormBuilder = fixture.debugElement.injector.get(
        UntypedFormBuilder
      );
      const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
        UtilsService
      );
      const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
        DateAdapter
      );
      spyOn(component, 'onChanges').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(utilsServiceStub, 'removeAccents').and.callThrough();
      spyOn(dateAdapterStub, 'setLocale').and.callThrough();
      component.ngOnInit();
      expect(component.onChanges).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(utilsServiceStub.removeAccents).toHaveBeenCalled();
      expect(dateAdapterStub.setLocale).toHaveBeenCalled();
    });
  });

  // describe('onChanges', () => {
  //   it('makes expected calls', () => {
  //     const archivesPresidenceServiceStub: ArchivesPresidenceService = fixture.debugElement.injector.get(
  //       ArchivesPresidenceService
  //     );
  //     spyOn(archivesPresidenceServiceStub, 'onChangeState').and.callThrough();
  //     spyOn(
  //       archivesPresidenceServiceStub,
  //       'onChangeLocalisation'
  //     ).and.callThrough();
  //     spyOn(archivesPresidenceServiceStub, 'onChangeLocal').and.callThrough();
  //     component.onChanges();
  //     expect(archivesPresidenceServiceStub.onChangeState).toHaveBeenCalled();
  //     expect(
  //       archivesPresidenceServiceStub.onChangeLocalisation
  //     ).toHaveBeenCalled();
  //     expect(archivesPresidenceServiceStub.onChangeLocal).toHaveBeenCalled();
  //   });
  // });
});


import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keyValue'})
class KeyValueMockPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

@Pipe({name: 'callback'})
class CallbackMockPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}
