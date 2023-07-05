import { AuthGuard } from "@alfresco/adf-core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "components/app-layout/app-layout.component";
import { HomeRhExportComponent } from "components/rh-export/home-rh-export.component";
import { GroupsEnums } from "enums/groups.enums";
import { AuthGroupGuard } from "guards/auth-group.guard";

const data = {
  groups: [
    GroupsEnums.isUserExportDap,
    GroupsEnums.isUserExportFormation,
    GroupsEnums.isUserExportBulletins,
    GroupsEnums.isUserExportAutres
  ]
};

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'perte-marche',
        component: HomeRhExportComponent,
        canActivate: [AuthGroupGuard],
        data
      },
      {
        path: 'autre-type',
        component: HomeRhExportComponent,
        canActivate: [AuthGroupGuard],
        data
      },
      {
        path: 'bulletins',
        component: HomeRhExportComponent,
        canActivate: [AuthGroupGuard],
        data
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RhExportRoutingModule { }
