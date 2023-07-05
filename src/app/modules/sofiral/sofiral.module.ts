import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SofiralRoutingModule} from './sofiral-routing.module';
import {SofiralComponent} from '../../../components/sofiral/sofiral.component';
import {SearchFileSofiralComponent} from '../../../components/sofiral/search-file-sofiral/search-file-sofiral.component';

@NgModule({
  imports: [
    SharedModule,
    SofiralRoutingModule
  ],
  declarations: [
    SofiralComponent,
    SearchFileSofiralComponent
  ]
})
export class SofiralModule {
}
