import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GeranceAssociesService } from '../../../services/gerance-associes.service';
import { CustomerGeranceAssocies } from 'models/customer-gerance-associes';
import { UtilsService } from '../../../services/utils.service';
import { SearchDossierGeranceAssociesComponent } from './search-dossier-gerance-associes.component';
import { userServiceStub } from 'services/user.service.stub';
import { utilsServiceStub } from 'services/utils.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';

describe(SearchDossierGeranceAssociesComponent.name, () => {
  let component: SearchDossierGeranceAssociesComponent;
  let fixture: ComponentFixture<SearchDossierGeranceAssociesComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      params: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchDossierGeranceAssociesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchDossierGeranceAssociesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      spyOn(component, 'destroyCustomer').and.callThrough();
      component.ngOnDestroy();
      expect(component.destroyCustomer).toHaveBeenCalled();
    });
  });

  // describe('onFocus', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'clearCustomer').and.callThrough();
  //     component.onFocus();
  //     expect(component.clearCustomer).toHaveBeenCalled();
  //   });
  // });

  // describe('search', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'destroyCustomer').and.callThrough();
  //     spyOn(component, 'searchQuery').and.callThrough();
  //     component.search();
  //     expect(component.destroyCustomer).toHaveBeenCalled();
  //     expect(component.searchQuery).toHaveBeenCalled();
  //   });
  // });

  // describe('searchQuery', () => {
  //   it('makes expected calls', () => {
  //     const geranceAssociesServiceStub: GeranceAssociesService = fixture.debugElement.injector.get(
  //       GeranceAssociesService
  //     );
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(component, 'select').and.callThrough();
  //     spyOn(component, 'destroyCustomer').and.callThrough();
  //     spyOn(geranceAssociesServiceStub, 'searchDossier').and.callThrough();
  //     spyOn(utilsServiceStub, 'formatURL').and.callThrough();
  //     component.searchQuery();
  //     expect(component.select).toHaveBeenCalled();
  //     expect(component.destroyCustomer).toHaveBeenCalled();
  //     expect(geranceAssociesServiceStub.searchDossier).toHaveBeenCalled();
  //     expect(utilsServiceStub.formatURL).toHaveBeenCalled();
  //   });
  // });

  describe('clearCustomer', () => {
    it('makes expected calls', () => {
      spyOn(component, 'destroyCustomer').and.callThrough();
      component.clearCustomer();
      expect(component.destroyCustomer).toHaveBeenCalled();
    });
  });
});
