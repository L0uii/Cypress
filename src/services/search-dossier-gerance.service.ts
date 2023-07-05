import { endpoints } from './../endpoints/endpoints';
import { UtilsService } from 'services/utils.service';
import {MinifiedResponse, SearchDossierHelpersService} from './search-dossier-helpers.service';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {CustomerGeranceAssocies} from 'models/customer-gerance-associes';

@Injectable({
  providedIn: 'root'
})
export class SearchDossierGeranceService {

  //#region Variables

  private readonly _customerListKey = 'GED.GeranceCustomers';
  private readonly _rcuErrorKey = 'GED.GeranceRCUError';

  private _rcuHasError: boolean = null;

  private _prevSearch: string;

  //#endregion

  constructor(
    private http: HttpClient,
    private searchDossierHelpers: SearchDossierHelpersService,
    private utilsService: UtilsService
  ) { }

  //#region Public Methods

  searchDossier(searchQuery: string, takeCount: number = 30): Observable<CustomerGeranceAssocies[]> {
    if (!searchQuery) {
      return of([]);
    }

    const isNumber = !isNaN(+searchQuery);
    if (!isNumber) {
      searchQuery = searchQuery.toUpperCase();
    }

    const searchInCache = searchQuery.includes(this._prevSearch);
    this._prevSearch = searchQuery;

    if (searchInCache) {
      return of(this.searchInCachedList(isNumber, searchQuery, takeCount));
    }

    return this.getCustomers(searchQuery);
  }

  get hasRcuErrorOnSearch(): boolean {
    return this.rcuHasError && this.customerList.length === 0;
  }

  //#endregion

  //#region RCU Requests

  private getCustomers(searchQuery: string): Observable<CustomerGeranceAssocies[]> {
    const isNumber = !isNaN(+searchQuery);

    const containsClause = isNumber ? `numeroAffaire,"${searchQuery}"` : `libelleAffaire,"${searchQuery}"`;

    return this.http.post<any>(
      endpoints.frontGEDInfoFromQuery, {}, {
      headers: {
        query: `societeFiducial="UFFIRE")and(contains(${containsClause}))&pageSize=unbounded&(`
      }
    }).pipe(
      tap((res) => this.checkStatus400(res)),
      map(({ rows }) => this.mapToSearchDossierResponse(rows)),
      catchError((err) => this.singleRequestErrorHandler(err))
    )
  }

  //#endregion

  //#region Private Methods

  //#region Getters

  private get customerList(): CustomerGeranceAssocies[]  {
    return this.getCachedResults();
  }

  private get rcuHasError(): boolean {
    if (this._rcuHasError === null && localStorage.getItem(this._rcuErrorKey)) {
      const hasError = JSON.parse(localStorage.getItem(this._rcuErrorKey));
      this._rcuHasError = hasError;
    }
    return this._rcuHasError;
  }

  private getCachedResults(): CustomerGeranceAssocies[] {
    if (localStorage.getItem(this._customerListKey)) {
      const minifiedResults: MinifiedResponse[] = this.utilsService.loadAndDecompress(this._customerListKey);
      return minifiedResults.map(c => this.deminifyCustomerData(c));
    }
    return [];
  }

  //#endregion

  private searchInCachedList(isNumber: boolean, searchQuery: string, takeCount: number): CustomerGeranceAssocies[] {
    return this.customerList
      .filter(el => isNumber ?
        el.numeroAssocie.includes(searchQuery) :
        el.nomAssocie.toUpperCase().includes(searchQuery))
      .slice(0, takeCount);
  }

  private checkStatus400(res: any) {
    if (res?.code === 400)
      throw new HttpErrorResponse({ error: { message: '400 Error' }, status: 400 });
  }

  private singleRequestErrorHandler(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400 || (error.status === 500 && error.error.message.includes('timeout'))) {
      this._rcuHasError = true;
      return of({rows: []});
    }

    return throwError(() => error);
  }

  private mapToSearchDossierResponse(rows: any[]): CustomerGeranceAssocies[] {
    this._rcuHasError = false;
    let customerList: CustomerGeranceAssocies[] = [];
    if (rows?.length > 0) {
      customerList = rows
        .map(({ content }) => {
          const { numeroAffaire, libelleAffaire, statutAffaire } = content;
          return {
            numeroAssocie: numeroAffaire.content,
            nomAssocie: libelleAffaire.content,
            statutAffaire: statutAffaire.label
          };
        });
    }
    this.saveToLocalStorage(customerList);
    return customerList.sort((a, b) => this.utilsService.sortStrings(a.nomAssocie, b.nomAssocie));
  }

  private saveToLocalStorage(fetchedCustomers: CustomerGeranceAssocies[]) {
    let customersToAdd = [];
    fetchedCustomers.forEach(f => {
      if (!(this.customerList.find(c => c.numeroAssocie === f.numeroAssocie))) {
        customersToAdd.push(f);
      }
    });
    const allCustomers = [ ...this.customerList, ...customersToAdd ];
    allCustomers.sort((a, b) => this.utilsService.sortStrings(a.nomAssocie, b.nomAssocie))
    const minifiedList = allCustomers.map(c => this.minifyCustomerData(c))
    this.utilsService.compressAndSave(this._customerListKey, minifiedList);
    localStorage.setItem(this._rcuErrorKey, JSON.stringify(this._rcuHasError));
  }

  //#region Minifier Methods

  private _minifierMap = {
    numeroAssocie: 'u',
    nomAssocie: 'o',
    statutAffaire: 's'
  };

  private minifyCustomerData(c: CustomerGeranceAssocies): MinifiedResponse {
    const { numeroAssocie, nomAssocie, statutAffaire } = this._minifierMap;
    let customer: MinifiedResponse = { };
    customer[numeroAssocie] = c.numeroAssocie;
    customer[nomAssocie] = c.nomAssocie;
    customer[statutAffaire] = c.statutAffaire[0];

    return customer;
  }

  private deminifyCustomerData(c: MinifiedResponse): CustomerGeranceAssocies {
    const { numeroAssocie, nomAssocie, statutAffaire } = this._minifierMap;

    return {
      numeroAssocie: c[numeroAssocie],
      nomAssocie: c[nomAssocie],
      statutAffaire: this.searchDossierHelpers.statutsAffaire[c[statutAffaire]]
    };
  }

  //#endregion

  //#endregion
}
