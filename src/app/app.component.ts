import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslationService} from '@alfresco/adf-core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private translation: TranslationService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `adv`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-adv.svg'));
    this.matIconRegistry.addSvgIcon(
      `conseil`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-conseil.svg'));
    this.matIconRegistry.addSvgIcon(
      `fidusign`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-fidusign.svg'));
    this.matIconRegistry.addSvgIcon(
      `expertise`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-expertise-consulting.svg'));
    this.matIconRegistry.addSvgIcon(
      `associes`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-gerance.svg'));
    this.matIconRegistry.addSvgIcon(
      `sofiral`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-sofiral.svg'));
    this.matIconRegistry.addSvgIcon(
      `gestion-codes-budget`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-codes-budget.svg'));
    this.matIconRegistry.addSvgIcon(
      `rh-export`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-exports-rh.svg'));
    this.matIconRegistry.addSvgIcon(
      `gerance-immobilier`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/portal-icons/picto-ged-gerance-immobilier.svg'));
  }

  ngOnInit() {
    this.translation.use('fr');
  }
}
