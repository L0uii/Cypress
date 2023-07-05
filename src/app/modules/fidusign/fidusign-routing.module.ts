import { UploadFidusignComponent } from './../../../components/fidusign/upload-fidusign/upload-fidusign.component';
import { AuthGuardEcm } from '@alfresco/adf-core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'components/app-layout/app-layout.component';
import { HomeFidusignComponent } from 'components/fidusign/home-fidusign/home-fidusign.component';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthGroupGuard } from 'guards/auth-group.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthGuardEcm],
    children: [
      {
        path: 'signature',
        component: UploadFidusignComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data: {
          groups: [
            GroupsEnums.isUserFidusignAchat,
            GroupsEnums.isUserFidusignAchatAccesSpec,
            GroupsEnums.isUserFidusignJuridique,
            GroupsEnums.isUserFidusignYProximite,
            GroupsEnums.isUserFidusignYProximiteCommercial
          ]
        }
      },
      {
        path: 'consultation',
        component: HomeFidusignComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data: {
          groups: [
            GroupsEnums.isUserFidusignAchat,
            GroupsEnums.isUserFidusignAchatAccesSpec,
            GroupsEnums.isUserFidusignJuridique,
            GroupsEnums.isUserFidusignJuridiqueConsult,
            GroupsEnums.isUserFidusignYProximite,
            GroupsEnums.isUserFidusignYProximiteCommercial,
            GroupsEnums.isUserFidusignYProximiteConsult
          ]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchatsRoutingModule { }
