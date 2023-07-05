import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExpertiseService } from 'services/expertise.service';
import { SnackbarService } from 'services/snackbar.service';
import { UpdateResultsService } from 'services/update-results.service';
import { UserService } from 'services/user.service';
import { UtilsService } from 'services/utils.service';
import { UpdateMrComponent } from './update-mr.component';
import { CLASSEMENT, MANDATORY_METADATAS } from 'models/mr';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expertiseServiceStub } from 'services/expertise.stub';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { of } from 'rxjs';
import { UpdateDocumentService } from 'services/update-document.service';
import { updateDocumentServiceStub } from 'services/update-document.service.stub';

describe(UpdateMrComponent.name, () => {
  let component: UpdateMrComponent;
  let fixture: ComponentFixture<UpdateMrComponent>;
  let router: Router;

  const classements = {
    documentType: CLASSEMENT
      .filter(el => !el.noUpload)
      .sort((a, b) =>
        a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    mandatoryMetadata: MANDATORY_METADATAS,
    famille: '',
    sousFamille: '',
  }

  const customerMock = {
    numeroDossier: 'numeroDossier',
    nomDossier: 'nomDossier',
    codeBudget: 'codeBudget',
  }

  beforeEach(() => {
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const activatedRouteStub = () => ({ params: of({ nodeId: '{abc},{abc}' }) });
  
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({}),
      refreshDocumentList: () => ({ next: () => of({}) })
    });
    const searchDossierExpertiseServiceStub = () => ({
      getCustomers: codeBudget => of([])
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UpdateMrComponent],
      providers: [
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: SearchDossierExpertiseService, useFactory: searchDossierExpertiseServiceStub },
        { provide: UpdateDocumentService, useFactory: updateDocumentServiceStub }
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(UpdateMrComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('categorieHandler', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'classement': new FormControl({ documentType: { onglet: '' } }),
      });

      component.classements = classements;

      component.categorieHandler('abc');

      expect(component.classements).toBeDefined();
    });
  });

  describe('categorieHandler', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'classement': new FormControl({ documentType: { labelFamille : '' } }),
        'categorie': new FormControl({}),
      });

      component.classements = classements;
      
      component.classementHandler('abc');

      expect(component.classements).toBeDefined();
    });
  });

  describe('documentTypeHandler', () => {
    it('makes expected calls', () => {

      spyOn(component, 'selectInputs').and.callFake(() => {});
      component.updateDocumentForm = new FormGroup({
        'classement': new FormControl({documentType: { labelFamille : '' }}),
        'categorie': new FormControl({}),
        'documentType': new FormControl(''),
      });

      component.classements = classements;
      
      component.documentTypeHandler('abc');

      expect(component.classements).toBeDefined();
    });
  });

  describe('destroySelectedCustomer', () => {
    it('makes expected calls', () => {
      
      component.destroySelectedCustomer();

      expect(component.showDirectory).toBeTrue();
      expect(component.showSelectedCustomer).toBeFalse();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      spyOn(router, 'navigate')
      component.close(false);

      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('setCustomer', () => {
    it('makes expected calls', () => {
      component.setCustomer(customerMock);
      
      expect(component.showDirectory).toBeFalse();
      expect(component.showSelectedCustomer).toBeTrue();
    });
  });

  describe('destroyCustomer', () => {
    it('makes expected calls', () => {
      spyOn(component.updateCustomer, 'reset');
      component.destroyCustomer();
      
      expect(component.showDirectory).toBeTrue();
      expect(component.showSelectedCustomer).toBeFalse();
      expect(component.showCustomerForm).toBeFalse();
      expect(component.updateCustomer.reset).toHaveBeenCalled();
    });
  });

  describe('matchMetadataToInput', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'name': new FormControl('')
      });
      component.matchMetadataToInput([{ name: 'name' , obligatoire: false }]);
    });
  });

  describe('reset', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'documentType': new FormControl('')
      });
      spyOn(component.updateDocumentForm, 'reset');
      component.reset()

      expect(component.updateDocumentForm.reset).toHaveBeenCalled();
      expect(component.inputs.length).toBe(0);
    });
  });

  describe('clearInput', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'documentType': new FormControl('a')
      });
  
      component.clearInput()

      expect(component.updateDocumentForm).toBeDefined();
    });
  });

  describe('selectInputs', () => {
    it('makes expected calls', () => {
      component.updateDocumentForm = new FormGroup({
        'documentType': new FormControl('a')
      });
      component.inputs = [{ name: '', obligatoire: false}];
      component.selectInputs({ famille: '', sousFamille: '' });

      expect(component.updateDocumentForm).toBeDefined();
    });
  });

});
