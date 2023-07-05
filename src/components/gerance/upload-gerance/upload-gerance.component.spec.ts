// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MaterialModule } from './../../../app/modules/shared/material/material.module';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SnackbarService } from 'services/snackbar.service';
// import { AuthenticationService } from '@alfresco/adf-core';
// import { NodesApiService } from '@alfresco/adf-core';
// import { PeopleContentService } from '@alfresco/adf-core';
// import { MatChipInputEvent } from '@angular/material/chips';
// import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
// import { FidusignService } from 'services/fidusign.service';
// import { UtilsService } from 'services/utils.service';
// import { UploadGeranceComponent } from './upload-gerance.component';
// import { SPACE, COMMA } from '@angular/cdk/keycodes';
// import { utilsServiceStub } from 'services/utils.service.stub';

// describe(UploadGeranceComponent.name, () => {
//   let component: UploadGeranceComponent;
//   let fixture: ComponentFixture<UploadGeranceComponent>;

//   const signataires = [];

//   beforeEach(() => {
//     const snackbarServiceStub = () => ({
//       openSnackBar: (string, string1, string2) => ({})
//     });
//     const authenticationServiceStub = () => ({
//       getEcmUsername: () => ({}),
//       getTicketEcm: () => ({})
//     });
//     const nodesApiServiceStub = () => ({ deleteNode: id => ({}) });
//     const peopleContentServiceStub = () => ({
//       getPerson: arg => ({ toPromise: () => ({ then: () => ({}) }) })
//     });
//     const dateAdapterStub = () => ({ setLocale: string => ({}) });
//     const fidusignServiceStub = () => ({
//       retrySend: (id, signProperties) => ({
//         then: () => ({ catch: () => ({}) })
//       })
//     });
//     TestBed.configureTestingModule({
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [UploadGeranceComponent],
//       imports: [
//         MaterialModule,
//         FormsModule,
//         ReactiveFormsModule,
//         MatDatepickerModule,
//         MatNativeDateModule
//       ],
//       providers: [
//         FormBuilder,
//         { provide: SnackbarService, useFactory: snackbarServiceStub },
//         {
//           provide: AuthenticationService,
//           useFactory: authenticationServiceStub
//         },
//         { provide: NodesApiService, useFactory: nodesApiServiceStub },
//         { provide: PeopleContentService, useFactory: peopleContentServiceStub },
//         { provide: DateAdapter, useFactory: dateAdapterStub },
//         { provide: FidusignService, useFactory: fidusignServiceStub },
//         { provide: UtilsService, useFactory: utilsServiceStub },
//         { provide: LOCALE_ID, useValue: 'fr' }
//       ]
//     });
//     fixture = TestBed.createComponent(UploadGeranceComponent);
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('add', () => {
//     it('makes expected calls', () => {
//       const matChipInputEventStub: MatChipInputEvent = <any>{};
//       const utilsServiceStub: UtilsService = fixture.debugElement.injector.get(
//         UtilsService
//       );
//       spyOn(component, 'validateCopieMail').and.callThrough();
//       spyOn(utilsServiceStub, 'validateEmail').and.callThrough();
//       component.add(matChipInputEventStub);
//       expect(component.validateCopieMail).toHaveBeenCalled();
//       expect(utilsServiceStub.validateEmail).toHaveBeenCalled();
//     });
//   });

//   describe('clear', () => {
//     it('makes expected calls', () => {
//       spyOn(component, 'initializeForm').and.callThrough();
//       component.clear();
//       expect(component.initializeForm).toHaveBeenCalled();
//     });
//   });

//   describe('closeSendMessage', () => {
//     it('makes expected calls', () => {
//       spyOn(component, 'clear').and.callThrough();
//       component.closeSendMessage();
//       expect(component.clear).toHaveBeenCalled();
//     });
//   });

//   describe('getUserInfos', () => {
//     it('makes expected calls', () => {
//       const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
//         AuthenticationService
//       );
//       const peopleContentServiceStub: PeopleContentService = fixture.debugElement.injector.get(
//         PeopleContentService
//       );
//       spyOn(authenticationServiceStub, 'getEcmUsername').and.callThrough();
//       spyOn(peopleContentServiceStub, 'getPerson').and.callThrough();
//       component.getUserInfos();
//       expect(authenticationServiceStub.getEcmUsername).toHaveBeenCalled();
//       expect(peopleContentServiceStub.getPerson).toHaveBeenCalled();
//     });
//   });

//   describe('initializeForm', () => {
//     it('makes expected calls', () => {
//       const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
//         FormBuilder
//       );
//       spyOn(formBuilderStub, 'group').and.callThrough();
//       component.initializeForm();
//       expect(formBuilderStub.group).toHaveBeenCalled();
//     });
//   });

//   describe('ngOnInit', () => {
//     it('makes expected calls', () => {
//       const dateAdapterStub: DateAdapter<any> = fixture.debugElement.injector.get(
//         DateAdapter
//       );
//       spyOn(component, 'initializeForm').and.callThrough();
//       spyOn(component, 'getUserInfos').and.callThrough();
//       spyOn(dateAdapterStub, 'setLocale').and.callThrough();
//       component.ngOnInit();
//       expect(component.initializeForm).toHaveBeenCalled();
//       expect(component.getUserInfos).toHaveBeenCalled();
//       expect(dateAdapterStub.setLocale).toHaveBeenCalled();
//     });
//   });
// });
