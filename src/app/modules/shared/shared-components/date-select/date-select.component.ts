import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UtilsService } from 'services/utils.service';
import { AbstractControl, ControlValueAccessor, UntypedFormBuilder, UntypedFormGroup, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
  selector: "app-date-select",
  templateUrl: "./date-select.component.html",
  styleUrls: ["./date-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateSelectComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DateSelectComponent,
      multi: true,
    },
  ],
})
export class DateSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private defaultMinYear = 1900;
  private defaultMaxYear = 2035;
  private monthsWith30Days = [4, 6, 9, 11];
  private isLeapYear = false;

  @Input() label: string;
  @Input() minYear: number = this.defaultMinYear;
  @Input() maxYear: number = this.defaultMaxYear;
  @Input() isYearDescending: boolean = true;

  @Output() onSearch = new EventEmitter();

  days: string[] = [];
  months: string[] = [];
  years: string[] = [];

  dateForm: UntypedFormGroup;

  ngUnsubscribe$ = new Subject<null>();

  ngControl: NgControl;

  constructor(
    private injector: Injector,
    private formBuilder: UntypedFormBuilder,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      day: [''],
      month: [''],
      year: ['']
    }, { validators: this.dateValidator() });

    if (this.minYear > this.maxYear) {
      this.minYear = this.defaultMinYear;
      this.maxYear = this.defaultMaxYear;
    }

    this.ngControl = this.injector.get(NgControl);

    this.years = this.utilsService.createArrayOfNumbers(
      this.maxYear - this.minYear + 1,
      this.minYear
    );
    this.months = this.utilsService.createArrayOfNumbers(12);
    this.days = this.utilsService.createArrayOfNumbers(31);

    this.dayControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$), distinctUntilChanged())
      .subscribe(d => this.onDayChange(d));
    this.monthControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$), distinctUntilChanged())
      .subscribe(m => this.onMonthChange(m));
    this.yearControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$), distinctUntilChanged())
      .subscribe(y => this.onYearChange(y));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(obj: string): void {
    if (obj) {
      const dateParts = this.utilsService.getDateParts(obj);
      this.dateForm.setValue({
        day: dateParts[2],
        month: dateParts[1],
        year: dateParts[0]
      }, { emitEvent: false });
    } else if (!this.utilsService.isEmpty(this.dateForm.value)) {
      this.clear();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  validate(): ValidationErrors | null {
    if (this.dateForm?.invalid) {
      return { invalid: true };
    } else {
      return null;
    }
  }

  onYearChange(newYear: string) {
    if (newYear) {
      if (+this.monthControl.value === 2) {
        this.isLeapYear = this.checkLeapYear(+newYear);
        this.createDaysArray(this.isLeapYear ? 29 : 28);
      }
    }
    setTimeout(() => this.changesHandler())
  }

  onMonthChange(newMonth: string): void {
    let daysInMonth = 31;
    if (newMonth) {
      if (+newMonth === 2) {
        daysInMonth = this.isLeapYear || !this.yearControl.value ? 29 : 28;
      } else if (this.monthsWith30Days.includes(+newMonth)) {
        daysInMonth = 30;
      }
    }
    this.createDaysArray(daysInMonth);
    setTimeout(() => this.changesHandler())
  }

  onDayChange(newDay: string): void {
    setTimeout(() => this.changesHandler())
  }

  clear(emitOnSearch?: boolean): void {
    this.clearForm();
    this.onChange('');
    if (emitOnSearch) {
      this.onSearch.emit();
    }
  }

  private changesHandler() {
    const { day, month, year } = this.dateForm.value;
    this.onChange(this.formatDate());
    if (!this.utilsService.getMissingPartOfDate(year, month, day)) {
      this.onSearch.emit();
    }
  }

  private clearForm() {
    this.days = this.utilsService.createArrayOfNumbers(31);
    this.dateForm.patchValue({
      day: '',
      month: '',
      year: ''
    }, { emitEvent: false });
  }

  private formatDate(): string {
    const { day, month, year } = this.dateForm.value;
    return `${!!year ? year : 0}-${!!month ? month : 0}-${!!day ? day: 0}`;
  }

  private checkLeapYear(year: number): boolean {
    return year % 4 == 0 && (year % 100 !== 0 || year % 400 == 0);
  }

  private createDaysArray(daysInMonth: number) {
    if (this.dayControl.value > daysInMonth) {
      this.dayControl.patchValue('', { emitEvent: false });
    }
    if (this.days.length != daysInMonth) {
      this.days = this.utilsService.createArrayOfNumbers(daysInMonth);
    }
  }

  private dateValidator(): (formGroup: UntypedFormGroup) => ValidationErrors {
    return (formGroup: UntypedFormGroup): ValidationErrors => {
      const { day, month, year } = formGroup?.value;

      const missingPart = this.utilsService.getMissingPartOfDate(year, month, day);
      if (missingPart) {
        const error = { invalidDate: true };
        missingPart.split('_').forEach(m => formGroup.get(m).setErrors(error));
        return error;
      }
      formGroup.get('month').setErrors(null);
      formGroup.get('year').setErrors(null);
      return null;
    }
  }

  private get dayControl(): AbstractControl {
    return this.dateForm.get('day');
  }

  private get monthControl(): AbstractControl {
    return this.dateForm.get('month');
  }

  private get yearControl(): AbstractControl {
    return this.dateForm.get('year');
  }
}
