import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './alert-message.component';
import { AlertMessageService } from './alert-message.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    AlertMessageComponent
  ],
  providers: [
    AlertMessageService
  ]
})
export class AlertMessageModule { }
