import { endpoints } from './../endpoints/endpoints';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {
  CLASSEMENT,
  ConseilClassments,
  ConseilContrat,
  ConseilMetaData,
  DirectionRegionale,
  DossierConseil,
  MANDATORY_METADATAS,
} from 'models/conseil';
import {AuthenticationService, NodesApiService} from '@alfresco/adf-core';
import {UtilsService} from './utils.service';
import * as moment from 'moment';
import {FormBase} from 'models/form';
import {extensions} from 'consts/file-extensions';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConseilService {

  extensions: string[] = extensions;

  constructor(
    private utils: UtilsService,
    private nodesApi: NodesApiService,
    private auth: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient
  ) {  }

  aspects =
    'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:contact:contact,P:contrat:contrat,P:firme:docFirme,P:conseil:produit';
  metadatas: string[] = CLASSEMENT
    .map(el => el.listeMetadatas)
    .reduce((acc, val) => acc.concat(val), [])
    .map(el => el.metadata)
    .filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
  defaultMetadatas = MANDATORY_METADATAS;

  getExtensions(): string[] {
    return this.extensions;
  }

  getAspects(): string {
    return this.aspects;
  }

  generateDocumentProperties(form: any, fileName: string, update?: boolean): string {
    const now = this.utils.getDateNow();
    return JSON.stringify({
      'cmis:name': encodeURI(fileName),
      'cm:title': form.documentType ? form.documentType : null,
      'cm:author': update ? null : this.auth.getEcmUsername(),
      'cm:isContentIndexed': true,
      'fiducial:domainContainerBranche': 'Conseil',
      'fiducial:domainContainerSociete': form.codeBudget ? this.getDRFromCodeBudget(form.codeBudget) : null,
      'fiducial:domainContainerApplication': form.numeroClient ? form.numeroClient : null,
      'fiducial:domainContainerFamille': form.famille ? form.famille : null,
      'fiducial:domainContainerSousFamille': form.sousFamille ? form.sousFamille : null,
      'firme:codeBudget': form.codeBudget ? form.codeBudget : null,
      'firme:matriculeCollab': form.matriculeCollab ? form.matriculeCollab : ['000000'],
      'firme:codeClient': form.numeroClient ? form.numeroClient : null,
      'contrat:acheteur': form.nomClient ? form.nomClient.toUpperCase().trim() : null,
      'contact:cp': form.codePostal ? form.codePostal : null,
      'fp:nommage': form.documentType ? `${now} - ${form.documentType}` : null,
      'cm:description': form.description ? this.utils.removeSpecialCharacters(form.description) : null,
      'conseil:atraiter': form.aTraiter ? 'non' : 'oui',
      'conseil:SCPI': form.SCPI ? form.SCPI : null,
      'conseil:numero': form.numeroDossier ? form.numeroDossier : null,
      'conseil:produit': form.produit ? form.produit : null,
      'contrat:nature': form.nature ? form.nature : null,
      'contrat:numero': form.numeroContrat ? form.numeroContrat : null,
      'contrat:fournisseur': form.fournisseur ? form.fournisseur : null,
      'contrat:dateContrat': form.dateContrat ? moment(form.dateContrat).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'contrat:dateFinContrat': form.dateFinContrat ? moment(form.dateFinContrat).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateDocument': form.dateDocument ? moment(form.dateDocument).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'conseil:dateReception': form.dateReception ? moment(form.dateReception).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateSignature': form.dateSignature ? moment(form.dateSignature).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null
    });
  }

  getValidDR(): string {
    const codeBudgets = this.getCodeBudgets();

    return 'AND !fiducial:domainContainerSociete:DR_INCONNUE AND !firme:codeClient:00000000 AND conseil:atraiter:non AND '
      + `(${codeBudgets.map(cb => 'firme:codeBudget:' + cb).join(' OR ')})`;
  }

  getInvalidDR(): string {
    const codeBudgets = this.getCodeBudgets();
    return 'AND (fiducial:domainContainerSociete:DR_INCONNUE OR firme:codeClient:00000000 '
      + 'OR conseil:atraiter:oui OR '
      + `(${codeBudgets.map(cb => '!firme:codeBudget:' + cb).join(' AND ')}))`;
  }

  getDRFromCodeBudget(inputCodeBudget: string): string {
    const filter = this.getCachedDR().filter(el => el.codeBudget.includes(inputCodeBudget));
    return filter.length > 0 ? filter[0].societe : 'DR_INCONNUE';
  }

  getDRLabelFromCodeBudget(inputCodeBudget: string): string {
    const filter = this.getCachedDR().filter(el => el.codeBudget.includes(inputCodeBudget));
    return filter.length > 0 ? filter[0].label : 'DR Inconnue';
  }

  private getCodeBudgets() {
    const codeBudgets = [];
    this.getCachedDR()
      .forEach(doc => codeBudgets.push(...doc.codeBudget));
    return codeBudgets;
  }

  private getCodeBudgetFromDR(inputDR: string): Array<string> {
    const filter = this.getCachedDR().filter(el => el.societe.includes(inputDR));
    return filter.length > 0 ? filter[0].codeBudget : undefined;
  }

  getPropertiesFormDocument(nodeId: string): Observable<DossierConseil> {
    return this.nodesApi.getNode(nodeId)
      .pipe(
        map(res => {
          const { name, properties } = res;
          const document = { id: nodeId, title: name };
          const documentProperties = {
            'cm:description': '',
            'conseil:produit': '',
            'contrat:fournisseur': '',
            'contrat:nature': '',
            'fiducial:domainContainerFamille': '',
            'fiducial:domainContainerSousFamille': '',
            'firme:codeBudget': '',
            'firme:codeClient': '',
            'firme:matriculeCollab': '',
            'fp:nommage': '',
            id: '',
            title: ''
          };
          const customerProperties = {
            numeroClient: properties['firme:codeClient'],
            codeBudget: properties['firme:codeBudget'],
            nomClient: properties['contrat:acheteur'],
            codePostal: properties['contact:cp'],
          };

          const propertyKeys = [...this.metadatas, ...this.defaultMetadatas.map(el => el.metadata)];

          propertyKeys.map(key => {
            if (properties[key]) {
              documentProperties[key] = properties[key];
            }
          });
          return { documentProperties, document, customerProperties };
        })
      );
  }

  toFormGroup(inputs: ConseilMetaData[]): ConseilMetaData[] {
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
    const formated = form.filter((item) => item.name !== 'nature' && item.name !== 'fournisseur' && item.name !== 'produit');
    return formated.sort((a, b) => a.order - b.order);
  }

  filterContrat(value: string, classements: ConseilClassments): ConseilContrat[] {
    return classements.contrat
      .filter(el =>
        this.utils.removeAccents(el.nature).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
      .sort((a, b) => a.nature.localeCompare(b.nature, 'fr', {ignorePunctuation: true}));
  }

  filterDocumentType(key: string, value: string, classements: { documentType: any; }) {
    if (value) {
      return classements.documentType
        .filter(el =>
          this.utils.removeAccents(el[key]).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a[key].localeCompare(b[key], 'fr', {ignorePunctuation: true}));
    } else {
      return classements.documentType;
    }
  }

  initializeUpdateDocumentForm() {
    return this.formBuilder.group({
      matriculeCollab: ['000000'],
      documentType: ['', Validators.required],
      famille: [''],
      sousFamille: [''],
      partenaire: [''],
      categorie: [''],
      produit: [''],
      aTraiter: [true]
    });
  }

  initializeUploadForm() {
    return this.formBuilder.group({
      matriculeCollab: ['000000'],
      documentType: ['', Validators.required],
      famille: [''],
      sousFamille: [''],
      partenaire: [''],
      categorie: [''],
      produit: [''],
      aTraiter: [true]
    });
  }

  initializeCustomerForm() {
    return this.formBuilder.group({
      numeroClient: ['', Validators.maxLength(8)],
      nomClient: ['', Validators.required],
      codePostal: ['', [Validators.maxLength(5), Validators.minLength(5), Validators.required]],
      codeBudget: ['', [Validators.maxLength(5), Validators.minLength(5), Validators.required]],
      aTraiter: [true]
    });
  }

  getCachedDR(): DirectionRegionale[] {
    return this.utils.loadAndDecompress('GED.DRList')
      .map(d => {
        const { societe, label, codeBudget } = d;
        return {
          societe,
          label,
          codeBudget: codeBudget.split(';')
        };
      });
  }

  createCustomer(documentProperties: string): Observable<any> {
    const options = {
      headers: {
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        'Content-Type': 'application/octet-stream',
        aspects: 'P:fiducial:domainContainer,P:liste:Client,P:contact:contact,P:fp:mr',
        'Document-Properties': documentProperties,
        'siteNamePath': '/Sites/liste'
      },
      responseType: 'text' as 'json'
    };


    return this.http.post(endpoints.frontGEDCreateDocumentForSite, {}, options);
  }

  updateCustomer(uuid: string, documentProperties: string): Observable<any> {
    const options = {
      headers: {
        uuid,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        'Content-Type': 'application/octet-stream',
        aspects: 'P:fiducial:domainContainer,P:liste:Client,P:contact:contact,P:fp:mr',
        'Document-Properties': documentProperties,
        'siteNamePath': '/Sites/liste',
        updateContent: '0'
      },
      responseType: 'text' as 'json'
    }

    return this.http.put(endpoints.frontGEDUpdateDocumentForSite, {}, options);
  }
}
