import { ValueLabelItem } from './../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import {take} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {FidusignCategorie, FidusignRechercheAvanceeData, FidusignSearchFieldsData, FidusignService} from 'services/fidusign.service';
import {UtilsService} from 'services/utils.service';

@Component({
  selector: 'app-home-fidusign-template',
  templateUrl: './home-fidusign-template.component.html',
  styleUrls: ['./home-fidusign-template.component.scss']
})
export abstract class HomeFidusignTemplateComponent implements OnInit {
  abstract tabs: Home.Tabs;
  abstract mainSearchFormData: FidusignSearchFieldsData[];
  abstract rechercheAvanceeFormData: FidusignRechercheAvanceeData;

  abstract subspaceName: string;

  abstract baseFn: string;
  abstract cancelledFn: string;
  abstract pendingFn: string;

  // Toggle sideNav
  sideNavOpen = false;
  searchQuery = '';

  mainSearchForm: UntypedFormGroup = new UntypedFormGroup({});
  rechercheAvanceeForm: UntypedFormGroup = new UntypedFormGroup({});

  rechercheAvanceeSections = [
    'enveloppe',
    'date',
    'signature'
  ];

  categorieList: FidusignCategorie[] = [];
  entiteJuridiqueList: ValueLabelItem[] = [];
  segmentMarcheList: ValueLabelItem[] = [];

  currentYear = new Date().getFullYear();

  constructor(
    public utils: UtilsService,
    public title: Title,
    public fidusignService: FidusignService
  ) {
  }

  ngOnInit() {
    this.buildFormGroups();
    this.getListForPipe();
    this.title.setTitle(`Espace GED - Fidusign ${this.subspaceName}`);
  }

  //#region Public methods

  onSearch(extraClause?: string) {
    let searchQuery = `${extraClause ?? ''} `;

    searchQuery = this.getMainSearchClauses(searchQuery);
    const rechercheAvanceeQuery = this.getRechercheAvanceeClauses(searchQuery);
    if (!rechercheAvanceeQuery) {
     return;
    }
    searchQuery = this.getRechercheAvanceeClauses(searchQuery);

    this.searchQuery = searchQuery;
  }

  mainSearchQueryHandler(data: FidusignSearchFieldsData, inputValue: string) {
    return `AND (${data.metadatas[0]}:"${inputValue?.trim()}*")`;
  }

  rechercheAvanceeQueryHandler(formData: FidusignSearchFieldsData, inputValue: string) {
    let query = '';

    if (formData.name === 'statutSignature') {
      query = this.statutHandler(formData, inputValue);
    } else {
      query = this.baseQueryHandler(formData, inputValue);
    }
    return query;
  }

  onSync(key) {
    return (totalItems: number) => {
      this.tabs[key].count = totalItems;
    };
  }

  refreshNav(value) {
    this.sideNavOpen = value;
  }

  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  clearAll() {
    this.resetFetchFn();

    this.mainSearchForm.reset(undefined, {emitEvent: false});
    this.rechercheAvanceeForm.reset(undefined, {emitEvent: false});
    this.onSearch();
  }

  onDropdownSelectionChange(newValue: string, formControlName: string) {
    if (formControlName === 'statutSignature') {
      if (!newValue || newValue === '*') {
        this.resetFetchFn();
      } else {
        this.setFetchFn(newValue);
      }
    }

    this.onSearch();
  }

  //#endregion

  private buildFormGroups() {
    this.mainSearchForm = this.utils.getFormGroupFromStringArray(
      this.mainSearchFormData.map((m) => m.name)
    );
    this.rechercheAvanceeForm = this.utils.getFormGroupFromStringArray(
      this.flattenRechercheAvanceeFields().map((r) => r.name)
    );
  }

  private getMainSearchClauses(searchQuery: string) {
    const mainSearchFormValues = this.utils.getNonEmptyPropertiesFromFormGroup(this.mainSearchForm);
    for (const key in mainSearchFormValues) {
      const formData = this.mainSearchFormData.find(m => m.name === key);
      const query = this.mainSearchQueryHandler(formData, mainSearchFormValues[key]);
      searchQuery = `${searchQuery} ${query}`;
    }
    return searchQuery;
  }

