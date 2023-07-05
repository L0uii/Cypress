import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from 'components/app-layout/app-layout.component';
import {ExportsMrComponent} from 'components/mr/exports-mr/exports-mr.component';
import {FormMrComponent} from 'components/mr/form-mr/form-mr.component';
import {HomeMrComponent} from 'components/mr/home-mr/home-mr.component';
import { MissingDocumentsMrComponent } from 'components/mr/missing-documents-mr/missing-documents-mr.component';
import {UpdateMrComponent} from 'components/mr/update-mr/update-mr.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { AuthRedirectGuard } from 'guards/auth-redirect.guard';

const data = { groups: [GroupsEnums.isUserMR] };

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthRedirectGuard],
    children: [
      {
        path: 'telechargement',
        component: FormMrComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'missing-documents',
        component: MissingDocumentsMrComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation',
        redirectTo: 'consultation/',
        pathMatch: 'full',
      },
      {
        path: 'consultation/:codeBudget/:numeroDossier',
        component: HomeMrComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation/:firstParam',
        component: HomeMrComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'exports',
        component: ExportsMrComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertiseConsultingRoutingModule {
}
