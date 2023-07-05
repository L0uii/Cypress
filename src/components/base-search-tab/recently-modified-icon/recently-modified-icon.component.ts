import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recently-modified-icon',
  templateUrl: './recently-modified-icon.component.html',
  styleUrls: ['./recently-modified-icon.component.scss'],
})
export class RecentlyModifiedIconComponent implements OnChanges {

  @Input()
  lastModification: string;

  isRecentlyModified: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.isRecentlyModified = this.isRecentlyModifiedCalc(changes.lastModification.currentValue);
  }

  private isRecentlyModifiedCalc(modifiedAt: string): boolean {
    const now = new Date().getTime();

    return ((now - new Date(modifiedAt).getTime()) / 60000) < 1;
  }
}
