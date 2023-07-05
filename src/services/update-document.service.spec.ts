import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { UpdateResultsService } from './update-results.service';
import { UtilsService } from './utils.service';
import { GeranceAssociesService } from './gerance-associes.service';
import { UpdateDocumentService } from './update-document.service';
import { utilsServiceStub } from './utils.service.stub';
import { geranceAssociesServiceStub } from './gerance-associes.stub';

describe(UpdateDocumentService.name, () => {
  let service: UpdateDocumentService;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    const updateResultsServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UpdateDocumentService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: UpdateResultsService, useFactory: updateResultsServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        }
      ]
    });
    service = TestBed.inject(UpdateDocumentService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
