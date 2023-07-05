import { distinctUntilChanged, filter, debounceTime, tap } from 'rxjs/operators';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UserService} from 'services/user.service';

@Component({
  selector: 'app-search-file-sofiral',
  templateUrl: './search-file-sofiral.component.html',
  styleUrls: ['./search-file-sofiral.component.scss']
})
export class SearchFileSofiralComponent implements OnInit, OnDestroy {
  @Output() resultNumber: EventEmitter<any> = new EventEmitter();
  @Output() resultString: EventEmitter<any> = new EventEmitter();
  @Output() clearCustomerEvent: EventEmitter<any> = new EventEmitter();
  @Input() context: string;
  @Input() pager;
  @Input() sameCustomer;
  @Input() events: Observable<void>;
  @Input() customerFile: string;
  customerQuery = new UntypedFormControl('', [Validators.required]);

  private eventsSubscription: Subscription;
  private keyUpSubscription: Subscription;

  // Répertoire clients
  directory = [];
  codeBudgets = [];
  pending = false;
  noResults = false;
  someResults = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  searchQuery(query: string) {
    const isNumber = !isNaN(+query);
    isNumber ? this.resultNumber.emit(query) :
      this.resultString.emit(query.toUpperCase());
  }

  destroyCustomer() {
    this.customerQuery.setValue('', { emitEvent: false });
    this.directory = [];
    this.pending = false;
    this.noResults = false;
    this.someResults = false;
  }

  clearCustomer() {
    this.clearCustomerEvent.emit();
  }

  ngOnInit() {
    this.codeBudgets = this.userService.codeBudgets;
    this.route.params.subscribe(params => {
      const { userId } = params;

      if (userId?.length === 8) {
        this.customerQuery.setValue(userId);
      }
    });

    if (this.events) {
      this.eventsSubscription = this.events.subscribe(() => this.destroyCustomer());
    }

    this.keyUpSubscription = this.customerQuery.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(input => {
          if(!input) this.clearCustomer();
        }),
        filter(input => input?.length > 2),
        debounceTime(500)
      ).subscribe((query) => this.searchQuery(query));
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
}
