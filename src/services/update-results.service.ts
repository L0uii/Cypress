import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateResultsService {

  mustRefresh: boolean;
  mustRefreshChange: Subject<boolean> = new Subject<boolean>();
  baseSearchTabId: number;
  refreshDocumentList = new Subject<number>();
  refreshDocumentList$ = this.refreshDocumentList.asObservable();

  constructor() {
    this.mustRefreshChange.subscribe((value) => {
      this.mustRefresh = value;
    });
  }

  triggerRefreshChange(value: boolean): void {
    this.mustRefreshChange.next(value);
  }
}
