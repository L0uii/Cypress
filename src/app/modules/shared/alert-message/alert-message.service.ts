import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AlertMessageComponent } from './alert-message.component';

export interface AlertData {
  message: string;
}

@Injectable()
export class AlertMessageService {

  constructor(private dialog: MatDialog) {}

  public openAlertMessage(config: MatDialogConfig<AlertData>): MatDialogRef<AlertMessageComponent> {
    return this.dialog.open(AlertMessageComponent, config)
  }
}
