import { tap, switchMap, finalize } from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UtilsService} from 'services/utils.service';
import {FetchDataService} from 'services/fetch-data.service';
import {SearchParams, SearchResult} from 'models/search';
import {DownloadService} from 'services/download.service';
import {CLASSEMENT} from 'models/mr';
import {UserService} from 'services/user.service';
import {cloneDeep} from 'lodash';
import { CustomerExpertise } from 'models/customer-expertise';
import { Observable, Subject, Subscription, } from 'rxjs';
import { ExpertiseService } from 'services/expertise.service';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
@Component({
  selector: 'app-exports-mr',
  templateUrl: './exports-mr.component.html',
  styleUrls: ['./exports-mr.component.scss']
})
export class ExportsMrComponent implements OnInit, OnDestroy {
  codeBudgets = [];
  showSearchResult = false;
  hasSelectedCustomer = false;
  numeroClient = '';
  nomClient = '';
  results = [];
  //resultsByYear = {};
  pending = false;
  noDisplayClient = cloneDeep(CLASSEMENT).filter(el => !el.displayClient || el.onglet === 'Chef d\'entreprise').map(doc => doc.sousFamille);
  noChefEntreprise = cloneDeep(CLASSEMENT).filter(el => el.onglet === 'Chef d\'entreprise').map(doc => doc.sousFamille);
  documentType = cloneDeep(CLASSEMENT).filter(el => el.onglet !== 'Chef d\'entreprise').map(doc => doc.sousFamille);
  kindsOfCustomer = {
    client: 'client',
    collaborateur: 'collaborateur'
  };
  selectedCustomer = this.kindsOfCustomer.client;
  eventsDossier: Subject<void> = new Subject<void>();
  selectedCodeBudget: string;

  searchParams: SearchParams = {
    maxItems: 100,
    skipCount: 0
  };

  customerSearchPending: boolean = false;
  dossierList: CustomerExpertise[] = [];
  customer: CustomerExpertise;
  showDirectory: boolean = true;

  cachedSearch: SearchResult = {
    entries: [],
    pagination: {},
    facets: []
  };

  get isCollab() { return this.selectedCustomer === this.kindsOfCustomer.collaborateur; }
  get isClient() { return this.selectedCustomer === this.kindsOfCustomer.client; }
  private codeBudgetSubscription: Subscription;
  private readonly selectedCustomerSessionKey = 'GED.selectedCustomer';
  constructor(
    private searchData: FetchDataService,
    private userService: UserService,
    private utils: UtilsService,
    private title: Title,
    private file: DownloadService,
    private searchDossierService: SearchDossierExpertiseService

  ) {
  }

  // Effacer la valeur du champ numéro client
  clearNumeroClient() {
    this.eventsDossier.next();
    this.numeroClient = '';
    this.showSearchResult = false;
    this.hasSelectedCustomer = false;
    this.searchParams.skipCount = 0;
    this.results = [];
    //this.resultsByYear = {};
    this.customer = null;
    sessionStorage.removeItem(this.selectedCustomerSessionKey);
    this.showDirectory = true;
  }

  setCustomer(client: CustomerExpertise) {
    if (client) {
      this.customer = client;
      this.numeroClient = client.numeroDossier;
      this.nomClient = client.nomDossier;
      this.showSearchResult = false;
      this.hasSelectedCustomer = true;
      sessionStorage.setItem(this.selectedCustomerSessionKey, JSON.stringify(client));
      this.showDirectory = false;
      this.search();
      return;
    }
    this.clearNumeroClient();
  }

  search(cached: boolean = false) {
    if (cached) {
      if (!this.cachedSearch?.entries.length) {
        return;
      }
      this.pending = true;
      this.results = [];
      return this.handleSearchCustomers(this.cachedSearch);
    }


    if (this.numeroClient) {
      let codeBudgetQuery = '';

      if (!!this.selectedCodeBudget) {
        codeBudgetQuery = `firme:codeBudget:'${this.selectedCodeBudget}'`;
      } else {
        this.codeBudgets.forEach((codeBudget, index) => {
          const modifier = index < this.codeBudgets.length - 1 ? 'OR' : '';
          codeBudgetQuery += `firme:codeBudget:'${codeBudget}' ${modifier} `;
        });
      }

      const codeClientQuery = `firme:codeClient:'${this.numeroClient.trim()}'`;

      const searchQuery = `AND (${codeBudgetQuery}) AND (${codeClientQuery})`;
      this.searchParams.searchQuery = searchQuery;

      this.pending = true;
      this.showSearchResult = true;
      this.searchData.getAllDocsMR(this.searchParams).subscribe((res) => {
        this.cachedSearch.entries = this.cachedSearch.entries.concat(res.entries);
        this.handleSearchCustomers(res)
      });
    }
  }

  filterYear(arr, year) {
    return arr.filter(el => new Date(el.DateCreation).getFullYear() === year);
  }

  handleSearchCustomers(resp: SearchResult) {
    const {entries, pagination} = resp;
    // 00798090
    if (entries.length > 0) {
      const filteredEntries = entries
        .filter(el => this.documentType.includes(el.SousFamille))
        .filter(el => this.isClient ?
          !this.noDisplayClient.includes(el.SousFamille) :
          !this.noChefEntreprise.includes(el.SousFamille)
        );
      this.results = this.results.concat(filteredEntries);

      if (pagination.hasMoreItems) {
        this.searchParams.skipCount += this.searchParams.maxItems;
        this.search();
        return;
      }

      // if (this.results.length > 0) {
      //   const mostRecent = new Date(this.results[0].DateCreation).getFullYear();
      //   let mostAncient = new Date(this.results[this.results.length - 1].DateCreation).getFullYear();
      //   const numberOfYears = ((mostRecent - mostAncient) + 1);
      //   const years = [];
      //   for (let index = 0; index < numberOfYears; index++) {
      //     years.push(mostAncient);
      //     mostAncient++;
      //   }
      //   years.forEach(year => {
      //     this.resultsByYear[year] = this.filterYear(this.results, year);
      //   });
      // }
    }

    this.pending = false;
  };


  ngOnInit() {
    this.codeBudgets = this.userService.codeBudgets;
    this.title.setTitle('Espace GED - Collaborateur Expertise-Consulting');

    this.codeBudgetSubscription = this.userService.selectedCodeBudgetRef
    .pipe(
      tap(registeredCodeBudget => {
        this.selectedCodeBudget = registeredCodeBudget;
      }),
      switchMap(codeBudget => this.getFullCustomerList(codeBudget))
    )
    .subscribe(() => {
      if (!sessionStorage.getItem(this.selectedCustomerSessionKey)) {
        this.clearNumeroClient();
      }
    });

    if(sessionStorage.getItem(this.selectedCustomerSessionKey)) {
      this.setCustomer(JSON.parse(sessionStorage.getItem(this.selectedCustomerSessionKey)));
     }
  }

  ngOnDestroy() {
    if (this.codeBudgetSubscription) {
     this.codeBudgetSubscription.unsubscribe();
    }
  }

  getFullCustomerList(codeBudget: string): Observable<CustomerExpertise[]> {
    this.customerSearchPending = true;

    return this.searchDossierService.getCustomers(codeBudget).pipe(
      tap((res) => this.dossierList = res),
      finalize(() => this.customerSearchPending = false)
    );
  }

}
