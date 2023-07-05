import { ViewersModule } from 'components/viewers/viewers.module';
import { DialogGeranceAssociesComponent } from '../../../components/gerance/dialog-gerance-associes/dialog-gerance-associes.component';
import { NgModule } from '@angular/core';
import {GeranceRoutingModule} from './gerance-routing.module';
import {HomeGeranceAssociesComponent} from 'components/gerance/home-gerance-associes/home-gerance-associes.component';
import {FormGeranceAssociesComponent} from 'components/gerance/form-gerance-associes/form-gerance-associes.component';
import {SharedModule} from '../shared/shared.module';
import {UpdateGeranceAssociesComponent} from '../../../components/gerance/update-gerance-associes/update-gerance-associes.component';
import {
  SearchDossierGeranceAssociesComponent
} from '../../../components/gerance/search-dossier-gerance-asssocies/search-dossier-gerance-associes.component';
import {AppConfigService, AuthenticationService, CookieService, LogService, StorageService} from '@alfresco/adf-core';
import {HttpClient} from '@angular/common/http';
import {PreviewService} from '../../../services/preview.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DialogGeranceAssocProjComponent } from 'components/gerance/dialog-gerance-assoc-proj/dialog-gerance-assoc-proj.component';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
    SharedModule,
    GeranceRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    ViewersModule,
  ],
  declarations: [
    HomeGeranceAssociesComponent,
    FormGeranceAssociesComponent,
    UpdateGeranceAssociesComponent,
    SearchDossierGeranceAssociesComponent,
    DialogGeranceAssociesComponent,
    DialogGeranceAssocProjComponent
  ],
  providers: [
    AppConfigService,
    DatePipe,
    PreviewService,
    LogService,
    StorageService,
    CookieService,
    AuthenticationService
  ]
})
export class GeranceModule {
}