  private getRechercheAvanceeClauses(searchQuery: string) {
    const rechercheAvanceeValues = this.utils.getNonEmptyPropertiesFromFormGroup(this.rechercheAvanceeForm);
    const flattenedRechercheAvanceeFormData = this.flattenRechercheAvanceeFields();
    for (const key in rechercheAvanceeValues) {
      const formData = flattenedRechercheAvanceeFormData.find(f => f.name === key);
      const query = this.rechercheAvanceeQueryHandler(formData, rechercheAvanceeValues[key]);
      if (query) {
        searchQuery = `${searchQuery} ${query}`;
      } else {
        return '';
      }
    }
    return searchQuery;
  }

  private baseQueryHandler(formData: FidusignSearchFieldsData, inputValue: string) {
    let searchQuery = '';
    switch (formData.inputType) {
      case 'date':
        searchQuery = this.utils.getDateQuery(
          inputValue,
          formData.description,
          formData.metadatas[0]
        ) ?? '';
        break;
      case 'year-range':
        searchQuery = this.utils.getYearRangeQuery(inputValue, formData.description, formData.metadatas[0]) ?? '';
        break;
      default:
        searchQuery = this.getDefaultQuery(formData, inputValue);
        break;
    }
    return searchQuery;
  }

  private getDefaultQuery(formData: FidusignSearchFieldsData, inputValue: string): string {

    return `AND (${formData.metadatas.map(m => {
      let clause = `${m}:"${inputValue?.trim()}*"`;
      if (formData.metadataOptions === 'strict-search') {
        clause = `=${m}:"${inputValue?.trim()}"`;
      }
      return clause;
    }).join(' OR ')})`;
  }

  private statutHandler(formData: FidusignSearchFieldsData, inputValue: string) {
    let searchQuery = '';

    if (inputValue !== '*') {
      if (inputValue === 'ERROR') {
        searchQuery = `AND ISNULL:'${formData.metadatas[0]}'`;
      } else if (inputValue === 'DOCUMENT_SIGNE') {
        searchQuery = `AND (${formData.metadatas[0]}:'DOCUMENT_SIGNE' OR ISNOTNULL:'fiduSign:dateCertification')`;
      } else {
        searchQuery = `AND (=${formData.metadatas[0]}:'${inputValue}')`;
      }
    }
    return searchQuery;
  }

  private flattenRechercheAvanceeFields(): FidusignSearchFieldsData[] {
    return Object.keys(this.rechercheAvanceeFormData)
      .reduce(
        (acc, cur) => {
          return acc.concat(this.rechercheAvanceeFormData[cur]);
        },
        []
      );
  }

  private resetFetchFn() {
    this.tabs['CANCELLED'].fetchFn = this.cancelledFn;
    this.tabs['PENDING'].fetchFn = this.pendingFn;
  }

  private setFetchFn(newValue: string) {
    const cancelledStatus = ['DEMANDE_EXPIREE', 'DEMANDE_ANNULEE'];
    const pendingStatus = [
      'MAIL_ENVOYE',
      'MAIL_SEND',
      'MAIL_RENVOYE',
      'DOCUMENT_LU',
      'SIGNATURE_EC_*',
    ];
    this.tabs['CANCELLED'].fetchFn = cancelledStatus.includes(newValue)
      ? this.baseFn
      : this.cancelledFn;
    this.tabs['PENDING'].fetchFn = pendingStatus.includes(newValue)
      ? this.baseFn
      : this.pendingFn;
  }

  private getListForPipe(): void {
    switch (this.fidusignService.userSubspace.name) {
      case 'achats':
        this.fidusignService.getCategorieList()
          .pipe(take(1))
          .subscribe(categorie => this.categorieList = categorie);
        break;
      case 'juridique':
        this.fidusignService.getEntiteJuridiqueList()
          .pipe(take(1))
          .subscribe(entiteJuridiqueList => this.entiteJuridiqueList = entiteJuridiqueList);
        break;
      case 'y-proximite':
        this.fidusignService.getProximiteSegmentMarcheList()
          .pipe(take(1))
          .subscribe(segmentMarcheList => this.segmentMarcheList = segmentMarcheList);
        break;
    }
  }
}
