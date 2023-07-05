import { AuthRedirectGuard } from 'guards/auth-redirect.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from 'components/app-layout/app-layout.component';
import {SofiralComponent} from '../../../components/sofiral/sofiral.component';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { GroupsEnums } from 'enums/groups.enums';

const data = {groups: [GroupsEnums.isUserSofiral]};

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthRedirectGuard],
    children: [
      {
        path: 'consultation',
        redirectTo: 'consultation/',
        pathMatch: 'full',
      },
      {
        path: 'consultation/:codeBudget/:userId',
        component: SofiralComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation/:userId',
        component: SofiralComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation/:codeBudget/',
        redirectTo: 'consultation/:codeBudget//',
        pathMatch: 'full'
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SofiralRoutingModule {
}
