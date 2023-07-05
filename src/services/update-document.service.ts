import { endpoints } from './../endpoints/endpoints';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'services/user.service';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
import {UpdateResultsService} from './update-results.service';
import {UtilsService} from './utils.service';
import {GeranceAssociesService} from './gerance-associes.service';
import * as Sentry from "@sentry/angular-ivy";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDocumentService {
  successList = [];
  failList = [];

  constructor(
    private auth: AuthenticationService,
    private updateService: UpdateResultsService,
    private utils: UtilsService,
    private geranceAssociesService: GeranceAssociesService,
    private http: HttpClient
  ) {
  }

  refreshDocumentList(): void {
    this.updateService.refreshDocumentList.next(this.updateService.baseSearchTabId);
  }

  update(uuid: string, documentProperties: string): Observable<any> {
    const options = {
      headers: {
        uuid,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: 'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl',
        'Document-Properties': documentProperties,
        updateContent: '0'
      },
      responseType: 'text' as 'json'
    }

    return this.http.put(endpoints.frontGEDUpdateAllDocument, {}, options)
      .pipe(tap(resp => Sentry.captureMessage(`document updated: ${uuid}`, 'log')));
  }

  async updateATraiter(id: string, title: string): Promise<UpdateDocumentResponse> {
    return await fetch(endpoints.frontGEDUpdateAllDocument, {
      method: 'PUT',
      headers: new Headers({
        uuid: id,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: 'P:gerance:associesPartenaires',
        'Document-Properties': '{"gerance:atraiter":"non"}',
        updateContent: 'false'
      })
    })
    .then(resp => resp.text())
    .then(resp => Sentry.captureMessage(`document updated: ${id}`, 'log'))
    .then((response) => this.updateResponseHandler(response, id, title))
  }

  async updateProjOK(id: string, title: string): Promise<UpdateDocumentResponse> {
    const toggleOK = '{"gerance:statutDocumentAssocie":"OK - '+ this.auth.getEcmUsername()+'"}';
    return await fetch(endpoints.frontGEDUpdateAllDocument, {
      method: 'PUT',
      headers: new Headers({
        uuid: id,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: 'P:gerance:associesPartenaires',
        'Document-Properties': toggleOK,
        updateContent: 'false'
      })
    })
    .then(resp => resp.text())
    .then(resp => Sentry.captureMessage(`document updated: ${id}`, 'log'))
    .then((response) => this.updateResponseHandler(response, id, title));
  }

  private updateResponseHandler(response: string, id: string, title: string) {
    if (response.split(';')[0] === id) {
      return {
        status: 'success',
        title: title
      };
    } else {
      const resp = JSON.parse(response);
      const erreur = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
      return {status: 'fail', title: title, error: erreur};
    }
  }
}

export interface UpdateDocumentResponse {
  status: string,
  title: string,
  error?: any
}
