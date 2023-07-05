import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'services/utils.service';
import { FetchDataService } from 'services/fetch-data.service';
import { DownloadService } from 'services/download.service';
import { UserService } from 'services/user.service';
import { CustomerExpertise } from 'models/customer-expertise';
import { ExpertiseService } from 'services/expertise.service';
import { FormsModule } from '@angular/forms';
import { ExportsMrComponent } from './exports-mr.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expertiseServiceStub } from 'services/expertise.stub';
import { SearchEntries } from 'models/search';
import { of } from 'rxjs';

describe(ExportsMrComponent.name, () => {
  let component: ExportsMrComponent;
  let fixture: ComponentFixture<ExportsMrComponent>;

  const kindsOfCustomer = {
    client: 'client',
    collaborateur: 'collaborateur'
  };

  const mockedEntries: SearchEntries = {
    fournisseurs: '',
    nature: '',
    RecordId: '',
    UuidsLink: '',
    CodeClient: '',
    NomClient: '',
    NumFacture: '',
    NomSociete: '',
    DateFacture: '',
    DateDebut: '',
    DateFin: '',
    Periodicite: '',
    Montant: '',
    Duplicata: '',
    Nommage: '',
    DateDocument: '',
    Nature: '',
    Statut: '',
    SousCategory: '',
    Title: '',
    Description: '',
    Fournisseur: '',
    Acheteur: '',
    NumeroDossier: '',
    DomainContainerSousFamille: '',
    SousFamille: '',
    DateCreation: new Date,
    id: '',
    isFile: '',
    name: '',
  };

  const getAllDocsMRStub = {
    entries: [mockedEntries],
    pagination: { count: 1 },
    facets: []
  }

  const fetchDataServiceStub = () => ({
    getAllDocsMR: () => of(getAllDocsMRStub)
  });

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const downloadServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExportsMrComponent],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: DownloadService, useFactory: downloadServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
      ]
    });
    fixture = TestBed.createComponent(ExportsMrComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('clearNumeroClient', () => {
    it('makes expected calls', () => {

      spyOn(component.eventsDossier, 'next');
      spyOn(sessionStorage, 'removeItem');
      
      component.clearNumeroClient();

      expect(component.numeroClient).toEqual('');
      expect(component.showSearchResult).toBeFalse();
      expect(component.hasSelectedCustomer).toBeFalse();
      expect(component.numeroClient).toEqual('');
      expect(component.searchParams.skipCount).toEqual(0);
      expect(component.results).toEqual([]);
      expect(component.customer).toEqual(null);
      expect(component.showDirectory).toBeTrue();

      expect(component.eventsDossier.next).toHaveBeenCalled();
      expect(sessionStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('setCustomer', () => {
    it('makes expected calls', () => {
      const customerExpertiseStub: CustomerExpertise = <any>{};
      spyOn(component, 'search').and.callThrough();
      
      component.setCustomer(customerExpertiseStub);

      expect(component.search).toHaveBeenCalled();
    });

    it('makes expected calls no client', () => {
      const customerExpertiseStub = null;
      spyOn(component, 'clearNumeroClient').and.callThrough();

      component.setCustomer(customerExpertiseStub);

      expect(component.clearNumeroClient).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('makes expected calls cached', () => {
      spyOn(component, 'handleSearchCustomers');

      component.cachedSearch.entries = [mockedEntries];
      component.search(true);
      
      expect(component.handleSearchCustomers).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('makes expected calls', () => {
      spyOn(component, 'handleSearchCustomers');
      
      component.selectedCodeBudget = '123';
      component.numeroClient = '123';

      component.search(false);
      
      expect(component.handleSearchCustomers).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  describe('filterYear', () => {
    it('makes expected calls', () => {
      expect(component.filterYear([{ DateCreation: '2023' }], '2023')).toBeDefined();
    });
  });

  describe('handleSearchCustomers', () => {
    it('makes expected calls', () => {
      component.handleSearchCustomers(getAllDocsMRStub);
    });
  });
});
