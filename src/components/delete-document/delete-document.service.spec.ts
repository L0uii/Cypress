import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { DeleteDocumentService } from './delete-document.service';
import { utilsServiceStub } from 'services/utils.service.stub';
import { UtilsService } from 'services/utils.service';

describe(DeleteDocumentService.name, () => {
  let service: DeleteDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DeleteDocumentService,
        {
          provide: UtilsService,
          useFactory: utilsServiceStub
        }
      ]
    });
    service = TestBed.inject(DeleteDocumentService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
