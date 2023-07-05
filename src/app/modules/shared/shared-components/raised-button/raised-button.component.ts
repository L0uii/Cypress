import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html'
})
export class RaisedButtonComponent {
  @Input() label: string;
  @Input() suffixIcon: string;
  @Input() fullWidth: boolean = true;
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter();
}
