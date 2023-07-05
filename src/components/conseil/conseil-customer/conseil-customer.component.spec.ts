import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { SnackbarService } from 'services/snackbar.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { UtilsService } from 'services/utils.service';
import { FetchDataService } from 'services/fetch-data.service';
import { FormsModule } from '@angular/forms';
import { ConseilCustomerComponent } from './conseil-customer.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { MaterialModule } from 'app/modules/material/material.module';
import { fetchDataServiceStub } from 'services/fetch-data.stub';

describe(ConseilCustomerComponent.name, () => {
  let component: ConseilCustomerComponent;
  let fixture: ComponentFixture<ConseilCustomerComponent>;
  const translateServiceStub = () => ({ currentLang: 'fr' });

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (arg, string, string1) => ({})
    });
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConseilCustomerComponent],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ConseilCustomerComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

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

  // describe('searchCustomers', () => {
  //   it('makes expected calls', () => {
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
  //       FetchDataService
  //     );
  //     spyOn(component, 'initializeForm').and.callThrough();
  //     spyOn(utilsServiceStub, 'removeAccents').and.callThrough();
  //     spyOn(fetchDataServiceStub, 'conseilCustomers').and.callThrough();
  //     component.searchCustomers();
  //     expect(component.initializeForm).toHaveBeenCalled();
  //     expect(utilsServiceStub.removeAccents).toHaveBeenCalled();
  //     expect(fetchDataServiceStub.conseilCustomers).toHaveBeenCalled();
  //   });
  // });

  describe('showNewCustomer', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initializeForm').and.callThrough();
      spyOn(component, 'closeDirectory').and.callThrough();
      component.showNewCustomer();
      expect(component.initializeForm).toHaveBeenCalled();
      expect(component.closeDirectory).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initializeForm').and.callThrough();
      component.ngOnInit();
      expect(component.initializeForm).toHaveBeenCalled();
    });
  });
});
