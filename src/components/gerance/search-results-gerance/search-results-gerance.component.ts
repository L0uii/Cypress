import { endpoints } from './../../../endpoints/endpoints';
import { Observable } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {SearchConfigurationService, SearchService} from '@alfresco/adf-core';
import {FetchDataService} from 'services/fetch-data.service';
import {UtilsService} from 'services/utils.service';
import {MailService} from 'services/mail.service';
import {CustomMatPaginatorIntl} from 'services/custom-mat-paginator-intl';
import {FixedMatTableDataSource} from 'utils/paginator';
import {SearchEntries, SearchResult, SortBy, SearchParams} from 'models/search';
import {GroupService} from 'services/group.service';
import {Router} from '@angular/router';
import {PreviewService} from 'services/preview.service';
import {UpdateResultsService} from 'services/update-results.service';
import {FidusignService} from 'services/fidusign.service';
import {DownloadService} from 'services/download.service';
import {SnackbarService} from 'services/snackbar.service';
import moment from 'moment';
import { Subject } from 'rxjs';

export enum Columns {
  Select = 'select',
  Name = 'Name',
  Proprietaire = 'Proprietaire',
  NomImmeuble = 'NomImmeuble',
  NomLocataire = 'NomLocataire',
  Emetteur = 'Emetteur',
  Dates = 'Dates',
  DateSignature = 'DateSignature',
  PendingSignataires = 'PendingSignataires',
  StatutSignature = 'StatutSignature',
  OptionsPending = 'OptionsPending',
  OptionsSigned = 'OptionsSigned',
  Files = 'Files'
}

