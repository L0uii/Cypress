import { Form, UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from "rxjs/operators";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
  styleUrls: ['./send-mail-dialog.component.scss']
})
export class SendMailDialogComponent implements OnDestroy {
  form: UntypedFormGroup;
  totalSizeSelected: number = 0;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<SendMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { maxSizeMb: number, files: Array<{ id: string, name: string, size: number }> },
    private formBuilder: UntypedFormBuilder
  ) {
    this.buildForm();

    this.totalSizeSelected = this.files.map(f => f.size).reduce((prev, cur) => prev + cur);

    this.filesFormArray.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        const checked = res.filter(r => r.checked);
        this.totalSizeSelected = checked.length === 0 ? 0 : checked.map(r => r.size).reduce((prev, cur) => prev + cur);
      });
  }

  get filesFormArray(): UntypedFormArray { return this.form.controls['files'] as UntypedFormArray; }

  get files(): Array<{ id: string, name: string, size: number }> { return this.data.files };
  get maxSizeMb(): number { return this.data.maxSizeMb };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendMail() {
    this.dialogRef.close(this.filesFormArray.value.filter(r => r.checked).map(f => f.id))
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([])
    });

    this.files.forEach(
      f => {
        this.filesFormArray.push(this.formBuilder.group({
          id: [f.id],
          name: [f.name],
          size: [f.size],
          checked: [true]
        }));
      }
    );
  }
}
