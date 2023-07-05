import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SelectedCustomerComponent } from './selected-customer.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  declarations: [
    SelectedCustomerComponent
  ],
  exports: [
    SelectedCustomerComponent
  ]
})
export class SelectedCustomerModule { }
