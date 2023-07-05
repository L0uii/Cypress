import { UpdateGeranceAssociesComponent } from './../components/gerance/update-gerance-associes/update-gerance-associes.component';
import { UpdateConseilComponent } from './../components/conseil/update-conseil/update-conseil.component';
import { UpdateMrComponent } from './../components/mr/update-mr/update-mr.component';
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardEcm} from '@alfresco/adf-core';
import {FileViewComponent} from '../components/viewers/file-view/file-view.component';
import {SupervisionComponent} from 'components/supervision/supervision.component';
import {ViewerPdfComponent} from 'components/viewers/viewer-pdf/viewer-pdf.component';
import {ViewerDocxComponent} from 'components/viewers/viewer-docx/viewer-docx.component';
import {DeleteDocumentComponent} from 'components/delete-document/delete-document.component';
import {ViewerMultiPdfComponent} from 'components/viewers/viewer-multi-pdf/viewer-multi-pdf.component';
import {UpdateEmailComponent} from '../components/fidusign/update-email/update-email.component';
import {CopieMailComponent} from '../components/shared/copie-mail/copie-mail.component';
import {AboutComponent} from '../components/about/about.component';
import {DocumentationComponent} from '../components/documentation/documentation.component';

export const appRoutes: Routes = [
  {
    path: 'modifier-email/:nodeId',
    component: UpdateEmailComponent,
    canActivate: [AuthGuardEcm]
  },
  {
    path: 'copie-email/:nodeId',
    component: CopieMailComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'files/:nodeId',
    component: FileViewComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'preview/:nodeId',
    component: FileViewComponent,
    canActivate: [AuthGuardEcm],
  },
  {
    path: 'pdfs/:nodeId',
    component: ViewerMultiPdfComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'pdf/:nodeId',
    component: ViewerPdfComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'docx/:nodeId',
    component: ViewerDocxComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'modification-expertise/:nodeId',
    component: UpdateMrComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'modification-conseil/:nodeId',
    component: UpdateConseilComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'modification-gerance/:nodeId',
    component: UpdateGeranceAssociesComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'delete',
    component: DeleteDocumentComponent,
    canActivate: [AuthGuardEcm],
    outlet: 'view'
  },
  {
    path: 'adv',
    loadChildren: () => import('./modules/adv/adv.module').then(m => m.AdvModule)
  },
  {
    path: 'conseil',
    loadChildren: () => import('./modules/conseil/conseil.module').then(m => m.ConseilModule)
  },
  {
    path: 'expertise-consulting',
    loadChildren: () => import('./modules/expertise-consulting/expertise-consulting.module').then(m => m.ExpertiseConsultingModule)
  },
  {
    path: 'fidusign',
    loadChildren: () => import('./modules/fidusign/fidusign.module').then(m => m.FidusignModule)
  },
  {
    path: 'gerance-immobilier',
    loadChildren: () => import('./modules/gerance-immobilier/gerance-immobilier.module').then(m => m.GeranceImmobilierModule)
  },
  {
    path: 'gerance-associes',
    loadChildren: () => import('./modules/gerance/gerance.module').then(m => m.GeranceModule)
  },
  {
    path: 'archives-presidence',
    loadChildren: () => import('./modules/archive-presidence/archive-presidence.module').then(m => m.ArchivePresidenceModule)
  },
  {
    path: 'espace-ged',
    loadChildren: () => import('./modules/espace-ged/espace-ged.module').then(m => m.EspaceGedModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sofiral',
    loadChildren: () => import('./modules/sofiral/sofiral.module').then(m => m.SofiralModule)
  },
  {
    path: 'budgetplus-gestion',
    loadChildren: () => import('./modules/budgetplus-gestion/budgetplus-gestion.module').then(m => m.BudgetplusGestionModule)
  },
  {
    path: 'rh-export',
    loadChildren: () => import('./modules/rh-export/rh-export.module').then(m => m.RhExportModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'supervision',
    component: SupervisionComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'login'}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
