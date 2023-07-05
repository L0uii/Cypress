import { AuthGuardEcm } from '@alfresco/adf-core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AppLayoutComponent } from 'components/app-layout/app-layout.component';
import { FormArchivesPresidenceComponent } from 'components/archives-presidence/form-archives-presidence/form-archives-presidence.component';
import { HomeArchivesPresidenceComponent } from 'components/archives-presidence/home-archives-presidence/home-archives-presidence.component';
import { UpdateArchivesPresidenceComponent } from 'components/archives-presidence/update-archives-presidence/update-archives-presidence.component';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { GroupsEnums } from "enums/groups.enums";

const data = {
  groups: [
    GroupsEnums.isUserArchivesPresidenceCONSULT,
    GroupsEnums.isUserArchivesPresidenceARCHIVISTES
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
        component: FormArchivesPresidenceComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      },
      {
        path: 'consultation',
        component: HomeArchivesPresidenceComponent,
        canActivate: [AuthGuardEcm, AuthGroupGuard],
        data
      },
      {
        path: 'modification/:nodeId',
        component: UpdateArchivesPresidenceComponent,
        canActivate: [AuthGuardEcm],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivePresidenceRoutingModule { }
