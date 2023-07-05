import { MissingDocumentsMrComponent } from 'components/mr/missing-documents-mr/missing-documents-mr.component';
import { NgModule } from '@angular/core';

import { ExpertiseConsultingRoutingModule } from './expertise-consulting-routing.module';
import { HomeMrComponent } from 'components/mr/home-mr/home-mr.component';
import { SearchDossierComponent } from 'components/mr/search-dossier/search-dossier.component';
import { ChampSalariesComponent } from 'components/mr/champ-salaries/champ-salaries.component';
import { FormMrComponent } from 'components/mr/form-mr/form-mr.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateMrComponent } from 'components/mr/update-mr/update-mr.component';
import { ExportsMrComponent } from 'components/mr/exports-mr/exports-mr.component';
import { ViewersModule } from 'components/viewers/viewers.module';

@NgModule({
  imports: [
    SharedModule,
    ExpertiseConsultingRoutingModule,
    ViewersModule
  ],
  declarations: [
    MissingDocumentsMrComponent,
    HomeMrComponent,
    SearchDossierComponent,
    ChampSalariesComponent,
    FormMrComponent,
    UpdateMrComponent,
    ExportsMrComponent,
  ],
})
export class ExpertiseConsultingModule { }
