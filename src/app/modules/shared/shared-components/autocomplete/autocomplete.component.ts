import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {UtilsService} from 'services/utils.service';
import {ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface ValueLabelItem {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit {

  constructor(private inj: Injector, private utils: UtilsService) {
    this.inputControlChanges();
  }

  @ViewChild('autocomplete')
  autocomplete: ElementRef;

  @ViewChild(MatAutocompleteTrigger)
  trigger: MatAutocompleteTrigger;

  @Input()
  placeHolder: string;

  @Input()
  list: string[];

  @Input()
  valueLabelList: ValueLabelItem[];

  @Input()
  isRequired: boolean;

  @Input()
  isInvalid: boolean;

  @Input()
  allowFreeText: boolean = false;

  @Input()
  autoActiveFirstOption: boolean = false;

  @Input()
  isDescending: boolean = false;

  @Input()
  displayValueOnSelect: boolean = false;

  @Input()
  blurOnClear: boolean = true;

  @Output()
  onSearch = new EventEmitter();

  @Output()
  onBlur = new EventEmitter();

  inputControl = new UntypedFormControl('');
  private ngControl: NgControl;
  private selectedValue: string;

  manageableList: ValueLabelItem[] = [];
  private destroy$ = new Subject();

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list?.currentValue) {
      this.list.sort((a, b) => this.utils.sortStrings(a, b, this.isDescending));
      this.manageableList = this.list.map(l => {
        return {
          value: l,
          label: l
        }
      });
      return;
    }

    if (changes.valueLabelList?.currentValue) {
      this.valueLabelList.sort((a, b) => this.utils.sortStrings(a.label, b.label, this.isDescending));
      this.manageableList = this.valueLabelList.slice();
    }
  }

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
    this.ngControl.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: 'VALID' | 'INVALID') => {
        const error = status === 'INVALID' ? {incorrect: true} : null;
        this.inputControl.setErrors(error, {emitEvent: false});
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string): void {
    let newValue = value ?? '';

    if (this.valueLabelList && !this.displayValueOnSelect) {
      newValue = this.getLabelFromValue(value);
    }

    if (!newValue) {
      this.resetList();
    }

    this.selectedValue = newValue;
    this.inputControl.setValue(newValue, {emitEvent: false});
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getValue(value: string): void {
    if (this.allowFreeText) {
      this.selectedValue = value;
      return;
    }

    this.selectedValue = this.manageableList.find(m => m.value === value)?.label ?? '';
  }

  clear(event: PointerEvent): void {
    if (this.blurOnClear) {
      setTimeout(() => this.autocomplete.nativeElement.blur(), 0);
    }
    event.preventDefault();
    this.inputControl.setValue('', {emitEvent: false});
    this.selectedValue = '';
    this.resetList();
  }

  setValue(value: string): void {
    this.inputControl.setValue(value, {emitEvent: false});
    let controlValue = value;
    if (this.valueLabelList) {
      controlValue = this.valueLabelList.find(obj => obj.label === value)?.value
    }

    if (this.ngControl.value != controlValue) {
      this.onChange(controlValue);
      this.onSearch.emit();
    }
  }

  resetList(): void {
    if (this.list) {
      this.manageableList = this.list.map(l => {
        return {
          label: l,
          value: l
        }
      });
      return;
    }

    this.manageableList = this.valueLabelList?.slice() ?? [];
  }

  onClose() {
    if (this.manageableList.length > 0) {
      this.setValue(this.selectedValue);
    }
  }

  private getLabelFromValue(value: string): string {
    return this.valueLabelList.find(obj => obj.value === value)?.label;
  }

  private inputControlChanges(): void {
    this.inputControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(inputValue => {
        if (!inputValue) {
          this.resetList();
          this.setValue('');
          return;
        }
        this.selectedValue = '';
        const inputValueLowerCase = inputValue.toLowerCase();

        const record = this.manageableList.find(item => item.value.toLowerCase() === inputValueLowerCase);
        if (!!record) {
          this.selectedValue = inputValue;
        }

        if (this.list) {
          this.manageableList = this.list.filter(item => item.toLowerCase().includes(inputValueLowerCase))
            .map(m => {
              return {
                label: m,
                value: m
              }
            });
          if (this.manageableList.length === 0 && this.allowFreeText) {
            this.selectedValue = inputValue;
          }
          return;
        }

        this.manageableList = this.valueLabelList.filter(item =>
          item.label.toLowerCase().includes(inputValueLowerCase) ||
          item.value.toLowerCase().includes(inputValueLowerCase)
        );
      });
  }
}
