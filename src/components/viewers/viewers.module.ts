import { BlobFileViewComponent } from './blob-file-view/blob-file-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewerMultiPdfComponent} from './viewer-multi-pdf/viewer-multi-pdf.component';
import {FileViewComponent} from './file-view/file-view.component';
import {ViewerDocxComponent} from './viewer-docx/viewer-docx.component';
import {ViewerPdfComponent} from './viewer-pdf/viewer-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContentModule } from '@alfresco/adf-content-services';
import { CoreModule } from '@alfresco/adf-core';

const viewers = [
  FileViewComponent,
  ViewerMultiPdfComponent,
  ViewerPdfComponent,
  ViewerDocxComponent,
  BlobFileViewComponent
]

@NgModule({
  imports: [
    CommonModule,
    PdfViewerModule,
    CoreModule.forChild(),
    ContentModule.forChild(),
  ],
  declarations: viewers,
  exports: viewers
})
export class ViewersModule { }
