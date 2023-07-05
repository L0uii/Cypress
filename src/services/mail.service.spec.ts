import { utilsServiceStub } from 'services/utils.service.stub';

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ContentService } from '@alfresco/adf-core';
import { SnackbarService } from './snackbar.service';
import { DownloadService } from './download.service';
import { UtilsService } from './utils.service';
import { MailService } from './mail.service';

describe(MailService.name, () => {
  let service: MailService;

  beforeEach(() => {
    const contentServiceStub = () => ({ getContentUrl: (id, arg) => ({}) });
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const downloadServiceStub = () => ({ nameFacture: file => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MailService,
        { provide: ContentService, useFactory: contentServiceStub },
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: DownloadService, useFactory: downloadServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub }
      ]
    });
    service = TestBed.inject(MailService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