@Component({
  selector: 'app-search-results-gerance',
  templateUrl: './search-results-gerance.component.html',
  styleUrls: ['./search-results-gerance.component.scss'],
  providers: [
    SearchConfigurationService,
    SearchService,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
})
export class SearchResultsGeranceComponent implements OnChanges, OnDestroy {
  @Input() sortBy: SortBy = {field: 'created', ascending: false};
  @Input() fn: string;
  @Input() columns: Columns[];
  @Input() searchQuery: string;
  @Output() sync = new EventEmitter();
  @Input() isOpen: boolean;
  @Output() syncSideNav = new EventEmitter();
  @Output() clearInput = new EventEmitter();

  // Table
  dataSource = new FixedMatTableDataSource();
  sortedData: Array<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<Element>(true, []);
  selected: number;
  // Search
  totalItems = 0;
  searchParams: SearchParams = {
    searchQuery: '',
    maxItems: 25,
    skipCount: 0
  };
  hasMoreItems: boolean;

  // Page
  ColumnsType = Columns;
  lastSearch: SearchParams = null;

  triggerSearch$ = new Subject();

  constructor(
    private searchData: FetchDataService,
    private utils: UtilsService,
    private mail: MailService,
    private preview: PreviewService,
    private group: GroupService,
    private router: Router,
    private updateService: UpdateResultsService,
    private fidusign: FidusignService,
    private file: DownloadService,
    private snack: SnackbarService
  ) {
    this.updateService.mustRefreshChange.subscribe(change => {
      if (change) {
        this.dataSource.data = [];
        this.searchParams.skipCount = 0;
        this.searchParams.maxItems = 25;
        this.triggerSearch$.next();
      }
    });

    this.searchSubscription();
  }

  ngOnDestroy(): void {
    this.triggerSearch$.complete();
  }

  toggleNav(value) {
    this.syncSideNav.emit(value);
  }


  backToSearch() {
    this.clearInput.emit();
    this.searchQuery = '';
    this.triggerSearch$.next();
  }

  changeEmail(id) {

    this.router.navigate(['/modifier-email', id]);
  }

  forward(id) {
    this.router.navigate([{ outlets: { view: ['copie-email', id] } }]);
  }

  // We only merge
  shouldMergeData(searchParams: SearchParams) {
    if (this.lastSearch) {
      return this.lastSearch.searchQuery === searchParams.searchQuery
        && this.lastSearch.maxItems === searchParams.maxItems
        && this.lastSearch.sortBy.field === searchParams.sortBy.field
        && this.lastSearch.sortBy.ascending === searchParams.sortBy.ascending;
    }
  }

  retryAll(element) {
    const signProperties = JSON.stringify({
      'fiduSign:origine': 'FiduSign',
      'fiduSign:prenomSignataire1': element.PrenomSignataire1,
      'fiduSign:nomSignataire1': element.NomSignataire1,
      'fiduSign:mailSignataire1': element.MailSignataire1,
      'fiduSign:prenomSignataire2': element.PrenomSignataire2,
      'fiduSign:nomSignataire2': element.NomSignataire2,
      'fiduSign:mailSignataire2': element.MailSignataire2,
      'fiduSign:prenomSignataire3': element.MailSignataire3,
      'fiduSign:nomSignataire3': element.MailSignataire3,
      'fiduSign:mailSignataire3': element.MailSignataire3,
      'fiduSign:callback': endpoints.fiduSignCallback + element.id + '&status=%1',
      'fiduSign:prenomEmetteur': element.PrenomEmetteur,
      'fiduSign:nomEmetteur': element.NomEmetteur,
      'fiduSign:mailEmetteur': element.MailEmetteur
    });
    this.fidusign.retrySigning(element.id, element.StatutSignature, signProperties).then(response => {
      response.ok ?
        this.snack.openSuccess('Votre demande de signature a été relancée.') :
        this.snack.openError('Un erreur s\'est produite lors de la relance. Veuillez réessayer.');
      response.ok ? this.updateService.triggerRefreshChange(true) : this.updateService.triggerRefreshChange(false);
    }).catch(err => {
      this.snack.openError('Un erreur s\'est produite lors de la relance. Veuillez réessayer.');
    });
  }

  resultsToEnveloppe(entries) {
    const result = [];
    // Group by UuidsLink
    const filtered = entries.reduce((previousValue: SearchEntries, currentValue: SearchEntries) => {
      const key = currentValue.UuidsLink;
      previousValue[key] = previousValue[key] || [];
      previousValue[key].push(currentValue);
      return previousValue;
    }, Object.create(Object));

    // Add filenames to an unique property
    Object.keys(filtered).forEach(element => {
      const docList = [];
      const uuids = [];
      const zipInfo = [];
      for (let index = 0; index < filtered[element].length; index++) {
        const doc = filtered[element][index];
        docList.push(doc.name);
        uuids.push(doc.id);
        zipInfo.push({
          id: doc.id,
          name: doc.name
        });
      }
      filtered[element][0]['zipInfo'] = zipInfo;
      filtered[element][0]['Files'] = docList;
      filtered[element][0]['uuids'] = uuids.join();
      filtered[element][0]['nbFiles'] = filtered[element].length;
      result.push(filtered[element][0]);
    });
    return result;
  }

  filesByEnveloppe(entries) {
    return entries.map(elem => elem.nbFiles);
  }

  handleSearchResponse(resp: SearchResult) {
    const initialQuery = { ...this.searchParams };
    const {entries, pagination} = resp;
    const {totalItems} = pagination;
    this.hasMoreItems = pagination.hasMoreItems;
    const data = this.shouldMergeData(initialQuery) ?
      this.utils.removeDuplicates(this.dataSource.data.concat(this.resultsToEnveloppe(entries)), 'Files') :
      this.resultsToEnveloppe(entries);
    this.dataSource = new FixedMatTableDataSource(data);
    this.lastSearch = initialQuery;
    this.dataSource.totalItems = totalItems;

    this.totalItems = totalItems;
    this.sync.emit(resp);
  };

  validationTime(creation) {
    const expirationDate = moment(creation).add(57, 'days');
    return moment().isBefore(expirationDate);
  }

  private searchSubscription() {
    this.triggerSearch$
      .pipe(switchMap(() => {
        this.searchParams.searchQuery = this.searchQuery;
        this.searchParams.sortBy = this.sortBy;
        this.searchParams.skipCount = this.shouldMergeData(this.searchParams) ? this.searchParams.skipCount : 0;
        return this.searchData.callMethodByName(this.fn, this.searchParams);
      }))
      .subscribe((res) => this.handleSearchResponse(res));
  }

  nextResults() {
    this.searchParams.skipCount = this.searchParams.skipCount + this.searchParams.maxItems;
    this.triggerSearch$.next();
  }

  ngOnChanges() {

    this.triggerSearch$.next();
  }
}

