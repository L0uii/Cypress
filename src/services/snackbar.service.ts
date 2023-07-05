import {Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import { SnackType } from 'models/snack-type';
import { Subject } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbarSubject$ = new Subject<{message: string, snackType: string}>();

  constructor(private snackBar: MatSnackBar) {
    this._snackbarSubject$
      .pipe(bufferTime(300))
      .subscribe((queued) => {
        const groupedByType = queued.reduce((acc, cur) => {
          const currentType = acc.find(a => a.snackType === cur.snackType)
          const { message, snackType } = cur;
          if (currentType) {
            currentType.message += `<br />${message}`;
          } else {
            acc.push({message, snackType})
          }
          return acc;
        }, [])

        groupedByType.forEach((g, index) => {
          const duration = 5000;
          setTimeout(
            () => this.showSnackBar(g.message, g.snackType, duration),
            index * duration
          )
        })
      })
  }

  openSuccess = (message: string) => this.openSnackBar(message, 'Success');
  openError = (message: string) => this.openSnackBar(message, 'Error');
  openInfo = (message: string) => this.openSnackBar(message, 'Info');
  openWarn = (message: string) => this.openSnackBar(message, 'Warn');

  openActionSnackBar(
    message: string,
    actionLabel: string,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(
      message,
      actionLabel,
      {
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      }
    )
  }

  private openSnackBar(message: string, snackType: string) {
    this._snackbarSubject$.next({
      message,
      snackType
    })
  }

  private showSnackBar(message: string, snackType: SnackType, duration: number): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: { message, snackType }
    });
  }
}
