import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {SearchParams, SearchResult} from 'models/search';
import {FetchDataService} from 'services/fetch-data.service';
import {UtilsService} from 'services/utils.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnDestroy {
  @Output() result = new EventEmitter();
  @Input() pager;
  @Input() sameCustomer;
  customer = {};
  customerQuery = '';
  directory = [];
  searchParams: SearchParams = {
    searchQuery: '',
    maxItems: 25,
    skipCount: 0
  };

  constructor(
    private utils: UtilsService,
    private searchData: FetchDataService,
  ) {
  }

  search() {
    let searchQuery = '';
    if (this.customerQuery) {
      searchQuery = `AND (liste:NumeroDossier:"${this.customerQuery}*"`;
      searchQuery += ` OR liste:Nom:"${this.utils.removeAccents(this.customerQuery)}*")`;
      this.searchParams.searchQuery = searchQuery;
      this.searchData.conseilCustomers(this.searchParams).subscribe((res) => this.handleSearchCustomers(res));
    }
  }

  handleSearchCustomers(resp: SearchResult) {
    const {entries} = resp;
    this.directory = entries;
  }

  select(customer: any): void {
    const numeroClient = customer.NumeroDossier;
    const codeBudget = customer.CodeBudget;
    const codePostal = customer.CodePostal;
    const nomClient = `${customer.Prenom ? customer.Prenom + ' ' : ''}${customer.Nom}`;
    this.result.emit({numeroClient: numeroClient, codeBudget: codeBudget, codePostal: codePostal, nomClient: nomClient});
  }

  triggerCreate(): void {
    this.result.emit(false);
  }

  ngOnDestroy(): void {
    this.customer = {};
    this.customerQuery = '';
    this.directory = [];
  }

}
