import { ValueLabelItem } from './../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import { GerancePaternaire } from './../../../models/gerance-partenaires';
import {SnackbarService} from 'services/snackbar.service';
import {DialogGeranceAssociesComponent} from '../dialog-gerance-associes/dialog-gerance-associes.component';
import {Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Title} from '@angular/platform-browser';
import {SearchResult, SortBy} from 'models/search';
import { Observable, Subject, EMPTY } from 'rxjs';
import { takeUntil, expand, reduce } from 'rxjs/operators';
import {FetchDataService} from 'services/fetch-data.service';
import {UpdateResultsService} from 'services/update-results.service';
import {UtilsService} from 'services/utils.service';
import {SPACE} from '@angular/cdk/keycodes';
import {ActivatedRoute, Router} from '@angular/router';
import {TABS_ASSOCIE} from '../../../consts/gerance-associes-associes-tabs';
import {DefaultSearchGeranceAssocies} from '../../../models/default-search-gerance-associes';
import {GroupService} from '../../../services/group.service';
import {ClassementGerancePartenaire} from '../../../models/classement-gerance-partenaires';
import {ClassementGeranceAssocies} from '../../../models/classement-gerance-associes';
import {TABS_PARTENAIRE} from '../../../consts/gerance-associes-partenaire-tabs';
import {TABS_PROCESSING_GERANCE} from '../../../consts/gerance-associes-pending-tabs';
import {CLASSEMENT_GERANCEPARTENAIRES} from '../../../models/gerance-partenaires';
import {CLASSEMENT_GERANCEASSOCIES} from '../../../models/gerance-associes';
import {GeranceAssociesService} from '../../../services/gerance-associes.service';
import {ContextSearchGeranceAssociesService} from '../../../services/context-search-gerance-associes.service';
import {ContextSearchGeranceAssocies} from '../../../models/context-search-gerance-associes';
import {FilePropertiesGeranceAssocies} from 'models/file-properties-gerance-associes';
import {GroupsEnums} from '../../../enums/groups.enums';
import {CustomerGeranceAssocies} from 'models/customer-gerance-associes';
import {DialogGeranceAssocProjComponent} from '../dialog-gerance-assoc-proj/dialog-gerance-assoc-proj.component';
import {Produit} from 'models/produit';

@Component({
  selector: 'app-home-gerance-associes',
  templateUrl: './home-gerance-associes.component.html',
  styleUrls: ['./home-gerance-associes.component.scss']
})
export class HomeGeranceAssociesComponent implements OnInit, OnDestroy {
  searchQuery: string = null;
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

  selectedSortByField = this.filtersFields[0].label;
  selectedSortByOrder = this.filtersOrder[0].label;
  sortBy: SortBy = {
    field: 'created',
    ascending: false
  };
  isSideNavOpen = false;
  actifs = {};
  inputsDefault: DefaultSearchGeranceAssocies = {
    productCategory: '',
    product: '',
    subfolder: '',
    contact: '',
    typePartenaire: '',
    description: '',
    nameAssocie: '',
    namePartenaire: '',
    numberAssocie: '',
    numberPartenaire: '',
    familyInput: '',
    documentType: '',
    nomManager: '',
    nomAgent: '',
    codeManager: '',
    codeAgent: '',
    priseEnCharge: '',
    dateDocument: undefined,
    dateValidite: undefined,
    dateCreation: undefined,
    statutDocumentAssocie: '',
  };
  classements = {
    sousDossierAssocies: ['NPAI', 'Réclamations'].sort((a, b) =>
      this.utils.sortStrings(a, b)),
    sousDossierPartenaires: [
      'Correspondances associés',
      'Correspondances produits',
      'Correspondances administratives'].sort((a, b) =>
      this.utils.sortStrings(a, b)),

    associes: [...CLASSEMENT_GERANCEASSOCIES].sort((a, b) =>
      a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    partenaires: [...CLASSEMENT_GERANCEPARTENAIRES]
      .sort((a, b) =>
        a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    famille: {},
    documentType: [],
  };
  filteredDocumentType = this.classements.associes;
  filteredSousDossier = this.classements.sousDossierAssocies;
  fondsDocumentaire = {};
  separatorKeysCodes: number[] = [SPACE];
  filteredProduits: Observable<string[]>;
  produit: string;
  tabs = {};
  showHint = false;
  showSousDossierRadioGroup = false;
  currentTabPartenaire: string;
  currentTabAssocie: string;
  initTab: number;
  isConsultation: boolean;
  isProcessing: boolean;
  eventsDossier: Subject<void> = new Subject<void>();
  context: ContextSearchGeranceAssocies;
  showDirectory = true;
  showSelectedCustomer = false;
  showSelectedAgent = false;
  showSelectedManager = false;
  selectedSousDossier = '';
  readonly rights: Array<string>;

  private gerancePaternaireList: GerancePaternaire[] = [];
  managerList: ValueLabelItem[];
  agentList: ValueLabelItem[];

  private fullProductList: Produit[] = [];
  productCategoryList: string[] = [];
  productList: string[] = [];

  @ViewChild('documentTypeInput', {static: true}) documentTypeInput: ElementRef;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  currentYear = new Date().getFullYear();

  constructor(
    private utils: UtilsService,
    private fetchDataService: FetchDataService,
    private title: Title,
    private updateService: UpdateResultsService,
    private geranceAssocieService: GeranceAssociesService,
    private contextSearchGeranceAssociesService: ContextSearchGeranceAssociesService,
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private dialog: MatDialog,
    private updateResultsService: UpdateResultsService,
    private snack: SnackbarService
  ) {
    this.rights = this.groupService.rights;
    this.geranceAssocieService
      .getFullProduitList()
      .subscribe((res) => {
        this.fullProductList = res;
        this.productCategoryList = this.geranceAssocieService.getProductCategoryList(this.fullProductList, );
        this.productList = this.geranceAssocieService.getProductList(this.fullProductList, );
      });
  }

  ngOnDestroy(): void {
    this.geranceAssocieService.clearContext();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent($event: KeyboardEvent) {
    if ($event.altKey) {
      if ($event.key === 'r' || $event.key === 'R') {
        this.toggleNav();
      }
    }
  }

  get isAssocie(): boolean {
    return this.selectedSousDossier === 'associe';
  }

  ngOnInit() {
    this.isConsultation = this.router.url.includes('consultation');
    this.isProcessing = this.router.url.includes('traitement');
    this.tabs = this.isProcessing ? {...TABS_PROCESSING_GERANCE} : {...TABS_ASSOCIE};

    const isAssocie = this.groupService.isInGroups([
      GroupsEnums.isUserGeranceAssociesAssociesBO,
      GroupsEnums.isUserGeranceAssociesAssociesRECL,
      GroupsEnums.isUserGeranceAssociesAssociesCONSULT,
      GroupsEnums.isUserGeranceAssociesAssociesCONSULT_RECL,
      GroupsEnums.isUserGeranceAssociesAssociesSUPP
    ]);

    const isPartenaire = this.groupService.isInGroups([
      GroupsEnums.isUserGeranceAssociesPartenaireBO,
      GroupsEnums.isUserGeranceAssociesPartenaireSUPP
    ]);

    this.showSousDossierRadioGroup = isAssocie && isPartenaire;

    this.selectedSousDossier = isPartenaire && !isAssocie ? 'partenaire' : 'associe';
    this.onSousDossierChange(this.selectedSousDossier);

    this.isAssocie ? this.formatClassementAssocies() : this.formatClassementPartenaires();
    this.initContext();
    this.route.params.subscribe(params => {
      const {userId} = params;

      if (this.isAssocie) {
        this.inputsDefault.numberAssocie = userId ?? '';
      } else {
        this.inputsDefault.numberPartenaire = userId ?? '';
      }
      this.onSearch();
    });

    this.getPaternaireGeranceList();

    this.setPartenaireFiltersSubscription();
    this.title.setTitle('Espace GED - Gérance Associés / Partenaires');
  }

  private getPaternaireGeranceList() {
    const gerancePaternaireListKey = 'GERANCE.PaternaireGeranceList';
    if (gerancePaternaireListKey in localStorage) {
      this.gerancePaternaireList = this.utils.loadAndDecompress(gerancePaternaireListKey);
      this.initPaternaireLists(this.gerancePaternaireList);
      return;
    }

    this.fetchDataService.getPartenaireGerance(this.gerancePaternaireList.length)
      .pipe(
        expand(resp => resp.pagination.hasMoreItems ? this.fetchDataService.getPartenaireGerance(resp.entries.length) : EMPTY),
        reduce((acc, current) => acc.concat(current.entries), [])
      )
      .subscribe((gerancePaternaireList: GerancePaternaire[]) => {
        this.utils.compressAndSave(gerancePaternaireListKey, gerancePaternaireList);
        this.gerancePaternaireList = gerancePaternaireList;
        this.initPaternaireLists(gerancePaternaireList);
      })
  }

  private initPaternaireLists(gerancePaternaireList: GerancePaternaire[]): void {
    this.agentList = this.getAgentList(gerancePaternaireList);
    this.managerList = this.getManagerList(gerancePaternaireList);
  }

  private getAgentList(gerancePaternaireList: GerancePaternaire[]): ValueLabelItem[] {
    return gerancePaternaireList.map(item => {
      return {
        label: `${item.name} - ${item.compteur1}`,
        value: item.name,
      };
    })
  }

  private getManagerList(gerancePaternaireList: GerancePaternaire[]): ValueLabelItem[] {
    return gerancePaternaireList
      .filter((v,i,a) => a.findIndex(v2 => (v2.libelle1 === v.libelle1)) === i)
      .filter(item => item.libelle1 && item.libelle2)
      .map(item => {
        return {
          label: `${item.libelle1} - ${item.libelle2}`,
          value: item.libelle1,
        };
      });
  }

  initContext() {
    this.context = this.contextSearchGeranceAssociesService.getContext();
    if (this.context.currentTabIndex === 0 && (this.router.url.includes('consultation') || this.router.url.includes('traitement'))) {
      this.filterDocumentTypeByTab('Administratif');
    } else {
      this.initTab = this.contextSearchGeranceAssociesService.getContext().currentTabIndex;
    }
    if (this.context && this.context.defaultSearch) {
      this.inputsDefault = this.context.defaultSearch;
    }
  }

  onSync(key: string) {
    return ({pagination: {totalItems}}: SearchResult) => {
      this.tabs[key].count = totalItems;
    };
  }

  setSortByField(field: { label: string, value: string }) {
    this.sortBy.field = field.value;
    this.selectedSortByField = field.label;
    this.triggerRefresh();
  }

  setSortByOrder(order: { label: string, value: boolean }) {
    this.sortBy.ascending = order.value;
    this.selectedSortByOrder = order.label;
    this.triggerRefresh();
  }

  // Affichage side nav
  refreshNav(value) {
    this.isSideNavOpen = value;
  }

  toggleNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }


  add(event: MatChipInputEvent, array: string[], autoComplete?: MatAutocomplete, formControl?: UntypedFormControl) {
    // Add produit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionsGeranceelected Event
    if (autoComplete === undefined || !autoComplete.isOpen) {
      const {input, value} = event;
      // Add our produit
      if (value?.trim()) {
        array.push(value.trim());
        this.onSearch();
      }
      if (input) {
        input.value = '';
      }
      if (formControl) {
        formControl.setValue(null);
      }
    }
  }

  formatClassementPartenaires() {
    const classement = {};
    const byTabsPartenaire: ClassementGerancePartenaire = [...CLASSEMENT_GERANCEPARTENAIRES]
      .reduce(function (r, a) {
        r[a.onglet] = r[a.onglet] || [];
        r[a.onglet].push(a);
        return r;
      }, Object.create(null));
    for (const key in byTabsPartenaire) {
      if (key) {
        classement[key] = byTabsPartenaire[key].reduce(function (r, a) {
          r[a.labelFamille] = r[a.labelFamille] || [];
          r[a.labelFamille].push(a);
          return r;
        }, Object.create(null));
      }
    }
    this.fondsDocumentaire = classement;
    return classement;
  }

  private formatClassementAssocies() {
    const classement = {};
    const byTabsAssocies = [...CLASSEMENT_GERANCEASSOCIES]
      .reduce(function (r, a) {
        r[a.onglet] = r[a.onglet] || [];
        r[a.onglet].push(a);
        return r;
      }, Object.create(null));

    for (const key in byTabsAssocies) {
      if (key) {
        classement[key] = byTabsAssocies[key].reduce(function (r, a) {
          r[a.labelFamille] = r[a.labelFamille] || [];
          r[a.labelFamille].push(a);
          return r;
        }, Object.create(null));
      }
    }
    this.fondsDocumentaire = classement;
    return classement;
  }

  onChangeDocument(selection) {
    this.contextSearchGeranceAssociesService.updateContext({selectedCustomer: selection, currentTabIndex: this.initTab});
    const uuids = selection.map(el => el.id).join();

    this.router.navigate([{outlets: {view: ['modification-gerance', uuids]}}]);
  }

  onChangeGeranceAssociesATraiter(data: Array<FilePropertiesGeranceAssocies>) {
    this.dialog.open(DialogGeranceAssociesComponent, {autoFocus: false, disableClose: true, data});
  }

  onChangeGeranceAssociesStatDoc(data: Array<FilePropertiesGeranceAssocies>) {
    this.dialog.open(DialogGeranceAssocProjComponent, {autoFocus: false, disableClose: true, data});
  }

  tabChanged(newIndex: number): void {
    this.isAssocie ? this.handleTabsAssocies(newIndex) : this.handleTabsPartenaire(newIndex);
  }

  handleTabsAssocies(newIndex: number) {
    if (this.isConsultation) {
      const tabs = Object.keys(TABS_ASSOCIE);
      this.currentTabAssocie = TABS_ASSOCIE[tabs[newIndex]].name;
      this.initTab = tabs.indexOf(
        this.currentTabAssocie === 'Conformité' ?
          'COMFORMITE' :
          this.currentTabAssocie.toUpperCase()
      );
    } else {
      const tabs = Object.keys(TABS_PROCESSING_GERANCE);
      this.currentTabAssocie = TABS_PROCESSING_GERANCE[tabs[newIndex]].name;
      this.initTab = tabs.indexOf(this.currentTabAssocie.toUpperCase());
    }

    this.filterDocumentTypeByTab(this.currentTabAssocie);
    this.clearInput('documentType');
  }

  handleTabsPartenaire(newIndex: number) {
    const tabs = Object.keys(TABS_PARTENAIRE);
    this.currentTabPartenaire = TABS_PARTENAIRE[tabs[newIndex]].name;
    this.initTab = tabs.indexOf(
      this.currentTabPartenaire === 'DUE Diligence' ?
        'DUE_DILIGENCE' :
        this.currentTabPartenaire.toUpperCase()
    );
    this.filterDocumentTypeByTab(this.currentTabPartenaire);
  }

  filterDocumentTypeByTab(tab?: string) {
    if (tab) {
      if (this.isConsultation) {
        if (tab === 'Successions') {
          tab = 'Successions - Donations';
        }
        if (tab === 'Conformité') {
          tab = 'Conformite';
        }
      }
      let temp = [];
      const tempConsulter = [];
      if (this.isConsultation) {
        for (const key in this.fondsDocumentaire[tab]) {
          if (Object.prototype.hasOwnProperty.call(this.fondsDocumentaire[tab], key)) {
            tempConsulter.push(this.fondsDocumentaire[tab][key]);
          }
        }
        temp = tempConsulter[0];
      } else {
        for (const key in this.fondsDocumentaire) {
          if (this.fondsDocumentaire.hasOwnProperty(key)) {
            for (let j = 0; j < this.fondsDocumentaire[key][key].length; j++) {
              for (let i = 0; i < this.fondsDocumentaire[key][key][j].listeMetadatas.length; i++) {
                if (this.fondsDocumentaire[key][key][j].listeMetadatas[i].value === (tab.toUpperCase())) {
                  temp.push(this.fondsDocumentaire[key][key][j]);
                }
              }
            }
          }
        }
      }
      const filtered = [...temp]
        .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
      this.filteredDocumentType = [...filtered];
      this.classements.documentType = [...filtered];
      return filtered;
    } else {
      this.filteredDocumentType = Object.keys(this.fondsDocumentaire).map((el, i, array) => array[el]);
      this.classements.documentType = Object.keys(this.fondsDocumentaire).map((el, i, array) => array[el]);
    }
  }

  // Filtrer type de document
  filterDocumentType(value: string) {
    if (!value) {
      this.filteredDocumentType = [...this.classements.documentType];
      return;
    }
    this.filteredDocumentType = this.filteredDocumentType
      .filter(el => el.labelSousFamille.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}));
  }

  setValueDocumentType(data: ClassementGerancePartenaire | ClassementGeranceAssocies) {
    if (data) {
      this.inputsDefault.documentType = data.sousFamille;
    } else {
      this.clearInput('documentType');
      if (this.isAssocie) {
        const tabs = Object.keys(TABS_ASSOCIE);
        this.initTab = tabs.indexOf(
          this.currentTabAssocie === 'Conformité' ? 'COMFORMITE' : this.currentTabAssocie.toUpperCase()
        );
        this.filterDocumentTypeByTab(this.currentTabAssocie);
      } else {
        const tabs = Object.keys(TABS_PARTENAIRE);
        this.initTab = tabs.indexOf(
          this.currentTabPartenaire === 'DUE Diligence' ? 'DUE_DILIGENCE' : this.currentTabPartenaire.toUpperCase()
        );
        this.filterDocumentTypeByTab(this.currentTabPartenaire);
      }
    }
  }

  clearAll() {
    this.actifs = {};
    for (const key in this.inputsDefault) {
      this.inputsDefault[key] = '';
    }
    this.searchQuery = '';
    this.showSelectedAgent = false;
    this.showSelectedManager = false;
    this.productList = this.geranceAssocieService.getProductList(this.fullProductList, );
    this.productCategoryList = this.geranceAssocieService.getProductCategoryList(this.fullProductList, );
    this.clearCustomer();
    this.onSearch();
  }

