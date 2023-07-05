import { SnackbarService } from './snackbar.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { NodesApiService } from '@alfresco/adf-core';
import { UtilsService } from './utils.service';
import { COMMON_GERANCEASSOCIES } from '../models/gerance-associes';
import { GeranceAssociesService } from './gerance-associes.service';
import { utilsServiceStub } from './utils.service.stub';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe(GeranceAssociesService.name, () => {
  let service: GeranceAssociesService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    const nodesApiServiceStub = () => ({
      getNode: nodeId => ({ toPromise: () => ({ then: () => ({}) }) })
    });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        GeranceAssociesService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: NodesApiService, useFactory: nodesApiServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub }
      ]
    });
    service = TestBed.inject(GeranceAssociesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
