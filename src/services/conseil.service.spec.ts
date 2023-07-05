// import { BrowserModule } from '@angular/platform-browser';
// import { AuthenticationService, NodesApiService } from "@alfresco/adf-core";
// import { TestBed } from "@angular/core/testing";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ConseilService } from "./conseil.service";
// import { UtilsService } from "./utils.service";
// import { utilsServiceStub } from "./utils.service.stub";

// describe(ConseilService.name, () => {
//   let service: ConseilService;

//   beforeEach(() => {
//     const authenticationServiceStub = () => ({});
//     const nodesApiServiceStub = () => ({
//       getNode: nodeId => ({ toPromise: () => ({ then: () => ({}) }) })
//     });
//     TestBed.configureTestingModule({
//       imports: [
//         BrowserModule,
//         FormsModule,
//         ReactiveFormsModule
//       ],
//       providers: [
//         ConseilService,
//         {
//           provide: AuthenticationService,
//           useFactory: authenticationServiceStub
//         },
//         { provide: NodesApiService, useFactory: nodesApiServiceStub },
//         { provide: UtilsService, useFactory: utilsServiceStub }
//       ]
//     });
//     service = TestBed.inject(ConseilService);
//   });

//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });
// });
