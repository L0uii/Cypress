import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { UtilsService } from 'services/utils.service';
import { SearchDossierComponent } from './search-dossier.component';
import { userServiceStub } from 'services/user.service.stub';
import { utilsServiceStub } from 'services/utils.service.stub';
import { of } from 'rxjs';

describe(SearchDossierComponent.name, () => {
  let component: SearchDossierComponent;
  let fixture: ComponentFixture<SearchDossierComponent>;

  const customerMock = {
    numeroDossier: 'numeroDossier',
    nomDossier: 'nomDossier',
    codeBudget: 'codeBudget',
}

  beforeEach(() => {
    const activatedRouteStub = () => ({ params: of([{ firstParam: '12345678', numeroDossier: '12345678' }]) });
    const routerStub = () => ({});
    const searchDossierServiceStub = () => ({
      searchExpertise: query => ({ pipe: () => ({}) }),
      hasRcuErrorOnExpertiseSearch: str => false
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchDossierComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: SearchDossierExpertiseService, useFactory: searchDossierServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchDossierComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const previousValue = null;
      const currentValue =  [];

      const changesObj: SimpleChanges = {
        dossierList: new SimpleChange(previousValue, currentValue, false),
      };

      spyOn(component, 'search').and.callFake(() => {});

      component.ngOnChanges(changesObj);

      expect(component.search).toHaveBeenCalled();
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
      spyOn(component, 'destroyCustomer').and.callThrough();
      component.ngOnDestroy();
      expect(component.destroyCustomer).toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearCustomer').and.callFake(() => {});
      component.selectedCustomer = customerMock;
      component.onFocus();
      expect(component.clearCustomer).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('makes expected calls with customerQuery', () => {
      spyOn(component, 'searchDossier').and.callFake(() => {});
      component.customerQuery.setValue('query');
      component.search();

      expect(component.searchDossier).toHaveBeenCalled();
    });

    it('makes expected calls with no customerQuery', () => {
      spyOn(component, 'destroyCustomer').and.callFake(() => {});

      component.search();

      expect(component.destroyCustomer).toHaveBeenCalled();
    });
  });

  describe('searchDossier', () => {
    it('makes expected calls', () => {
      component.customerQuery.setValue('query');
      component.searchDossier();

      expect(component.customerQuery).toBeDefined();
    });
  });

  describe('newSearch', () => {
    it('makes expected calls', () => {
      spyOn(component, 'destroyCustomer');
      spyOn(component.resetSearch, 'emit')
      
      component.newSearch();

      expect(component.destroyCustomer).toHaveBeenCalled();
      expect(component.resetSearch.emit).toHaveBeenCalled();
    });
  });

  describe('clearCustomer', () => {
    it('makes expected calls', () => {
      spyOn(component, 'destroyCustomer');
      spyOn(component.clearCustomerEvent, 'emit')
      
      component.clearCustomer();

      expect(component.destroyCustomer).toHaveBeenCalled();
      expect(component.clearCustomerEvent.emit).toHaveBeenCalled();
    });
  });

  describe('select', () => {
    it('makes expected calls context consultation', () => {
      component.context = 'consultation';

      component.select(customerMock);

      expect(component.selectedCustomer).toEqual(customerMock);
      expect(component.customerQuery.value).toBeDefined();
    });

    it('makes expected calls context exportation', () => {
      component.context = 'exportation';

      component.select(customerMock);

      expect(component.selectedCustomer).toEqual(customerMock);
      expect(component.customerQuery.value).toBeDefined();
    });
  });
});
