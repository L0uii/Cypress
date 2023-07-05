import { cloneDeep } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateResultsService } from 'services/update-results.service';
import { DeleteDocumentService } from './delete-document.service';
import * as Sentry from "@sentry/angular-ivy";

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent implements OnInit {
  documentsId: string;
  deleteDone = false;
  success: boolean;
  failed: boolean;
  documentsToBeDeleted: any[];

  constructor(
    private router: Router,
    private deleteDocumentService: DeleteDocumentService,
    private updateService: UpdateResultsService) {
  }

  ngOnInit() {
    this.documentsId = this.deleteDocumentService.documentsToBeDeleted
      .map(document => document.id)
      .join(',');

    this.documentsToBeDeleted = this.deleteDocumentService.documentsToBeDeleted
      .map(d => {
        return {
          ...d,
          Nommage: d.NommageGerance ?? d.Nommage
        }
      });
  }

  close() {
    this.router.navigate([{ outlets: { view: null } }]);
  }

  deleteDocument() {
    this.deleteDone = true;

    this.deleteDocumentService.removeDocuments(this.documentsId).subscribe({
      next: () => this.successRequestTasks(this.documentsId),
      error: () => this.failRequestTasks()
    })
  }

  private successRequestTasks(documents: string): void {
    this.success = true;
    Sentry.captureMessage(`document removed: ${documents}`, 'log');
    setTimeout(() => {
      this.updateService.triggerRefreshChange(true);
      this.close();
    }, 2000);
  }

  private failRequestTasks(): void {
    this.failed = true;
    setTimeout(() => {
      this.close();
    }, 3000);
  }

}
