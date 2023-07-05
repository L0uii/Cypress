import { ReactiveFormsModule } from '@angular/forms';
import { PreviewService } from './../services/preview.service';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@alfresco/adf-core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginGuard } from './login.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'services/user.service';
import { userServiceStub } from 'services/user.service.stub';
import { MaterialModule } from 'app/modules/material/material.module';
import { TranslateService } from '@ngx-translate/core';

describe(LoginGuard.name, () => {
  let service: LoginGuard;

  const previewServiceStub = () => {};

  beforeEach(() => {
    const authenticationServiceStub = () => ({ isLoggedIn: () => true });
    const routerStub = () => ({ navigate: array => ({}) });
    const translateServiceStub = () => ({ currentLang: 'fr' });

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        LoginGuard,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: PreviewService, useFactory: previewServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub },
      ]
    });
    service = TestBed.inject(LoginGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
