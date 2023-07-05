import { endpoints } from './../endpoints/endpoints';
import { UtilsService } from 'services/utils.service';
import { CustomerExpertise } from 'models/customer-expertise';
import { MinifiedResponse, SearchDossierHelpersService } from './search-dossier-helpers.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface DossierDictionary {
  [codeBudget: string]: CustomerExpertise[];
}

interface CustomerSearchDictionary {
  [codeBudget: string]: CustomerExpertise[];
}

interface MinifiedResponseDictionary {
  [codeBudget: string]: MinifiedResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchDossierExpertiseService {

  //#region Variables

  private readonly _customerDictKey = 'GED.Customers';
  private readonly _rcuErrorKey = 'GED.RCUError';

  private _rcuHasError: boolean = false;

  //#endregion

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private searchDossierHelpers: SearchDossierHelpersService,
    private utilsService: UtilsService
  ) { }

  //#region Public Methods

  //#region Expertise

  getCachedExpertiseDossierData(searchTerm: string): CustomerExpertise {
    if (!searchTerm) {
      return null;
    }

    searchTerm = this.utilsService.formatURL(searchTerm);

    const isNumber = !isNaN(+searchTerm);
    const cachedCodeBudgets = Object.keys(this.customerDictionary);

    return this.getCachedDossier(cachedCodeBudgets, isNumber, searchTerm);
  }

  hasRcuErrorOnExpertiseSearch(codeBudget: string): boolean {
    return this.hasRcuError && !this.customerDictionary[codeBudget]?.length;
  }

  //#endregion

  //#region RCU Requests

  getExpertiseDossierData(searchTerm: string): Observable<CustomerExpertise> {
    if (!searchTerm) {
      return of(null);
    }

    searchTerm = this.utilsService.formatURL(searchTerm);

    const isNumber = !isNaN(+searchTerm);
    const cachedCodeBudgets = Object.keys(this.customerDictionary);

    const cachedDossier = this.getCachedDossier(cachedCodeBudgets, isNumber, searchTerm);

    if (cachedDossier) {
      return of(cachedDossier);
    }

    const userCodeBudgets = [...new Set([this.userService.selectedCodeBudget, ...this.userService.codeBudgets])];
    //const missingCodeBudgets = userCodeBudgets.filter(cb => !cachedCodeBudgets.includes(cb));

    // const codeBudgetQuery = missingCodeBudgets.map(c => `(codeBudget='${c}')`).join('OR');
    const containsQuery = `contains(${isNumber ? 'numeroAffaire' : 'nomDossier'},'${searchTerm}')`

    // return this.coreRcuRequest(`${codeBudgetQuery})AND(${containsQuery})&pageSize=3&(`)
    return this.coreRcuRequest(`${containsQuery})&pageSize=3&(`, true)
      .pipe(
        map(res => {
          if (res.length > 0 && this.userService.codeBudgets.includes(res[0].codeBudget)) {
            return this.resultMapper(res[0], res[0].codeBudget);
          }
          return null;
        }),
      );
  }

  getCustomers(codeBudget: string): Observable<CustomerExpertise[]> {
    if (codeBudget in this.customerDictionary) {
      return of(this.customerDictionary[codeBudget].map(c => this.resultMapper(c, codeBudget)));
    }

    return this.coreRcuRequest(`(codeBudget='${codeBudget}'))&pageSize=unbounded&(`).pipe(
      tap(res => {
        if (res.length > 0) {
          this._rcuHasError = false;
        }
        this.saveToLocalStorage(codeBudget, res);
      }),
      map(res => res.map(r => this.resultMapper(r, codeBudget)))
    );
  }

  private coreRcuRequest(query: string, includeCodeBudget: boolean = false): Observable<CustomerExpertise[]> {
    if (!query)
      return of([]);

    return this.http.post<any>(
      endpoints.frontGEDInfoFromQuery,
      {},
      { headers: { query } }
    ).pipe(
      tap((res) => this.searchDossierHelpers.checkStatus400(res)),
      catchError(() => {
        this._rcuHasError = true;
        return of({ rows: [] });
      }),
      map((res) => {
        const rows = this.filterBySocieties(res);
        return this.mapToCustomerExpertise(rows, includeCodeBudget);
      }),
      map((res) => res.filter((el, index, self) => self.findIndex(e => e.numeroDossier === el.numeroDossier) === index))
    );
  }

