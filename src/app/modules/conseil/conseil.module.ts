import { ViewersModule } from 'components/viewers/viewers.module';
import {NgModule} from '@angular/core';
import {ConseilCustomerComponent} from 'components/conseil/conseil-customer/conseil-customer.component';
import {FormConseilComponent} from 'components/conseil/form-conseil/form-conseil.component';
import {HomeConseilComponent} from 'components/conseil/home-conseil/home-conseil.component';
import {SearchCustomerComponent} from 'components/conseil/search-customer/search-customer.component';
import {UpdateConseilComponent} from 'components/conseil/update-conseil/update-conseil.component';
import {ConseilService} from 'services/conseil.service';
import {SharedModule} from '../shared/shared.module';
import {ConseilRoutingModule} from './conseil-routing.module';

@NgModule({
  imports: [
    ConseilRoutingModule,
    ViewersModule,
    SharedModule,
  ],
  declarations: [
    HomeConseilComponent,
    SearchCustomerComponent,
    FormConseilComponent,
    ConseilCustomerComponent,
    UpdateConseilComponent
  ],
  providers: [
    ConseilService
  ]
})
export class ConseilModule { }
