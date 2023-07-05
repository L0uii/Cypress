import {Component, HostListener, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SearchResult, SortBy} from '../../models/search';
import {Subject, Subscription} from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter } from '@angular/material/core';
import {ContextSearchExpertise} from '../../models/context-search-expertise';
import {SnackbarService} from '../../services/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {AuthenticationService} from '@alfresco/adf-core';
import {FetchDataService} from '../../services/fetch-data.service';
import {Title} from '@angular/platform-browser';
import {UpdateResultsService} from '../../services/update-results.service';
import {UserService} from '../../services/user.service';
import * as moment from 'moment';
import {CLASSEMENT} from '../../models/sofiral';
import {TABS_CONSULTATION} from '../../consts/sofiral-tabs';
import {DefaultSearchSofiral} from '../../models/default-search-sofiral';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ExpertiseService} from '../../services/expertise.service';
import {removeWhitespace, replaceCommaByDot} from '../../utils/string';

@Component({
  selector: 'app-sofiral',
  templateUrl: './sofiral.component.html',
  styleUrls: ['./sofiral.component.scss']
})
export class SofiralComponent implements OnInit, OnDestroy {
  pendingBaseSearchTab = true;
  userCodeBudgetMore = [];
  codeBudgets: Array<string> = [];
  showHint = false;
  filtersFields = [
    {
      label: 'Numéro dossier',
      value: 'firme:codeClient'
    },
    // {
    //   label: 'Numéro facture',
    //   value: 'fact:numero'
    // },
    {
      label: 'Date facture',
      value: 'fact:dateFacture'
    }
  ];
  filtersOrder = [
    {
      label: 'Croissant',
      value: true
    },
    {
      label: 'Décroissant',
      value: false
    }
  ];

  selectedSortByField = 'Numéro dossier';
  selectedSortByOrder = 'Décroissant';
  sortBy: SortBy = {
    field: 'created',
    ascending: false
  };
  sideNavOpen = false;
  fondsDocumentaire = {};
  classements = {
    documentType: [],
    famille: {}
  };
  filteredDocumentType = undefined;
  actifs = {};
  inputsDefault: DefaultSearchSofiral = {
    dossierName: '',
    TVA: '',
    dateDocument: '',
    billAmount: '',
    dossierNumber: '',
    billNumber: '',
    SIREN: '',
    codeBudgetsMore: '',
    billStart: '',
    billEnd: ''
  };
  customerQuery: string;
  eventsDossier: Subject<void> = new Subject<void>();

  searchQuery = '';
  searchQueryCodeBudget = '';
  tabs = TABS_CONSULTATION;
  currentTab: string;
  context: ContextSearchExpertise;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  codeBudget = '';
  inputsDefaultTab: string[];
  pending: boolean;
  private codeBudgetSubscription: Subscription;

  currentYear = new Date().getFullYear();

  constructor(
    private snack: SnackbarService,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private utils: UtilsService,
    private auth: AuthenticationService,
    private searchData: FetchDataService,
    private title: Title,
    private updateService: UpdateResultsService,
    private route: ActivatedRoute,
    private expertiseService: ExpertiseService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    moment.locale('fr');
    this.formatClassement();
    this._adapter.setLocale('fr');
    this.route.params.subscribe(async params => {
      if (params[Object.keys(params)[0]] && params[Object.keys(params)[0]].toString().length === 8) {
        this.inputsDefault.dossierNumber = params[Object.keys(params)[0]].toString() || this.inputsDefault.dossierNumber;
        this.setDossierByNumber(this.inputsDefault.dossierNumber);
        this.onSearch();
      } else if (params[Object.keys(params)[0]] && params[Object.keys(params)[0]].toString().length === 5) {
        this.inputsDefault.codeBudgetsMore = params[Object.keys(params)[0]].toString();
        try {
          if (params[Object.keys(params)[1]] && params[Object.keys(params)[1]].toString().length === 8) {
            this.inputsDefault.dossierNumber = params[Object.keys(params)[1]].toString();
          } else {
            this.inputsDefault.dossierNumber = '';
          }
        } catch (error) {
          console.log('no 2nd params:', error);
          this.inputsDefault.dossierNumber = '';
          this.setDossierByNumber(this.inputsDefault.dossierNumber);
        }
      }
    });
    this.inputsDefault.codeBudgetsMore = this.userService.selectedCodeBudget;

    this.codeBudgetSubscription = this.userService.selectedCodeBudgetRef.subscribe((cb: string) => {
      this.inputsDefault.codeBudgetsMore = cb;
      if (this.inputsDefault.dossierNumber) {
        this.setDossierByNumber(this.inputsDefault.dossierNumber);
      }
      this.setSortByField({label: 'Numéro dossier', value: 'firme:codeClient'}, false);
      this.onSearch();
    });
    this.title.setTitle('Espace GED - Sofiral ');
  }

