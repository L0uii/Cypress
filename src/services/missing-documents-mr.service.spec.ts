import { utilsServiceStub } from 'services/utils.service.stub';
import { UtilsService } from './utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { MissingDocumentsMrService } from './missing-documents-mr.service';
import { FetchDataService } from './fetch-data.service';
import { fetchDataServiceStub } from './fetch-data.stub';

describe('Service: MissingDocumentsMr', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MissingDocumentsMrService,
        {
          provide: UtilsService,
          useFactory: utilsServiceStub
        },
        {
          provide: FetchDataService,
          useFactory: fetchDataServiceStub
        },
      ]
    });
  });

  it('should ...', inject([MissingDocumentsMrService], (service: MissingDocumentsMrService) => {
    expect(service).toBeTruthy();
  }));
});
