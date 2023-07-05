import { EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LabelValue } from 'models/archives-presidence';
import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {
  UntypedFormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true,
    },
  ],
})
export class RadioGroupComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() optionsLabelValue: LabelValue[];
  @Input() optionsList: string[];
  @Input() label: string;
  @Input() orientation: 'row' | 'column' = 'row';

  @Output() onSearch = new EventEmitter();

  control = new UntypedFormControl('');

  onChange: any = () => {};
  onTouch: any = () => {};

  ngUnsubscribe$ = new Subject();

  writeValue(value: any): void {
    this.control.patchValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  ngOnInit(): void {
    if (this.optionsList) {
      this.optionsLabelValue = this.optionsList.map(o => {
        return { label: o, value: o };
      })
    }

    this.control.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((c) => {
        this.onChange(c);
        this.onSearch.emit();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
