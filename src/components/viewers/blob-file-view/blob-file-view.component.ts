import { EventEmitter, ViewEncapsulation } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'app-blob-file-view',
  templateUrl: './blob-file-view.component.html',
  styleUrls: ['./blob-file-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BlobFileViewComponent implements OnChanges {

  @Input() blobFileList: File[];

  @Output() onViewerClosed = new EventEmitter();

  blobFile: File;
  displayName: string;

  allowNavigate: boolean;
  canNavigateBefore: boolean;
  canNavigateNext: boolean;

  private selectedFileIndex: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.blobFileList?.length) {
      return;
    }
    this.allowNavigate = this.blobFileList.length > 1;
    this.navigationHandler(0);
  }

  onNavigateBefore() {
    this.navigationHandler(this.selectedFileIndex - 1);
  }

  onNavigateNext() {
    this.navigationHandler(this.selectedFileIndex + 1);

  }

  onShowViewerChange(isOpen: boolean) {
    if (!isOpen) {
      this.onViewerClosed.emit();
    }
  }

  private navigationHandler(newIndex: number) {
    this.selectedFileIndex = newIndex;
    this.blobFile = this.blobFileList[this.selectedFileIndex];
    this.displayName = this.blobFile.name;
    if (this.allowNavigate) {
      this.canNavigateBefore = newIndex > 0;
      this.canNavigateNext = newIndex < this.blobFileList.length - 1;
    }
  }
}
