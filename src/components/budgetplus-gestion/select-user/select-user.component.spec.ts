import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IntranetUser } from '../../../models/intranet-user';
import { SnackbarService } from '../../../services/snackbar.service';
import { SelectUserComponent } from './select-user.component';

describe(SelectUserComponent.name, () => {
  let component: SelectUserComponent;
  let fixture: ComponentFixture<SelectUserComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectUserComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SelectUserComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const snackbarServiceStub: SnackbarService = fixture.debugElement.injector.get(
  //       SnackbarService
  //     );
  //     spyOn(snackbarServiceStub, 'openSnackBar').and.callThrough();
  //     component.ngOnInit();
  //     expect(snackbarServiceStub.openSnackBar).toHaveBeenCalled();
  //   });
  // });

  // describe('ngAfterViewInit', () => {
  //   it('makes expected calls', () => {
  //     const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
  //       ChangeDetectorRef
  //     );
  //     spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
  //     component.ngAfterViewInit();
  //     expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
  //   });
  // });
});
