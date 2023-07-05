import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'services/utils.service';
import { FormsModule, UntypedFormBuilder } from '@angular/forms';
import { utilsServiceStub } from 'services/utils.service.stub';
import { RouterTestingModule } from '@angular/router/testing';
import { MissingDocumentsMrComponent } from './missing-documents-mr.component';
import { userServiceStub } from 'services/user.service.stub';
import { UserService } from 'services/user.service';
import { of } from 'rxjs';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { expertiseServiceStub } from 'services/expertise.stub';
import { ExpertiseService } from 'services/expertise.service';
import { DownloadService } from 'services/download.service';
import { MailService } from 'services/mail.service';
import { MissingDocumentsMrService } from 'services/missing-documents-mr.service';

describe(MissingDocumentsMrComponent.name, () => {
  let component: MissingDocumentsMrComponent;
  let fixture: ComponentFixture<MissingDocumentsMrComponent>;
  let router: Router;

  const customerMock = {
    numeroDossier: 'numeroDossier',
    nomDossier: 'nomDossier',
    codeBudget: 'codeBudget',
  }

  beforeEach(() => {
    
    const searchDossierExpertiseServiceStub = () => ({
        getCustomers: codeBudget => of([customerMock]),
        hasRcuErrorOnExpertiseSearch: () => false,
        getExpertiseDossierData: str => of(customerMock),
        getCachedExpertiseDossierData: () => (customerMock)
    });
    const downloadServiceStub = () => ({});
    const mailServiceStub = () => ({});
    const missingDocumentsMrServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MissingDocumentsMrComponent],
      providers: [
        UntypedFormBuilder,
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: SearchDossierExpertiseService, useFactory: searchDossierExpertiseServiceStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
        { provide: DownloadService, useFactory: downloadServiceStub },
        { provide: MailService, useFactory: mailServiceStub },
        { provide: MissingDocumentsMrService, useFactory: missingDocumentsMrServiceStub },
      ]
    });
    fixture = TestBed.createComponent(MissingDocumentsMrComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should add a customer', () => {
    component.addCustomer(customerMock);
    expect(component.showDirectory).toBeFalse();
  });

  it('should clear a customer', () => {
    spyOn(component.eventsDossier, 'next');
    spyOn(sessionStorage, 'removeItem');

    component.clearCustomer();

    expect(component.customer).toEqual(null);
    expect(component.showDirectory).toEqual(true);
    expect(component.missingDocumentsList).toEqual([]);
    expect(component.missingDocumentsByOnglet).toEqual([]);
    expect(sessionStorage.removeItem).toHaveBeenCalled();
  });

  it('should reset', () => {
    spyOn(component, 'clearCustomer');
    spyOn(component.form, 'reset');
    component.reset();
    
    expect(component.showButtons).toBeFalse();
    expect(component.clearCustomer).toHaveBeenCalled();
    expect(component.form.reset).toHaveBeenCalledWith({ profileType: null, documentType: null });
  });

  it('should get MissingDocumentsByOnglet', () => {
    const missingDocumentsMock = {
        onglet: '',
        classement: '',
        nomDocument: '',
        isMissing: true,
        showOnEmail: true,
        commentaires: '',
      }
    component.getMissingDocumentsByOnglet([missingDocumentsMock], true);
  });
});
