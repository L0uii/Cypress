import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'services/utils.service';
import { AuthenticationService } from '@alfresco/adf-core';
import { PreviewService } from 'services/preview.service';
import { SnackbarService } from 'services/snackbar.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserService } from 'services/user.service';
import { FormsModule } from '@angular/forms';
import { HomeGeranceComponent } from './home-gerance.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { MaterialModule } from 'app/modules/material/material.module';

describe(HomeGeranceComponent.name, () => {
  let component: HomeGeranceComponent;
  let fixture: ComponentFixture<HomeGeranceComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const authenticationServiceStub = () => ({});
    const previewServiceStub = () => ({});
    const snackbarServiceStub = () => ({});
    const userServiceStub = () => ({ currentUser: { email: {} } });
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeGeranceComponent, CategorieGeranceAssociesMockPipe],
      providers: [
        { provide: Title, useFactory: titleStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: PreviewService, useFactory: previewServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeGeranceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.ngAfterViewInit();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearAll();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearCodeImmeuble', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearCodeImmeuble();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearCodeLot', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearCodeLot();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearCodeBail', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearCodeBail();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearCodeLocataire', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearCodeLocataire();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearBailDate', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearBailDate();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearNomImmeuble', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearNomImmeuble();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearNomLocataire', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearNomLocataire();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearStatutSignature', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearStatutSignature();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  describe('clearProprietaireImmeuble', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearProprietaireImmeuble();
      expect(component.onSearch).toHaveBeenCalled();
    });
  });

  // describe('onSearch', () => {
  //   it('makes expected calls', () => {
  //     const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
  //       UtilsService
  //     );
  //     spyOn(utilsServiceStub, 'getDateQuery').and.callThrough();
  //     component.onSearch();
  //     expect(utilsServiceStub.getDateQuery).toHaveBeenCalled();
  //   });
  // });
});

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'categorieGeranceAssociesTypeDocument'})
class CategorieGeranceAssociesMockPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}
