// import { TestBed } from '@angular/core/testing';
// import { AuthenticationService } from '@alfresco/adf-core';
// import { SearchService } from '@alfresco/adf-core';
// import { ExpertiseService } from './expertise.service';
// import { ConseilService } from './conseil.service';
// import { GeranceAssociesService } from './gerance-associes.service';
// import { FetchDataService } from './fetch-data.service';

// describe(FetchDataService.name, () => {
//   let service: FetchDataService;

//   beforeEach(() => {
//     const authenticationServiceStub = () => ({});
//     const searchServiceStub = () => ({});
//     const expertiseServiceStub = () => ({});
//     const conseilServiceStub = () => ({});
//     const geranceAssociesServiceStub = () => ({});
//     TestBed.configureTestingModule({
//       providers: [
//         FetchDataService,
//         {
//           provide: AuthenticationService,
//           useFactory: authenticationServiceStub
//         },
//         { provide: SearchService, useFactory: searchServiceStub },
//         { provide: ExpertiseService, useFactory: expertiseServiceStub },
//         { provide: ConseilService, useFactory: conseilServiceStub },
//         {
//           provide: GeranceAssociesService,
//           useFactory: geranceAssociesServiceStub
//         }
//       ]
//     });
//     service = TestBed.inject(FetchDataService);
//   });

//   it('can load instance', () => {
//     expect(service).toBeTruthy();
//   });
// });
