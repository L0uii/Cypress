import { SnackbarService } from 'services/snackbar.service';
import { MatDialog } from "@angular/material/dialog";
import { MailService } from "services/mail.service";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SendMailDialogComponent } from "../send-mail-dialog/send-mail-dialog.component";

@Component({
  selector: "app-send-mail-button",
  templateUrl: "./send-mail-button.component.html",
  styleUrls: ["./send-mail-button.component.scss"],
})
export class SendMailButtonComponent {
  @Input() files: any;
  @Input() space: string;

  @Output() mailSent = new EventEmitter();

  isLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private mail: MailService,
    private snack: SnackbarService
  ) {}

  onClick() {
    const maxSizeMb = 30;
    const combinedFilesSize =
      this.files.map((f) => f.SizeInBytes).reduce((prev, curr) => prev + curr) /
      (1024 * 1024);

    if (combinedFilesSize > maxSizeMb) {
      const dialogRef = this.dialog.open(SendMailDialogComponent, {
        data: {
          maxSizeMb,
          files: this.files.map((f) => ({
            name: f.Nommage ?? f.NommageGerance,
            size: f.SizeInBytes,
            id: f.id,
          })),
        },
      });

      dialogRef.afterClosed().subscribe((ids: Array<string>) => {
        if (ids && ids.length > 0) {
          this.sendMail(this.files.filter((f) => ids.includes(f.id)));
        }
      });
      return;
    }

    this.sendMail(this.files);
  }

  private sendMail(files) {
    this.isLoading = true;
    this.mail
      .send(files, this.space)
      .then((res) => {
        this.isLoading = false;
        if (!!res) {
          this.mailSent.emit();
        }
      })
      .catch(() => {
        this.isLoading = false;
        this.snack.openError(`Une erreur s'est produite. L'envoi des documents par mail a échoué. Veuillez réessayer ultérieurement. Merci pour votre compréhension.`);
      });
  }
}
