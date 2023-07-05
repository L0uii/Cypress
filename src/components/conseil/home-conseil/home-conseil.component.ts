import { switchMap, tap } from 'rxjs/operators';
import { LabelValue } from 'models/archives-presidence';
import { DirectionRegionale } from './../../../models/conseil';
import {FetchConseilProdListService} from 'services/fetch-conseil-prod-list.service';
import {SearchDirectionRegionaleService} from 'services/search-direction-regionale.service';
import {SearchParams, SearchResult, SortBy} from 'models/search';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UtilsService} from 'services/utils.service';
import {Title} from '@angular/platform-browser';
import {CLASSEMENT, CLASSEMENT_REPRISE, ProduitConseil} from 'models/conseil';
import {GroupService} from 'services/group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FetchDataService} from 'services/fetch-data.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {UpdateResultsService} from 'services/update-results.service';
import {DefaultSearchConseil} from 'models/default-search-conseil';
import {ContextSearchConseil} from 'models/context-search-conseil';
import {ContextSearchConseilService} from 'services/context-search-conseil.service';
import {TABS_CONSULTATION, TABS_PROCESSING, TABS_PROCESSING_CGP} from 'consts/conseil-tabs';
import {GroupsEnums} from 'enums/groups.enums';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ConseilService} from '../../../services/conseil.service';
import {SelectedCustomerConseil} from '../../../models/selected-customer-conseil';

