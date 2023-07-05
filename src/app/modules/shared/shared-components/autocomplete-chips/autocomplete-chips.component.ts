import { UtilsService } from './../../../../../services/utils.service';
import { AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: ['./autocomplete-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteChipsComponent),
      multi: true
    }
  ]
})
export class AutocompleteChipsComponent implements ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit {

  @ViewChild(MatAutocompleteTrigger)
  autocomplete: MatAutocompleteTrigger;

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  @Input()
  hintText: string;

  @Input()
  placeHolder: string;

  @Input()
  disabled: boolean;

  @Input()
  list: string[];

  @Input()
  maxSelection = 100;

  @Input()
  disableChip: boolean;

  @Input()
  isRequired: boolean;

  @Input()
  isInvalid: boolean;

  inputControl = new UntypedFormControl('');
  ngControl: NgControl;

  onChange: any = () => { };
  onTouched: any = () => { };

  manageableList: string[];
  selectedList: string[] = [];
  destroy$ = new Subject();

  constructor(private inj: Injector, private utils: UtilsService) {
    this.inputControlChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list?.currentValue) {
      this.manageableList = this.list;
    }
  }

  ngAfterViewInit(): void {
    this.ngControl = this.inj.get(NgControl);
    this.ngControl.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: 'VALID' | 'INVALID') =>
        status === 'VALID' ? this.inputControl.setErrors(null, { emitEvent: false }) : this.inputControl.setErrors({ incorrect: true }, { emitEvent: false })
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string[]): void {
    if (value) {
      this.selectedList = value;
      this.manageableList = this.getListWithoutSelectedList();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectOption(value: string): void {
    if (this.selectedList.length <= this.maxSelection) {
      this.manageableList = this.getListWithoutSelectedList();
      this.selectedList.push(value);
      this.onChange(this.selectedList);
      this.clear();
    }
  }

  openAutocomplete(): void {
    this.autocomplete.openPanel();
  }

  clear(): void {
    this.inputControl.setValue('', { emitEvent: false });
    this.input.nativeElement.value = '';

    this.resetList();
    this.setValue('');
  }

  remove(item: string): void {
    if (item) {
      this.selectedList = this.selectedList.filter(selectedItem => selectedItem !== item);
      this.manageableList = this.getListWithoutSelectedList();
      this.onChange(this.selectedList);
    }
  }

  setValue(value: string): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  resetList(): void {
    this.manageableList = [...this.getListWithoutSelectedList()];
  }

  private getListWithoutSelectedList(): string[] {
    return this.list.filter(item => !this.selectedList.some(selectedItem => selectedItem === item));
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

      this.manageableList = this.getListWithoutSelectedList().filter(item => item.toLowerCase().includes(inputValue.toLowerCase()));
    });
  }
}
