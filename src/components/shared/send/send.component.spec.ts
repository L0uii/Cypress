import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '@alfresco/adf-core';
import { GeranceAssociesService } from 'services/gerance-associes.service';
import { ConseilService } from 'services/conseil.service';
import { UtilsService } from 'services/utils.service';
import { Router } from '@angular/router';
import { ExpertiseService } from 'services/expertise.service';
import { ArchivesPresidenceService } from 'services/archives-presidence.service';
import { SendComponent } from './send.component';
import { utilsServiceStub } from 'services/utils.service.stub';
import { conseilServiceStub } from 'services/conseil.stub';
import { geranceAssociesServiceStub } from 'services/gerance-associes.stub';
import { expertiseServiceStub } from 'services/expertise.stub';

describe(SendComponent.name, () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getEcmUsername: () => ({}),
      getTicketEcm: () => ({})
    });
    const routerStub = () => ({ url: { includes: () => ({}) } });
    const archivesPresidenceServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SendComponent],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        {
          provide: GeranceAssociesService,
          useFactory: geranceAssociesServiceStub
        },
        { provide: ConseilService, useFactory: conseilServiceStub },
        { provide: UtilsService, useFactory: utilsServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: ExpertiseService, useFactory: expertiseServiceStub },
        {
          provide: ArchivesPresidenceService,
          useFactory: archivesPresidenceServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(SendComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
