import { ContextService } from 'services/context.service';
import { LabelValue } from './../../models/archives-presidence';
import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
import {Event, NavigationEnd, Router} from '@angular/router';
import { filter, takeUntil, take, finalize } from 'rxjs/operators';
import {UserService} from 'services/user.service';
import {Subject, Subscription} from 'rxjs';
import {ContextSearchConseilService} from '../../services/context-search-conseil.service';
import {ContextSearchMrService} from '../../services/context-search-mr.service';
import {environment} from '../../environments/environment';
import {AboutComponent} from '../about/about.component';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog} from '@angular/material/dialog';
import {DocumentationComponent} from '../documentation/documentation.component';
import {GeranceAssociesService} from '../../services/gerance-associes.service';
import {ContextSearchGeranceAssociesService} from '../../services/context-search-gerance-associes.service';
import {ExpertiseService} from '../../services/expertise.service';
import {UntypedFormControl} from '@angular/forms';
import {UpdateResultsService} from '../../services/update-results.service';
import {SnackbarService} from '../../services/snackbar.service';
import {User} from 'models/user';
import {GroupService} from '../../services/group.service';
import {GroupsEnums} from '../../enums/groups.enums';
import { CodeBudgetService } from 'services/code-budget.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import * as Sentry from "@sentry/angular-ivy";

export const LABELS = {
  signature: 'Charger / Envoyer en signature',
  consultation: 'Consulter',
  traitement: 'À traiter',
  exports: 'Exports',
  telechargement: 'Charger',
  'missing-documents': 'Documents absents',
  clients: 'Clients',
  'perte-marche': `Export "Perte de Marché"`,
  'autre-type': `Export "Autre type"`,
  bulletins: `Export "Bulletins"`
};

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})

export class AppLayoutComponent implements OnInit, OnDestroy {
  user: User;
  codeBudget = '';
  show = true;
  navigationLinks = [];
  currentSpace = '';
  espaces = {
    'fidusign': ['consultation', 'signature'],
    'gerance-immobilier': ['signature', 'consultation'],
    'gerance-associes': ['consultation', 'traitement', 'telechargement'],
    'conseil': ['consultation', 'traitement', 'telechargement', 'clients'],
    'archives-presidence': ['consultation', 'telechargement'],
    'expertise-consulting': ['consultation', 'telechargement', 'missing-documents', 'exports'],
    'sofiral': ['consultation'],
    'adv': ['consultation'],
    'budgetplus-gestion': [],
    'rh-export': [ 'perte-marche', 'bulletins', 'autre-type' ]
  };
  unsubscribe$: Subject<void> = new Subject<void>();
  isProduction: boolean;
  codeBudgets: Array<LabelValue> = [];
  private docType: string;
  private codeBudgetSubscription: Subscription;
  rights: Array<string>;
  @ViewChild('inputCodeBudgetElement') inputCodeBudgetElementRef: ElementRef;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  readonly maxCodeBudgets = 10;
  codeBudgetControl = new UntypedFormControl();

  currentVersion: string;
  isNewVersion: boolean;

  snackRef: MatSnackBarRef<TextOnlySnackBar>;
  singleCodeBudgetLabel = '';

  codeBudgetInputStyle: { 'width': string, 'min-width': string };

