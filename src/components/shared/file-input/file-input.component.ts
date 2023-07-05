import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SnackbarService } from 'services/snackbar.service';
import { UtilsService } from 'services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})

export class FileInputComponent implements OnInit {
  @Output() syncData = new EventEmitter();
  @Input() extensions: Array<string> = [];
  @Input() showMetadataOptions: boolean;

  extensionsLabel: Array<string> = [];
  showFiles = true;
  showForm = false;
  disabled = false;
  showLists = false;
  fileList: any = [];
  invalidFiles: any = [];
  sameCustomer = true;
  sameMetadata = false;

  constructor(
    private snack: SnackbarService,
    private utils: UtilsService,
    private router: Router) { }


  onFilesChange(fileList: Array<File>) {
    this.fileList = fileList;
    this.showLists = true;
  }

  sameCustomerChanges(sameCustomer: boolean): void {
    if (!sameCustomer) {
      this.sameMetadata = false;
    }
  }

  onFilesInvalid(invalidFiles: Array<File>) {
    this.invalidFiles = invalidFiles;
    this.showLists = true;
  }

  nextStep() {
    this.fileList.length > 0 ?
      this.syncData.emit({ files: this.fileList, sameMetadata: this.fileList.length === 1 ? true : this.sameMetadata,
        sameCustomer: this.fileList.length === 1 ? true : this.sameCustomer }) :
      this.snack.openInfo('Vous devez ajouter au moins un document');
  }

  ngOnInit() {
    this.extensionsLabel = this.extensions.map(item => item.toLowerCase()).filter((a, b) => this.extensions.indexOf(a) === b);
  }
}
