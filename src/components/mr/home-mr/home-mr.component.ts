import {FetchDataService} from './../../../services/fetch-data.service';
import {DeleteDocumentService} from 'components/delete-document/delete-document.service';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {UtilsService} from 'services/utils.service';
import {SearchResult, SortBy} from 'models/search';
import {Title} from '@angular/platform-browser';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatCheckbox} from '@angular/material/checkbox';
import {DateAdapter} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {UpdateResultsService} from 'services/update-results.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'services/user.service';
import {environment} from 'environments/environment';
import moment from 'moment';
import {cloneDeep} from 'lodash';
import {SnackbarService} from 'services/snackbar.service';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {getTabsPending, TABS} from 'consts/home-tabs';
import {DefaultSearchExpertise} from 'models/default-search-expertise';
import {ContextSearchMrService} from 'services/context-search-mr.service';
import {ContextSearchExpertise} from 'models/context-search-expertise';
import {CustomerExpertise} from 'models/customer-expertise';
import {CLASSEMENT} from 'models/mr';
import {ClassementExpertiseConsulting} from 'models/classement-expertise-consulting';
import {SearchDossierExpertiseService} from 'services/search-dossier-expertise.service';
import {distinctUntilChanged, finalize, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';

interface Ecoffre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-mr',
  templateUrl: './home-mr.component.html',
  styleUrls: ['./home-mr.component.scss']
})
export class HomeMrComponent implements OnInit, OnDestroy {
  @ViewChild('familleInput')
  familleInputRef: ElementRef;

