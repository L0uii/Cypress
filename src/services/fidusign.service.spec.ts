import { groupServiceStub } from 'services/group.service.stub';
import { GroupService } from 'services/group.service';
import { TranslateService } from '@ngx-translate/core';

import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { SnackbarService } from './snackbar.service';
import { UpdateResultsService } from './update-results.service';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { FidusignService } from './fidusign.service';
import { utilsServiceStub } from './utils.service.stub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FetchDataService } from './fetch-data.service';
import { fetchDataServiceStub } from './fetch-data.stub';

describe(FidusignService.name, () => {
  let service: FidusignService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    const snackbarServiceStub = () => ({
      openSnackBar: (arg, string, string1) => ({})
    });
    const updateResultsServiceStub = () => ({
      triggerRefreshChange: arg => ({})
    });
    const translateServiceStub = () => ({ currentLang: 'fr' });
    const routerStub = () => ({ navigate: array => ({}) });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FidusignService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
        { provide: FetchDataService, useFactory: fetchDataServiceStub },
        { provide: GroupService, useFactory: groupServiceStub }
      ]
    });
    service = TestBed.inject(FidusignService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
