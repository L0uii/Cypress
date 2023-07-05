import { UtilsService } from 'services/utils.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MetadataDocumentPure, MetadataDocumentTreated} from 'models/metadata';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {convertMetadata} from 'utils/helper';
import { endpoints } from 'endpoints/endpoints';


@Injectable({
  providedIn: 'root'
})
export class DeleteDocumentService {

  documentsToBeDeleted = [];

  constructor(
    private utils: UtilsService,
    private httpClient: HttpClient,
  ) {
  }

  removeDocuments(documents: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'uuid': documents,
        'ticket': this.utils.getHeaderTicket(),
      })
    };

    return this.httpClient.delete(endpoints.frontGEDDeleteDocuments, options);
  }

  getDocumentsName(documents: string): Observable<MetadataDocumentTreated[]> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'uuids': documents,
        'ticket': this.utils.getHeaderTicket(),
      })
    };

    return this.httpClient.get(endpoints.frontGEDGetMetadatas, options).pipe(
      map((metadatas: MetadataDocumentPure[]) =>
        metadatas.map((metadata) => convertMetadata(metadata) as MetadataDocumentTreated))
    );
  }

  resetDocuments(): void {
    this.documentsToBeDeleted = [];
  }
}