  clearCustomer() {
    this.eventsDossier.next();
    this.inputsDefault.nameAssocie = '';
    this.inputsDefault.numberAssocie = '';
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.actifs['numeroDossier'] = false;
    this.actifs['numberAssocie'] = false;
    this.router.url.includes('consultation') ?
      this.router.navigate(['/gerance-associes/consultation/']) :
      this.router.navigate(['/gerance-associes/traitement/']);
    this.onSearch();
  }

  clearInput(field: string) {
    this.actifs[field] = false;
    this.inputsDefault[field] = '';

    switch (field) {
      case 'numberAssocie':
      case 'nameAssocie':
        this.clearCustomer();
        break;
      case 'documentType':
        this.filteredDocumentType = this.isAssocie ?
          this.filterDocumentTypeByTab(this.currentTabAssocie) :
          this.classements.partenaires;
        this.documentTypeInput.nativeElement.value = '';
        break;
      case 'projet':
      case 'controle':
        this.actifs[`${field}`] = false;
        this.inputsDefault['statutDocumentAssocie'] = '';
        this.inputsDefault[`${field}`] = '';
        break;
      case 'nomAgent':
        this.showSelectedAgent = false;
        this.actifs['nomAgent'] = false;
        this.inputsDefault['nomAgent'] = '';
        this.actifs['codeAgent'] = false;
        this.inputsDefault['codeAgent'] = '';
        break;
      case 'nomManager':
        this.showSelectedManager = false;
        this.actifs['nomManager'] = false;
        this.inputsDefault['nomManager'] = '';
        this.actifs['codeManager'] = false;
        this.inputsDefault['codeManager'] = '';
        break;
      default:
        break;
    }

    this.onSearch();
  }

