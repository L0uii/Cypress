// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import { AuthenticationService } from '@alfresco/adf-core';
// import { UtilsService } from './utils.service';
// import { GroupService } from './group.service';
// import { utilsServiceStub } from './utils.service.stub';

// describe(GroupService.name, () => {
//   let service: GroupService;

//   beforeEach(() => {
//     const authenticationServiceStub = () => ({
//       getEcmUsername: () => ({}),
//       getTicketEcm: () => ({})
//     });
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         GroupService,
//         {
//           provide: AuthenticationService,
//           useFactory: authenticationServiceStub
//         },
//         { provide: UtilsService, useFactory: utilsServiceStub }
//       ]
//     });
//     service = TestBed.inject(GroupService);
//   });

//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('checkGEDSpaceNumber', () => {
//     it('makes expected calls', () => {
//       spyOn(service, 'getEspacesGED').and.callThrough();
//       service.checkGEDSpaceNumber();
//       expect(service.getEspacesGED).toHaveBeenCalled();
//     });
//   });
// });
