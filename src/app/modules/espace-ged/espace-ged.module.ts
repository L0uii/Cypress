import { NgModule } from '@angular/core';

import { EspaceGedRoutingModule } from './espace-ged-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PortailComponent} from '../../../components/portail/portail.component';

@NgModule({
  imports: [
    SharedModule,
    EspaceGedRoutingModule
  ],
  declarations: [
    PortailComponent
  ],
  providers: [
  ]
})
export class EspaceGedModule { }