@Component({
  selector: 'app-home-conseil',
  templateUrl: './home-conseil.component.html',
  styleUrls: ['./home-conseil.component.scss']
})
export class HomeConseilComponent implements OnInit, OnDestroy {
  sideNavOpen = false;
  destroy$ = new Subject();
  selectedSortByField = 'Date de dépot en GED';
  selectedSortByOrder = 'Décroissant';
  filtersFields = [
    {
      label: this.selectedSortByField,
      value: 'created'
    },
    {
      label: 'Type de document',
      value: 'fiducial:domainContainerSousFamille'
    },
    {
      label: 'Numéro de client',
      value: 'firme:codeClient'
    }
  ];
  filtersOrder = [
    {
      label: 'Croissant',
      value: true
    },
    {
      label: this.selectedSortByOrder,
      value: false
    }
  ];
  sortBy: SortBy = {
    field: 'created',
    ascending: false
  };
  showHint = false;
  showQuickSearch = false;
  selectedSearchDR = false;
  selectedSearchClient = false;
  showInputCreator = false;
  isUserBO: boolean;
  classements = {
    documentType: CLASSEMENT.concat(CLASSEMENT_REPRISE)
      .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille)),
    contrat: [],
    fournisseur: [],
    produit: [],
    users: [],
    directionRegionale: []
  };
  filteredDocumentType = this.classements.documentType;
  filteredUsers = [];
  actifs = {};
  inputs: DefaultSearchConseil = {
    DRLabelInput: '',
    nomClient: '',
    directionRegionale: '',
    directionRegionaleInput: '',
    createurInput: '',
    codeBudgets: [],
    contratNature: '',
    numeroContrat: '',
    documentType: '',
    documentTypeInput: '',
    codePostal: '',
    fournisseur: '',
    conseilProduit: '',
    numeroClient: '',
    numeroDossier: '',
    description: '',
    famille: '',
    numeroFacture: '',
    createur: '',
    factureDate: '',
    contractDate: '',
    contractEndDate: '',
    receptionDate: '',
    creationDate: '',
    creationDateInput: '',
    receptionDateInput: '',
    contractDateInput: '',
    contractEndDateInput: '',
    factureDateInput: ''
  };
  searchParams: SearchParams = {
    searchQuery: '',
    maxItems: 100,
    skipCount: 0
  };
  tabs = {};
  initTab: number;
  context: ContextSearchConseil;
  pending = true;
  rights: string[];
  allDirectionsRegionales: DirectionRegionale[];
  drList: LabelValue[];
  currentYear = new Date().getFullYear();
  conseilFullProdList: ProduitConseil[];
  partenairesList: string[];
  categoriesList: string[];
  produitsList: string[];
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;

  constructor(
    private utils: UtilsService,
    private route: ActivatedRoute,
    private searchData: FetchDataService,
    private router: Router,
    private title: Title,
    private groupService: GroupService,
    private updateService: UpdateResultsService,
    private conseilService: ConseilService,
    private contextSearchConseilService: ContextSearchConseilService,
    private searchDirectionRegionaleService: SearchDirectionRegionaleService,
    private fetchConseilProdListServiceService: FetchConseilProdListService
  ) {
    this.rights = this.groupService.rights;
    this.fetchConseilProdListServiceService.getProdList().subscribe(conseilProdList => {
      this.conseilFullProdList = conseilProdList;
      this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
      this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
      this.produitsList = this.conseilFullProdList.map(conseilProd => conseilProd.produit);
    });
    this.allDirectionsRegionales = this.route.snapshot.data.directionRegionales
    this.initialiseFullDRList();
  }

  ngOnInit() {
    this.initContext();
    this.route.params
      .pipe(
        tap(params => {
          this.inputs.numeroClient = params.userId || '';
          this.isUserBO = this.rights.includes(GroupsEnums.isUserConseilBO);
          const consultationCGP = Object.keys({ ...TABS_CONSULTATION }).reduce((object, key) => {
            if (key !== 'FACTURES') {
              object[key] = { ...TABS_CONSULTATION }[key];
            }
            return object;
          }, {});
          const atraiter = this.isUserBO ? { ...TABS_PROCESSING } : { ...TABS_PROCESSING_CGP };
          const consultation = this.isUserBO ? { ...TABS_CONSULTATION } : consultationCGP;
          const processing = this.router.url.includes('traitement');
          this.showQuickSearch = processing;
          this.tabs = processing ? atraiter : consultation;


        }),
        switchMap(() => this.groupService.searchUsersConseil()))
      .subscribe(users => {
        this.classements.users = this.filteredUsers = users;
        this.onSearch();
      });
    this.title.setTitle('Espace GED - Conseil');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initContext() {
    this.context = this.contextSearchConseilService.getContext();
    if (this.context && this.context.currentTabIndex) {
      this.initTab = this.contextSearchConseilService.getContext().currentTabIndex;
    } else {
      this.initTab = 0;
    }
    if (this.context && this.context.defaultSearch) {
      this.inputs = this.context.defaultSearch;
    }
  }

  initialiseFullDRList() {
    this.drList = this.allDirectionsRegionales.map((dr) => {
      return {
        label: dr.label,
        value: dr.societe
      }
    });
  }

  onSync(key: number) {
    return ({pagination: {totalItems}}: SearchResult) => {
      this.tabs[key].count = totalItems;
    };
  }

  onFocus(value: number) {
    this.autoComplete['_results'][value - 1].openPanel();
  }
  onSearch() {
    let searchQuery = '';
    for (const key in this.inputs) {
      if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
        const element = this.inputs[key];
        if (element) {
          this.actifs[key] = true;
        }
      }
    }

    if (this.inputs.createur) {
      if (this.showInputCreator) {
        this.inputs.createur = this.inputs.createur.trim().replace(' ', '.').toLowerCase();
      }
      searchQuery += ` AND =cm:author:'${this.inputs.createur.trim()}'`;
    }
    if (this.inputs.nomClient?.trim()) {
      if (this.router.url.includes('consultation') || this.router.url.includes('traitement')) {
        searchQuery += ` AND (contrat:acheteur:'${this.inputs.nomClient.trim()}*'
          OR fact:destinataire:'${this.inputs.nomClient.trim()}*')`;
      }
    }
    if (this.inputs.numeroClient?.trim()) {
      searchQuery += ` AND (firme:codeClient:'${this.inputs.numeroClient.trim()}*')`;
    }
    if (this.inputs.fournisseur && this.inputs.fournisseur.trim() !== 'DIVERS') {
      searchQuery += ` AND =contrat:fournisseur:'${this.inputs.fournisseur.trim()}*'`;
    }
    if (this.inputs.contratNature) {
      searchQuery += ` AND =contrat:nature:'${this.inputs.contratNature}'`;
    }
    if (this.inputs.directionRegionale) {
      searchQuery += ` AND (=fiducial:domainContainerSociete:'${this.inputs.directionRegionale}'`;
      if (this.inputs.codeBudgets.length > 0) {
        for (let index = 0; index < this.inputs.codeBudgets.length; index++) {
          searchQuery += ` OR (firme:codeBudget:'${this.inputs.codeBudgets[index]}' AND fact:numero:*)`;
        }
      }
      searchQuery += `)`;
    }
    if (this.inputs.documentType) {
      searchQuery += ` AND =fiducial:domainContainerSousFamille:'${this.inputs.documentType}'`;
    }

    if (this.inputs.numeroFacture) {
      searchQuery += ` AND (fact:numero:'${this.inputs.numeroFacture}' AND fact:emetteur:'FIDUCIAL CONSEIL')`;
    }

    if (this.inputs.famille) {
      searchQuery += ` AND (=fiducial:domainContainerFamille:'${this.inputs.famille}')`;
    }

    if (this.inputs.numeroDossier) {
      searchQuery += ` AND (conseil:numero:'${this.inputs.numeroDossier}*')`;
    }

    if (this.inputs.description) {
      searchQuery += ` AND (cm:description:'${this.inputs.description}*')`;
    }

    if (this.inputs.numeroContrat) {
      searchQuery += ` AND (contrat:numero:'${this.inputs.numeroContrat}*')`;
    }

    if (!!this.inputs.creationDateInput) {
      const dateQuery = this.utils.getDateQuery(
        this.inputs.creationDateInput,
        `Date de création`,
        'fiducial:documentTrackableContentDate'
      );
      if (dateQuery) {
        searchQuery += ` ${dateQuery}`;
      } else {
        this.actifs['creationDateInput'] = false;
        return;
      }
    }

    if (!!this.inputs.receptionDateInput) {
      const dateQuery = this.utils.getDateQuery(
        this.inputs.receptionDateInput,
        `Date de réception`,
        'conseil:dateReception'
      );
      if (dateQuery) {
        searchQuery += ` ${dateQuery}`;
      } else {
        this.actifs['receptionDateInput'] = false;
        return;
      }
    }

    if (!!this.inputs.contractDateInput) {
      const dateQuery = this.utils.getDateQuery(
        this.inputs.contractDateInput,
        `Date de prise d'effet`,
        'contrat:dateContrat'
      );
      if (dateQuery) {
        searchQuery += ` ${dateQuery}`;
      } else {
        this.actifs['contractDateInput'] = false;
        return;
      }
    }

    if (!!this.inputs.contractEndDateInput) {
      const dateQuery = this.utils.getDateQuery(
        this.inputs.contractEndDateInput,
        `Date de Date fin de validité`,
        'contrat:dateFinContrat'
      );
      if (dateQuery) {
        searchQuery += ` ${dateQuery}`;
      } else {
        this.actifs['contractEndDateInput'] = false;
        return;
      }
    }

    if (!!this.inputs.factureDateInput) {
      const dateQuery = this.utils.getDateQuery(
        this.inputs.factureDateInput,
        `Date de la facture`,
        'fact:dateFacture'
      );
      if (dateQuery) {
        searchQuery += ` ${dateQuery}`;
      } else {
        this.actifs['factureDateInput'] = false;
        return;
      }
    }

    if (this.inputs.codePostal?.trim()) {
      searchQuery += ` AND contact:cp:'${this.inputs.codePostal.trim()}*'`;
    }
    if (this.inputs.conseilProduit && this.inputs.conseilProduit.trim() !== 'DIVERS') {
      searchQuery += ` AND =conseil:produit:'${this.inputs.conseilProduit.trim()}'`;
    }
    this.contextSearchConseilService.updateContext({defaultSearch: this.inputs});
    this.pending = false;
    return (this.searchParams.searchQuery = searchQuery);
  }

  clearPartenaire() {
    this.inputs.fournisseur = '';
    this.partenaireHandler();
  }

  clearCategorie() {
    this.inputs.contratNature = '';
    this.categorieHandler();
  }

  clearProduit() {
    this.inputs.conseilProduit = '';
    this.produitHandler();
  }


  partenaireHandler(newValue?: string) {
    if (newValue) {
      this.categoriesList = [...new Set(this.conseilFullProdList
        .filter(categorie => newValue ? categorie.fournisseur === newValue : true)
        .map(conseilProd => conseilProd.nature))];
        if(this.inputs.contratNature.valueOf()){
          this.produitsList = [...new Set(this.conseilFullProdList
            .filter(categorie => categorie.fournisseur === newValue
              && categorie.nature === this.inputs.contratNature.valueOf())
            .map(conseilProd => conseilProd.produit))];
        } else {
          this.produitsList = [...new Set(this.conseilFullProdList
            .filter(categorie => categorie.fournisseur === newValue)
            .map(conseilProd => conseilProd.produit))];
        }
      if (this.categoriesList.length === 1) {
        this.inputs.contratNature = this.categoriesList[0];
      }
      if (this.produitsList.length === 1) {
        this.inputs.conseilProduit = this.produitsList[0];
      }
    } else {
      this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
      this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
      this.produitsList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.produit))];
      this.clearFields('fournisseur', 'contratNature', 'conseilProduit');
    }

    setTimeout(() => this.onSearch(), 0);
  }

  categorieHandler(newValue?: string) {
    if (newValue) {
      if(this.inputs.fournisseur.valueOf()){
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => newValue ? value.nature === newValue
            && value.fournisseur === this.inputs.fournisseur.valueOf() : true)
          .map(produit => produit.produit))];
      } else {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => newValue ? value.nature === newValue : true)
          .map(produit => produit.produit))];
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => newValue ? produit.nature === newValue : true)
          .map(produit => produit.fournisseur))];

      }
      if (this.produitsList.length === 1) {
        this.inputs.conseilProduit = this.produitsList[0];
      }
      if (this.partenairesList.length === 1) {
        this.inputs.fournisseur = this.partenairesList[0];
      }
    } else {
      this.categoriesList = [...new Set([...this.conseilFullProdList]
        .filter(classement => this.inputs.fournisseur ? classement.fournisseur === this.inputs.fournisseur : true)
        .map(produit => produit.nature))];
      this.clearFields('contratNature', 'conseilProduit');
      if(this.inputs.fournisseur.valueOf()) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(classement => this.inputs.fournisseur ? classement.fournisseur === this.inputs.fournisseur.valueOf() : true)
          .map(produit => produit.produit))];
      }
    }
    setTimeout(() => this.onSearch(), 0);
  }

  produitHandler(newValue?: string) {
    if (newValue) {
      if (!this.inputs.contratNature) {
        this.categoriesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.nature))];
        this.inputs.contratNature = this.categoriesList[0];
      }
      if (!this.inputs.fournisseur) {
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.fournisseur))];

        this.inputs.fournisseur = this.partenairesList[0];
      }
    } else {
      this.produitsList = [...new Set([...this.conseilFullProdList]
        .filter(produit => this.inputs.contratNature ? produit.nature === this.inputs.contratNature
          && produit.fournisseur === this.inputs.fournisseur : true)
        .map(produit => produit.produit))];
      this.clearFields('conseilProduit');
    }

    setTimeout(() => this.onSearch(), 0);
  }

  setSortByField(field: { label: string, value: string }) {
    this.sortBy.field = field.value;
    this.selectedSortByField = field.label;
    this.updateService.triggerRefreshChange(true);
  }

  setSortByOrder(order: { label: string, value: boolean }) {
    this.sortBy.ascending = order.value;
    this.selectedSortByOrder = order.label;
    this.updateService.triggerRefreshChange(true);
  }

  selectDR(societe?: string) {
    if (societe) {
      const directionRegionale = this.allDirectionsRegionales.find(el => el.societe === societe);
      this.setValueDR(directionRegionale);
    } else {
      this.initialiseFullDRList();
      this.clearInput('directionRegionale');
    }
  }

  setValueDR(dr: DirectionRegionale) {
    this.inputs.codeBudgets = dr.codeBudget;
    this.inputs.directionRegionale = dr.societe;
    this.onSearch();
  }

  selectCreateur(createur: string) {
    if (createur) {
      return this.filteredUsers = this.classements.users.filter(el =>
        this.utils.removeAccents(el.fullName).toLowerCase().indexOf(this.utils.removeAccents(createur).toLowerCase()) !== -1)
        .sort((a, b) => a.fullName.localeCompare(b.fullName, 'fr', {ignorePunctuation: true}));
    } else {
      return this.filteredUsers = this.classements.users
        .sort((a, b) => a.fullName.localeCompare(b.fullName, 'fr', {ignorePunctuation: true}));
    }
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  setValueCreateur(createur: string) {
    this.inputs.createur = createur;
    this.onSearch();
  }

  selectDocumentType(documentType: string) {
    if (documentType) {
      return this.filteredDocumentType = this.classements.documentType.filter(el =>
        this.utils.removeAccents(el.labelSousFamille).toLowerCase().indexOf(this.utils.removeAccents(documentType).toLowerCase()) !== -1);
    } else {
      return this.filteredDocumentType = this.classements.documentType;
    }
  }

  setValueDocumentType(documentType: string) {
    this.inputs.documentType = documentType;
    this.onSearch();
  }


  onChangeDocument(selection: SelectedCustomerConseil[]) {
    this.contextSearchConseilService.updateContext({selectedCustomer: selection, currentTabIndex: this.initTab});
    const uuids = selection.map(el => el.id).join();
    this.router.navigate([{outlets: {view: ['modification-conseil', uuids]}}]);
  }

  clearInput(field: string) {
    this.clearFields(field);
    if (field === 'documentType') {
      this.filteredDocumentType = this.classements.documentType;
      this.inputs.documentTypeInput = '';
    }
    if (field === 'famille') {
      this.inputs.famille = undefined;
    }
    if (field === 'directionRegionale') {
      this.inputs.directionRegionaleInput = '';
      this.inputs.codeBudgets = [];
    }
    if (field === 'numeroClient') {
      this.router.url.includes('consultation') ?
        this.router.navigate(['/conseil/consultation/']) :
        this.router.navigate(['/conseil/traitement/']);
    }

    if (field === 'createur') {
      this.inputs.createurInput = '';
      this.showInputCreator = false;
      this.filteredUsers = this.classements.users;
    }
    this.onSearch();
  }

  private clearFields(...fields: string[]) {
    for (const field of fields) {
      this.inputs[field] = '';
      this.actifs[field] = false;
    }
  }

  clearAll() {
    this.actifs = {};
    Object.keys(this.inputs).forEach((input: string) =>
      this.inputs[input] = '');
    this.searchParams.searchQuery = '';
    this.selectedSearchClient = false;
    this.selectedSearchDR = false;
    this.showInputCreator = false;
    this.router.url.includes('consultation') ?
      this.router.navigate(['/conseil/consultation/']) :
      this.router.navigate(['/conseil/traitement/']);
    this.clearPartenaire();
  }

  clearCustomer() {
    this.router.navigate(['/conseil/consultation/']);
    this.onSearch();
  }

  quickSearchClient() {
    if (this.selectedSearchClient) {
      this.selectedSearchClient = false;
      this.inputs.numeroClient = '';
      this.actifs['numeroClient'] = false;

      this.onSearch();
    } else {
      this.selectedSearchClient = true;
      this.inputs.numeroClient = '00000000';
      this.actifs['numeroClient'] = true;
      this.onSearch();
    }
  }

  quickSearchDr() {
    if (this.selectedSearchDR) {
      this.selectedSearchDR = false;
      this.inputs.directionRegionale = '';
      this.actifs['directionRegionale'] = false;
      this.onSearch();
    } else {
      this.selectedSearchDR = true;
      this.inputs.directionRegionale = 'DR_INCONNUE';
      this.actifs['directionRegionale'] = true;
      this.onSearch();
    }
  }

  tabChanged(newIndex: number): void {
    const tabs = Object.keys(TABS_CONSULTATION);
    this.initTab = tabs.indexOf(TABS_CONSULTATION[tabs[newIndex]].name === 'Sinistre' ? 'CORRESPONDANCE' :
      TABS_CONSULTATION[tabs[newIndex]].name === 'Réclamation' ? 'RECLAMATION' :
        TABS_CONSULTATION[tabs[newIndex]].name === 'Conformité générale' ? 'CONFORMITE' :
          TABS_CONSULTATION[tabs[newIndex]].name.toUpperCase());
  }
}
