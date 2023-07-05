import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DeleteDocumentService } from 'components/delete-document/delete-document.service';
import { UtilsService } from 'services/utils.service';
import { UpdateResultsService } from 'services/update-results.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { SnackbarService } from 'services/snackbar.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContextSearchMrService } from 'services/context-search-mr.service';
import { CustomerExpertise } from '../../../models/customer-expertise';
import { ClassementExpertiseConsulting } from '../../../models/classement-expertise-consulting';
import { FormsModule } from '@angular/forms';
import { HomeMrComponent } from './home-mr.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { CoreTestingModule } from '@alfresco/adf-core';
import { LabelValue } from 'models/archives-presidence';
import { of } from 'rxjs';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { RouterTestingModule } from '@angular/router/testing';

describe(HomeMrComponent.name, () => {
  let component: HomeMrComponent;
  let fixture: ComponentFixture<HomeMrComponent>;
  let router: Router;

  beforeEach(() => {
    const deleteDocumentServiceStub = () => ({ resetDocuments: () => ({}) });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const activatedRouteStub = () => ({ params: of({ firstParam: '12345', numeroDossier: '12345678' }) });
    const snackbarServiceStub = () => ({
      openSnackBar: (msg, string, string1) => ({}),
      openInfo: () => ({})
    });
    const contextSearchMrServiceStub = () => ({
      getContext: () => ({ currentTabIndex: 1 }),
      updateContext: object => ({})
    });
    const searchDossierExpertiseServiceStub = () => ({
      getCustomers: codeBudget => of([{
        numeroDossier: 'numeroDossier',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
    }]),
      hasRcuErrorOnExpertiseSearch: () => false,
      getExpertiseDossierData: str => of({
          numeroDossier: 'numeroDossier',
          nomDossier: 'nomDossier',
          codeBudget: 'codeBudget',
      }),
      getCachedExpertiseDossierData: () => ({
        numeroDossier: 'numeroDossier',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
    })
    });

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CoreTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'expertise-consulting/consultation',
            component: HomeMrComponent
          },
          {
            path: 'expertise-consulting/consultation/numeroDossier',
            component: HomeMrComponent
          },
      ])],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeMrComponent],
      providers: [
        {
          provide: DeleteDocumentService,
          useFactory: deleteDocumentServiceStub
        },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        {
          provide: ContextSearchMrService,
          useFactory: contextSearchMrServiceStub
        },
        FormBuilder,
        { provide: SearchDossierExpertiseService, useFactory: searchDossierExpertiseServiceStub },
      ]
    });
    fixture = TestBed.createComponent(HomeMrComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('addCustomer', () => {
    it('makes expected calls', () => {
      const customerExpertiseStub: CustomerExpertise = {
        numeroDossier: 'numeroDossier',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
      };
      spyOn(component, 'onSearch').and.callFake(() => {});
      component.addCustomer(customerExpertiseStub);

      expect(component.showSelectedCustomer).toBeTrue();
      expect(component.inputsDefault.numeroDossier).toEqual('numeroDossier');
      expect(component.inputsDefault.nomDossier).toEqual('nomDossier');
      expect(component.inputsDefault.codeBudget).toEqual('codeBudget');
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('tabChanged', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearDocumentType').and.callFake(() => {});
      spyOn(component, 'clearFamille').and.callFake(() => {});
      spyOn(component, 'filterFamilleByTab').and.callFake(() => {});
      spyOn(component, 'filterDocumentTypeByTab').and.callFake(() => null);

      spyOn(component, 'onSearch').and.callFake(() => {});
      
      component.tabChanged(1);

      expect(component.currentTabIndex).toEqual(1);
      expect(component.currentTab).toEqual('Comptabilité / Gestion');

      expect(component.clearDocumentType).toHaveBeenCalledWith(false);
      expect(component.clearFamille).toHaveBeenCalledWith(false);
      expect(component.filterFamilleByTab).toHaveBeenCalledWith(component.currentTab);
      expect(component.filterDocumentTypeByTab).toHaveBeenCalledWith(component.currentTab);
    });
  });

  describe('setValueDocumentType', () => {
    it('makes expected calls', () => {
      const classementExpertiseConsultingStub: ClassementExpertiseConsulting = {
        labelFamille: 'string',
        famille: 'string',
        labelSousFamille: 'string',
        sousFamille: 'string',
        onglet: 'string',
        displayClient: true,
        listeMetadatas: [
          {
            label: 'string',
            metadata: 'fp:dateDocument',
            name: 'string',
            obligatoire: true,
            order: 1,
            position: 'string',
            type: 'string',
            value: 'string'
          }
        ],
        tags: ['']
      };
      spyOn(component, 'matchMetadataToInput').and.callThrough();
      component.setValueDocumentType(classementExpertiseConsultingStub);
      expect(component.matchMetadataToInput).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const route: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
            
      component.ngOnInit();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const deleteDocumentServiceStub: DeleteDocumentService = fixture.debugElement.injector.get(
        DeleteDocumentService
      );
      spyOn(deleteDocumentServiceStub, 'resetDocuments').and.callThrough();
      component.ngOnDestroy();
      expect(deleteDocumentServiceStub.resetDocuments).toHaveBeenCalled();
    });
  });

 describe('initContext', () => {
    it('makes expected calls', () => {
      const contextSearchMrServiceStub: ContextSearchMrService = fixture.debugElement.injector.get(
        ContextSearchMrService
      );
      spyOn(contextSearchMrServiceStub, 'getContext').and.callThrough();
      component.initContext();
      expect(contextSearchMrServiceStub.getContext).toHaveBeenCalled();
    });
  });
  

  describe('removeSelectedDocuments', () => {
    it('makes expected calls', () => {
      spyOn(router, 'navigate')
      component.removeSelectedDocuments();
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('clearCustomer', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callFake(() => {});
      spyOn(router, 'navigate');
      component.clearCustomer();
      expect(component.onSearch).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearCustomer').and.callThrough();
      component.clearAll();
      expect(component.clearCustomer).toHaveBeenCalled();
    });
  });

  describe('clearDateDocument', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearDateDocument();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('setSortByField', () => {
    it('makes expected calls', () => {

      const labelValueStub: LabelValue = <any>{};
      const updateResultsServiceStub: UpdateResultsService = fixture.debugElement.injector.get(
        UpdateResultsService
      );
      spyOn(updateResultsServiceStub, 'triggerRefreshChange').and.callThrough();
      component.setSortByField(labelValueStub);
      expect(updateResultsServiceStub.triggerRefreshChange).toHaveBeenCalled();
    });
  });

  describe('setSortByOrder', () => {
    it('makes expected calls', () => {
      const labelValueStub: LabelValue = <any>{};
      const updateResultsServiceStub: UpdateResultsService = fixture.debugElement.injector.get(
        UpdateResultsService
      );
      spyOn(updateResultsServiceStub, 'triggerRefreshChange').and.callThrough();
      component.setSortByOrder(labelValueStub);
      expect(updateResultsServiceStub.triggerRefreshChange).toHaveBeenCalled();
    });
  });

  describe('refreshNav', () => {
    it('makes expected calls', () => {
      component.refreshNav(true);
      expect(component.sideNavOpen).toEqual(true);
    });
  });

  describe('refreshNav', () => {
    it('makes expected calls', () => {
      component.toggleNav();
      expect(component.sideNavOpen).toEqual(true);
    });
  });

  describe('getDossierData', () => {
    it('makes expected calls', () => {
      const searchDossierExpertiseServiceStub: SearchDossierExpertiseService = fixture.debugElement.injector.get(
        SearchDossierExpertiseService
      );

      spyOn(searchDossierExpertiseServiceStub, 'hasRcuErrorOnExpertiseSearch').and.callThrough();
      spyOn(searchDossierExpertiseServiceStub, 'getExpertiseDossierData').and.callThrough();

      component.getDossierData('');

      expect(searchDossierExpertiseServiceStub.hasRcuErrorOnExpertiseSearch).toHaveBeenCalled();
      expect(searchDossierExpertiseServiceStub.getExpertiseDossierData).toHaveBeenCalled();
    });
  });

  describe('getFullCustomerList', () => {
    it('makes expected calls', () => {
      const searchDossierExpertiseServiceStub: SearchDossierExpertiseService = fixture.debugElement.injector.get(
        SearchDossierExpertiseService
      );

      spyOn(searchDossierExpertiseServiceStub, 'getCustomers').and.callThrough();

      component.getFullCustomerList('');

      expect(searchDossierExpertiseServiceStub.getCustomers).toHaveBeenCalled();
    });
  });

  describe('clearInput', () => {
    it('makes expected calls documentType', () => {
      spyOn(component, 'clearDocumentType').and.callThrough();
      component.clearInput('documentType', true, true);

      expect(component.clearDocumentType).toHaveBeenCalled();
    });

    it('makes expected calls dateFinExercice', () => {
      component.clearInput('dateFinExercice', true, true);
      expect(component.inputsDefault.typedDateFinExercice).toBe('');
    });

    it('makes expected calls famille', () => {
      spyOn(component, 'clearFamille').and.callFake(() => {});
      spyOn(component, 'filterFamilleByTab').and.callFake(() => {});
      spyOn(component, 'filterDocumentTypeByTab').and.callFake(() => []);

      component.currentTab = 'Généralités';
      component.clearInput('famille', true, true);


      expect(component.clearFamille).toHaveBeenCalled();
      expect(component.filterFamilleByTab).toHaveBeenCalledWith(component.currentTab);
      expect(component.filterDocumentTypeByTab).toHaveBeenCalledWith(component.currentTab);
    });

    it('makes expected calls numeroDossier', () => {
      spyOn(router, 'navigate');
      component.clearInput('numeroDossier', true, true);

      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('trackByIndex', () => {
    it('makes expected calls', () => {
      expect(component.trackByIndex(1)).toBe(1);
    });
  });

  describe('clearFamille', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callFake(() => {});

      component.clearFamille(true);

      expect(component.actifs['documentType']).toEqual(false);
      expect(component.actifs['famille']).toEqual(false);
      expect(component.inputsDefault.famille).toEqual([]);
      expect(component.inputsDefault.familleInput).toEqual('');
      expect(component.inputsDefault.documentType).toEqual('');
      expect(component.inputsDefault.documentTypeInput).toEqual('');
      expect(component.inputs).toEqual([]);
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('onSearch', () => {
    it('makes expected calls', () => {

      spyOn(component, 'filterTags').and.callFake(() => ['abc'])

      spyOn(component, 'filterDocType').and.callFake(() => [{
        labelFamille: 'string',
        famille: 'string',
        labelSousFamille: 'string',
        sousFamille: 'string',
        onglet: 'string',
        displayClient: false,
        listeMetadatas: [{
          label: 'string',
          metadata: 'string',
          name: 'string',
          obligatoire: false,
          order: 1,
          position: 'string',
          type: 'string',
          value: 'string',
        }],
        tags: [''],
      }]);

     component.inputs = [{ value: '', type: '' }];
     component.inputsDefault = {
      numeroDossier: 'abc',
      nomDossier: 'abc',
      codeBudget: 'abc',
      author: 'abc',
      nommage: 'abc',
      famille: [],
      familleInput: 'abc',
      documentType: 'abc',
      documentTypeInput: 'abc',
      creationDate: new Date().toString(),
      modificationDate: new Date().toString(),
      documentDate: new Date().toString(),
      factDate: new Date().toString(),
      employeeFirstName: 'abc',
      employeeName: 'abc',
      employeeCommonName: 'abc',
      dateFinExercice: 'abc',
      typedDateFinExercice: 'abc',
      searchPeriodStart: new Date().toString(),
      searchPeriodEnd: new Date().toString(),
      eCoffre: 'abc'
    };

      component.onSearch();

      expect(component.searchQueryHomeTab).toBeDefined();
      expect(component.searchQuery).toBeDefined();
    });
  });
});
