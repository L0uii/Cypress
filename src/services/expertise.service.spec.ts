// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import { AuthenticationService } from '@alfresco/adf-core';
// import { NodesApiService } from '@alfresco/adf-core';
// import { UtilsService } from './utils.service';
// import { MANDATORY_METADATAS } from 'models/mr';
// import { ExpertiseService } from './expertise.service';
// import { utilsServiceStub } from './utils.service.stub';

// describe(ExpertiseService.name, () => {
//   let service: ExpertiseService;

//   beforeEach(() => {
//     const authenticationServiceStub = () => ({ getEcmUsername: () => ({}) });
//     const nodesApiServiceStub = () => ({
//       getNode: nodeId => ({ toPromise: () => ({ then: () => ({}) }) })
//     });
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         ExpertiseService,
//         {
//           provide: AuthenticationService,
//           useFactory: authenticationServiceStub
//         },
//         { provide: NodesApiService, useFactory: nodesApiServiceStub },
//         { provide: UtilsService, useFactory: utilsServiceStub }
//       ]
//     });
//     service = TestBed.inject(ExpertiseService);
//   });

//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });
// });
