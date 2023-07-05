import { UpdateDocumentResponse, UpdateDocumentService } from 'services/update-document.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilePropertiesGeranceAssocies } from 'models/file-properties-gerance-associes';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-gerance-associes',
  templateUrl: './dialog-gerance-associes.component.html',
  styleUrls: ['./dialog-gerance-associes.component.scss']
})
export class DialogGeranceAssociesComponent {

  isSaving: boolean = false;
  failList: Array<UpdateDocumentResponse> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogGeranceAssociesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<FilePropertiesGeranceAssocies>,
    private updateDocumentService: UpdateDocumentService,
  ) {
    dialogRef.backdropClick()
      .pipe(take(1))
      .subscribe(() => this.closeDialog(this.failList.length > 0))
  }

  closeDialog(isConfirmation: boolean = false): void {
    if (isConfirmation) {
      this.updateDocumentService.refreshDocumentList();
    }
    this.dialogRef.close(isConfirmation);
  }

  updateDocuments() {
    this.isSaving = true;

    Promise.all(this.data.map(async item => await this.updateDocumentService.updateATraiter(item.id, item.NommageGerance)))
      .then(res => {
        this.isSaving = false;
        this.failList = res.filter(r => r.status === 'fail');
        if (this.failList.length === 0) {
          this.closeDialog(true);
          return;
        }
      })
      .catch((err) => this.isSaving = false);
  }
}
