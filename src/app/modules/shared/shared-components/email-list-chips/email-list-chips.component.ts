import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Component, ElementRef, forwardRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './../../../../../services/utils.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';

interface SelectedItem {
  valid: boolean,
  value: string
}

@Component({
  selector: 'app-email-list-chips',
  templateUrl: './email-list-chips.component.html',
  styleUrls: ['./email-list-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailListChipsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: EmailListChipsComponent,
      multi: true
    }
  ]
})
export class EmailListChipsComponent implements ControlValueAccessor, OnChanges, OnDestroy {

  @ViewChild(MatAutocompleteTrigger)
  autocomplete: MatAutocompleteTrigger;

  @ViewChild('input')
  input: ElementRef<HTMLInputElement>;

  @Input()
  placeHolder: string;

  @Input()
  maxSelection = 100;

  @Input()
  isRequired = false;

  @Input()
  list: string[];

  inputControl = new UntypedFormControl('');

  onChange: any = () => { };
  onTouched: any = () => { };

  selectedList: SelectedItem[] = [];
  mailCopieInvalid = false;
  manageableList: string[];
  destroy$ = new Subject();

  separatorKeysCodes: number[] = [SPACE, COMMA, ENTER];

  constructor(private utils: UtilsService) {
    this.inputControlChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list?.currentValue) {
      this.list.sort(this.utils.sortStrings);
      this.manageableList = this.list;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  validate() : {[key: string]: any} | null {
    const thereAreAnyInvalidEmail = this.selectedList.some(item => !item.valid);

    if (this.selectedList && (thereAreAnyInvalidEmail)) {
      this.mailCopieInvalid = true;
      return { 'emailInvalid': true };
    }

    if (!this.selectedList?.length && this.isRequired) {
      return { 'emailInvalid': true };
    }

    this.mailCopieInvalid = false;
    return null;
  }

  writeValue(selectedItems: SelectedItem[]): void {
    if (selectedItems) {
      this.onChange(selectedItems.map(item => item.value).join(';'));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  clear(): void {
    this.inputControl.setValue('', { emitEvent: false });
    if (this.input) {
      this.input.nativeElement.value = '';
    }
  }

  selectOption(value: string): void {
    if (this.selectedList.length <= this.maxSelection) {
      this.manageableList = this.getListWithoutSelectedList().filter(item => !item.toLowerCase().includes(value.toLowerCase()));
      this.selectedList.push({ value: value, valid: true });
      this.writeValue(this.selectedList);
      this.clear();
    }
  }

  remove(value: string): void {
    if (value) {
      this.selectedList = this.selectedList.filter(selectedItem => selectedItem.value !== value);
      this.manageableList = this.getListWithoutSelectedList();
      this.writeValue(this.selectedList);
    }
  }

  resetList(): void {
    this.manageableList = [...this.getListWithoutSelectedList()];
  }

  add(event: MatChipInputEvent) {
    if (!this.autocomplete.panelOpen) {
      const { input, value } = event;

      if (value?.trim() && !this.selectedList.some(s => s.value.toLowerCase() === value.trim().toLowerCase())) {
        this.selectedList.push({value: value.trim(), valid: this.utils.validateEmail(value)});
        this.writeValue(this.selectedList);
      }

      if (input) {
        input.value = '';
      }

      if (this.inputControl) {
        this.inputControl.setValue('', { emitEvent: false });
      }
    }
  }

  setValue(value: string): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  private getListWithoutSelectedList(): string[] {
    return this.list.filter(item => !this.selectedList.some(selectedItem => selectedItem.value === item));
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

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    event.clipboardData
      .getData("Text")
      .split(/\s+|,/)
      .map((e) => {
        return {
          value: e,
          valid: this.utils.validateEmail(e),
        };
      })
      .filter(e => e.valid)
      .filter(e => !this.selectedList.some(s => s.value.toLowerCase() === e.value.toLowerCase()))
      .forEach(e => this.selectOption(e.value));
  }
}
