import { groupServiceStub } from 'services/group.service.stub';
import { contextServiceStub } from 'services/context.service.stub';
import { GroupService } from 'services/group.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AuthRedirectGuard } from './auth-redirect.guard';
import { AlfrescoApiService, AuthenticationService } from '@alfresco/adf-core';
import { ContextService } from 'services/context.service';

describe('AuthRedirectGuard', () => {
  const alfrescoApiServiceStub = () => ({
    getInstance: () => ({
      isLoggedIn: () => true
    })
  });

  const authenticationServiceStub = () => ({ isLoggedIn: () => ({}) });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AuthRedirectGuard,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        {
          provide: GroupService,
          useFactory: groupServiceStub
        },
        {
          provide: AlfrescoApiService,
          useFactory: alfrescoApiServiceStub
        },
        {
          provide: ContextService,
          useFactory: contextServiceStub
        }
      ]
    });
  });

  it('should ...', inject([AuthRedirectGuard], (guard: AuthRedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
