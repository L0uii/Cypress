import { TranslateService } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from 'services/snackbar.service';
import { DateAdapter } from '@angular/material/core';
import { UtilsService } from 'services/utils.service';
import { GroupService } from 'services/group.service';
import { UserService } from 'services/user.service';
import { ConseilService } from 'services/conseil.service';
import { FormConseilComponent } from './form-conseil.component';
import { CLASSEMENT, CLASSEMENT_REPRISE } from 'models/conseil';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FetchConseilProdListService } from 'services/fetch-conseil-prod-list.service';
import { of } from 'rxjs';
import { conseilServiceStub } from 'services/conseil.stub';

describe(FormConseilComponent.name, () => {
  let component: FormConseilComponent;
  let fixture: ComponentFixture<FormConseilComponent>;

  const classements = {
    documentType: CLASSEMENT
  };

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const fetchConseilProdListServiceStub = () => ({
      getProdList: () => of([])
    });
    const translateServiceStub = () => ({ currentLang: 'fr' });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FormConseilComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: GroupService, useFactory: groupServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: ConseilService, useFactory: conseilServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: FetchConseilProdListService, useFactory: fetchConseilProdListServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FormConseilComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnChanges', () => {
  //   it('makes expected calls', () => {
  //     const simpleChangesStub: SimpleChanges = <any>{};
  //     spyOn(component, 'setPage').and.callThrough();
  //     component.ngOnChanges(simpleChangesStub);
  //     expect(component.setPage).toHaveBeenCalled();
  //   });
  // });

  // describe('clearContratNature', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'clearFournisseur').and.callThrough();
  //     spyOn(component, 'clearProduit').and.callThrough();
  //     component.clearContratNature();
  //     expect(component.clearFournisseur).toHaveBeenCalled();
  //     expect(component.clearProduit).toHaveBeenCalled();
  //   });
  // });

  // describe('clearFournisseur', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'clearProduit').and.callThrough();
  //     component.clearFournisseur();
  //     expect(component.clearProduit).toHaveBeenCalled();
  //   });
  // });

  // describe('initializeForm', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     component.initializeForm();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //   });
  // });

  // describe('initializeCustomerForm', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     component.initializeCustomerForm();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //   });
  // });

  // describe('saveMetadataFromInput', () => {
  //   it('makes expected calls', () => {
  //     const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
  //       SnackbarService
  //     );
  //     spyOn(component, 'paginate').and.callThrough();
  //     spyOn(component, 'send').and.callThrough();
  //     spyOn(component, 'reset').and.callThrough();
  //     spyOn(component, 'destroySelectedCustomer').and.callThrough();
  //     spyOn(snackbarServiceStub, 'openSnackBar').and.callThrough();
  //     component.saveMetadataFromInput();
  //     expect(component.paginate).toHaveBeenCalled();
  //     expect(component.send).toHaveBeenCalled();
  //     expect(component.reset).toHaveBeenCalled();
  //     expect(component.destroySelectedCustomer).toHaveBeenCalled();
  //     expect(snackbarServiceStub.openSnackBar).toHaveBeenCalled();
  //   });
  // });

  // describe('reset', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'hide').and.callThrough();
  //     spyOn(component, 'filter').and.callThrough();
  //     spyOn(component, 'initializeForm').and.callThrough();
  //     component.reset();
  //     expect(component.hide).toHaveBeenCalled();
  //     expect(component.filter).toHaveBeenCalled();
  //     expect(component.initializeForm).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
  //       DateAdapter
  //     );
  //     const conseilServiceStub: ConseilService = fixture.debugElement.injector.get(
  //       ConseilService
  //     );
  //     spyOn(component, 'initializeForm').and.callThrough();
  //     spyOn(component, 'initializeCustomerForm').and.callThrough();
  //     spyOn(dateAdapterStub, 'setLocale').and.callThrough();
  //     spyOn(conseilServiceStub, 'getExtensions').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.initializeForm).toHaveBeenCalled();
  //     expect(component.initializeCustomerForm).toHaveBeenCalled();
  //     expect(dateAdapterStub.setLocale).toHaveBeenCalled();
  //     expect(conseilServiceStub.getExtensions).toHaveBeenCalled();
  //   });
  // });
});
