import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FidusignService } from 'services/fidusign.service';
import { SnackbarService } from 'services/snackbar.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { UtilsService } from 'services/utils.service';
import { Location } from '@angular/common';
import { CopieMailComponent } from './copie-mail.component';
import { COMMA, SPACE } from '@angular/cdk/keycodes';
import { utilsServiceStub } from 'services/utils.service.stub';
import { fidusignServiceStub } from 'services/fidusign.service.stub';

describe(CopieMailComponent.name, () => {
  let component: CopieMailComponent;
  let fixture: ComponentFixture<CopieMailComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const locationStub = () => ({ back: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CopieMailComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: FidusignService, useFactory: fidusignServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Location, useFactory: locationStub }
      ]
    });
    fixture = TestBed.createComponent(CopieMailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('add', () => {
  //   it('makes expected calls', () => {
  //     const matChipInputEventStub: MatChipInputEvent = <any>{};
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(component, 'validateCopieMail').and.callThrough();
  //     spyOn(utilsServiceStub, 'validateEmail').and.callThrough();
  //     component.add(matChipInputEventStub);
  //     expect(component.validateCopieMail).toHaveBeenCalled();
  //     expect(utilsServiceStub.validateEmail).toHaveBeenCalled();
  //   });
  // });

  // describe('forwardDocument', () => {
  //   it('makes expected calls', () => {
  //     const fidusignServiceStub: FidusignService = fixture.debugElement.injector.get(
  //       FidusignService
  //     );
  //     const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
  //       SnackbarService
  //     );
  //     spyOn(fidusignServiceStub, 'forward').and.callThrough();
  //     spyOn(snackbarServiceStub, 'openSnackBar').and.callThrough();
  //     component.forwardDocument();
  //     expect(fidusignServiceStub.forward).toHaveBeenCalled();
  //     expect(snackbarServiceStub.openSnackBar).toHaveBeenCalled();
  //   });
  // });

  describe('initializeForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: UntypedFormBuilder = fixture.debugElement.injector.get(
        UntypedFormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.initializeForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'initializeForm').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.initializeForm).toHaveBeenCalled();
  //   });
  // });
});
