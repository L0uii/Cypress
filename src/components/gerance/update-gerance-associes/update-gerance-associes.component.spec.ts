import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../../../app/modules/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { UpdateResultsService } from '../../../services/update-results.service';
import { UserService } from '../../../services/user.service';
import { Location } from '@angular/common';
import { GeranceAssociesService } from '../../../services/gerance-associes.service';
import { CustomerGeranceAssocies } from '../../../models/customer-gerance-associes';
import { ClassementGeranceAssocies } from '../../../models/classement-gerance-associes';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UpdateDocumentService } from '../../../services/update-document.service';
import { UpdateGeranceAssociesComponent } from './update-gerance-associes.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { updateDocumentServiceStub } from 'services/update-document.service.stub';
import { of } from 'rxjs';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';
import { userServiceStub } from 'services/user.service.stub';

describe(UpdateGeranceAssociesComponent.name, () => {
  let component: UpdateGeranceAssociesComponent;
  let fixture: ComponentFixture<UpdateGeranceAssociesComponent>;

  beforeEach(() => {
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [UpdateGeranceAssociesComponent],
      providers: [
        { provide: DateAdapter, useFactory: dateAdapterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(new Map(Object.entries({
              nodeId: '00000000-0000-0000-000000000000'
            })))
          }
        },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        {
          provide: UpdateDocumentService,
          useFactory: updateDocumentServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(UpdateGeranceAssociesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('setCustomer', () => {
  //   it('makes expected calls', () => {
  //     const customerGeranceAssociesStub: CustomerGeranceAssocies = <any>{};
  //     spyOn(component, 'destroyCustomer').and.callThrough();
  //     component.setCustomer(customerGeranceAssociesStub);
  //     expect(component.destroyCustomer).toHaveBeenCalled();
  //   });
  // });

  // describe('selectInputs', () => {
  //   it('makes expected calls', () => {
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     const geranceAssociesServiceStub: GeranceAssociesService = fixture.debugElement.injector.get(
  //       GeranceAssociesService
  //     );
  //     const classementGeranceAssociesStub: ClassementGeranceAssocies = <any>{};
  //     spyOn(utilsServiceStub, 'removeDuplicates').and.callThrough();
  //     spyOn(
  //       geranceAssociesServiceStub,
  //       'getTypeDossierAssocie'
  //     ).and.callThrough();
  //     component.selectInputs(classementGeranceAssociesStub);
  //     expect(utilsServiceStub.removeDuplicates).toHaveBeenCalled();
  //     expect(
  //       geranceAssociesServiceStub.getTypeDossierAssocie
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
  //       DateAdapter
  //     );
  //     spyOn(component, 'pickClient').and.callThrough();
  //     spyOn(component, 'checkNumeroAssocie').and.callThrough();
  //     spyOn(dateAdapterStub, 'setLocale').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.pickClient).toHaveBeenCalled();
  //     expect(component.checkNumeroAssocie).toHaveBeenCalled();
  //     expect(dateAdapterStub.setLocale).toHaveBeenCalled();
  //   });
  // });

  // describe('close', () => {
  //   it('makes expected calls', () => {
  //     const locationStub: Location = fixture.debugElement.injector.get(
  //       Location
  //     );
  //     spyOn(locationStub, 'back').and.callThrough();
  //     component.close();
  //     expect(locationStub.back).toHaveBeenCalled();
  //   });
  // });

  // describe('pickDocument', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fullInit').and.callThrough();
  //     component.pickDocument();
  //     expect(component.fullInit).toHaveBeenCalled();
  //   });
  // });

  // describe('pickClient', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'fullInit').and.callThrough();
  //     component.pickClient();
  //     expect(component.fullInit).toHaveBeenCalled();
  //   });
  // });

  // describe('fullInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'initializePropertiesClient').and.callThrough();
  //     spyOn(component, 'initializePropertiesDocument').and.callThrough();
  //     component.fullInit();
  //     expect(component.initializePropertiesClient).toHaveBeenCalled();
  //     expect(component.initializePropertiesDocument).toHaveBeenCalled();
  //   });
  // });

  // describe('goToSelect', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'destroyCustomer').and.callThrough();
  //     spyOn(component, 'reset').and.callThrough();
  //     component.goToSelect();
  //     expect(component.destroyCustomer).toHaveBeenCalled();
  //     expect(component.reset).toHaveBeenCalled();
  //   });
  // });

  // describe('updatingDocumentForm', () => {
  //   it('makes expected calls', () => {
  //     const geranceAssociesServiceStub: GeranceAssociesService = fixture.debugElement.injector.get(
  //       GeranceAssociesService
  //     );
  //     spyOn(
  //       geranceAssociesServiceStub,
  //       'getTypeDossierAssocie'
  //     ).and.callThrough();
  //     component.updatingDocumentForm();
  //     expect(
  //       geranceAssociesServiceStub.getTypeDossierAssocie
  //     ).toHaveBeenCalled();
  //   });
  // });
});
