import { AuthGuardEcm } from '@alfresco/adf-core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'components/app-layout/app-layout.component';
import { HomeGeranceComponent } from 'components/gerance/home-gerance/home-gerance.component';
import { UploadGeranceComponent } from 'components/gerance/upload-gerance/upload-gerance.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';

const data = {groups: [GroupsEnums.isUserGeranceImmobilier]};

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthGuardEcm],
    children: [
      {
        path: 'signature',
        component: UploadGeranceComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      },
      {
        path: 'consultation',
        component: HomeGeranceComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeranceImmobilierRoutingModule { }
