import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '@alfresco/adf-core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ArchivesPresidenceService } from 'services/archives-presidence.service';
import { SnackbarService } from 'services/snackbar.service';
import { UpdateResultsService } from 'services/update-results.service';
import { UtilsService } from 'services/utils.service';
import { UpdateArchivesPresidenceComponent } from './update-archives-presidence.component';
import { SPACE } from '@angular/cdk/keycodes';
import { utilsServiceStub } from 'services/utils.service.stub';

describe(UpdateArchivesPresidenceComponent.name, () => {
  let component: UpdateArchivesPresidenceComponent;
  let fixture: ComponentFixture<UpdateArchivesPresidenceComponent>;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const archivesPresidenceServiceStub = () => ({
      onChangeState: (value, inputs, uploadForm) => ({}),
      onChangeLocalisation: (value, inputs, uploadForm) => ({}),
      onChangeLocal: (value, inputs, uploadForm) => ({}),
      aspects: {},
      createDocumentProperties: (form, arg) => ({}),
      getDocumentProperties: nodeId => ({})
    });
    const snackbarServiceStub = () => ({});
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UpdateArchivesPresidenceComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: ArchivesPresidenceService,
          useFactory: archivesPresidenceServiceStub
        },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UpdateArchivesPresidenceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.close();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  // describe('init', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(component, 'onChanges').and.callThrough();
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     spyOn(utilsServiceStub, 'removeAccents').and.callThrough();
  //     component.init();
  //     expect(component.onChanges).toHaveBeenCalled();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //     expect(utilsServiceStub.removeAccents).toHaveBeenCalled();
  //   });
  // });

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

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
  //       DateAdapter
  //     );
  //     spyOn(component, 'initProperties').and.callThrough();
  //     spyOn(dateAdapterStub, 'setLocale').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.initProperties).toHaveBeenCalled();
  //     expect(dateAdapterStub.setLocale).toHaveBeenCalled();
  //   });
  // });
});
