import { endpoints } from './../endpoints/endpoints';
import { SnackbarService } from './snackbar.service';
import { FetchDataService } from 'services/fetch-data.service';
import { ClassementGeranceAssocie, CommonGeranceAssocie } from './../models/gerance-associes';
import {AuthenticationService, NodesApiService} from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';
import * as moment from 'moment';
import {FormBase} from '../models/form';
import {environment} from '../environments/environment';
import {CLASSEMENT_GERANCEASSOCIES, COMMON_GERANCEASSOCIES} from '../models/gerance-associes';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ListMetaDatasClassementGeranceAssocies} from '../models/classement-gerance-partenaires';
import {HttpClient} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Produit } from 'models/produit';
import * as Sentry from "@sentry/angular-ivy";
import { CustomerDocumentPropertiesGerance } from 'models/customer-document-properties';

@Injectable({
  providedIn: 'root'
})
export class GeranceAssociesService {

  basicAuth = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);
  extensions = [
    'pdf',
    'PDF',
    'docx',
    'DOCX',
    'xlsx',
    'XLSX',
    'doc',
    'DOC',
    'xls',
    'XLS',
    'eml',
    'EML',
    'xml',
    'XML',
    'jpg',
    'JPG',
    'jpeg',
    'JPEG',
    'png',
    'PNG',
    'ods',
    'ODS',
    'odt',
    'ODT',
    'odp',
    'ODP'
  ];
  aspects = 'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:gerance:associesPartenaires,P:firme:docFirme';
  metadatas = CLASSEMENT_GERANCEASSOCIES
    .map(el => el.listeMetadatas)
    .reduce((acc: any, val: any) => acc.concat(val), [])
    .map(el => el.metadata)
    .filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
  defaultMetadatas = COMMON_GERANCEASSOCIES.map(c => ({...c}));
  private readonly initialDocType = 'associe';
  private documentTypeToEmit$: BehaviorSubject<string> = new BehaviorSubject<string>(this.initialDocType);
  private agentDataToEmit$: BehaviorSubject<{nom: string, code: string}> = new BehaviorSubject<{nom: string, code: string}>(null);
  private managerDataToEmit$: BehaviorSubject<{nom: string, code: string}> = new BehaviorSubject<{nom: string, code: string}>(null);

  private fetchedProduitList: Produit[] = [];

  constructor(
    private utils: UtilsService,
    private nodesApi: NodesApiService,
    private auth: AuthenticationService,
    private http: HttpClient,
    private fetchDataService: FetchDataService,
    private snack: SnackbarService
  ) {

  }

  getExtensions() {
    return this.extensions;
  }

  getAspects() {
    return this.aspects;
  }

  get documentType(): Observable<string> {
    return this.documentTypeToEmit$.asObservable();
  }

  get agentData(): Observable<{nom: string, code: string}> {
    return this.agentDataToEmit$.asObservable();
  }

  get managerData(): Observable<{nom: string, code: string}> {
    return this.managerDataToEmit$.asObservable();
  }

  setAgentData(nom: string, code: string): void {
    this.agentDataToEmit$.next({nom, code});
  }

  setManagerData(nom: string, code: string): void {
    this.managerDataToEmit$.next({nom, code});
  }

  toFormGroup(inputs: Array<ListMetaDatasClassementGeranceAssocies>) {
    const form: FormBase<string>[] = inputs.map(input => {
      return new FormBase({
        label: input.label,
        metadata: input.metadata,
        name: input.name,
        obligatoire: input.obligatoire,
        type: input.type,
        options: input.options,
        controlType: input.type,
        order: input.order
      });
    });
    return form.sort((a, b) => a.order - b.order);
  }

  getPropertiesFormDocument(nodeId: string): Observable<CustomerDocumentPropertiesGerance> {
    return this.nodesApi.getNode(nodeId).pipe(map(resp => {
      const document = {id: nodeId, title: resp.name};
      const documentProperties = {};
      const customerProperties = {
        nomAssocie: resp.properties['gerance:nomAssocie'],
        numeroAssocie: resp.properties['gerance:numeroAssocie'],
        codeBudget: resp.properties['firme:codeBudget']
      };
      const properties = resp.properties;
      this.metadatas.forEach(el => {
        if (properties[el]) {
          documentProperties[el] = properties[el];
        }
      });
      this.defaultMetadatas.forEach(el => {
        if (properties[el.metadata]) {
          documentProperties[el.metadata] = properties[el.metadata];
        }
      });
      return {documentProperties, document, customerProperties};
    }));
  }

  generateDocumentProperties(form, fileName: string) {
    if (form.codeClient === '000000') {
      form.atraiter = 'oui';
    }
    if (typeof form.atraiter === 'boolean') {
      if (form.atraiter === true) {
        form.atraiter = 'non';
      } else {
        form.atraiter = 'oui';
      }
    }
    const now = this.utils.getDateNow();
    return JSON.stringify({
      'cmis:name': encodeURI(fileName),
      'cm:title': encodeURI(fileName.split('.')[0]),
      'cm:author': this.auth.getEcmUsername(),
      'cm:isContentIndexed': true,
      'fp:nommage': form.documentType ? `${now} - ${form.documentType}` : null,
      'fiducial:domainContainerBranche': form.domainContainerBranche,
      'fiducial:domainContainerSociete': form.domainContainerSociete ? form.domainContainerSociete : null,
      'fiducial:domainContainerApplication': form.domainContainerApplication || null,
      'fiducial:domainContainerFamille': form.domainContainerFamille ? form.domainContainerFamille : null,
      'fiducial:domainContainerSousFamille': form.domainContainerSousFamille ? form.domainContainerSousFamille : null,
      'gerance:sousDossier': form.sousDossiers ? form.sousDossiers : null,
      'fp:dateDocument': form.dateDocument ? moment(form.dateDocument).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'gerance:dateValidite': form.dateValidite ? moment(form.dateValidite).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'gerance:categorieProduit': form.categorieProduit ? form.categorieProduit : null,
      'gerance:produit': form.produit ? form.produit : null,
      'gerance:numeroAssocie': form.numeroAssocie ? form.numeroAssocie : null,
      'gerance:nomAssocie': form.nomAssocie ? form.nomAssocie.toUpperCase() : null,
      'gerance:codeManager': form.codeManager ? form.codeManager : null,
      'gerance:nomManager': form.nomManager ? form.nomManager.toUpperCase() : null,
      'gerance:codeAgent': form.codeAgent ? form.codeAgent : null,
      'gerance:nomAgent': form.nomAgent ? form.nomAgent.toUpperCase() : null,
      'gerance:contact': form.contact ? form.contact.toUpperCase() : null,
      'gerance:atraiter': form.atraiter,
      'cm:description': form.description ? form.description : '',
      'firme:codeClient': form.codeClient ? form.codeClient : null,
      'firme:matriculeCollab': form.matriculeCollab ? form.matriculeCollab : ['000000'],
      'firme:codeBudget': form.codeBudget ? form.codeBudget : ['11640'],
      'gerance:typeDossierAssocie' : form.domainContainerSousFamille ? this.getTypeDossierAssocie(form.domainContainerSousFamille): null,
      'gerance:statutDocumentAssocie': form.statutDocumentAssocie!='' ? (form.statutDocumentAssocie ='Projet' ? form.statutDocumentAssocie : form.statutDocumentAssocie+' - '+ this.auth.getEcmUsername()): null
    });
  }
  getTypeDossierAssocie(sousFamille : string, classements?: ClassementGeranceAssocie[]): string {
    const typeDossierAssocie = (classements ?? CLASSEMENT_GERANCEASSOCIES).filter(x => x.sousFamille == sousFamille);
    return typeDossierAssocie[0]?.listeMetadatas.filter(x=> x.name == 'typeDossierAssocie')[0]?.value;
  }

  updateDocumentType(documentType: string) {
    this.documentTypeToEmit$.next(documentType);
  }

  async priseEnCharge(id: string, fullName: string): Promise<any> {
    return await fetch(endpoints.frontGEDUpdateAllDocument, {
      method: 'PUT',
      headers: new Headers({
        uuid: id,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: 'P:gerance:associesPartenaires',
        'Document-Properties': `{"gerance:attributionCollaborateurAssocie":"${fullName}"}`,
        updateContent: 'false'
      })
    })
    .then(resp => resp.text())
    .then(() => Sentry.captureMessage(`document updated: ${id}`, 'log'));
  }

  clearContext() {
    this.documentTypeToEmit$.next(this.initialDocType);
    this.managerDataToEmit$.next(null)
    this.agentDataToEmit$.next(null);
  }

  getFullProduitList(): Observable<Produit[]> {
    return this.fetchedProduitList.length > 0
      ? of(this.fetchedProduitList)
      : this.fetchDataService.getClassementProduitGerance().pipe(
          map((r: any) => r.entries),
          tap((r) => this.fetchedProduitList = r),
          catchError(() => {
            this.snack.openError(`Nous n'avons pas pu récupérer la liste des produits. Veuillez actualiser la page et réessayer.`);
            return of([]);
          })
        );
  }

  getProductList(prodList: Produit[], categorie?: string): string[] {
    return prodList
      .filter((p) =>
        categorie
          ? this.utils.containSearchTerm(p.labelCategorie, categorie)
          : true
      )
      .map((el) => el.labelProduit)
      .sort((a, b) => this.utils.sortStrings(a, b));
  }

  getProductCategoryList(prodList: Produit[], produit?: string): string[] {
    return [
      ...new Set(
        prodList
          .filter((p) =>
            produit
              ? this.utils.containSearchTerm(p.labelProduit, produit)
              : true
          )
          .map((el) => el.labelCategorie)
          .sort((a, b) => this.utils.sortStrings(a, b))
      ),
    ];
  }
}
