import { AuthRedirectGuard } from './../../../guards/auth-redirect.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../../../components/app-layout/app-layout.component';
import {PortailComponent} from '../../../components/portail/portail.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthRedirectGuard],
    children: [
      {
        path: 'portail',
        component: PortailComponent,
        canActivate: [AuthRedirectGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceGedRoutingModule { }
