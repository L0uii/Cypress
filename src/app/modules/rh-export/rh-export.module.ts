import { RhExportRoutingModule } from './rh-export-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRhExportComponent } from 'components/rh-export/home-rh-export.component';

@NgModule({
  declarations: [
    HomeRhExportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RhExportRoutingModule
  ]
})
export class RhExportModule { }
