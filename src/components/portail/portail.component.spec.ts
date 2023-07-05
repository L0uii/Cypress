import { ReactiveFormsModule } from '@angular/forms';
import { CodeBudgetService } from 'services/code-budget.service';
import { SearchDirectionRegionaleService } from 'services/search-direction-regionale.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'services/group.service';
import { Title } from '@angular/platform-browser';
import { ContextSearchMrService } from '../../services/context-search-mr.service';
import { ContextSearchConseilService } from '../../services/context-search-conseil.service';
import { ContextSearchGeranceAssociesService } from '../../services/context-search-gerance-associes.service';
import { PortailComponent } from './portail.component';
import { groupServiceStub } from 'services/group.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { codeBudgetServiceStub } from 'services/code-budget.service.stub';
import { ESPACES_GED } from 'consts/espaces-ged';
import { of } from 'rxjs';

describe(PortailComponent.name, () => {
  let component: PortailComponent;
  let fixture: ComponentFixture<PortailComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const titleStub = () => ({ setTitle: string => ({}) });
    const contextSearchMrServiceStub = () => ({
      updateContext: object => ({})
    });
    const contextSearchConseilServiceStub = () => ({
      updateContext: object => ({})
    });
    const contextSearchGeranceAssociesServiceStub = () => ({
      updateContext: object => ({})
    });
    const searchDirectionRegionaleServiceStub = () => ({
      getDRList: object => of({})
    });
    const searchDossierExpertiseServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PortailComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: Title, useFactory: titleStub },
        {
          provide: ContextSearchMrService,
          useFactory: contextSearchMrServiceStub
        },
        {
          provide: ContextSearchConseilService,
          useFactory: contextSearchConseilServiceStub
        },
        {
          provide: ContextSearchGeranceAssociesService,
          useFactory: contextSearchGeranceAssociesServiceStub
        },
        {
          provide: SearchDirectionRegionaleService,
          useFactory: searchDirectionRegionaleServiceStub
        },
        {
          provide: SearchDossierExpertiseService,
          useFactory: searchDossierExpertiseServiceStub
        },
        {
          provide: CodeBudgetService,
          useFactory: codeBudgetServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(PortailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      const contextSearchMrServiceStub: ContextSearchMrService = fixture.debugElement.injector.get(
        ContextSearchMrService
      );
      const contextSearchConseilServiceStub: ContextSearchConseilService = fixture.debugElement.injector.get(
        ContextSearchConseilService
      );
      const contextSearchGeranceAssociesServiceStub: ContextSearchGeranceAssociesService = fixture.debugElement.injector.get(
        ContextSearchGeranceAssociesService
      );
      spyOn(component, 'matchGroup').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      spyOn(contextSearchMrServiceStub, 'updateContext').and.callThrough();
      spyOn(contextSearchConseilServiceStub, 'updateContext').and.callThrough();
      spyOn(
        contextSearchGeranceAssociesServiceStub,
        'updateContext'
      ).and.callThrough();
      spyOn(sessionStorage, 'removeItem').and.callThrough();
      component.ngOnInit();
      expect(component.matchGroup).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
      expect(contextSearchMrServiceStub.updateContext).toHaveBeenCalled();
      expect(contextSearchConseilServiceStub.updateContext).toHaveBeenCalled();
      expect(
        contextSearchGeranceAssociesServiceStub.updateContext
      ).toHaveBeenCalled();
      expect(sessionStorage.removeItem).toHaveBeenCalledOnceWith('GED.selectedCustomer');
    });
  });

  describe('matchGroup', () => {
    it('makes expected calls', () => {

      const groupServiceStub: GroupService = fixture.debugElement.injector.get(GroupService);
      groupServiceStub.getEspacesGED = () => ([ESPACES_GED[0]]);

      spyOn(groupServiceStub, 'getEspacesGED').and.callThrough()
      component.matchGroup();

      expect(component.isLoading).toBeFalse();
      expect(groupServiceStub.getEspacesGED).toHaveBeenCalled();
    });
  });
});
