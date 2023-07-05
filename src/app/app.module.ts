import { ViewersModule } from 'components/viewers/viewers.module';
import {NgModule, ErrorHandler} from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {BrowserModule} from '@angular/platform-browser';

// App components
import {AppComponent} from './app.component';
import {SupervisionComponent} from 'components/supervision/supervision.component';
import {DeleteDocumentComponent} from 'components/delete-document/delete-document.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@alfresco/adf-core';
import {ContentModule} from '@alfresco/adf-content-services';
import {CommonModule} from '@angular/common';
import {PreviewService} from '../services/preview.service';
import {UpdateEmailComponent} from '../components/fidusign/update-email/update-email.component';
import {CopieMailComponent} from '../components/shared/copie-mail/copie-mail.component';
import {AboutComponent} from '../components/about/about.component';
import {DocumentationComponent} from '../components/documentation/documentation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptor} from 'interceptors/header.interceptor';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import { DeleteDocumentService } from 'components/delete-document/delete-document.service';
import { TranslateModule } from '@ngx-translate/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import * as Sentry from "@sentry/angular-ivy";

registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes // ,
// { enableTracing: true } // <-- debugging purposes only
, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    TranslateModule.forRoot(),
    CoreModule.forRoot(),
    ContentModule.forRoot(),
    ViewersModule
  ],
  declarations: [
    AppComponent,
    SupervisionComponent,
    DeleteDocumentComponent,
    UpdateEmailComponent,
    CopieMailComponent,
    AboutComponent,
    DocumentationComponent,
    SnackbarComponent
  ],
  providers: [
    PreviewService,
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    DeleteDocumentService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
