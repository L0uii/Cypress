import { takeUntil } from 'rxjs/operators';
import { LabelValue } from 'models/archives-presidence';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    }
  ],
})
export class DropdownComponent implements ControlValueAccessor, OnDestroy {
  @Input() label: string;
  @Input() optionList: LabelValue[];
  @Input() hasCloseButton: boolean = true;
  @Input() displayValueOnSelection: boolean = false;

  @Output() onSelectionChange = new EventEmitter();

  control = new UntypedFormControl();

  onChange: any = () => {};
  onTouch: any = () => {};

  ngUnsubscribe$ = new Subject();

  constructor() {
    this.control.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(newValue => {
        this.onChange(newValue);
        this.onSelectionChange.emit(newValue);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  writeValue(value: string): void {
    this.control.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  clear() {
    this.control.setValue('');
  }
}
