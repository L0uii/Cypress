import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@alfresco/adf-core';
import { PeopleContentService } from '@alfresco/adf-core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FetchDataService } from '../../services/fetch-data.service';
import { IntranetUser } from '../../models/intranet-user';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BudgetplusGestionComponent } from './budgetplus-gestion.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { userServiceStub } from 'services/user.service.stub';
import { fetchDataServiceStub } from 'services/fetch-data.stub';

describe(BudgetplusGestionComponent.name, () => {
  let component: BudgetplusGestionComponent;
  let fixture: ComponentFixture<BudgetplusGestionComponent>;

  beforeEach(() => {
    const authenticationServiceStub = () => ({});
    const peopleContentServiceStub = () => ({});
    const snackbarServiceStub = () => ({
      openError: (string1, string2) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule],
      declarations: [BudgetplusGestionComponent],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: PeopleContentService, useFactory: peopleContentServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(BudgetplusGestionComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('add', () => {
  //   it('makes expected calls', () => {
  //     const matChipInputEventStub: MatChipInputEvent = <any>{};
  //     const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
  //       SnackbarService
  //     );
  //     spyOn(snackbarServiceStub, 'openSnackBar').and.callThrough();
  //     component.add(matChipInputEventStub);
  //     expect(snackbarServiceStub.openSnackBar).toHaveBeenCalled();
  //   });
  // });

  describe('selectUser', () => {
    it('makes expected calls', () => {
      const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
        SnackbarService
      );
      spyOn(snackbarServiceStub, 'openError').and.callThrough();
      component.selectUser();
      expect(snackbarServiceStub.openError).toHaveBeenCalled();
    });
  });

  // describe('onSubmit', () => {
  //   it('makes expected calls', () => {
  //     const userServiceStub: UserService = fixture.debugElement.injector.get(
  //       UserService
  //     );
  //     spyOn(userServiceStub, 'editCodeBudgetPlus').and.callThrough();
  //     component.onSubmit();
  //     expect(userServiceStub.editCodeBudgetPlus).toHaveBeenCalled();
  //   });
  // });
});
