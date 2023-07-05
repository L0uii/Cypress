import { HomeConseilResolver } from './../../../resolvers/home-conseil.resolver';
import { AuthGuardEcm } from '@alfresco/adf-core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'components/app-layout/app-layout.component';
import { ConseilCustomerComponent } from 'components/conseil/conseil-customer/conseil-customer.component';
import { FormConseilComponent } from 'components/conseil/form-conseil/form-conseil.component';
import { HomeConseilComponent } from 'components/conseil/home-conseil/home-conseil.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { AuthRedirectGuard } from 'guards/auth-redirect.guard';

const data = {
  groups:[
    GroupsEnums.isUserConseilBO,
    GroupsEnums.isUserConseilCGP,
    GroupsEnums.isUserConseilDRSiege,
    GroupsEnums.isUserConseilDRPlateforme
  ]
};

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthGuardEcm],
    children: [
      {
        path: 'telechargement',
        component: FormConseilComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      },
      {
        path: 'traitement',
        redirectTo: 'traitement/',
        pathMatch: 'full'
      },
      {
        path: 'traitement/:userId',
        component: HomeConseilComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        resolve: { directionRegionales: HomeConseilResolver },
        data
      },
      {
        path: 'consultation',
        redirectTo: 'consultation/',
        pathMatch: 'full',
      },
      {
        path: 'consultation/:userId',
        component: HomeConseilComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        resolve: { directionRegionales: HomeConseilResolver },
        data
      },
      {
        path: 'clients',
        component: ConseilCustomerComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConseilRoutingModule { }
