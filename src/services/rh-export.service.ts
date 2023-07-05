import { endpoints } from 'endpoints/endpoints';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ResultNode } from '@alfresco/js-api';
import { FetchDataSearchParams, FetchDataService } from './fetch-data.service';
import { UtilsService } from './utils.service';

interface RhExportResponse {
  numFound: number,
  start: number,
  docs: RhExportResponseDoc[]
}

 interface RhExportResponseDoc {
  societe: string,
  application: string,
  label: string,
  famille: string,
  sousFamille: string,
  branche: string
}

@Injectable({
  providedIn: 'root'
})
export class RhExportService {

  constructor(
    private http: HttpClient,
    private fetchDataService: FetchDataService,
    private utilsService: UtilsService
  ) { }

  exportDocuments(): Observable<any> {
    const body = {
      "type_export": "Perte Marche DAP",
      "email_export_requester": "test.email@fiducial.net",
      "service_requesting_export": "RH",
      "document_set": [
        {
          "type": "Type",
          "search": "fiducial:domainContainerBranche:MR and =firme:codeBudget:'13520'",
          "file_naming": "Name of the file",
          "result_grouped_by": "fp:matricule",
          "required_metadata": [
            { "metadata": "fp:matricule" },
            { "metadata": "fp:codeBudget" },
            { "metadata": "fp:codeClient" }
          ]
        },
        {
          "type": "Type",
          "search": "fiducial:domainContainerBranche:MR and =firme:codeBudget:'13520'",
          "file_naming": "Name of the file",
          "result_grouped_by": "fp:matricule",
          "required_metadata": [
            { "metadata": "fp:matricule" },
            { "metadata": "fp:codeBudget" },
            { "metadata": "fp:codeClient" }
          ]
        }
      ]
    }

    const options = {
      headers: {
        apikey: '3B8QoLclFAoIuiQBjQGV9H0mM9s208te'
      }
    }

    return this.http.post<RhExportResponse>(endpoints.frontGEDGetExportEnMasse, body, options);
  }

  getRhExportListeDeMarcheFormation(): Observable<string[]> {
    return this.getRhExportList('Liste_perte_de_marche_Formation', this.resultsTypeDocumentsMapper, 'RH-EXPORT.perteDeMarcheFormationlist');
  }

  getRhExportListeDeMarcheFormationDAP(): Observable<string[]> {
    return this.getRhExportList('Liste_perte_de_marche_DAP', this.resultsTypeDocumentsMapper, 'RH-EXPORT.perteDeMarcheFormationDAPlist');
  }

  getRhExportList(metadata: string, func: (entry: ResultNode) => any, storageListName: string): Observable<any[]> {
    if (localStorage.getItem(storageListName)) {
      return of(this.utilsService.loadAndDecompress(storageListName));
    }

    const params: FetchDataSearchParams = {
      query: `SITE:'liste' and fiducial:domainContainerSociete:${metadata}`,
      facets: [{field: 'created'}],
      maxItems: 400,
      resultsMapper: func,
    };

    return this.fetchDataService.makeSearch(params)
      .pipe(
        map((resp) => resp.entries),
        tap((list: any[]) =>
          this.utilsService.compressAndSave(storageListName, list)))
  }

  private resultsTypeDocumentsMapper(entry: ResultNode): Object {
    const {properties} = entry;

    return {
      label: properties['liste:label'],
      branche: properties['liste:branche'],
      societe: properties['liste:societe'],
      application: properties['liste:application'],
      famille: properties['liste:famille'],
      sousFamille: properties['liste:sousFamille'],
      option: properties['liste:option'] === 'Non' ? false : true,
    };
  }
}