  onSearch(): void {
    let searchQuery = '';
    for (const key in this.inputsDefault) {
      if (key === 'statutDocumentAssocie') {
        this.actifs['controle'] = this.inputsDefault['statutDocumentAssocie'].includes('OK - ');
        this.actifs['projet'] = this.inputsDefault['statutDocumentAssocie'].includes('Projet');
      }
      this.actifs[key] = !!this.inputsDefault[key];
    }

    if (!this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO)) {
      if (!this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT) &&
        (this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT_RECL)
          || this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesRECL))) {
        searchQuery = `${searchQuery} AND =fiducial:domainContainerSousFamille:gerance_assoc_reclamations`;
      }
    }

    if (this.inputsDefault.namePartenaire?.trim()) {
      searchQuery = `${searchQuery} AND (gerance:nomAgent:'${this.inputsDefault.namePartenaire.trim()}*')`;
    }

    if (this.inputsDefault.numberPartenaire?.trim()) {
      searchQuery = `${searchQuery} AND (gerance:codeAgent:'${this.inputsDefault.numberPartenaire.trim()}*'
      OR gerance:codeManager:'${this.inputsDefault.numberPartenaire.trim()}*')`;
    }

    if (this.inputsDefault.numberAssocie?.trim()) {
      searchQuery = `${searchQuery} AND (=gerance:numeroAssocie:'${this.inputsDefault.numberAssocie.trim()}')`;
    }

    if (this.inputsDefault.documentType?.trim()) {
      searchQuery = `${searchQuery} AND =fiducial:domainContainerSousFamille:'${this.inputsDefault.documentType}'`;
    }

    if (this.inputsDefault.subfolder?.trim()) {
      searchQuery = `${searchQuery} AND =gerance:sousDossier:'${this.inputsDefault.subfolder}*'`;
    }
    if (this.inputsDefault.productCategory?.trim()) {
      searchQuery = `${searchQuery} AND =gerance:categorieProduit:'${this.inputsDefault.productCategory}'`;
    }

    if (this.inputsDefault.product?.trim()) {
      searchQuery = `${searchQuery} AND =gerance:produit:'${this.inputsDefault.product}'`;
    }

    if (this.inputsDefault.contact?.trim()) {
      searchQuery = `${searchQuery} AND =gerance:contact:'${this.inputsDefault.contact}*'`;
    }

    if (this.inputsDefault.description?.trim()) {
      searchQuery = `${searchQuery} AND cm:description:'${this.inputsDefault.description}*'`;
    }

    if (this.inputsDefault.typePartenaire?.trim()) {
      searchQuery = `${searchQuery} AND gerance:typePartenaire:'${this.inputsDefault.typePartenaire}*'`;
    }

    if (this.inputsDefault.documentType?.trim() && (this.inputsDefault.documentType === 'gerance_assoc_checklist_souscription'
      || this.inputsDefault.documentType === 'gerance_assoc_bulletin_retrait'
      || this.inputsDefault.documentType === 'gerance_assoc_checklist_successions_donations')) {
      if (this.inputsDefault.statutDocumentAssocie) {
        searchQuery = `${searchQuery} AND gerance:statutDocumentAssocie:'${this.inputsDefault.statutDocumentAssocie}*'`;
      }
    }

    if (this.inputsDefault.dateCreation) {
      const dateQuery = this.utils.getDateQuery(this.inputsDefault.dateCreation, 'Date de dépôt en GED', 'cm:created');
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['dateCreation'] = false;
        return;
      }
    }

    if (this.inputsDefault.dateDocument) {
      const dateQuery = this.utils.getDateQuery(this.inputsDefault.dateDocument, 'Date du document', 'fp:dateDocument');
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['dateDocument'] = false;
        return;
      }
    }

    if (this.inputsDefault.dateValidite) {
      const dateQuery = this.utils.getDateQuery(this.inputsDefault.dateValidite, 'Date de validité', 'gerance:dateValidite');
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`;
      } else {
        this.actifs['dateValidite'] = false;
        return;
      }
    }

    if (!!this.inputsDefault.codeManager) {
      searchQuery = `${searchQuery} AND =gerance:codeManager:'${this.inputsDefault.codeManager}'`;
    }

    if (!!this.inputsDefault.codeAgent) {
      searchQuery = `${searchQuery} AND =gerance:codeAgent:'${this.inputsDefault.codeAgent}'`;
    }

    if (!!this.inputsDefault.nomManager) {
      searchQuery = `${searchQuery} AND gerance:nomManager:'${this.inputsDefault.nomManager}*'`;
    }

    if (!!this.inputsDefault.nomAgent) {
      searchQuery = `${searchQuery} AND gerance:nomAgent:'${this.inputsDefault.nomAgent}*'`;
    }

    if (!!this.inputsDefault.priseEnCharge) {
      searchQuery = `${searchQuery} AND gerance:attributionCollaborateurAssocie:'${this.inputsDefault.priseEnCharge}*'`;
    }

    this.contextSearchGeranceAssociesService.updateContext({defaultSearch: this.inputsDefault});

    if (!this.isAssocie) {
      searchQuery = `${searchQuery} AND gerance:atraiter:${ this.isProcessing ? 'oui' : 'non' }`;
    }

    this.searchQuery = searchQuery;
    return;
  }

  onSousDossierChange(newValue: string) {
    if (newValue === 'associe') {
      this.tabs = this.isProcessing ? {...TABS_PROCESSING_GERANCE} : {...TABS_ASSOCIE};
      this.filteredSousDossier = this.classements.sousDossierAssocies;
    } else {
      this.tabs = {...TABS_PARTENAIRE};
      this.filteredSousDossier = this.classements.sousDossierPartenaires;
    }
    this.geranceAssocieService.updateDocumentType(newValue);
    this.resetDocumentTypeList();

    this.clearAll();
  }

  addCustomer(customer: CustomerGeranceAssocies) {
    this.showDirectory = false;
    if (customer) {
      const customerChanged = (this.inputsDefault.numberAssocie !== customer.numeroAssocie) && (this.inputsDefault.numberPartenaire !== customer.numeroAssocie);
      this.showSelectedCustomer = true;
      if (this.isAssocie) {
        this.inputsDefault.numberAssocie = customer.numeroAssocie;
        this.inputsDefault.nameAssocie = customer.nomAssocie;
      } else {
        this.inputsDefault.numberPartenaire = customer.numeroAssocie;
        this.inputsDefault.namePartenaire = customer.nomAssocie;
      }
      if (customerChanged) {
        this.onSearch();
      }
    }
    this.showSelectedCustomer = true;
    this.onSearch();
  }

  private triggerRefresh(showMessage: boolean = false) {
    this.updateResultsService.triggerRefreshChange(true);
    if (showMessage) {
      this.snack.openInfo('Les documents sélectionnés ont été mis à jour');
    }
  }

  private resetDocumentTypeList(): void {
    setTimeout(() => {
      this.initTab = 0;
      if (this.isAssocie) {
        this.formatClassementAssocies();
        this.handleTabsAssocies(0);
        return;
      }

      this.formatClassementPartenaires();
      this.handleTabsPartenaire(0);
    });
  }

  private setPartenaireFiltersSubscription(): void {
    this.geranceAssocieService.agentData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(agent => {
        if (agent) {
          this.clearInput('nomManager');
          this.clearInput('codeManager');
          const {code, nom} = agent;
          this.inputsDefault.codeAgent = code;
          this.inputsDefault.nomAgent = nom;
          this.showSelectedAgent = true;
          this.onSearch();
        }
      });

    this.geranceAssocieService.managerData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(manager => {
        if (manager) {
          this.clearInput('nomAgent');
          this.clearInput('codeAgent');
          const {code, nom} = manager;
          this.inputsDefault.codeManager = code;
          this.inputsDefault.nomManager = nom;
          this.showSelectedManager = true;
          this.onSearch();
        }
      });
  }

  clear(field: string, event: string) {
    this.paternaireListsHandler(field, event);

    if (!event) {
      this.clearInput(field === 'Agent' ? 'nomAgent' : 'nomManager');
    }
  }

  onProductCategoryChange(newValue: string): void {
    this.actifs['productCategory'] = !!newValue;
    if (this.inputsDefault.product) {
      this.clearProductSearch();
    }
    this.productList = this.geranceAssocieService.getProductList(this.fullProductList, newValue);

    this.onSearch();
  }

  onProductChange(newValue: string): void {
    this.actifs['product'] = !!newValue;
    this.productCategoryList = this.geranceAssocieService.getProductCategoryList(this.fullProductList, newValue);

    if (newValue) {
      this.inputsDefault.productCategory = this.productCategoryList[0];
    }

    this.onSearch();
  }

  private clearProductSearch() {
    this.inputsDefault.product = '';
    this.actifs['product'] = false;
  }

  private paternaireListsHandler(field: string, listItemCode: string): void {
    if (!listItemCode) {
      this.initPaternaireLists(this.gerancePaternaireList);
    }

    if (field === 'Agent') {
      this.inputsDefault.codeManager = this.gerancePaternaireList.find(item => item.name === listItemCode)?.libelle1;
    }

    if (field === 'Manager') {
      const filteredAgent = this.gerancePaternaireList.filter(item => item.libelle1 === listItemCode);
      this.agentList = this.getAgentList(filteredAgent);
    }
  }
}
