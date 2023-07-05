import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { ArchivesPresidenceService } from './archives-presidence.service';
import { ConseilService } from './conseil.service';
import { ExpertiseService } from './expertise.service';
import { GeranceAssociesService } from './gerance-associes.service';
import { FilePropertiesExpertise } from '../models/file-properties-expertise';
import { ContentService } from '@alfresco/adf-core';
import { DownloadService } from './download.service';
import { utilsServiceStub } from './utils.service.stub';
import { conseilServiceStub } from './conseil.stub';
import { geranceAssociesServiceStub } from './gerance-associes.stub';
import { expertiseServiceStub } from './expertise.stub';

describe(DownloadService.name, () => {
  let service: DownloadService;

  beforeEach(() => {
    const snackbarServiceStub = () => ({
      openSnackBar: (string, string1, string2) => ({})
    });
    const routerStub = () => ({
      url: { includes: () => ({}), split: () => ({}) }
    });
    const archivesPresidenceServiceStub = () => ({});
    const contentServiceStub = () => ({ getContentUrl: (id, arg) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        DownloadService,
        { provide: SnackbarService, useFactory: snackbarServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: ArchivesPresidenceService,
          useFactory: archivesPresidenceServiceStub
        },
        { provide: ConseilService, useFactory: conseilServiceStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        { provide: ContentService, useFactory: contentServiceStub }
      ]
    });
    service = TestBed.inject(DownloadService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
