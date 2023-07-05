import {NgModule} from '@angular/core';
import {BudgetplusGestionComponent} from '../../../components/budgetplus-gestion/budgetplus-gestion.component';
import {SharedModule} from '../shared/shared.module';
import {BudgetplusGestionRoutingModule} from './budgetplus-gestion-routing.module';
import {SelectUserComponent} from '../../../components/budgetplus-gestion/select-user/select-user.component';
import {InfosUserComponent} from '../../../components/budgetplus-gestion/infos-user/infos-user.component';

@NgModule({
  imports: [
    SharedModule,
    BudgetplusGestionRoutingModule
  ],
  declarations: [BudgetplusGestionComponent, SelectUserComponent, InfosUserComponent]
})
export class BudgetplusGestionModule {
}
