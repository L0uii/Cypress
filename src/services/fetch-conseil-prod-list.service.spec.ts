import { groupServiceStub } from 'services/group.service.stub';
import { GroupService } from 'services/group.service';
import { fetchDataServiceStub } from './fetch-data.stub';
import { FetchDataService } from 'services/fetch-data.service';
import { FetchConseilProdListService } from 'services/fetch-conseil-prod-list.service';
import { TestBed } from '@angular/core/testing';
import { ConseilClassments } from 'models/conseil';
import { AuthenticationService } from '@alfresco/adf-core';
import { NodesApiService } from '@alfresco/adf-core';
import { UtilsService } from './utils.service';
import { MANDATORY_METADATAS } from 'models/conseil';
import { utilsServiceStub } from './utils.service.stub';

describe(FetchConseilProdListService.name, () => {
  let service: FetchConseilProdListService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({ getEcmUsername: () => ({}) });
    const nodesApiServiceStub = () => ({
      getNode: nodeId => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      providers: [
        FetchConseilProdListService,
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: GroupService, useFactory: groupServiceStub }
      ]
    });
    service = TestBed.inject(FetchConseilProdListService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
