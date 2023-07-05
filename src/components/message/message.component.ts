import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  message: string;
  replacedChars: string[];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { updatedMessage: string, replacedCharacters: string[] }) {
    this.message = data.updatedMessage;
    this.replacedChars = data.replacedCharacters;
  }
}
