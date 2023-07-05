import { NgModule } from '@angular/core';
import { FormArchivesPresidenceComponent } from 'components/archives-presidence/form-archives-presidence/form-archives-presidence.component';
import { HomeArchivesPresidenceComponent } from 'components/archives-presidence/home-archives-presidence/home-archives-presidence.component';
import { UpdateArchivesPresidenceComponent } from 'components/archives-presidence/update-archives-presidence/update-archives-presidence.component';
import { SharedModule } from '../shared/shared.module';

import { ArchivePresidenceRoutingModule } from './archive-presidence-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ArchivePresidenceRoutingModule
  ],
  declarations: [
    HomeArchivesPresidenceComponent,
    FormArchivesPresidenceComponent,
    UpdateArchivesPresidenceComponent
  ]
})
export class ArchivePresidenceModule { }
