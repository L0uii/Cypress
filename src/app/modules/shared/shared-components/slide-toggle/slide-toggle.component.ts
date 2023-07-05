import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SlideToggleComponent,
      multi: true,
    },
  ],
})
export class SlideToggleComponent implements ControlValueAccessor {
  @Input() labelPosition: 'before' | 'after' = 'before';
  @Input() label: string;

  control = new UntypedFormControl(false);

  onChange: any = () => {};
  onTouch: any = () => {};

  onToggleChange(value: MatSlideToggleChange) {
    this.onChange(value.checked);
  }

  writeValue(obj: any): void {
    this.control.patchValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
      return;
    }
    this.control.enable();
  }
}
