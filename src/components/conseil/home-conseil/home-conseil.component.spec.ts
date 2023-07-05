import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Title } from '@angular/platform-browser';
import { GroupService } from 'services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConseilService } from 'services/conseil.service';
import { FetchDataService } from 'services/fetch-data.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UpdateResultsService } from 'services/update-results.service';
import { UserService } from 'services/user.service';
import { ContextSearchConseilService } from '../../../services/context-search-conseil.service';
import { FormsModule } from '@angular/forms';
import { HomeConseilComponent } from './home-conseil.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { groupServiceStub } from 'services/group.service.stub';
import { CLASSEMENT, CLASSEMENT_REPRISE } from 'models/conseil';
import { of } from 'rxjs';
import { FetchConseilProdListService } from 'services/fetch-conseil-prod-list.service';
import { fetchDataServiceStub } from 'services/fetch-data.stub';
import { conseilServiceStub } from 'services/conseil.stub';

describe(HomeConseilComponent.name, () => {
  let component: HomeConseilComponent;
  let fixture: ComponentFixture<HomeConseilComponent>;

  const classements = {
    documentType: CLASSEMENT.concat(CLASSEMENT_REPRISE)
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
      contrat: [],
      fournisseur: [],
      produit: [],
      users: [],
      directionRegionale: []
  };

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { data: { directionRegionales: [] } }
    });
    const routerStub = () => ({
      url: { includes: () => ({}) },
      navigate: array => ({})
    });
    const authenticationServiceStub = () => ({});
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const contextSearchConseilServiceStub = () => ({
      getContext: () => ({ currentTabIndex: {} }),
      updateContext: object => ({})
    });
    const fetchConseilProdListServiceStub = () => ({
      getProdList: () => of([])
    });
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeConseilComponent],
      providers: [
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Title, useFactory: titleStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ConseilService, useFactory: conseilServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        {
          provide: ContextSearchConseilService,
          useFactory: contextSearchConseilServiceStub
        },
        { provide: FetchConseilProdListService, useFactory: fetchConseilProdListServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeConseilComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const titleStub: Title = fixture.debugElement.injector.get(Title);
  //     const groupServiceStub: GroupService = fixture.debugElement.injector.get(
  //       GroupService
  //     );
  //     spyOn(component, 'initContext').and.callThrough();
  //     spyOn(titleStub, 'setTitle').and.callThrough();
  //     spyOn(groupServiceStub, 'searchUsersConseil').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.initContext).toHaveBeenCalled();
  //     expect(titleStub.setTitle).toHaveBeenCalled();
  //     expect(groupServiceStub.searchUsersConseil).toHaveBeenCalled();
  //   });
  // });

  describe('initContext', () => {
    it('makes expected calls', () => {
      const contextSearchConseilServiceStub: ContextSearchConseilService = fixture.debugElement.injector.get(
        ContextSearchConseilService
      );
      spyOn(contextSearchConseilServiceStub, 'getContext').and.callThrough();
      component.initContext();
      expect(contextSearchConseilServiceStub.getContext).toHaveBeenCalled();
    });
  });

  describe('clearAll', () => {
    it('makes expected calls', () => {

      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(component, 'clearPartenaire').and.callFake(() => null);
      component.clearAll();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.clearPartenaire).toHaveBeenCalled();
    });
  });

  describe('clearCustomer', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(component, 'onSearch').and.callFake(() => null);
      component.clearCustomer();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });
});
