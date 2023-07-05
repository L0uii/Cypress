import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selected-customer',
  templateUrl: './selected-customer.component.html',
  styleUrls: ['./selected-customer.component.scss'],
})
export class SelectedCustomerComponent {
  
  @Input()
  numeroDossier: string;

  @Input()
  nomDossier: string;

  @Input()
  codeBudget: string;

  @Output()
  isClearCustomer = new EventEmitter();

  clearCustomer() {
    this.isClearCustomer.emit(true);
  }
}