  ngOnDestroy() {
    if (this.codeBudgetSubscription) {
      this.codeBudgetSubscription.unsubscribe();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if ($event.altKey) {
      if ($event.key === 'r' || $event.key === 'R') {
        this.toggleNav();
      }
    }
  }

  onSync(key: string, array: Home.Tabs) {
    return ({pagination: {totalItems}}: SearchResult) => {
      array[key].count = totalItems;
    };
  }

  setSortByField(field: { label: string, value: string }, shouldRefresh = true) {
    this.sortBy.field = field.value;
    this.selectedSortByField = field.label;

    if (shouldRefresh) {
      this.updateService.triggerRefreshChange(true);
    }
  }

  setSortByOrder(order: { label: string, value: boolean }) {
    this.sortBy.ascending = order.value;
    this.selectedSortByOrder = order.label;
    this.updateService.triggerRefreshChange(true);
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  setcustomerNumber(numero: string) {
    if (numero && !isNaN(+numero)) {
      this.inputsDefault.dossierNumber = numero;
    }
  }

  setDossierByNumber(value: string) {
    this.setcustomerNumber(value);
    this.onSearch();
  }

  setDossierByString(value: string) {
    this.inputsDefault.dossierName = value;
    this.onSearch();
  }

  clearCustomer() {
    this.eventsDossier.next();
    this.inputsDefault.dossierName = '';
    this.inputsDefault.dossierNumber = '';
    this.actifs['dossierNumber'] = false;
    this.actifs['dossierName'] = false;
    this.router.navigate(['/sofiral/consultation/']);
    this.onSearch();
  }

  // Effacer les champs de saisie
  clearAll() {
    this.actifs = {};
    Object.keys(this.inputsDefault)
      .filter(input => input !== 'codeBudgetsMore')
      .forEach((input: string) => this.inputsDefault[input] = '');
    this.searchQuery = '';
    this.clearCustomer();
  }

  clearInput(field: string, mandatory?: boolean) {
    this.actifs[field] = false;
    if (mandatory) {
      this.inputsDefault[field] = '';
    }
    if (field === 'dossierNumber') {
      this.inputsDefault.dossierNumber = '';
      this.router.navigate(['/sofiral/consultation/']);
    }

    if (field === 'dossierName') {
      this.inputsDefault.dossierName = '';
    }

    if (field === 'billNumber') {
      this.inputsDefault.billNumber = '';
    }

    if (mandatory && field === 'billStart') {
      this.inputsDefault.billStart = '';
    }

    if (mandatory && field === 'billEnd') {
      this.inputsDefault.billEnd = '';
    }

    if (mandatory && field === 'dateDocument') {
      this.inputsDefault.dateDocument = '';
    }

    if (field === 'TVA') {
      this.inputsDefault.TVA = '';
    }
    this.onSearch();
  }

  setValueCodeBudget(value: string) {
    if (value) {
      this.inputsDefault.codeBudgetsMore = value;
    }
  }

  onSearch() {
    let searchQuery = this.searchQueryCodeBudget + '';
    for (const key in this.inputsDefault) {
      this.actifs[key] = !!this.inputsDefault[key];
    }

    if (this.inputsDefault.billStart || this.inputsDefault.billEnd) {
      const dateRangeQuery = this.utils.getDateRangeQuery({
        startDate: this.inputsDefault.billStart,
        endDate: this.inputsDefault.billEnd,
        metadata: 'fact:dateFacture',
        description: `Date de facture`
      });
      searchQuery = `${searchQuery} ${dateRangeQuery ?? ''}`
    }

    if (this.inputsDefault.dossierNumber !== '') {
      searchQuery = `${searchQuery} AND firme:codeClient:${this.inputsDefault.dossierNumber.trim()}`;
    }

    if (this.inputsDefault.dossierName !== '') {
      searchQuery = `${searchQuery} AND fact:destinataire:'${this.inputsDefault.dossierName.trim()}'`;
    }

    if (this.inputsDefault.billNumber !== '') {
      searchQuery = `${searchQuery} AND fact:numero:${this.inputsDefault.billNumber.trim()}`;
    }

    if (this.inputsDefault.codeBudgetsMore !== '') {
      searchQuery = `${searchQuery} AND firme:codeBudget:'${this.inputsDefault.codeBudgetsMore}'`;
    }

    if (this.inputsDefault.SIREN !== '') {
      searchQuery = `${searchQuery} AND fact:sirenDestinataire:${this.inputsDefault.SIREN.trim()}`;
    }

    if (this.inputsDefault.billAmount !== '') {
      searchQuery = `${searchQuery} AND fact:totalTTC:${replaceCommaByDot(removeWhitespace(this.inputsDefault.billAmount))}`;
    }

    if (this.inputsDefault.dateDocument) {
      const dateQuery = this.utils.getDateQuery(this.inputsDefault.dateDocument, 'Date facture', 'fp:dateDocument', 'fact:dateFacture');
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['dateDocument'] = false;
        return;
      }
    }

    // Amount bill
    if (!!this.inputsDefault.billAmount) {
      searchQuery = `${searchQuery} AND fact:totalTTC:"${replaceCommaByDot(removeWhitespace(this.inputsDefault.billAmount))}"`;
    }

    if (this.inputsDefault.TVA === 'NON') {
      searchQuery = `${searchQuery} AND fact:totalTVA:0 AND !fact:totalTTC:0`;
    }

    if (this.inputsDefault.TVA === 'OUI') {
      searchQuery = `${searchQuery} AND !fact:totalTVA:0 AND !fact:totalTTC:0`;
    }
    this.inputsDefaultTab = Object.keys(this.inputsDefault);
    this.pendingBaseSearchTab = false;
    return (this.searchQuery = searchQuery);
  }

  formatClassement() {
    const classement = {};
    const parOnglets = [...CLASSEMENT]
      .reduce(function (r, a) {
        r[a.onglet] = r[a.onglet] || [];
        r[a.onglet].push(a);
        return r;
      }, Object.create(null));
    for (const key in parOnglets) {
      if (key) {
        classement[key] = parOnglets[key].reduce(function (r, a) {
          r[a.labelFamille] = r[a.labelFamille] || [];
          r[a.labelFamille].push(a);
          return r;
        }, Object.create(null));
      }
    }
    this.fondsDocumentaire = classement;
    return classement;
  }
}
