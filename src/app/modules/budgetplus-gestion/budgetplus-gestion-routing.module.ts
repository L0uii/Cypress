import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../../../components/app-layout/app-layout.component';
import {BudgetplusGestionComponent} from '../../../components/budgetplus-gestion/budgetplus-gestion.component';
import { AuthGroupGuard } from 'guards/auth-group.guard';
import { GroupsEnums } from 'enums/groups.enums';
import { AuthRedirectGuard } from 'guards/auth-redirect.guard';

//const data = { groups: [GroupsEnums.isUserBudgetPlusGestion };

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'add/',
        component: BudgetplusGestionComponent,
        canActivate: [
          AuthRedirectGuard,
          //AuthGroupGuard
        ],
        //data
      },
      {
        path: 'add',
        redirectTo: 'add/',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetplusGestionRoutingModule {
}
