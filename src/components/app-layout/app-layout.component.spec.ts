import { CodeBudgetService } from 'services/code-budget.service';
import { MaterialModule } from './../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextService } from './../../services/context.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { ContextSearchConseilService } from '../../services/context-search-conseil.service';
import { ContextSearchMrService } from '../../services/context-search-mr.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeranceAssociesService } from '../../services/gerance-associes.service';
import { ContextSearchGeranceAssociesService } from '../../services/context-search-gerance-associes.service';
import { ExpertiseService } from '../../services/expertise.service';
import { UpdateResultsService } from '../../services/update-results.service';
import { SnackbarService } from '../../services/snackbar.service';
import { GroupService } from '../../services/group.service';
import { AppLayoutComponent } from './app-layout.component';
import { userServiceStub } from 'services/user.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { codeBudgetServiceStub } from 'services/code-budget.service.stub';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';
import { expertiseServiceStub } from 'services/expertise.stub';
import { contextServiceStub } from 'services/context.service.stub';
import { of } from 'rxjs';
import * as Sentry from "@sentry/angular-ivy";

describe(AppLayoutComponent.name, () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      logout: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const routerStub = () => ({
      events: { pipe: () => ({ pipe: () => ({ subscribe: f => f({}) }) }) },
      navigate: array => ({})
    });
    const contextSearchConseilServiceStub = () => ({
      updateContext: dataNullable => ({})
    });
    const contextSearchMrServiceStub = () => ({
      updateContext: dataNullable => ({})
    });
    const matDialogStub = () => ({ open: () => {
      return { afterClosed: () => of({})}
    } });
    const contextSearchGeranceAssociesServiceStub = () => ({
      updateContext: dataNullable => ({})
    });
    const updateResultsServiceStub = () => ({});
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({}),
      openActionSnackBar: () => {
        return {
          onAction: () => of({}),
          dismiss: () => {}
        }
      }
    });
    const sentryStub = () => ({
      captureMessage: () => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppLayoutComponent],
      imports: [MaterialModule],
      providers: [
        { provide: ContextService, useFactory: contextServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: UserService, useFactory: userServiceStub },
        {
          provide: ContextSearchConseilService,
          useFactory: contextSearchConseilServiceStub
        },
        {
          provide: ContextSearchMrService,
          useFactory: contextSearchMrServiceStub
        },
        { provide: MatDialog, useFactory: matDialogStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        {
          provide: ContextSearchGeranceAssociesService,
          useFactory: contextSearchGeranceAssociesServiceStub
        },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: CodeBudgetService, useFactory: codeBudgetServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Sentry, useFactory: sentryStub },
      ]
    });
    spyOn(AppLayoutComponent.prototype, 'initNavigation');
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(AppLayoutComponent.prototype.initNavigation).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const groupServiceStub: GroupService = fixture.debugElement.injector.get(
        GroupService
      );
      spyOn(groupServiceStub, 'checkGEDSpaceNumber').and.callThrough();
      component.ngOnInit();
      expect(groupServiceStub.checkGEDSpaceNumber).toHaveBeenCalled();
    });
  });

  describe('openDocumentationDialog', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.openDocumentationDialog();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  describe('onTabChange', () => {
    it('makes expected calls', () => {
      spyOn(component, 'sendSentryTabLog');
      spyOn(component, 'eraseSearchData');

      const item = {
        label: 'a',
        link: 'b'
      };

      component.onTabChange(item);
      
      expect(component.sendSentryTabLog).toHaveBeenCalledWith(item);
      expect(component.eraseSearchData).toHaveBeenCalledWith(item.link);
    });
  });

  describe('sendSentryTabLog', () => {
    it('makes expected calls', () => {
      const item = {
        label: 'a',
        link: 'b'
      };
      component.currentSpace = '';
      component.user = { id: '', email: '', firstName: '', lastName: '', matricule: '' };
      component.sendSentryTabLog(item);
      
      expect(item.link).toBeDefined();
    });
  });
});
