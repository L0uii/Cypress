import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-return-button',
  templateUrl: './nav-return-button.component.html'
})
export class NavReturnButtonComponent {
  @Output() onClick = new EventEmitter();
}
