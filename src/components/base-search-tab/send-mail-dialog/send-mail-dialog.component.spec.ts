// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { SendMailDialogComponent } from './send-mail-dialog.component';

// describe(SendMailDialogComponent.name, () => {
//   let component: SendMailDialogComponent;
//   let fixture: ComponentFixture<SendMailDialogComponent>;

//   beforeEach(() => {
//     const formBuilderStub = () => ({
//       group: object => ({}),
//       array: array => ({})
//     });
//     const matDialogRefStub = () => ({ close: () => ({}) });
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [SendMailDialogComponent],
//       providers: [
//         FormBuilder,
//         { provide: MatDialogRef, useFactory: matDialogRefStub },
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//       ]
//     });
//     fixture = TestBed.createComponent(SendMailDialogComponent);
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('closeDialog', () => {
//     it('makes expected calls', () => {
//       const matDialogRefStub: MatDialogRef<SendMailDialogComponent> = fixture.debugElement.injector.get(
//         MatDialogRef
//       );
//       spyOn(matDialogRefStub, 'close').and.callThrough();
//       component.closeDialog();
//       expect(matDialogRefStub.close).toHaveBeenCalled();
//     });
//   });

//   describe('sendMail', () => {
//     it('makes expected calls', () => {
//       const matDialogRefStub: MatDialogRef<SendMailDialogComponent> = fixture.debugElement.injector.get(
//         MatDialogRef
//       );
//       spyOn(matDialogRefStub, 'close').and.callThrough();
//       component.sendMail();
//       expect(matDialogRefStub.close).toHaveBeenCalled();
//     });
//   });
// });
