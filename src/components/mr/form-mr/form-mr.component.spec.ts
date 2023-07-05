import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { SnackbarService } from 'services/snackbar.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { UtilsService } from 'services/utils.service';
import { UserService } from 'services/user.service';
import { ExpertiseService } from 'services/expertise.service';
import { FormMrComponent } from './form-mr.component';
import { User } from 'models/user';
import { CLASSEMENT } from 'models/mr';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expertiseServiceStub } from 'services/expertise.stub';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe(FormMrComponent.name, () => {
  let component: FormMrComponent;
  let fixture: ComponentFixture<FormMrComponent>;
  let router: Router;

  const classements = {
    documentType: CLASSEMENT
      .filter(el => !el.noUpload)
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}))
  };

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FormMrComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FormMrComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
        DateAdapter
      );
      const expertiseServiceStub: ExpertiseService = fixture.debugElement.injector.get(
        ExpertiseService
      );
      spyOn(dateAdapterStub, 'setLocale').and.callThrough();
      spyOn(expertiseServiceStub, 'getExtensions').and.callThrough();
      spyOn(expertiseServiceStub, 'initializeForm').and.callThrough();
      component.ngOnInit();
      expect(dateAdapterStub.setLocale).toHaveBeenCalled();
      expect(expertiseServiceStub.getExtensions).toHaveBeenCalled();
      expect(expertiseServiceStub.initializeForm).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const previousValue = {};
      const currentValue = { numeroDossier: '1' };

      component.metadataCustomer = { numeroDossier: '1' };

      const changesObj: SimpleChanges = {
        metadataCustomer: new SimpleChange(previousValue, currentValue, false),
      };

      component.ngOnChanges(changesObj);

      expect(component.metadataCustomer).toBeDefined();
    });
  });

  describe('resetPage', () => {
    it('makes expected calls', () => {

      component.resetPage();

      expect(component.showFiles).toEqual(true);
      expect(component.showForm).toEqual(false);
      expect(component.showSend).toEqual(false);
      expect(component.files).toEqual(undefined);
      expect(component.fileList).toEqual([]);
      expect(component.filePreviewList).toEqual([]);
      expect(component.data).toEqual({});
      expect(component.metadata).toEqual([]);
      expect(component.metadataCustomer).toEqual({});
      expect(component.sameMetadata).toEqual(true);
      expect(component.sameCustomer).toEqual(false);
    });
  });

  describe('reset', () => {
    it('makes expected calls', () => {
      component.uploadForm = new FormGroup({})
      spyOn(component.uploadForm, 'reset');
      component.reset();
      
      expect(component.inputs).toEqual([]);
      expect(component.uploadForm.reset).toHaveBeenCalled();
    });
  });

  describe('destroySelectedCustomer', () => {
    it('makes expected calls', () => {
      component.customerForm = new FormGroup({})
      spyOn(component.customerForm, 'reset');
      component.destroySelectedCustomer();
      
      expect(component.showDirectory).toEqual(true);
      expect(component.showSelectedCustomer).toEqual(false);
      expect(component.customerForm.reset).toHaveBeenCalled();
    });
  });

  describe('addCustomer', () => {
    it('makes expected calls', () => {
      const user = {
        numeroDossier: '123',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
      }
      component.addCustomer(user);
      
      expect(component.numeroDossier).toBe('123');
    });

    it('makes expected calls no user', () => {
      const user = null;
      component.addCustomer(user);
      
      expect(component.showCustomerForm).toBe(true);
    });
  });

  describe('selectedEmployee', () => {
    it('makes expected calls', () => {
      component.uploadForm = new FormGroup({'name': new FormControl('')});
      
      component.selectedEmployee('', { name: 'name' });

      expect(component.uploadForm.controls['name']).toBeDefined();
    });
  });

  describe('selectedEmployee', () => {
    it('makes expected calls', () => {
      const uploadForm = new FormGroup({'name': new FormControl('')});
      const user = {
        numeroDossier: '123',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
      }


      component.fileList = [new File([''], '')]

      component.send({ form: uploadForm, customer: user });

      expect(component.metadata.length).toBeGreaterThan(0);
    });
  });

  describe('goToFiles', () => {
    it('makes expected calls', () => {
      
      component.goToFiles();

      expect(component.showForm).toBeFalse();
      expect(component.showFiles).toBeTrue();
    });
  });

  describe('filesLoaded', () => {
    it('makes expected calls', () => {

      const fileList = {
        files: [new File([''], '')],
        sameCustomer: true,
        sameMetadata: true
      }

      component.filesLoaded(fileList);

      expect(component.fileList).toBeDefined();
    });
  });

  describe('format', () => {
    it('makes expected calls', () => {

      component.format('');

      expect(component.format('')).toBe('');
    });
  });

  describe('paginate', () => {
    it('makes expected calls', () => {
      component.pager = { currentPage: 0, totalItems: 1 };
      const uploadForm = new FormGroup({'name': new FormControl('')});
      const user = {
        numeroDossier: '123',
        nomDossier: 'nomDossier',
        codeBudget: 'codeBudget',
      }
      component.files = [''],

      component.paginate({ form: uploadForm, customer: user });

      expect(component.metadata).toBeDefined();
    });
  });

  describe('categorieHandler', () => {
    it('makes expected calls', () => {
      component.uploadForm = new FormGroup({
        'classement': new FormControl({ documentType: { onglet: '' } }),
      });
      

      component.categorieHandler('abc');

      expect(component.classementList).toBeDefined();
    });
  });

  describe('categorieHandler', () => {
    it('makes expected calls', () => {
      component.uploadForm = new FormGroup({
        'classement': new FormControl({ documentType: { labelFamille : '' } }),
        'categorie': new FormControl({}),
      });
      
      component.classementHandler('abc');

      expect(component.classementList).toBeDefined();
    });
  });

  describe('documentTypeHandler', () => {
    it('makes expected calls', () => {
      component.uploadForm = new FormGroup({
        'classement': new FormControl({ documentType: { labelFamille : '' } }),
        'categorie': new FormControl({}),
      });
      
      component.documentTypeHandler('abc');

      expect(component.classementList).toBeDefined();
    });
  });
});