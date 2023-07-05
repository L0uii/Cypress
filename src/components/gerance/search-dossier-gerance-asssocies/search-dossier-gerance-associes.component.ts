import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EMPTY, Observable, of, Subscription, timer} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormControl, Validators} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {UtilsService} from '../../../services/utils.service';
import {CustomerGeranceAssocies} from 'models/customer-gerance-associes';
import {SearchDossierGeranceService} from 'services/search-dossier-gerance.service';

@Component({
  selector: 'app-search-dossier-gerance-associes',
  templateUrl: './search-dossier-gerance-associes.component.html',
  styleUrls: ['./search-dossier-gerance-associes.component.scss']
})
export class SearchDossierGeranceAssociesComponent implements OnInit, OnDestroy {
  @Output() result: EventEmitter<any> = new EventEmitter();
  @Output() clearCustomerEvent: EventEmitter<any> = new EventEmitter();
  @Output() resetSearch: EventEmitter<any> = new EventEmitter();
  @Input() context: string;
  @Input() pager;
  @Input() sameCustomer;
  @Input() searchQueryInput: string;
  @Input() events: Observable<void>;
  @Input() customerSearchPending: boolean;

  customerQuery = new UntypedFormControl('', [Validators.required]);
  directory: CustomerGeranceAssocies[] = [];
  codeBudgets = [];
  pending = false;
  noResults = false;
  someResults = false;
  hasRcuError = false;
  selectedCustomer: CustomerGeranceAssocies;
  private eventsSubscription: Subscription;
  private keyUpSubscription: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private searchDossierGeranceService: SearchDossierGeranceService
  ) {
  }

  ngOnInit() {
    this.codeBudgets = this.userService.codeBudgets;

    this.route.params
      .pipe(
        map(params => {
          if (params.userId) {
            this.customerQuery.patchValue(params.userId, {emitEvent: false});
          } else {
            this.destroyCustomer();
            return false;
          }
          return true;
        }),
        filter((withParams) => withParams),
        switchMap(() => timer(0)),
        switchMap(() => this.search(this.customerQuery.value))
      )
      .subscribe();
    this.keyUpSubscription = this.customerQuery.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(input => !!input && input.length > 2),
      switchMap((c) => this.search(c)))
      .subscribe();
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

  search(customerQuery: string): Observable<any> {
    if (!customerQuery) {
      this.destroyCustomer();
      return EMPTY;
    } else {
      return this.searchDossier(customerQuery);
    }
  }

  searchDossier(customerQuery: string): Observable<any> {
    const searchQuery = this.utilsService.formatURL(customerQuery);

    this.pending = true;
    this.customerSearchPending = true;
    return this.searchDossierGeranceService.searchDossier(searchQuery)
      .pipe(
        tap(res => {
          this.directory = res;
          this.noResults = res.length === 0;
          if (this.directory.length === 1) {
            this.select(this.directory[0]);
          }
        }),
        catchError((err) => {
          this.destroyCustomer();
          return of([]);
        }),
        finalize(() => {
          this.hasRcuError = this.searchDossierGeranceService.hasRcuErrorOnSearch;
          this.customerSearchPending = false;
          this.pending = false;
        }));
  }

  destroyCustomer() {
    this.customerQuery.patchValue('');
    this.selectedCustomer = null;
    this.directory = [];
    this.pending = false;
    this.customerSearchPending = false;
    this.noResults = false;
    this.someResults = false;
  }

  clearCustomer() {
    this.destroyCustomer();
    this.clearCustomerEvent.emit();
  }

  select(customer: CustomerGeranceAssocies) {
    this.selectedCustomer = customer;
    this.result.emit(customer);
    if (this.context === 'consultation') {
      this.customerQuery.patchValue(customer.nomAssocie, {emitEvent: false});
    } else if (this.context === 'exportation') {
      this.customerQuery.patchValue(`${customer.numeroAssocie} - ${customer.nomAssocie}`);
    }
    this.someResults = true;
    this.customerSearchPending = false;
  }
}
