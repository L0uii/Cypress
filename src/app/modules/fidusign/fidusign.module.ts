import { UploadFidusignProximite2StepComponent } from './../../../components/fidusign/upload-fidusign/upload-fidusign-proximite2step/upload-fidusign-proximite2step.component';
import { UploadFidusignStep3Type1Component } from './../../../components/fidusign/upload-fidusign/upload-fidusign-step3-type1/upload-fidusign-step3-type1.component';
import { UploadFidusignJuridique2Step } from './../../../components/fidusign/upload-fidusign/upload-fidusign-juridique2step/upload-fidusign-juridique2step.component';
import { UploadFidusignAchat2Step } from './../../../components/fidusign/upload-fidusign/upload-fidusign-achat2step/upload-fidusign-achat2step.component';
import { UploadFidusignComponent } from '../../../components/fidusign/upload-fidusign/upload-fidusign.component';
import { NgModule, Type } from '@angular/core';
import { SearchFidusignComponent } from 'components/fidusign/search-fidusign/search-fidusign.component';
import { FidusignService } from 'services/fidusign.service';
import { SharedModule } from '../shared/shared.module';
import { AchatsRoutingModule } from './fidusign-routing.module';
import { PortalModule } from '@angular/cdk/portal';
import { HomeFidusignComponent } from 'components/fidusign/home-fidusign/home-fidusign.component';
import { HomeFidusignYProximiteComponent } from 'components/fidusign/home-fidusign/yproximite/home-fidusign-yproximite.component';
import { HomeFidusignJuridiqueComponent } from 'components/fidusign/home-fidusign/juridique/home-fidusign-juridique.component';
import { HomeFidusignAchatsComponent } from 'components/fidusign/home-fidusign/achats/home-fidusign-achats.component';
import { HomeFidusignTemplateComponent } from 'components/fidusign/home-fidusign/home-fidusign-template.component';

@NgModule({
  imports: [
    SharedModule,
    PortalModule,
    AchatsRoutingModule
  ],
  declarations: [
    HomeFidusignComponent,
    UploadFidusignProximite2StepComponent,
    UploadFidusignStep3Type1Component,
    UploadFidusignJuridique2Step,
    UploadFidusignAchat2Step,
    HomeFidusignTemplateComponent as Type<any>,
    HomeFidusignAchatsComponent,
    HomeFidusignJuridiqueComponent,
    HomeFidusignYProximiteComponent,
    UploadFidusignComponent,
    SearchFidusignComponent
  ],
  providers: [
    FidusignService
  ]
})
export class FidusignModule { }
