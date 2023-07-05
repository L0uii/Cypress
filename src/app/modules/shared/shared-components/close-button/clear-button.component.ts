import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html'
})
export class ClearButtonComponent {
  @Output() onClear = new EventEmitter();
}
