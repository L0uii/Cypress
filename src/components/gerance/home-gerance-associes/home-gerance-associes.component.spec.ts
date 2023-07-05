import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SnackbarService } from 'services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { FetchDataService } from 'services/fetch-data.service';
import { UpdateResultsService } from 'services/update-results.service';
import { UtilsService } from 'services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { GeranceAssociesService } from '../../../services/gerance-associes.service';
import { ContextSearchGeranceAssociesService } from '../../../services/context-search-gerance-associes.service';
import { FormsModule } from '@angular/forms';
import { HomeGeranceAssociesComponent } from './home-gerance-associes.component';
import { CLASSEMENT_GERANCEASSOCIES } from 'models/gerance-associes';
import { CLASSEMENT_GERANCEPARTENAIRES } from 'models/gerance-partenaires';
import { CLASSEMENT_PRODUITS } from 'models/classement-produits';
import { utilsServiceStub } from 'services/utils.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { of } from 'rxjs';
import { FetchConseilProdListService } from 'services/fetch-conseil-prod-list.service';

describe(HomeGeranceAssociesComponent.name, () => {
  let component: HomeGeranceAssociesComponent;
  let fixture: ComponentFixture<HomeGeranceAssociesComponent>;
  const classements = {
    sousDossierAssocies: ['NPAI', 'Réclamations'].sort((a, b) =>
      a.localeCompare(b, 'fr', {ignorePunctuation: true})),
    sousDossierPartenaires: [
      'Correspondances associés',
      'Correspondances produits',
      'Correspondances administratives'].sort((a, b) =>
      a.localeCompare(b, 'fr', {ignorePunctuation: true})),
    associes: CLASSEMENT_GERANCEASSOCIES.sort((a, b) =>
      a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    partenaires: CLASSEMENT_GERANCEPARTENAIRES
      .sort((a, b) =>
        a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    produit: CLASSEMENT_PRODUITS
      .map(el => el.labelProduit).sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true})),
    categorieProduit: CLASSEMENT_PRODUITS
      .map(el => el.labelCategorie)
      .filter((item, pos, self) =>
        self.indexOf(item) === pos).sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true})),
    famille: {},
    documentType: [],
  };

  const filtersFields = [];
  const filtersOrder = [];

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const matDialogStub = () => ({
      open: (dialogGeranceAssociesComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const titleStub = () => ({ setTitle: string => ({}) });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({
      url: '',
      navigate: array => ({})
    });
    const contextSearchGeranceAssociesServiceStub = () => ({
      getContext: () => ({
        currentTabIndex: {},
        defaultSearch: {
          statutDocumentAssocie: ''
        }
      }),
      updateContext: object => ({})
    });
    const fetchConseilProdListServiceStub = () => ({
      getProdList: () => of([])
    })
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeGeranceAssociesComponent, CategorieGeranceAssociesMockPipe],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: Title, useFactory: titleStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: GroupService, useFactory: groupServiceStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        {
          provide: ContextSearchGeranceAssociesService,
          useFactory: contextSearchGeranceAssociesServiceStub
        },
        {
          provide: FetchConseilProdListService,
          useFactory: fetchConseilProdListServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(HomeGeranceAssociesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('tabChanged', () => {
  //   it('makes expected calls', () => {
  //     const matTabChangeEventStub: MatTabChangeEvent = <any>{};
  //     spyOn(component, 'handleTabsAssocies').and.callThrough();
  //     spyOn(component, 'handleTabsPartenaire').and.callThrough();
  //     component.tabChanged(matTabChangeEventStub);
  //     expect(component.handleTabsAssocies).toHaveBeenCalled();
  //     expect(component.handleTabsPartenaire).toHaveBeenCalled();
  //   });
  // });

  // describe('handleTabsAssocies', () => {
  //   it('makes expected calls', () => {
  //     const matTabChangeEventStub: MatTabChangeEvent = <any>{};
  //     spyOn(component, 'filterDocumentTypeByTab').and.callThrough();
  //     spyOn(component, 'clearInput').and.callThrough();
  //     component.handleTabsAssocies(matTabChangeEventStub);
  //     expect(component.filterDocumentTypeByTab).toHaveBeenCalled();
  //     expect(component.clearInput).toHaveBeenCalled();
  //   });
  // });

  // describe('handleTabsPartenaire', () => {
  //   it('makes expected calls', () => {
  //     const matTabChangeEventStub: MatTabChangeEvent = <any>{};
  //     spyOn(component, 'filterDocumentTypeByTab').and.callThrough();
  //     component.handleTabsPartenaire(matTabChangeEventStub);
  //     expect(component.filterDocumentTypeByTab).toHaveBeenCalled();
  //   });
  // });

  // describe('addCustomer', () => {
  //   it('makes expected calls', () => {
  //     const customerGeranceAssociesStub: CustomerGeranceAssocies = <any>{};
  //     spyOn(component, 'onSearch').and.callThrough();
  //     component.addCustomer(customerGeranceAssociesStub);
  //     expect(component.onSearch).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      //spyOn(component, 'formatClassementPartenaires').and.callThrough();
      spyOn(component, 'initContext').and.callThrough();
      spyOn(component, 'onSearch').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      //expect(component.formatClassementPartenaires).toHaveBeenCalled();
      expect(component.initContext).toHaveBeenCalled();
      expect(component.onSearch).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  // describe('initContext', () => {
  //   it('makes expected calls', () => {
  //     const contextSearchGeranceAssociesServiceStub: ContextSearchGeranceAssociesService = fixture.debugElement.injector.get(
  //       ContextSearchGeranceAssociesService
  //     );
  //     spyOn(component, 'filterDocumentTypeByTab').and.callThrough();
  //     spyOn(
  //       contextSearchGeranceAssociesServiceStub,
  //       'getContext'
  //     ).and.callThrough();
  //     component.initContext();
  //     expect(component.filterDocumentTypeByTab).toHaveBeenCalled();
  //     expect(
  //       contextSearchGeranceAssociesServiceStub.getContext
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearCustomer').and.callThrough();
      spyOn(component, 'onSearch').and.callThrough();
      component.clearAll();
      expect(component.clearCustomer).toHaveBeenCalled();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearCustomer', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(component, 'onSearch').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.clearCustomer();
      expect(component.onSearch).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onSearch', () => {
    it('makes expected calls', () => {
      const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
        UtilsService
      );
      const contextSearchGeranceAssociesServiceStub: ContextSearchGeranceAssociesService = fixture.debugElement.injector.get(
        ContextSearchGeranceAssociesService
      );
      spyOn(
        contextSearchGeranceAssociesServiceStub,
        'updateContext'
      ).and.callThrough();
      component.onSearch();
      expect(
        contextSearchGeranceAssociesServiceStub.updateContext
      ).toHaveBeenCalled();
    });
  });
});

import {Pipe, PipeTransform} from '@angular/core';
import { fetchDataServiceStub } from 'services/fetch-data.stub';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';

@Pipe({name: 'categorieGeranceAssociesTypeDocument'})
class CategorieGeranceAssociesMockPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}
