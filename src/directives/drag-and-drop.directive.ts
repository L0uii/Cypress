import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import { of } from 'rxjs';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @HostBinding('style.background') private background = '#eee';
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();
  @Input() private allowed_extensions: Array<string> = [];
  @Input() private maxSizeMb: number = 20;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public async onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    await this.verifyFiles(evt.dataTransfer.files);
  }

  @HostListener('change', ['$event'])
  public async onChange(evt) {
    this.background = '#eee';
    await this.verifyFiles(evt.target.files);
  }

  private async verifyFiles(files: FileList): Promise<void> {
    const valid_files: Array<File> = [];
    const invalid_files: Array<File> = [];

    for (const file of Array.from(files)) {
      const canReachFile = await this.canReachFile(file);
      if (!file.size || !canReachFile) {
        invalid_files.push(file);
        break;
      }
      const ext = file.name.split('.').pop();
      const sizeMb = file.size / (1024 * 1024);
      if (!this.allowed_extensions.includes(ext) || sizeMb > this.maxSizeMb) {
        invalid_files.push(file);
      } else {
        valid_files.push(file);
      }
    }

    this.filesChangeEmiter.emit(valid_files);
    this.filesInvalidEmiter.emit(invalid_files);
  }

  async canReachFile(file: File): Promise<boolean> {
    const path = URL.createObjectURL(file);
    let isValid = true;
    await this.httpClient
      .get(path, { observe: 'response', responseType: 'blob' })
      .pipe(
        catchError(() => {
          isValid = false;
          return of(null);
        })
      ).toPromise();
    return isValid;
  }
}
