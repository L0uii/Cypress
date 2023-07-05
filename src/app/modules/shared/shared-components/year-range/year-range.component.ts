import { EventEmitter } from '@angular/core';
import { LabelValue } from 'models/archives-presidence';
import { UtilsService } from 'services/utils.service';
import { UntypedFormGroup, UntypedFormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-year-range',
  templateUrl: './year-range.component.html',
  styleUrls: ['./year-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: YearRangeComponent,
      multi: true,
    }
  ]
})
export class YearRangeComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;

  @Output() onSearch = new EventEmitter();

  yearForm: UntypedFormGroup;
  years: LabelValue[];

  constructor(
    private utilsService: UtilsService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.years = this.utilsService
      .createArrayOfNumbers(15, new Date().getFullYear() - 2)
      .map((y) => {
        return { label: y, value: y };
      });
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(dateRange: string): void {
    let minYear = '',
      maxYear = '';
    if (dateRange) {
      const range = dateRange.split('-');
      (minYear = range[0]), (maxYear = range[1]);
    }
    this.yearForm.setValue({ minYear, maxYear });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    this.yearForm = this.formBuilder.group({
      minYear: '',
      maxYear: '',
    });
  }

  onSelectionChange(minYear: string, maxYear: string) {
    this.onChange(`${ minYear ? minYear : 0 }-${ maxYear ? maxYear : 0 }`);
    this.onSearch.emit();
  }

  onClear() {
    this.yearForm.setValue(
      {
        minYear: '',
        maxYear: '',
      },
      { emitEvent: false }
    );
    this.onChange();
    this.onSearch.emit();
  }
}
