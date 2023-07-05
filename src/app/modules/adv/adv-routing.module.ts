import { AuthRedirectGuard } from 'guards/auth-redirect.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'components/app-layout/app-layout.component';
import { HomeComponent } from 'components/home/home.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';

const data = { groups: [GroupsEnums.isUserADV] };

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthRedirectGuard, AuthGroupGuard],
    data,
    children: [
      {
        path: 'consultation',
        component: HomeComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
      {
        path: 'consultation/:customerId',
        component: HomeComponent,
        canActivate: [AuthRedirectGuard, AuthGroupGuard],
        data
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvRoutingModule { }
