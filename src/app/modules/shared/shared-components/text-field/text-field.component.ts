import { AbstractControl } from '@angular/forms';
import { AbstractControlDirective, ControlContainer, NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Host, OnDestroy, Optional, SkipSelf, Injector, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @Input() placeholder: string;
  @Input() hintText: string;

  @Output() onSearch = new EventEmitter();

  control = new UntypedFormControl();

  onChange: any = () => {};
  onTouch: any = () => {};

  ngUnsubscribe$ = new Subject();
  isRequired: boolean;

  constructor(private injector: Injector) {
    this.control.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((newValue) => {
        this.onChange(newValue);
        if (!newValue) {
          this.onSearch.emit();
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const ngControl: NgControl = this.injector.get(NgControl, null)
      this.isRequired = !!ngControl.control.validator?.length;
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

  clear(): void {
    this.control.setValue('');
    this.onSearch.emit();
  }
}
