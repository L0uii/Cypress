import { SnackbarService } from './../../../../../services/snackbar.service';
import { UtilsService } from './../../../../../services/utils.service';
import { Component, Output, ViewChild, ElementRef, OnChanges, SimpleChanges, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnChanges, OnInit {

  @Input()
  resetValue: boolean;

  @Input()
  fileList: File[] = [];

  @Input()
  invalidList: File[] = [];

  @Input()
  extensions = ['pdf'];

  @Input()
  maxSizeMbEach = 20;

  @Input()
  maxCount = 130;

  @Input()
  maxSizeMbTotal = 90;

  @Output()
  onFilesChange = new EventEmitter<File[]>();

  @Output()
  onFilesInvalid = new EventEmitter<File[]>();

  @Output()
  removeFile = new EventEmitter<File>();

  @Output()
  isValid = new EventEmitter<boolean>();

  @ViewChild('fileUploaded', { static: true })
  fileUploaded: ElementRef;

  invalidFiles: File[] = [];
  extensionsText: string;
  isUploadValid: boolean;

  constructor(public utils: UtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resetValue?.currentValue) {
      this.resetList();
    }

    if (changes.fileList?.currentValue?.length || changes.invalidList?.currentValue?.length) {
      this.emitIsValidHandler(this.fileList, this.invalidFiles);
    }
  }

  ngOnInit(): void {
    this.extensionsText = this.extensions.map(extension => '.' + extension).join(', ');
  }

  filesChange(validFileList: File[]): void {
    this.onFilesChange.emit(validFileList);
    this.emitIsValidHandler(this.fileList, this.invalidFiles);
  }

  filesInvalidChange(invalidFilesList: File[]): void {
    this.invalidFiles = invalidFilesList;
    this.onFilesInvalid.emit(invalidFilesList);
    this.emitIsValidHandler(this.fileList, this.invalidFiles);
  }

  removeFileChange(file: File, filesType: 'invalid' | 'valid'): void {
    this.utils.remove(file, filesType === 'invalid' ? this.invalidFiles : this.fileList);
    this.removeFile.emit(file);
    this.emitIsValidHandler(this.fileList, this.invalidFiles);
  }

  private resetList(): void {
    this.fileUploaded.nativeElement.value = null;
    this.fileList = [];
    this.emitIsValid(false);
  }

  private emitIsValidHandler(validFileList: File[], invalidFileList: File[]): void {
    if (!this.verifyFilesLimits(validFileList)) {
      this.emitIsValid(false);
      return;
    }

    if (invalidFileList.length) {
      this.emitIsValid(false);
      return;
    }

    if (validFileList.length) {
      this.emitIsValid(true);
      return;
    }

    this.emitIsValid(false);
  }

  private emitIsValid(isValid: boolean): void {
    this.isValid.emit(isValid);
    this.isUploadValid = isValid;
  }

  private convertToMb(sizeInBytes: number) {
    return sizeInBytes / (1024 * 1024);
  }

  private verifyFilesLimits(validFileList: File[]): boolean {
    if (validFileList.length > this.maxCount) {
      return false;
    }

    const combinedSize = validFileList.reduce((acc, cur) => acc + cur.size, 0);
    if (this.convertToMb(combinedSize) > this.maxSizeMbTotal) {
      return false;
    }

    return true;
  }

}
