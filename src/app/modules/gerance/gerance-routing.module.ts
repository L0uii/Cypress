import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from 'components/app-layout/app-layout.component';
import {FormGeranceAssociesComponent} from 'components/gerance/form-gerance-associes/form-gerance-associes.component';
import {HomeGeranceAssociesComponent} from 'components/gerance/home-gerance-associes/home-gerance-associes.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { AuthRedirectGuard } from 'guards/auth-redirect.guard';

const data = { groups: [GroupsEnums.isUserGeranceAssociesPartenaire]};

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthRedirectGuard],
    children: [
      {
        path: 'telechargement',
        component: FormGeranceAssociesComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation',
        redirectTo: 'consultation/',
        pathMatch: 'full',
      },
      {
        path: 'consultation/:userId',
        component: HomeGeranceAssociesComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'traitement',
        redirectTo: 'traitement/',
        pathMatch: 'full',
      },
      {
        path: 'traitement/:userId',
        component: HomeGeranceAssociesComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeranceRoutingModule {
}
