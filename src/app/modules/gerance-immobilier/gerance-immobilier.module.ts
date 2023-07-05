import { NgModule } from '@angular/core';
import { HomeGeranceComponent } from 'components/gerance/home-gerance/home-gerance.component';
import { SearchResultsGeranceComponent } from 'components/gerance/search-results-gerance/search-results-gerance.component';
import { UploadGeranceComponent } from 'components/gerance/upload-gerance/upload-gerance.component';
import { SharedModule } from '../shared/shared.module';

import { GeranceImmobilierRoutingModule } from './gerance-immobilier-routing.module';

@NgModule({
  imports: [
    SharedModule,
    GeranceImmobilierRoutingModule
  ],
  declarations: [
    HomeGeranceComponent,
    UploadGeranceComponent,
    SearchResultsGeranceComponent
  ]
})
export class GeranceImmobilierModule { }
