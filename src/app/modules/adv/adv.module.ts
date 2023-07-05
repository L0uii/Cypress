import { NgModule } from '@angular/core';
import { AdvRoutingModule } from './adv-routing.module';
import { HomeComponent } from 'components/home/home.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdvRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class AdvModule { }
