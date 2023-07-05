import { MaterialModule } from './../../app/modules/shared/material/material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Title } from '@angular/platform-browser';
import { SnackbarService } from 'services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { utilsServiceStub } from 'services/utils.service.stub';

describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const titleStub = () => ({ setTitle: string => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Title, useFactory: titleStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
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

  describe('clearAll', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onSearch').and.callThrough();
      component.clearAll();
      expect(component.onSearch).toHaveBeenCalled();
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

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const titleStub: Title = fixture.debugElement.injector.get(Title);
      spyOn(component, 'onSearch').and.callThrough();
      spyOn(titleStub, 'setTitle').and.callThrough();
      component.ngOnInit();
      expect(component.onSearch).toHaveBeenCalled();
      expect(titleStub.setTitle).toHaveBeenCalled();
    });
  });
});