  basicAuth = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);
  pending = true;
  codeBudgets = [];
  filtersFields = [
    {
      label: 'Date de dépot en GED',
      value: 'created'
    },
    {
      label: 'Nom du document',
      value: 'fp:nommage'
    },
    {
      label: 'Dernière modification',
      value: 'modified'
    },
    {
      label: 'Numéro de dossier',
      value: 'firme:codeClient'
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

  selectedSortByField = 'Date de dépot en GED';
  selectedSortByOrder = 'Décroissant';
  sortBy: SortBy = {
    field: 'created',
    ascending: false
  };
  // Toggle sideNav
  sideNavOpen = false;
  fondsDocumentaire = {};
  // listes arrays
  classements = {
    documentType: [],
    famille: {}
  };
  filteredFamille = undefined;
  filteredDocumentType = undefined;
  showHint = false;
  actifs = {};
  inputs = [];
  inputsDefault: DefaultSearchExpertise = {
    numeroDossier: '',
    nomDossier: '',
    codeBudget: '',
    author: '',
    nommage: '',
    famille: [],
    familleInput: '',
    documentType: '',
    documentTypeInput: '',
    creationDate: '',
    modificationDate: '',
    documentDate: '',
    factDate: '',
    employeeFirstName: '',
    employeeName: '',
    employeeCommonName: '',
    dateFinExercice: '',
    typedDateFinExercice: '',
    searchPeriodStart: '',
    searchPeriodEnd: '',
    eCoffre: ''
  };
  open: boolean;
  eventsDossier: Subject<void> = new Subject<void>();
  searchQuery = '';
  searchQueryHomeTab = '';
  tabs = TABS;
  homeTab = 'HOME';
  private tabsNames = [this.homeTab].concat(Object.keys(TABS));
  pendingTabs = getTabsPending(false);
  currentTab: string;
  currentTabIndex: number;
  tags: any;
  dossierList: CustomerExpertise[] = [];
  initTab: number;
  context: ContextSearchExpertise;
  labelSousFamille: any;
  minDate: Date;
  labelDate = 'Date du document';
  maxDate: Date;
  minDate2: Date;
  date: Date;
  showDirectory = true;
  showSelectedCustomer = false;
  private codeBudgetSubscription: Subscription;
  searchPeriodStartDate: string;
  searchPeriodEndDate: string;
  customerSearchPending: boolean = false;
  destroy$ = new Subject();

  hasAnyDocumentWaitingForQualificationMoreThan10Months: boolean = false;
  currentYear = new Date().getFullYear();
  filterDocumentsToggle = this.formBuilder.control(false);
  private readonly selectedCustomerSessionKey = 'GED.selectedCustomer';
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  @ViewChild('exerciceYear1Input') exerciceYear1Checkbox: MatCheckbox;
  @ViewChild('exerciceYear2Input') exerciceYear2Checkbox: MatCheckbox;
  @ViewChild('exerciceYear3Input') exerciceYear3Checkbox: MatCheckbox;
  selectedValue: string;
  eCoffreValues: Ecoffre[] = [
    {value: 'DOCUMENT_ENVOYE', viewValue: 'Oui'},
    {value: 'non', viewValue: 'Non'},
  ];


  constructor(
    private snack: SnackbarService,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private utils: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private title: Title,
    private searchData: FetchDataService,
    public deleteDocumentService: DeleteDocumentService,
    private updateService: UpdateResultsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private contextSearchMrService: ContextSearchMrService,
    private searchDossierExpertiseService: SearchDossierExpertiseService
  ) {
    this.minDate = this.utils.getMinDate();
    this.minDate2 = new Date('2016-01-01T00:00:00.000');
    const now = moment().format('YYYY');
    this.date = new Date();
    this.maxDate = new Date(this.date.setFullYear(parseInt(now, 0) + 15));
  }

  ngOnInit() {
    moment.locale('fr');
    this.formatClassement();
    this._adapter.setLocale('fr');
    this.initContext();
    this.inputsDefault.codeBudget = this.userService.selectedCodeBudget;
    this.inputsDefault.eCoffre = undefined;
    this.filterDocumentsToggleChanges();

    if(sessionStorage.getItem(this.selectedCustomerSessionKey)) {
       this.router.navigate(['/expertise-consulting/consultation', JSON.parse(sessionStorage.getItem(this.selectedCustomerSessionKey)).numeroDossier]);
    }

    this.codeBudgetSubscription = this.userService.selectedCodeBudgetRef
      .pipe(
        switchMap((cb: string) => {
          if (!!cb) {
            if (!!this.filterDocumentsToggle.value) {
              this.filterDocumentsToggle.setValue(false);
              this.hasAnyDocumentWaitingForQualificationMoreThan10Months = false;
            }
            if (cb !== this.inputsDefault.codeBudget) {
              this.inputsDefault.codeBudget = cb;
              this.clearCustomer();

              return this.getFullCustomerList(this.inputsDefault.codeBudget)
                .pipe(map(() => true));
            }
          }
          return of(false);
        })
      )
      .subscribe((shouldSearch) => {
        if (shouldSearch) {
          this.onSearch();
        }
      });

    setTimeout(() => {
      this.route.params
        .pipe(
          switchMap(params => {
            const firstParam = params.firstParam?.toString();
            const numeroDossier = params.numeroDossier?.toString();

            if (firstParam) {
              if (firstParam.length === 5) {
                if (this.userService.codeBudgets.includes(firstParam)) {
                  this.inputsDefault.codeBudget = firstParam;
                  this.userService.setCodeBudget(firstParam);
                } else {
                  this.showErrorCodeBudgetNotAllowed(firstParam);
                  return of(false);
                }
              } else if (firstParam.length === 8) {
                return this.getDossierData(firstParam)
                  .pipe(map((dossier) => !!dossier));
              }
            } else if (numeroDossier?.length === 8) {
              const codeBudget = params['codeBudget'].toString();
              if (this.userService.codeBudgets.includes(codeBudget)) {
                this.inputsDefault.numeroDossier = numeroDossier;
                this.inputsDefault.codeBudget = codeBudget;
                this.userService.setCodeBudget(codeBudget);
                return of(true);
              } else {
                this.showErrorCodeBudgetNotAllowed(codeBudget);
                return of(false);
              }
            }
            this.inputsDefault.codeBudget = this.userService.selectedCodeBudget;
            return of(true);
          }),
          switchMap((shouldSearch) => {
            if (shouldSearch) {
              return this.getFullCustomerList(this.inputsDefault.codeBudget);
            }
            return of(null);
          }),
          tap((res) => {
            if (res) {
              this.onSearch();
            }
          })
        )
        .subscribe();
    }, 0);


    this.title.setTitle('Espace GED - Collaborateur Expertise-Consulting');
    this.open = false;
  }

  private showErrorCodeBudgetNotAllowed(codeBudget: string) {
    this.inputsDefault.codeBudget = this.userService.selectedCodeBudget;
    this.clearCustomer();
    const msg = `Vous n\'avez pas d\'accès pour le code budget ${codeBudget}`;
    this.snack.openInfo(msg);
  }

  private filterDocumentsToggleChanges(): void {
    this.filterDocumentsToggle.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(isChecked => {
        this.deleteDocumentService.resetDocuments();
        this.onSearch(isChecked);
        this.pendingTabs = getTabsPending(isChecked);
      });
  }

  ngOnDestroy() {
    this.deleteDocumentService.resetDocuments();
    if (this.codeBudgetSubscription) {
      this.codeBudgetSubscription.unsubscribe();
    }
  }

  initContext() {
    this.context = this.contextSearchMrService.getContext();
    if (this.context && this.context.currentTabIndex) {
      this.initTab = this.contextSearchMrService.getContext().currentTabIndex;
    } else {
      this.initTab = 0;
    }

    this.currentTab = this.getTabNameByIndex(this.initTab);
    if (this.context && this.context.defaultSearch) {
      this.inputsDefault = this.context.defaultSearch;
    }
  }

  getFullCustomerList(codeBudget: string): Observable<CustomerExpertise[]> {
    this.customerSearchPending = true;
    return this.searchDossierExpertiseService.getCustomers(codeBudget).pipe(
      tap((res) => this.dossierList = res),
      finalize(() => this.customerSearchPending = false)
    );
  }

  onFocus(value: number) {
    this.autoComplete['_results'][value].openPanel();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if ($event.altKey) {
      if ($event.key === 'r' || $event.key === 'R') {
        this.toggleNav();
      }
    }
  }

  onSync(key, array, isHome?: boolean) {
    return ({pagination: {totalItems}, entries}: SearchResult) => {
      if (isHome && !this.hasAnyDocumentWaitingForQualificationMoreThan10Months) {
        this.hasAnyDocumentWaitingForQualificationMoreThan10Months = entries
          .some(entry => this.hasMoreThan10Months(entry.DateCreation) && this.isWaitingForQualification(entry.SousFamille));

        if (!this.hasAnyDocumentWaitingForQualificationMoreThan10Months && totalItems > 100) {
          this.searchData.isDocumentWithMoreThan10Months(this.searchQuery)
            .pipe(take(1))
            .subscribe(v => this.hasAnyDocumentWaitingForQualificationMoreThan10Months = v);
        }
      }
      array[key].count = totalItems;
    };
  }

  private isWaitingForQualification(sousFamille: string): boolean {
    return sousFamille?.toLowerCase() === 'upload_portail';
  }

  removeSelectedDocuments(): void {
    this.router.navigate([{ outlets: { view: ['delete'] } }]);
  }

  setSortByField(field) {
    this.sortBy.field = field.value;
    this.selectedSortByField = field.label;
    this.updateService.triggerRefreshChange(true);
  }

  setSortByOrder(order) {
    this.sortBy.ascending = order.value;
    this.selectedSortByOrder = order.label;
    this.updateService.triggerRefreshChange(true);
  }

  // Affichage side nav
  refreshNav(value) {
    this.sideNavOpen = value;
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  getDossierData(dossierSearchTerm: string): Observable<CustomerExpertise> {
    if (!this.searchDossierExpertiseService.hasRcuErrorOnExpertiseSearch(this.inputsDefault.codeBudget)) {
      return this.searchDossierExpertiseService.getExpertiseDossierData(dossierSearchTerm)
        .pipe(
          tap(dossier => {
            if (!dossier) {
              this.inputsDefault.numeroDossier = '';
              this.inputsDefault.nomDossier = '';
              this.snack.openInfo('Aucun numéro de dossier ne correspond au code budget selectionné');
              return;
            }
            const {codeBudget, numeroDossier, nomDossier} = dossier;
            this.inputsDefault.numeroDossier = numeroDossier;
            this.inputsDefault.nomDossier = nomDossier;
            this.inputsDefault.codeBudget = codeBudget;
            this.userService.setCodeBudget(codeBudget);
          })
        );
    }
    return of(null);
  }


  clearInput(field: string, mandatory?: boolean, fromComplementary?: boolean) {
    this.actifs[field] = false;
    mandatory ? this.inputsDefault[field] = '' : this.inputs.filter((item) => item.name === field)[0].value = '';
    if (field === 'documentType') {
      this.clearDocumentType();
    }

    if (field === 'dateFinExercice') {
      this.inputsDefault.typedDateFinExercice = '';
    }
    if (field === 'famille') {
      this.clearFamille();
      this.filterFamilleByTab(this.currentTab);
      this.filterDocumentTypeByTab(this.currentTab);
    }
    if (field === 'numeroDossier') {
      this.router.navigate(['/expertise-consulting/consultation/']);
    }
    this.labelDate = 'Date du document';
    if (!!mandatory && !!fromComplementary) {
      return;
    }
    this.onSearch();
  }

  addCustomer(customer: CustomerExpertise) {
    this.showDirectory = false;
    if (customer) {
      if (this.filterDocumentsToggle.value) {
        this.filterDocumentsToggle.setValue(false);
        this.hasAnyDocumentWaitingForQualificationMoreThan10Months = false;
      }
      const customerChanged = this.inputsDefault.numeroDossier !== customer.numeroDossier;
      this.showSelectedCustomer = true;
      this.inputsDefault.numeroDossier = customer.numeroDossier;
      this.inputsDefault.nomDossier = customer.nomDossier;
      this.inputsDefault.codeBudget = customer.codeBudget;
      if (customerChanged) {
        sessionStorage.setItem(this.selectedCustomerSessionKey, JSON.stringify(customer));
        this.onSearch();
      }
    }
  }

  // Onglets
  tabChanged(newIndex: number): void {
    this.labelDate = 'Date du document';
    this.currentTab = this.getTabNameByIndex(newIndex);
    this.currentTabIndex = newIndex;
    this.initTab = this.tabsNames.indexOf(
      this.currentTab === 'Chef d\'entreprise' ?
        'CHEFENTREPRISE' :
        this.currentTab === 'Comptabilité / Gestion' ?
          'COMPTABILITE' :
          this.currentTab === 'Généralités' ?
            'GENERALITE' :
            this.currentTab.toUpperCase()
    );
    if (this.tabsNames[newIndex] !== this.homeTab) {
      this.clearDocumentType(false);
      this.clearFamille(false);
      // Filtrer sous dossiers
      this.filterFamilleByTab(this.currentTab);
      // Filtrer types de documents
      this.filterDocumentTypeByTab(this.currentTab);

      if (this.filterDocumentsToggle.value) {
        this.filterDocumentsToggle.setValue(false);
      }
    }
    this.onSearch();
  }

  setYearExercice(input, selectedDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(11);
    ctrlValue.date(31);
    this.inputsDefault.dateFinExercice = ctrlValue;
    this.inputsDefault.typedDateFinExercice = selectedDate.format('YYYY');
    datepicker.close();
    //this.onSearch();
  }

  // Filtres dynamiques
  filterFamilleByTab(tab: string) {
    if (tab && tab !== this.homeTab) {
      this.inputsDefault.familleInput = '';
      this.inputsDefault.famille = [];
      this.classements.famille = Object.keys(this.fondsDocumentaire[tab]).sort()
        .reduce((acc, key) => ({
          ...acc, [key]: this.fondsDocumentaire[tab][key]
        }), {});
      this.filteredFamille = this.classements.famille;
    } else {
      this.classements.famille = this.fondsDocumentaire;
    }
  }

  filterDocumentTypeByTab(tab: string) {
    if (tab) {
      const temp = [];
      for (const key in this.fondsDocumentaire[tab]) {
        if (Object.prototype.hasOwnProperty.call(this.fondsDocumentaire[tab], key)) {
          temp.push(this.fondsDocumentaire[tab][key]);
        }
      }
      const filtered = [].concat(...temp)
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
      this.filteredDocumentType = filtered;
      this.classements.documentType = filtered;
      return filtered;
    } else {
      this.filteredDocumentType = Object.keys(this.fondsDocumentaire).map((el, i, array) => array[el]);
      this.classements.documentType = Object.keys(this.fondsDocumentaire).map((el, i, array) => array[el]);
    }
  }

  filterFamille(value) {
    this.setHeightToFamilieInput();
    if (value) {
      this.filteredFamille = Object.keys(this.classements.famille)
        .filter(el =>
          this.utils.removeAccents(el).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}))
        .reduce((res, key) => (res[key] = this.classements.famille[key], res), {});
    }
  }

  filterDocumentType(value: string) {
    this.filteredDocumentType = this.inputsDefault.familleInput ?
      cloneDeep(this.classements.documentType).filter(el => this.inputsDefault.familleInput === el.labelFamille)
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})) :
      this.filterDocumentTypeByTab(this.currentTab);
    if (value && value !== ' ') {
      this.filteredDocumentType = this.filteredDocumentType.filter(el => this.utils.removeAccents(el.labelSousFamille).toLowerCase()
        .indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
    }
  }

  filterTags(value: string) {
    if (value) {
      this.tags = cloneDeep(CLASSEMENT).map(item => ({
        sousFamille: item.sousFamille,
        labelSousFamille: item.labelSousFamille,
        famille: item.famille,
        labelFamille: item.labelFamille,
        onglet: item.onglet,
        displayClient: item.displayClient,
        listeMetadatas: item.listeMetadatas,
        tags: item.tags ? item.tags
            .filter(tag => this.utils.removeAccents(tag).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1) :
          undefined
      }))
        .filter(el => el.tags ? el.tags.length > 0 : undefined)
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
      return this.tags;
    }
  }

  filterDocType(value: string): Array<ClassementExpertiseConsulting> {
    if (value) {
      this.labelSousFamille = cloneDeep(CLASSEMENT).map(item => ({
        sousFamille: item.sousFamille,
        labelSousFamille: this.utils.removeAccents(item.labelSousFamille).toLowerCase()
          .includes(this.utils.removeAccents(value).toLowerCase()) ? item.labelSousFamille : undefined,
        famille: item.famille,
        labelFamille: item.labelFamille,
        onglet: item.onglet,
        displayClient: item.displayClient,
        listeMetadatas: item.listeMetadatas,
        tags: item.tags
      }))
        .filter(el => !!el.labelSousFamille)
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
      return this.labelSousFamille;
    }
  }

  // Affecte la valeur du dossier/sous dossier au click + préfiltre les types de documents
  setValueFamille(value: { key: string; value: Array<ClassementExpertiseConsulting> }) {
    this.inputsDefault.famille = value.value
      .map(key => key.famille)
      .filter((el, index, self) => self.findIndex(e => e === el) === index);
    this.inputsDefault.familleInput = value.key;
    this.setHeightToFamilieInput();
    this.filteredDocumentType = value.value.sort((a, b) =>
      a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
  }

  setHeightToFamilieInput(): void {
    this.familleInputRef.nativeElement.style.height = '5px';
    this.familleInputRef.nativeElement.style.height = this.familleInputRef.nativeElement.scrollHeight + 'px';
  }

  setValueDocumentType(data: ClassementExpertiseConsulting) {
    if (data) {
      this.inputsDefault.documentType = data.sousFamille;
      this.inputsDefault.documentTypeInput = data.labelSousFamille;
      const value = {value: [data.famille], key: data.labelFamille};
      this.inputsDefault.famille = value.value;
      this.inputsDefault.familleInput = value.key;
      const labelDate = data.listeMetadatas.find(metadata => metadata.metadata === 'fp:dateDocument');
      try {
        if (labelDate.label) {
          this.labelDate = labelDate.label;
        }
      } catch (error) {
      }
      this.matchMetadataToInput(data.listeMetadatas);
    }
  }

  matchMetadataToInput(inputs) {
    inputs.forEach(element => {
      if (element.name === 'nom') {
        this.inputsDefault['employeeName'] = '';
        this.inputsDefault['employeeFirstName'] = '';
        this.inputsDefault['employeeCommonName'] = '';
        this.actifs['employeeName'] = false;
      }
      element.value = '';
    });
    this.inputs = inputs;
  }

  clearCustomer() {
    this.eventsDossier.next();
    this.inputsDefault.nomDossier = '';
    this.inputsDefault.numeroDossier = '';
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.actifs['numeroDossier'] = false;
    sessionStorage.removeItem(this.selectedCustomerSessionKey);
    this.router.navigate(['/expertise-consulting/consultation/']);
    this.onSearch();
  }

  trackByIndex(index) {
    return index;
  }

  clearAll() {
    this.actifs = {};
    Object.keys(this.inputsDefault).forEach((input: string) => {
      if (input !== 'codeBudget') {
        this.inputsDefault[input] = '';
      }
    });
    this.clearInputValues();
    this.searchQuery = '';
    this.clearCustomer();
  }

  clearDocumentType(shouldSearch: boolean = true) {
    this.actifs['documentType'] = false;
    this.inputsDefault.documentType = '';
    this.inputsDefault.documentTypeInput = '';
    this.inputs = [];
    this.filteredDocumentType = this.classements.documentType.filter(el => this.inputsDefault.familleInput === el.labelFamille)
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
    if (shouldSearch) {
      this.onSearch();
    }
  }

  clearFamille(shouldSearch: boolean = true) {
    this.actifs['documentType'] = false;
    this.actifs['famille'] = false;
    this.inputsDefault.famille = [];
    this.inputsDefault.familleInput = '';
    this.inputsDefault.documentType = '';
    this.inputsDefault.documentTypeInput = '';
    this.inputs = [];
    if (shouldSearch) {
      this.onSearch();
    }
  }

  onSearch(isPendingLongTimeDocument?: boolean) {
    let searchQuery = '';
    this.inputs.forEach(input => {
      if (!input.value || !input.length) {
        this.actifs[input.name] = false;
        if (input.type === 'date' && this.inputsDefault.documentDate !== '') {
          const saveTempDateDoc = this.inputsDefault.documentDate;
          this.inputsDefault.documentDate = '';
          searchQuery = '';
          this.onSearch();
          this.inputsDefault.documentDate = saveTempDateDoc;
        }
      } else {
        this.actifs[input.name] = true;
        if (input.type === 'date' || input.type === 'year' || input.type === 'month') {
          searchQuery = `${searchQuery} AND ${input.metadata}:${moment(input.value).format('YYYY-MM-DD')}*`;
        } else if (input.type === 'employeeName' || input.name === 'factEmetteur') {
          searchQuery = `${searchQuery} AND ${input.metadata}:'*${input.value.toUpperCase()}*'`;
        } else {
          searchQuery = `${searchQuery} AND ${input.metadata}:'${input.value}'`;
        }
      }
    });

    if (!!this.inputsDefault.nommage.trim()) {
      const results = this.filterTags(this.inputsDefault.nommage);
      const results2 = this.filterDocType(this.inputsDefault.nommage);
      searchQuery = `${searchQuery} AND (fp:nommage:'*${this.inputsDefault.nommage}*' `;
      if (results.length > 0) {
        searchQuery = `${searchQuery} OR`;
        results.forEach((element, index) => {
          const modifier = index < results.length - 1 ? 'OR' : '';
          searchQuery = `${searchQuery} =fiducial:domainContainerSousFamille:'${element.sousFamille}' ${modifier}`;
        });
      }
      if (results2.length > 0) {
        searchQuery = `${searchQuery} OR`;
        results2.forEach((element, index) => {
          const modifier = index < results2.length - 1 ? 'OR' : '';
          searchQuery = `${searchQuery} =fiducial:domainContainerSousFamille:'${element.sousFamille}' ${modifier}`;
        });
      }
      searchQuery = `${searchQuery} OR cm:name:'${this.inputsDefault.nommage}')`;
    }

    const dossierSearchTerm = this.inputsDefault.numeroDossier?.trim();
    if (!!dossierSearchTerm) {
      if (isNaN(+dossierSearchTerm)) {
        const dossier = this.searchDossierExpertiseService.getCachedExpertiseDossierData(dossierSearchTerm);
        if (dossier) {
          searchQuery = `${searchQuery} AND firme:codeClient:'${dossier.numeroDossier}'`;
        }
      } else {
        searchQuery = `${searchQuery} AND firme:codeClient:'${dossierSearchTerm}*'`;
      }
    }

    if (this.inputsDefault.author.trim()) {
      searchQuery = `${searchQuery} AND cm:author:'*${this.inputsDefault.author}*'`;
    }

    if (!!this.inputsDefault.eCoffre) {
      if (this.inputsDefault.eCoffre.trim()) {
        if (this.inputsDefault.eCoffre === 'DOCUMENT_ENVOYE') {
          searchQuery = `${searchQuery} AND  firme:coffreStatutEnvoi:'${this.inputsDefault.eCoffre}'`;
        } else {
          searchQuery = `${searchQuery} AND  ISUNSET:'firme:coffreStatutEnvoi'`;
        }
      }
    }

    if (this.inputsDefault.employeeName.trim()) {
      if (this.inputsDefault.employeeFirstName.trim()) {
        this.inputsDefault.employeeFirstName = this.inputsDefault.employeeFirstName.trim()
          .charAt(0).toUpperCase() + this.inputsDefault.employeeFirstName.trim().slice(1);
        searchQuery = `${searchQuery} AND fp:nom:'*${this.inputsDefault.employeeName
          .trim().toUpperCase()} ${this.inputsDefault.employeeFirstName}*'`;
      } else {
        searchQuery = `${searchQuery} AND fp:nom:'*${this.inputsDefault.employeeName.trim().toUpperCase()}*'`;
      }
    }
    if (this.inputsDefault.employeeFirstName.trim() && this.inputsDefault.employeeName.trim() === '') {
      this.inputsDefault.employeeFirstName =
        this.inputsDefault.employeeFirstName.charAt(0).toUpperCase() + this.inputsDefault.employeeFirstName.slice(1);
      searchQuery = `${searchQuery} AND fp:nom:'*${this.inputsDefault.employeeFirstName}*'`;
    }

    if (!this.inputsDefault.codeBudget && this.userService.selectedCodeBudget) {
      this.inputsDefault.codeBudget = this.userService.selectedCodeBudget;
    }
    if (this.inputsDefault.codeBudget) {
      searchQuery = `${searchQuery} AND firme:codeBudget:'${this.inputsDefault.codeBudget}*'`;
    }

    if (this.inputsDefault.documentType.trim()) {
      this.inputsDefault.documentType.match(/facture/i) ?
        searchQuery = `${searchQuery} AND (=fiducial:domainContainerSousFamille:'${this.inputsDefault.documentType}'
        AND =fiducial:domainContainerFamille:'${this.inputsDefault.famille[0]}')` :
        searchQuery = `${searchQuery} AND =fiducial:domainContainerSousFamille:'${this.inputsDefault.documentType}'`;
    }

    if (this.inputsDefault.searchPeriodStart || this.inputsDefault.searchPeriodEnd) {
      const dateQuery = this.utils.getDateRangeQuery({
        description: `"Date du document" par période`,
        startDate: this.inputsDefault.searchPeriodStart,
        endDate: this.inputsDefault.searchPeriodEnd,
        metadata: 'fp:dateDocument'
      });

      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        return;
      }
    }

    for (const key in this.inputsDefault) {
      const element = this.inputsDefault[key];
      this.actifs[key] = !!element && element != 'non' && element.length;
    }

    if (this.inputsDefault.documentDate) {
      const dateQuery = this.utils.getDateQuery(
        this.inputsDefault.documentDate,
        this.labelDate,
        'fp:dateDocument'
      );
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['documentDate'] = false;
        return;
      }
    }

    if (this.inputsDefault.creationDate) {
      const dateQuery = this.utils.getDateQuery(
        this.inputsDefault.creationDate,
        `Date de dépôt en GED`,
        'cm:created'
      );
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['creationDate'] = false;
        return;
      }
    }

    if (this.inputsDefault.modificationDate) {
      const dateQuery = this.utils.getDateQuery(
        this.inputsDefault.modificationDate,
        `Date de dernière modification`,
        'cm:modified'
      );
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['modificationDate'] = false;
        return;
      }
    }

    if (this.inputsDefault.factDate) {
      const fieldDescription: string = this.inputs.find(i => i.name === 'dateFacture')?.label ?? '';

      const dateQuery = this.utils.getDateQuery(
        this.inputsDefault.factDate,
        fieldDescription,
        'fact:dateFacture'
      );
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['factDate'] = false;
        return;
      }
    }

    // recherche uniquement sur l'année
    const finExerciceDate = this.utils.setDate(
      'fp:dateFinExercice',
      undefined,
      undefined,
      this.inputsDefault.typedDateFinExercice
    );
    finExerciceDate ? (searchQuery += finExerciceDate) : (searchQuery += '');
    this.contextSearchMrService.updateContext({defaultSearch: this.inputsDefault});

    if (this.filterDocumentsToggle.value || isPendingLongTimeDocument) {
      this.searchQueryHomeTab = `${searchQuery} AND cm:created:['${this.utils.shortestDate()}' TO '${this.utils.subtractMonth(10)}']`;
      return;
    }

    if (this.hasAnyDocumentWaitingForQualificationMoreThan10Months && searchQuery !== this.searchQueryHomeTab) {
      this.hasAnyDocumentWaitingForQualificationMoreThan10Months = false;
    }

    this.searchQueryHomeTab = searchQuery;
    this.searchQuery = searchQuery;
  }

  clearDateDocument() {
    this.actifs['documentDate'] = false;
    this.inputsDefault.documentDate = '';
    this.inputs['documentDate'] = '';
    this.onSearch();
  }

  private getTabNameByIndex(index: number): string {
    if (index === 0) {
      return this.homeTab;
    }

    return TABS[this.tabsNames[index]].name;
  }

  onChangeDocument(selection: Array<any>) {
    const selectionArray = Array.isArray(selection) ? selection : [selection];
    const winsisDocs = CLASSEMENT.filter(el => el.noUpload).map(doc => doc.sousFamille);
    const valid = selectionArray.every((item) => !winsisDocs.includes(item.SousFamille));
    if (valid) {
      this.contextSearchMrService.updateContext({
        selectedCustomer: selection,
        currentTabIndex: this.initTab,
        collecteMessage: selectionArray[0].CollecteMessage
      });
      const uuids = selectionArray.map(el => el.id).join();
      this.router.navigate([{outlets: {view: ['modification-expertise', uuids]}}]);
    } else {
      this.snack.openWarn('La sélection comprend des types de documents non modifiables.');
    }
  }

  formatClassement() {
    const classement = {};
    const parOnglets = cloneDeep(CLASSEMENT)
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

  changeHomeCategory($event: string) {
  }

  private hasMoreThan10Months(dateCreation: Date): boolean {
    const today = moment().set({hour: 23, minute: 59, second: 59, millisecond: 999});
    return today.diff(dateCreation, 'months') >= 10;
  }

  private clearInputValues(): void {
    this.inputs = this.inputs.map(input => {
      return {...input, ...{value: ''}};
    });
  }
}
