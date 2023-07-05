import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from "services/snackbar.service";
import { DownloadService } from "services/download.service";
import { FetchDataService } from "services/fetch-data.service";
import { UtilsService } from "services/utils.service";
import { SearchService } from '@alfresco/adf-core';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SearchService,
    FetchDataService,
    UtilsService,
    SnackbarService,
    DownloadService,
  ]
})
export class ServicesModule { }
