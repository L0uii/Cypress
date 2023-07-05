import { MaterialModule } from './../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Title } from '@angular/platform-browser';
import { UpdateResultsService } from '../../services/update-results.service';
import { UserService } from '../../services/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ExpertiseService } from '../../services/expertise.service';
import { TABS_CONSULTATION } from '../../consts/sofiral-tabs';
import { FormsModule } from '@angular/forms';
import { SofiralComponent } from './sofiral.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { fetchDataServiceStub } from 'services/fetch-data.stub';
import { expertiseServiceStub } from 'services/expertise.stub';

describe(SofiralComponent.name, () => {
  let component: SofiralComponent;
  let fixture: ComponentFixture<SofiralComponent>;

  const filtersFields = [
    {
      label: 'Numéro dossier',
      value: 'firme:codeClient'
    },
    {
      label: 'Date facture',
      value: 'fact:dateFacture'
    }
  ];
  const filtersOrder = [
    {
      label: 'Croissant',
      value: true
    },
    {
      label: 'Décroissant',
      value: false
    }
  ];

  beforeEach(() => {
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const authenticationServiceStub = () => ({});
    const titleStub = () => ({ setTitle: string => ({}) });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MaterialModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SofiralComponent],
      providers: [
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: Title, useFactory: titleStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub }
      ],
    });
    fixture = TestBed.createComponent(SofiralComponent);
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
  //     const titleStub: Title = fixture.debugElement.injector.get(Title);
  //     spyOn(component, 'formatClassement').and.callThrough();
  //     spyOn(component, 'setDossierByNumber').and.callThrough();
  //     spyOn(component, 'onSearch').and.callThrough();
  //     spyOn(component, 'setSortByField').and.callThrough();
  //     spyOn(dateAdapterStub, 'setLocale').and.callThrough();
  //     spyOn(titleStub, 'setTitle').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.formatClassement).toHaveBeenCalled();
  //     expect(component.setDossierByNumber).toHaveBeenCalled();
  //     expect(component.onSearch).toHaveBeenCalled();
  //     expect(component.setSortByField).toHaveBeenCalled();
  //     expect(dateAdapterStub.setLocale).toHaveBeenCalled();
  //     expect(titleStub.setTitle).toHaveBeenCalled();
  //   });
  // });

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

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearCustomer').and.callThrough();
      component.clearAll();
      expect(component.clearCustomer).toHaveBeenCalled();
    });
  });

  // describe('onSearch', () => {
  //   it('makes expected calls', () => {
  //     const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
  //       SnackbarService
  //     );
  //     spyOn(snackbarServiceStub, 'openSnackBar').and.callThrough();
  //     component.onSearch();
  //     expect(snackbarServiceStub.openSnackBar).toHaveBeenCalled();
  //   });
  // });
});
