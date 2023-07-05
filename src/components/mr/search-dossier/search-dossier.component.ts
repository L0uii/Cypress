import { UtilsService } from 'services/utils.service';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription, timer} from 'rxjs';
import {UserService} from 'services/user.service';
import {CustomerExpertise} from '../../../models/customer-expertise';
import {UntypedFormControl, Validators} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-dossier',
  templateUrl: './search-dossier.component.html',
  styleUrls: ['./search-dossier.component.scss']
})
export class SearchDossierComponent implements OnInit, OnDestroy, OnChanges {
  @Output() result: EventEmitter<CustomerExpertise> = new EventEmitter();
  @Output() clearCustomerEvent: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();

  @Input() context: string;
  @Input() pager;
  @Input() sameCustomer;
  @Input() events: Observable<void>;
  @Input() customerSearchPending: boolean;
  @Input() dossierList: CustomerExpertise[] = [];
  filteredList: CustomerExpertise[] = [];
  customerQuery = new UntypedFormControl('', [Validators.required]);
  codeBudgets: string[] = [];
  noResults = false;
  someResults = false;
  selectedCustomer: CustomerExpertise;
  hasRcuError = false;

  private eventsSubscription: Subscription;
  private keyUpSubscription: Subscription;
  private selectedCodeBudget: string;

  constructor(private _userService: UserService,
    private _searchDossierService: SearchDossierExpertiseService,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.dossierList) {
      this.search();
    }
  }

  ngOnInit() {
    this._activatedRoute.params
      .pipe(
        map(params => {
          const firstParam = params['firstParam']?.toString();
          const numeroDossier = params['numeroDossier']?.toString();

          if (firstParam?.length === 8) {
            this.customerQuery.patchValue(firstParam, { emitEvent: false });
          } else if (numeroDossier?.length === 8) {
            this.customerQuery.patchValue(numeroDossier, { emitEvent: false });
          } else {
            this.destroyCustomer();
            return false;
          }
          return true;
        }),
        filter((withParams) => withParams),
        switchMap(() => timer(0))
      ).subscribe(() => this.search());

    this.selectedCodeBudget = this._userService.selectedCodeBudget;
    this.codeBudgets = this._userService.codeBudgets;
    this.hasRcuError = this._searchDossierService.hasRcuErrorOnExpertiseSearch(this.selectedCodeBudget);
    this._userService.selectedCodeBudgetRef
      .pipe(
        filter(cb => cb !== this.selectedCodeBudget),
        tap(cb => {
          this.selectedCodeBudget = cb;
          this.hasRcuError = this._searchDossierService.hasRcuErrorOnExpertiseSearch(cb);
        })
      ).subscribe(() => this.search());

    this.keyUpSubscription = this.customerQuery.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(input => !!input && input.length > 2)
      ).subscribe(() => this.search());

    if (this.events) {
      this.eventsSubscription = this.events.subscribe(() => this.destroyCustomer());
    }
  }

  ngOnDestroy() {
    this.destroyCustomer();
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    if (this.keyUpSubscription) {
      this.keyUpSubscription.unsubscribe();
    }
  }

  onFocus() {
    if (this.selectedCustomer) {
      this.clearCustomer();
    }
  }

  search(): void {
    if (!this.customerQuery.value) {
      this.destroyCustomer();
      return;
    }
    this.searchDossier();
  }

  searchDossier(): void {
    let searchQuery = this._utilsService.formatURL(this.customerQuery.value?.trim());
    const isNumber = !isNaN(+searchQuery);
    if (!isNumber) {
      searchQuery = searchQuery.toUpperCase();
    }

    this.filteredList = this.dossierList
      .filter(el => isNumber ?
        el.numeroDossier.startsWith(searchQuery) :
        el.nomDossier.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 30);
    this.noResults = this.filteredList.length === 0;
    if (this.filteredList.length === 1) {
      this.select(this.filteredList[0]);
    }
  }

  newSearch() {
    this.destroyCustomer();
    this.resetSearch.emit();
  }

  destroyCustomer() {
    this.customerQuery.setValue('');
    this.selectedCustomer = null;
    this.filteredList = [];
    this.customerSearchPending = false;
    this.noResults = false;
    this.someResults = false;
  }

  clearCustomer() {
    this.destroyCustomer();
    this.clearCustomerEvent.emit();
  }

  select(customer: CustomerExpertise) {
    this.selectedCustomer = customer;
    this.result.emit(this.selectedCustomer);
    if (this.context === 'consultation') {
      this.customerQuery.patchValue(customer.nomDossier, { emitEvent: false });
    } else if (this.context === 'exportation') {
      this.customerQuery.patchValue(`${customer.numeroDossier} - ${customer.nomDossier}`);
    }
    this.someResults = true;
    this.customerSearchPending = false;
  }
}
