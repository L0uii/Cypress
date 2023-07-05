// import {async, ComponentFixture, TestBed} from '@angular/core/testing';

// import {BaseSearchTabComponent} from './base-search-tab.component';
// import {MaterialModule} from '../../app/modules/material/material.module';
// import {
//   AlfrescoApiService,
//   AppConfigService,
//   AuthenticationService,
//   CookieService,
//   LogService,
//   SearchConfigurationService,
//   SearchService,
//   StorageService
// } from '@alfresco/adf-core';
// import {HttpClient, HttpHandler} from '@angular/common/http';
// import {PreviewService} from '../../services/preview.service';
// import {RouterTestingModule} from '@angular/router/testing';
// import { PipesModule } from 'app/modules/shared/pipes/pipes.module';
// import { TranslateService } from '@ngx-translate/core';

// describe(BaseSearchTabComponent.name, () => {
//   let component: BaseSearchTabComponent;
//   let fixture: ComponentFixture<BaseSearchTabComponent>;

//   beforeEach((() => {
//     const translateServiceStub = () => ({ currentLang: 'fr' });
//     TestBed.configureTestingModule({
//       declarations: [BaseSearchTabComponent],
//       imports: [MaterialModule, PipesModule, RouterTestingModule],
//       providers: [
//         SearchService,
//         AlfrescoApiService,
//         CookieService,
//         AuthenticationService,
//         AppConfigService,
//         PreviewService,
//         HttpClient,
//         HttpHandler,
//         StorageService,
//         LogService,
//         SearchConfigurationService,
//         { provide: TranslateService, useFactory: translateServiceStub }
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BaseSearchTabComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
