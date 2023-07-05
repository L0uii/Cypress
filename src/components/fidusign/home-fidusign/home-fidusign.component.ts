import { Component, Injector } from '@angular/core';
import { HomeFidusignAchatsComponent } from 'components/fidusign/home-fidusign/achats/home-fidusign-achats.component';
import { HomeFidusignYProximiteComponent } from 'components/fidusign/home-fidusign/yproximite/home-fidusign-yproximite.component';
import { FidusignService } from 'services/fidusign.service';
import { HomeFidusignJuridiqueComponent } from './juridique/home-fidusign-juridique.component';

@Component({
  selector: 'app-home-fidusign',
  template: `<ng-container *ngComponentOutlet="subspace"></ng-container>`
})
export class HomeFidusignComponent {
  subspace: any;

  private subspaceMapper = {
    'achats': HomeFidusignAchatsComponent,
    'juridique': HomeFidusignJuridiqueComponent,
    'y-proximite': HomeFidusignYProximiteComponent
  }

  constructor(private fidusignService: FidusignService) {
    const { name } = this.fidusignService.userSubspace;

    this.subspace = this.subspaceMapper[name];
  }
}
