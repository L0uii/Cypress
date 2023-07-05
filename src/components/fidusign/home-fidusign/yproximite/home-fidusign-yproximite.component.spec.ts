// import { FidusignService } from 'services/fidusign.service';
// import { utilsServiceStub } from 'services/utils.service.stub';
// import { UtilsService } from './../../../../services/utils.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { HomeFidusignYProximiteComponent } from './../yproximite/home-fidusign-yproximite.component';
// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// describe('HomeFidusignYProximiteComponent', () => {
//   let component: HomeFidusignYProximiteComponent;
//   let fixture: ComponentFixture<HomeFidusignYProximiteComponent>;

//   const fidusignServiceStub = () => ({
//     getProximiteSegmentMarcheList: () => ({}),
//     userSubspace: {},
//     commonRechercheAvanceeFields: {
//       enveloppe: []
//     }
//   });

//   beforeEach((() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         ReactiveFormsModule
//       ],
//       declarations: [ HomeFidusignYProximiteComponent ],
//       providers: [
//         {
//           provide: UtilsService,
//           useFactory: utilsServiceStub
//         },
//         {
//           provide: FidusignService,
//           useFactory: fidusignServiceStub
//         }
//       ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeFidusignYProximiteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
