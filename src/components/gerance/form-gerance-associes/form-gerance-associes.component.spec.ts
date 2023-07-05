import { MaterialModule } from './../../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { SnackbarService } from 'services/snackbar.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { UtilsService } from 'services/utils.service';
import { UserService } from 'services/user.service';
import { GeranceAssociesService } from 'services/gerance-associes.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'services/group.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGeranceAssociesComponent } from './form-gerance-associes.component';
import { CLASSEMENT_GERANCEASSOCIES } from 'models/gerance-associes';
import { CLASSEMENT_GERANCEPARTENAIRES } from 'models/gerance-partenaires';
import { utilsServiceStub } from 'services/utils.service.stub';
import { userServiceStub } from 'services/user.service.stub';
import { groupServiceStub } from 'services/group.service.stub';
import { of } from 'rxjs';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';

describe(FormGeranceAssociesComponent.name, () => {
  let component: FormGeranceAssociesComponent;
  let fixture: ComponentFixture<FormGeranceAssociesComponent>;

  const classements = {
    associes: CLASSEMENT_GERANCEASSOCIES
      .filter(el => !el.sousFamille.includes('gerance_assoc_reprise'))
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    partenaires: CLASSEMENT_GERANCEPARTENAIRES
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    categorieProduit: [],
    produit: []
  };

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const dateAdapterStub = () => ({ setLocale: string => ({}) });
    const datePipeStub = () => ({ transform: (arg, string) => ({}) });
    const activatedRouteStub = () => ({
      snapshot: { data: { listProduits: {} } }
    });
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FormGeranceAssociesComponent],
      providers: [
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: DateAdapter, useFactory: dateAdapterStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        { provide: DatePipe, useFactory: datePipeStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: GroupService, useFactory: groupServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FormGeranceAssociesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
        DateAdapter
      );
      const geranceAssociesServiceStub: GeranceAssociesService = fixture.debugElement.injector.get(
        GeranceAssociesService
      );
      spyOn(dateAdapterStub, 'setLocale').and.callThrough();
      spyOn(geranceAssociesServiceStub, 'getExtensions').and.callThrough();
      component.ngOnInit();
      expect(dateAdapterStub.setLocale).toHaveBeenCalled();
      expect(geranceAssociesServiceStub.getExtensions).toHaveBeenCalled();
    });
  });

  // describe('clearCategorieProduit', () => {
  //   it('makes expected calls', () => {
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(utilsServiceStub, 'removeDuplicates').and.callThrough();
  //     component.clearCategorieProduit();
  //     expect(utilsServiceStub.removeDuplicates).toHaveBeenCalled();
  //   });
  // });
});
