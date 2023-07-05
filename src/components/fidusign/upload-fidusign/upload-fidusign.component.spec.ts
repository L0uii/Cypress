import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {UploadFidusignComponent} from './upload-fidusign.component';
import {DragAndDropDirective} from '../../../directives/drag-and-drop.directive';
import {SearchCustomerComponent} from '../../conseil/search-customer/search-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../app/modules/material/material.module';
import {RouterTestingModule} from '@angular/router/testing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AlfrescoApiService,
  AppConfigService,
  AuthenticationService,
  CookieService,
  LogService,
  SearchConfigurationService,
  SearchService,
  StorageService
} from '@alfresco/adf-core';
import {PreviewService} from '../../../services/preview.service';
import { PipesModule } from 'app/modules/shared/pipes/pipes.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';

describe(UploadFidusignComponent.name, () => {
  let component: UploadFidusignComponent;
  let fixture: ComponentFixture<UploadFidusignComponent>;

  beforeEach(waitForAsync(() => {
    const translateServiceStub = () => ({ currentLang: 'fr' });
    TestBed.configureTestingModule({
      declarations: [UploadFidusignComponent, DragAndDropDirective, SearchCustomerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        PipesModule,
        HttpClientTestingModule
      ],
      providers: [
        SearchService,
        AlfrescoApiService,
        CookieService,
        AuthenticationService,
        AppConfigService,
        PreviewService,
        StorageService,
        LogService,
        SearchConfigurationService,
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFidusignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