  private readonly releaseNotesUrl = 'http://applnet.fiducial.fr/GetContenu/Download.aspx?P1=00221bea-c7e9-4211-b3b0-639f7c0b4697&P2=0&P5=1&P6=NOPUB';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private expertiseService: ExpertiseService,
    private contextSearchConseilService: ContextSearchConseilService,
    private contextSearchMrService: ContextSearchMrService,
    private contextSearchGeranceAssociesService: ContextSearchGeranceAssociesService,
    private geranceAssociesService: GeranceAssociesService,
    private updateService: UpdateResultsService,
    private snack: SnackbarService,
    public groupService: GroupService,
    public dialog: MatDialog,
    private codeBudgetService: CodeBudgetService,
    private contextService: ContextService
  ) {
    this.rights = this.groupService.rights;
    // if (this.groupService.isInGroups([GroupsEnums.isUserFidusignJuridiqueConsult])) {
    //   this.espaces.achats = ['consultation'];
    // }
    router.events
      .pipe(takeUntil(this.unsubscribe$))
      .pipe(filter((val: Event) => val instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        this.initNavigation(val.url);
      });
    this.geranceAssociesService.documentType.subscribe(docType => {
      this.docType = docType;
    });

    this.currentVersion = this.contextService.currentVersion;
    this.isNewVersion = this.contextService.isNewVersion;
    if (this.isNewVersion && !this.contextService.wasVersionSnackBarShown) {
      this.snackRef = this.snack.openActionSnackBar(
        `Une nouvelle version de l'Espace GED a été mise à disposition depuis votre dernière connexion`,
        'Voir contenu'
      );

      this.snackRef.onAction().subscribe(() => {
        window.open(this.releaseNotesUrl, '_blank');
        this.contextService.saveCurrentVersion();
        this.isNewVersion = false;
      })
    }
  }

  ngOnInit() {
    this.isProduction = environment.production;
    this.groupService.checkGEDSpaceNumber();
    this.user = this.userService.currentUser;
    this.codeBudget = this.userService.selectedCodeBudget;
    this.codeBudgetControl.setValue(this.codeBudget, { emitEvent: false });
    this.getCodeBudgetList();
    this.codeBudgetControlSubscription();
    this.userService.selectedCodeBudgetRef.subscribe(codeBudget => {
      this.codeBudget = codeBudget;
      if (this.codeBudgetControl.value !== this.codeBudget) {
        this.codeBudgetControl.setValue(this.codeBudget, { emitEvent: false });
      }
    });
  }

  private codeBudgetControlSubscription() {
    this.codeBudgetControl.valueChanges
      .subscribe(codeBudget => {
        if (codeBudget) {
          this.userService.setCodeBudget(codeBudget);
          this.setCodeBudgetInputStyle();
        }
      });
  }

  private getCodeBudgetList() {
    this.codeBudgetService.getCodeBudgetList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(codeBudgetList => {
        this.codeBudgets = this.userService.codeBudgets.map(
          codeBudget => {
            const codeBudgetDetails = codeBudgetList.find(cb => cb.codeBudget === codeBudget);

            const value = codeBudget;
            const label = codeBudgetDetails?.label ?? 'Non référencé';

            if (this.userService.codeBudgets.length === 1) {
              this.singleCodeBudgetLabel = label;
            }

            return {
              value,
              label: `${value} - ${label}`
            };
          }
        )
        this.setCodeBudgetInputStyle();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.codeBudgetSubscription) {
      this.codeBudgetSubscription.unsubscribe();
    }
  }

  initNavigation(url: string) {
    const espaces = [];
    for (const key in this.espaces) {
      if (Object.prototype.hasOwnProperty.call(this.espaces, key)) {
        espaces.push(key);
      }
    }
    espaces.forEach((espace: string) => {
      if (url.includes(espace)) {
        this.navigationLinks = this.createOptions(espace, this.espaces[espace]);
      }
    });

    const onglets = [];
    for (const key in LABELS) {
      if (Object.prototype.hasOwnProperty.call(LABELS, key)) {
        onglets.push(key);
      }
    }
    onglets.forEach(onglet => {
      if (url.includes(onglet)) {
        this.active(onglet);
      }
    });
  }

  active(value: string) {
    const index = this.navigationLinks.findIndex(el => el.link.includes(value));
    this.navigationLinks[index].active = true;
  }

  hideOptions(espace: string, option: string) {
    const hideClientConseil = option === 'clients' && !this.rights.includes(GroupsEnums.isUserConseilBO);
    const hideOptionsADV = espace === 'adv' && this.rights.includes(GroupsEnums.isUserADV);
    const hideOptionFidusignSignature = espace === 'achats' && this.groupService.isInGroups([GroupsEnums.isUserFidusignJuridiqueConsult]) && option === 'signature';

    const hideAll = espace === 'gerance-associes' && this.groupService.onlyGeranceAssocPart() && (option === 'traitement' ||
      option === 'telechargement'
      || option === 'consultation'
    );

    const hideFidusignOptions = espace === 'fidusign'
      && !this.groupService.isInGroups([GroupsEnums.isUserFidusignAchat, GroupsEnums.isUserFidusignAchatAccesSpec, GroupsEnums.isUserFidusignJuridique, GroupsEnums.isUserFidusignYProximite, GroupsEnums.isUserFidusignYProximiteCommercial])
      && option === 'signature';

    const hideOptionsGeranceBODocPartenaire = espace === 'gerance-associes' &&
      this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO) && this.docType === 'partenaire'
      && (option === 'traitement' || option === 'telechargement');
    const hideOptionsGeranceSUPPDocAssocies = espace === 'gerance-associes' &&
      this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesSUPP) && this.docType === 'associe'
      && option === 'telechargement' && !this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO);
    const hideOptionsGeranceConsultation = espace === 'gerance-associes' &&
      (this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT)
        || this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT_RECL))
      && (option === 'traitement' || option === 'telechargement');
    return hideClientConseil
      || hideOptionsADV
      || hideAll
      || hideOptionsGeranceBODocPartenaire
      || hideOptionsGeranceSUPPDocAssocies
      || hideOptionsGeranceConsultation
      || hideOptionFidusignSignature
      || hideFidusignOptions;
  }

  createOptions(espace: string, options: Array<string>) {
    this.currentSpace = espace;
    const list = [];
    options.forEach(async option =>
      list.push({
        link: `/${espace}/${option}`,
        label: LABELS[option],
        active: false,
        hide: this.hideOptions(espace, option)
      })
    );
    return list;
  }

  logout() {
    this.authService.logout()
      .pipe(
        take(1),
        finalize(() => this.router.navigate(['/login']))
      ).subscribe();
  }

  eraseSearchData(link?: string) {
    const dataNullable = {defaultSearch: null, selectedCustomer: null, currentTabIndex: 0};
    this.contextSearchMrService.updateContext(dataNullable);
    this.contextSearchConseilService.updateContext(dataNullable);
    this.contextSearchGeranceAssociesService.updateContext(dataNullable);
    if (link.includes('consultation')) {
      this.codeBudgets = [];
      this.ngOnInit();
    }
  }

  openAboutDialog() {
    this.dialog.open(AboutComponent, {
      minWidth: '60vw',
      minHeight: '50vh',
      data: {
        currentVersion: this.currentVersion,
        releaseNotesUrl: this.releaseNotesUrl
      }
    })
    .afterClosed()
    .subscribe(() => {
      this.isNewVersion = this.contextService.isNewVersion;
      if (!this.isNewVersion) {
        this.snackRef.dismiss();
      }
    });
  }

  openDocumentationDialog() {
    this.dialog.open(DocumentationComponent, {
      minWidth: '60vw',
      minHeight: '50vh',
    });
  }

  onAutocompleteBlur() {
    this.codeBudgetControl.setValue(this.codeBudget, { emitEvent: false });
  }

  setCodeBudgetInputStyle() {
    const selectedCodeBudgetObj = this.codeBudgets.find(cb => cb.value === this.codeBudget);

    this.codeBudgetInputStyle = {
      'width': selectedCodeBudgetObj ? `${selectedCodeBudgetObj.label.length + 5}ch` : 'auto',
      'min-width': '21ch'
    }
  }

  onTabChange(item) {
    this.sendSentryTabLog(item);
    this.eraseSearchData(item.link);
  }

  sendSentryTabLog(item) {
    if (item.link === this.router.url || item.link + '/' === this.router.url) {
      return;
    }
    
    const log = {
      tabName: item.label,
      tabLink: item.link,
      espace: this.currentSpace,
      lastRoute: this.router.url,
      loggedUserName: this.user.firstName
    };

    Sentry.captureMessage(`Tab changed: ${JSON.stringify(log)}`, 'log');
  }
}
