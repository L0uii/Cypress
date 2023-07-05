import { updateDocumentServiceStub } from 'services/update-document.service.stub';
import { UpdateDocumentService } from 'services/update-document.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '@alfresco/adf-core';
import { SnackbarService } from 'services/snackbar.service';
import { UpdateResultsService } from 'services/update-results.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from 'services/utils.service';
import { ConseilService } from 'services/conseil.service';
import { GroupService } from 'services/group.service';
import { DateAdapter } from '@angular/material/core';
import { UserService } from 'services/user.service';
import { Location } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UpdateConseilComponent } from './update-conseil.component';
import { User } from 'models/user';
import { CLASSEMENT, DossierConseil } from 'models/conseil';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { FetchConseilProdListService } from 'services/fetch-conseil-prod-list.service';
import { of } from 'rxjs';
import { conseilServiceStub } from 'services/conseil.stub';

describe(UpdateConseilComponent.name, () => {
  let component: UpdateConseilComponent;
  let fixture: ComponentFixture<UpdateConseilComponent>;

  const classements = {
    documentType: CLASSEMENT
  };

  beforeEach(() => {
    const activatedRouteStub = () => ({ params: of({nodeId: '00000000-0000-0000-000000000000'}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const translateServiceStub = () => ({ currentLang: 'fr' });
    const fetchConseilProdListServiceStub = () => ({
      getProdList: () => of([])
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [UpdateConseilComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: ConseilService, useFactory: conseilServiceStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: FetchConseilProdListService, useFactory: fetchConseilProdListServiceStub },
        { provide: UpdateDocumentService, useFactory: updateDocumentServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UpdateConseilComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
  //       DateAdapter
  //     );
  //     spyOn(component, 'checkCodeBudget').and.callThrough();
  //     spyOn(component, 'checkNumeroClient').and.callThrough();
  //     spyOn(dateAdapterStub, 'setLocale').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.checkCodeBudget).toHaveBeenCalled();
  //     expect(component.checkNumeroClient).toHaveBeenCalled();
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
  //     spyOn(component, 'initializePropertiesDocument').and.callThrough();
  //     spyOn(component, 'initializePropertiesClient').and.callThrough();
  //     component.fullInit();
  //     expect(component.initializePropertiesDocument).toHaveBeenCalled();
  //     expect(component.initializePropertiesClient).toHaveBeenCalled();
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
});
