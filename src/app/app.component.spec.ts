import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslationService } from '@alfresco/adf-core';
import { AuthenticationService } from '@alfresco/adf-core';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const translationServiceStub = () => ({ use: string => ({}) });
    const authenticationServiceStub = () => ({ isLoggedIn: () => ({}) });
    const alfrescoApiServiceStub = () => ({
      getInstance: () => ({ on: () => ({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const matIconRegistryStub = () => ({ addSvgIcon: (sofiral, arg) => ({}) });
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: string => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: TranslationService, useFactory: translationServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: AlfrescoApiService, useFactory: alfrescoApiServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatIconRegistry, useFactory: matIconRegistryStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const translationServiceStub: TranslationService = fixture.debugElement.injector.get(
  //       TranslationService
  //     );
  //     const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
  //       AuthenticationService
  //     );
  //     const alfrescoApiServiceStub: AlfrescoApiService = fixture.debugElement.injector.get(
  //       AlfrescoApiService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(translationServiceStub, 'use').and.callThrough();
  //     spyOn(authenticationServiceStub, 'isLoggedIn').and.callThrough();
  //     spyOn(alfrescoApiServiceStub, 'getInstance').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.ngOnInit();
  //     expect(translationServiceStub.use).toHaveBeenCalled();
  //     expect(authenticationServiceStub.isLoggedIn).toHaveBeenCalled();
  //     expect(alfrescoApiServiceStub.getInstance).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