  //#endregion

  //#endregion

  //#region Private Methods

  //#region Handlers for getCustomers

  private filterBySocieties(res: any): any[] {
    let rows = [];
    if (res?.rows.length > 0) {
      const expertiseAllowedSocieties = ['FIDEXP', 'FIDAGC', 'FIDBUR'];
      rows = res.rows.filter(el => expertiseAllowedSocieties.some(s => s === el.content.societeFiducial.content));
    }
    return rows;
  }

  private mapToCustomerExpertise(rows: any[], includeCodeBudget: boolean = false): CustomerExpertise[] {
    let customerList: CustomerExpertise[] = [];
    if (rows?.length > 0) {
      customerList = rows
        .map(el => {
          const { numeroAffaire, libelleAffaire, statutAffaire, codeBudget } = el.content;
          const customer = {
            numeroDossier: numeroAffaire.content,
            nomDossier: libelleAffaire.content,
            statutAffaire: statutAffaire.label
          }
          return includeCodeBudget ? { codeBudget: codeBudget.content, ...customer } : customer;
        });
    }
    return customerList;
  }

  private saveToLocalStorage(codeBudget: string, customerList: CustomerExpertise[]) {
    const simplifiedDict = this.utilsService.loadAndDecompress(this._customerDictKey);
    simplifiedDict[codeBudget] = customerList.map(c => this.minifyCustomerData(c));

    this.utilsService.compressAndSave(this._customerDictKey, simplifiedDict);
    localStorage.setItem(this._rcuErrorKey, JSON.stringify(this._rcuHasError));
  }

  private resultMapper(c: CustomerExpertise, codeBudget: string): CustomerExpertise {
    return { ...c, codeBudget };
  }

  //#endregion
  //#region Getters for Dictionaries

  private getCachedResults(): CustomerSearchDictionary {
    const cachedDict: MinifiedResponseDictionary = this.utilsService.loadAndDecompress(this._customerDictKey);
    const dict: CustomerSearchDictionary = {};

    for (const key in cachedDict) {
      dict[key] = cachedDict[key].map(c => this.deminifyCustomerData(c))
    }

    return dict;
  }

  private get customerDictionary(): DossierDictionary  {
    return this.getCachedResults();
  }

  private getList(codeBudget: string): CustomerExpertise[] {
    return codeBudget in this.customerDictionary
      ? this.customerDictionary[codeBudget].map(c => this.resultMapper(c, codeBudget))
      : [];
  }

  private getCachedDossier(codeBudgetList: string[], isNumber: boolean, searchTerm: string): CustomerExpertise {
    for (const codeBudget of codeBudgetList) {
      const dossier = this.getDossierData(codeBudget, isNumber, searchTerm);
      if (!!dossier) {
        return dossier;
      }
    }
    return null
  }

  //#endregion
  //#region Helpers

  private getDossierData(codeBudget: string, isNumber: boolean, searchTerm: string): CustomerExpertise {
    return this.getList(codeBudget)
      .find(c => isNumber ?
        c.numeroDossier.includes(searchTerm) :
        c.nomDossier.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }

  private get hasRcuError(): boolean {
    if (this._rcuHasError === null) {
      const hasError = JSON.parse(localStorage.getItem(this._rcuErrorKey));
      this._rcuHasError = hasError;
    }
    return this._rcuHasError;
  }

  //#endregion

  //#region Minifier Methods

  private _minifierMap = {
    numeroDossier: 'u',
    nomDossier: 'o',
    statutAffaire: 's'
  };

  private minifyCustomerData(c: CustomerExpertise): MinifiedResponse {
    const { numeroDossier, nomDossier, statutAffaire } = this._minifierMap;
    let customer: MinifiedResponse = { };
    customer[numeroDossier] = c.numeroDossier;
    customer[nomDossier] = c.nomDossier;
    customer[statutAffaire] = c.statutAffaire[0];

    return customer;
  }

  private deminifyCustomerData(c: MinifiedResponse): CustomerExpertise {
    const { numeroDossier, nomDossier, statutAffaire } = this._minifierMap;

    return {
      numeroDossier: c[numeroDossier],
      nomDossier: c[nomDossier],
      statutAffaire: this.searchDossierHelpers.statutsAffaire[c[statutAffaire]]
    };
  }

  //#endregion

  //#endregion
}

