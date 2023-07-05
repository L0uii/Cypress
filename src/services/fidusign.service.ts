import { endpoints } from './../endpoints/endpoints';
import {GroupService} from './group.service';
import {AuthenticationService} from '@alfresco/adf-core';
import {ResultNode} from '@alfresco/js-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import LzString from 'lz-string';
import {Observable, of, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FetchDataService} from 'services/fetch-data.service';
import {FetchDataSearchParams} from './fetch-data.service';
import {SnackbarService} from './snackbar.service';
import {UpdateResultsService} from './update-results.service';
import {UtilsService} from './utils.service';
import {GroupsEnums} from 'enums/groups.enums';
import {LabelValue} from 'models/archives-presidence';
import {Moment} from 'moment/moment';
import * as Sentry from "@sentry/angular-ivy";

export interface FidusignSignataire {
  nom: string;
  prenom: string;
  email: string;
}

export interface FidusignSignataire {
  name: string;
  lastName: string;
  email: string;
}

export interface FidusignCategorie {
  name: string;
  libelle1: string;
  libelle2: string;
  libelle3: string;
}

export interface JuridiqueSignedForm {
  'fiducial:domainContainerBranche': string;
  'fiducial:domainContainerSociete': string;
  'fiducial:domainContainerApplication': string;
  'juridique:droitSocBrancheActivite': string;
  'cm:title': string;
  'fiducial:domainContainerFamille': string;
  'fiducial:domainContainerSousFamille': string;
  'juridique:droitSocNatureOperation': string;
  'juridique:droitSocNatureDocument'?: string;
  'juridique:droitSocDateOperation': string;
  'juridique:droitSocDatePriseEffet': string;
  'fiduSign:dateCertification': string;
}

export interface AchatSignedForm {
  'fiducial:domainContainerBranche': string;
  'fiducial:domainContainerSociete': string;
  'fiducial:domainContainerApplication': string;
  'contrat:acheteur': string;
  'contrat:fournisseur': string;
  'contrat:nature': string;
  'fiducial:domainContainerFamille': string;
  'fiducial:domainContainerSousFamille': string;
  'cm:name'?: string;
  'cm:title': string;
  'contrat:clientinterne': string;
  'contrat:dateContrat'?: string;
  'contrat:dateFinContrat'?: string;
  'contrat:reconduction': string;
  'cm:description': string;
  'contrat:resiliation'?: string;
  'fiduSign:dateCertification': string;
}


export interface YProximiteSignedForm {
  'cm:description': string;
  'cm:title': string;
  'cmis:name': string;
  'envoyerEnGed': string;
  'fiducial:domainContainerApplication': string;
  'fiducial:domainContainerBranche': string;
  'fiducial:domainContainerFamille': string;
  'fiducial:domainContainerSociete': string;
  'fiducial:domainContainerSousFamille': string;
  'yproximite:dateValiditeBonCommande': Moment;
  'yproximite:nomClient': string;
}

export interface FidusignForSigningForm {
  'cm:title': string;
  'cm:description': string;
  'fiduSign:origine': string;
  'fiduSign:prenomSignataire1': string;
  'fiduSign:nomSignataire1': string;
  'fiduSign:mailSignataire1': string;
  'fiduSign:telSignataire1': string;
  'fiduSign:prenomSignataire2'?: string;
  'fiduSign:nomSignataire2'?: string;
  'fiduSign:mailSignataire2'?: string;
  'fiduSign:telSignataire2'?: string;
  'fiduSign:prenomSignataire3'?: string;
  'fiduSign:nomSignataire3'?: string;
  'fiduSign:mailSignataire3'?: string;
  'fiduSign:telSignataire3'?: string;
  'fiduSign:prenomSignataire4'?: string;
  'fiduSign:nomSignataire4'?: string;
  'fiduSign:mailSignataire4'?: string;
  'fiduSign:telSignataire4'?: string;
  'fiduSign:nomEmetteur': string;
  'fiduSign:prenomEmetteur': string;
  'fiduSign:mailEmetteur': string;
  'fiduSign:callback': string;
  'fp:message': string;
}

export interface FidusignSubspaceData {
  name: 'achats' | 'juridique' | 'y-proximite';
  permission: 'rw' | 'ro' | 'rw_self';
  group: GroupsEnums;
}

export type FidusignGroupType = 'achat' | 'juridique' | 'proximite';

export interface FidusignRechercheAvanceeData {
  enveloppe: FidusignSearchFieldsData[];
  date?: FidusignSearchFieldsData[];
  signature: FidusignSearchFieldsData[];
}

export interface FidusignSearchFieldsData {
  name: string;
  description: string;
  metadatas: string[];
  inputType: 'autocomplete' | 'radio' | 'date' | 'year-range' | 'text' | 'dropdown';
  inputSubtype?: 'allow-text' | 'label-value';
  metadataOptions?: 'strict-search';
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FidusignService {
  disableUpdateEmail: boolean;
  disableUpdateEmailChange: Subject<boolean> = new Subject<boolean>();
  fileList: File[] = [];
  groupType: FidusignGroupType;
  useBuyerEntityValues = {
    achat: 'ACHAT',
    juridique: 'JURIDIQUEFIRME',
    proximite: 'YPROXIMITE'
  };
  aspectsValues = {
    achat: 'P:contrat:contrat',
    juridique: 'P:juridique:droitSociete',
    proximite: 'P:yproximite:bonCommande'
  };
  private textToPaste: string;

  constructor(
    private auth: AuthenticationService,
    private snack: SnackbarService,
    private updateService: UpdateResultsService,
    private fetchDataService: FetchDataService,
    private router: Router,
    private http: HttpClient,
    private utils: UtilsService,
    private groupService: GroupService
  ) {
    this.disableUpdateEmailChange.subscribe((value) => {
      this.disableUpdateEmail = value;
    });
    this.groupType = this.getGroupType();
  }

  get userSubspace(): FidusignSubspaceData {
    const permissions: FidusignSubspaceData[] = [
      {group: GroupsEnums.isUserFidusignJuridique, name: 'juridique', permission: 'rw'},
      {group: GroupsEnums.isUserFidusignJuridiqueConsult, name: 'juridique', permission: 'ro'},
      {group: GroupsEnums.isUserFidusignAchat, name: 'achats', permission: 'rw'},
      {group: GroupsEnums.isUserFidusignAchatAccesSpec, name: 'achats', permission: 'ro'},
      {group: GroupsEnums.isUserFidusignYProximite, name: 'y-proximite', permission: 'rw'},
      {group: GroupsEnums.isUserFidusignYProximiteCommercial, name: 'y-proximite', permission: 'rw_self'},
      {group: GroupsEnums.isUserFidusignYProximiteConsult, name: 'y-proximite', permission: 'ro'}
    ];

    for (const p of permissions) {
      if (this.groupService.isInGroups([p.group])) {
        return p;
      }
    }
    return null;
  }

  statutSignataireOptions: LabelValue[] = [
    {value: '*', label: 'Aucun'},
    {value: 'DOCUMENT_LU', label: 'Document lu'},
    {value: 'SIGNATURE_EC_*', label: 'Document en cours de signature'},
    {value: 'DOCUMENT_SIGNE', label: 'Document signé'},
    {value: `MAIL_ENVOYE' OR fiduSign:statut:'MAIL_SEND`, label: 'Mail envoyé'},
    {value: 'MAIL_RENVOYE', label: 'Mail renvoyé'},
    {value: 'DEMANDE_ANNULEE', label: 'Demande annulée'},
    {value: 'DEMANDE_EXPIREE', label: 'Demande expirée'}
  ];

  get commonRechercheAvanceeFields(): FidusignRechercheAvanceeData {
    return {
      enveloppe: [
        {
          name: 'intituleEnveloppe',
          description: `Intitulé de l'enveloppe`,
          metadatas: ['cm:description'],
          inputType: 'text'
        }
      ],
      signature: [
        {
          name: 'signataires',
          description: `Signataires`,
          metadatas: [
            'fiduSign:prenomSignataire1',
            'fiduSign:nomSignataire1',
            'fiduSign:prenomSignataire2',
            'fiduSign:nomSignataire2',
            'fiduSign:prenomSignataire3',
            'fiduSign:nomSignataire3',
            'fiduSign:prenomSignataire4',
            'fiduSign:nomSignataire4'
          ],
          inputType: 'text'
        },
        {
          name: 'dateSignatureInput',
          description: `Date de signature`,
          metadatas: ['fiduSign:dateCertification'],
          inputType: 'date'
        },
        {
          name: 'statutSignature',
          description: `Statut de la signature`,
          metadatas: ['fiduSign:statut'],
          inputType: 'dropdown',
          data: this.statutSignataireOptions
        }
      ]
    };
  }

  getBrancheActiviteList(): Observable<string[]> {
    return this.getFidusignList('Liste_juridique_branche_activite', this.resultsMapperName, 'FIDUSIGN.BrancheActiviteList');
  }

  getNatureOperationList(): Observable<string[]> {
    return this.getFidusignList('Liste_juridique_nature_operation', this.resultsMapperName, 'FIDUSIGN.NatureOperationList');
  }

  getNatureDocumentList(): Observable<string[]> {
    return this.getFidusignList('Liste_juridique_nature_document', this.resultsMapperName, 'FIDUSIGN.NatureDocumentList');
  }

  getSocieteSignataireList(): Observable<string[]> {
    return this.getFidusignList('Liste_achats_societe', this.resultsMapperName, 'FIDUSIGN.SocieteSignataireList');
  }

  getFournisseurList(): Observable<string[]> {
    return this.getFidusignList('Liste_achats_fournisseur', this.resultsMapperName, 'FIDUSIGN.FournisseurList');
  }

  getAcheteurList(): Observable<string[]> {
    return this.getFidusignList('Liste_achats_acheteurs', this.resultsMapperName, 'FIDUSIGN.AcheteurList');
  }

  getAchatNatureDuDocumentList(): Observable<string[]> {
    return this.getFidusignList('Liste_achats_nature_document', this.resultsMapperName, 'FIDUSIGN.AchatNatureDuDocumentList');
  }

  getCategorieList(): Observable<FidusignCategorie[]> {
    const resultMapper = (entry: ResultNode) => {
      const {properties, name} = entry;

      return {
        name: name,
        libelle1: properties['liste:libelle1'],
        libelle2: properties['liste:libelle2'],
        libelle3: properties['liste:libelle3']
      };
    };

    return this.getFidusignList('liste_achats_categorie', resultMapper, 'FIDUSIGN.Categorie');
  }

  getSignatairesJuridiqueFavorisList(): Observable<FidusignSignataire[]> {
    return this.getFidusignList('Liste_juridique_signataires_favoris', this.resultsMapperJuridiqueSignataire, 'FIDUSIGN.SignatairesJuridiqueFavorisLists');
  }

  getSignatairesAchatFavorisList(): Observable<FidusignSignataire[]> {
    return this.getFidusignList('Liste_achats_signataires_favoris', this.resultsMapperAchatSignataire, 'FIDUSIGN.SignatairesAchatFavorisList');
  }

  getEntiteJuridiqueList(): Observable<LabelValue[]> {
    const resultMapper = (entry: ResultNode) => {
      const {properties} = entry;

      return {
        value: properties['liste:libelle1'],
        label: properties['liste:libelle2']
      };
    };

    return this.getFidusignList('Liste_juridique_entites', resultMapper, 'FIDUSIGN.EntiteJuridiqueList');
  }

  getProximiteSegmentMarcheList(): Observable<LabelValue[]> {
    const resultMapper = (entry: ResultNode) => {
      const {properties} = entry;

      return {
        value: properties['liste:libelle1'],
        label: properties['liste:libelle2']
      };
    };

    return this.getFidusignList('Liste_yproximite_segment_marche', resultMapper, 'FIDUSIGN.EntiteJuridiqueList');
  }

  getJuridiqueDestinatairesCopie(): Observable<string[]> {
    return this.getFidusignList('Liste_juridique_destinataires_copie', this.resultsMapperName, 'FIDUSIGN.JuridiqueDestinatairesCopies');
  }

  getProximiteDestinatairesCopie(): Observable<string[]> {
    return this.getFidusignList('Liste_yproximite_destinataires_copie', this.resultsMapperName, 'FIDUSIGN.ProximiteDestinatairesCopies');
  }

  getAchatsDestinatairesCopie(): Observable<string[]> {
    return this.getFidusignList('Liste_achats_destinataires_copie', this.resultsMapperName, 'FIDUSIGN.AchatsDestinatairesCopies');
  }

  getFidusignList(metadata: string, func: (entry: ResultNode) => any, storageListName: string): Observable<any[]> {
    const params: FetchDataSearchParams = {
      query: `SITE:'liste' and fiducial:domainContainerSociete:${metadata}`,
      facets: [{field: 'created'}],
      maxItems: 400,
      resultsMapper: func,
    };

    if (localStorage.getItem(storageListName)) {
      return of(JSON.parse(LzString.decompress(localStorage.getItem(storageListName))));
    }

    return this.fetchDataService.makeSearch(params)
      .pipe(
        map((resp) => resp.entries),
        tap((list: any[]) =>
          localStorage.setItem(storageListName, LzString.compress(JSON.stringify(list)))));
  }

  createDocumentWithContent(form: JuridiqueSignedForm | AchatSignedForm | YProximiteSignedForm, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    if (form['cmis:name']) {
      form['cmis:name'] = this.utils.removeSpecialCharacters(form['cmis:name']);
    }
    if (form['cm:title']) {
      form['cm:title'] = this.utils.removeSpecialCharacters(form['cm:title']);
    }
    if (form['fp:message']) {
      form['fp:message'] = this.utils.removeSpecialCharacters(form['fp:message']);
    }
    if (form['cm:description']) {
      form['cm:description'] = this.utils.removeSpecialCharacters(form['cm:description']);
    }
    const options = {
      headers: {
        'Content-Type': 'application/pdf',
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: `P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:fp:mr,${this.aspectsValues[this.groupType]},P:fiduSign:signature`,
        'Document-Properties': JSON.stringify(this.utils.removeEmptyProperties(form))
      },
      responseType: 'text' as 'json'
    };
    return this.http.post<string>(endpoints.frontGEDCreateDocument, formData, options);
  }

  sendDocumentForSigning(
    form: FidusignForSigningForm,
    uuids: string,
    validationType: string,
    applyOrder: string,
    applyVisibleSigning: string,
    visibleSigningMode: string,
    posSigningPageTemplate: string,
    signingPageTemplate: string
  ): Observable<any> {
    if (form['cmis:name']) {
      form['cmis:name'] = this.utils.removeSpecialCharacters(form['cmis:name']);
    }
    if (form['cm:title']) {
      form['cm:title'] = this.utils.removeSpecialCharacters(form['cm:title']);
    }
    if (form['fp:message']) {
      form['fp:message'] = this.utils.removeSpecialCharacters(form['fp:message']);
    }
    if (form['cm:description']) {
      form['cm:description'] = this.utils.removeSpecialCharacters(form['cm:description']);
    }
    if (this.groupType === 'proximite') {
      form['fiduSign:mailEmetteur'] = 'direction.commerciale@yproximite.com';
    }

    let headers: any = {
      uuids: uuids,
      validationType: validationType,
      validationTimeInDays: '60',
      'Content-Type': 'application/pdf',
      ticket: this.utils.getHeaderTicket(),
      documentProperties: JSON.stringify(this.utils.removeEmptyProperties(form)),
      applyOrder: applyOrder,
      applyVisibleSigning: applyVisibleSigning,
      useBuyerEntity: this.useBuyerEntityValues[this.groupType],
      subjectMail: this.groupType === 'proximite' ? 'Y-PROXIMITE;' : 'FIDUCIAL;'
    };

    if (applyVisibleSigning === '1') {
      headers = {
        ...headers,
        visibleSigningMode,
        posSigningPageTemplate,
        signingPageTemplate
      }
    }

    return this.http.post(endpoints.fiduSignSendDocumentForSigning, {}, {headers});
  }

  triggerDisableUpdateEmail(value: boolean): void {
    this.disableUpdateEmailChange.next(value);
  }

  isAlreadySigned(element: any, numSignataire: number): boolean {
    return element.StatutSignature.includes('SIGNATURE_EC') && element.StatutSignature.includes(numSignataire);
  }

  async changeSignataire(signataire, order: number, uuids: string): Promise<any> {
    const documents = uuids.split(',');
    const documentProperties = JSON.stringify({
      [`fiduSign:nomSignataire${order}`]: signataire.nom.toUpperCase(),
      [`fiduSign:prenomSignataire${order}`]: this.utils.capitalize(signataire.prenom),
      [`fiduSign:mailSignataire${order}`]: signataire.email
    });
    this.triggerDisableUpdateEmail(true);
    // update métadonnée email pour tous les documents de l'enveloppe
    for (let index = 0; index < documents.length; index++) {
      const id = documents[index];
      await fetch(endpoints.frontGEDUpdateAllDocument, {
        method: 'PUT',
        headers: new Headers({
          uuid: id,
          ticket: this.utils.getHeaderTicket(),
          docType: 'D:fp:document',
          aspects: `P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,${this.aspectsValues[this.groupType]},P:fiduSign:signature`,
          'Document-Properties': documentProperties,
          updateContent: '0'
        })
      }).then(() => Sentry.captureMessage(`document updated: ${id}`, 'log'));
    }
    // relance signature
    this.retrySigningOne(uuids, order);
  }

  async forward(uuid: string, mails: any[]): Promise<any> {
    // uuid = n'importe quel document de l'enveloppe
    const headers = new Headers({
      ticket: this.utils.getHeaderTicket(),
      uuid: uuid,
      mail: mails.map(el => el.value).join(';')
    });
    await fetch(endpoints.fiduSignSendCopyMailDocSigned, {
      method: 'POST',
      headers: headers
    }).then(response => {
      if (response.ok) {
        this.snack.openSuccess(`Votre enveloppe a été envoyée à  ${mails.map(el => el.value).join(', ')}.`);
        this.triggerDisableUpdateEmail(false);
        this.updateService.triggerRefreshChange(true);
        setTimeout(() => {
          this.router.navigate([{outlets: {view: null}}]);
        }, 3000);
      } else {
        this.triggerDisableUpdateEmail(false);
        this.snack.openError('Un erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
      }
    }).catch(err => {
      this.triggerDisableUpdateEmail(false);
      this.snack.openError('Un erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
    });
  }

  async retrySigningOne(uuids: string, order: number): Promise<any> {
    const documents = uuids.split(',');
    const headers = new Headers({
      ticket: this.utils.getHeaderTicket(),
      uuid: documents[0],
      validationType: '0',
      order: String(order)
    });
    await fetch(endpoints.fiduSignRetrySigningForOne, {
      method: 'POST',
      headers: headers
    }).then(response => {
      if (response.ok) {
        this.snack.openSuccess(`Votre demande de signature a été relancée pour le signataire ${order}.`);
        this.triggerDisableUpdateEmail(false);
        this.updateService.triggerRefreshChange(true);
        setTimeout(() => {
          this.router.navigate([{outlets: {view: null}}]);
        }, 3000);
      } else {
        this.triggerDisableUpdateEmail(false);
        this.snack.openError('Un erreur s\'est produite lors de la relance. Veuillez réessayer.');
      }
    }).catch(err => {
      this.triggerDisableUpdateEmail(false);
      this.snack.openError('Un erreur s\'est produite lors de la relance. Veuillez réessayer.');
    });
  }

  async retrySigning(id: string, status: string, signProperties?: string) {
    return status === 'DOCUMENT_CERTIFIE' || status === undefined ?
      this.retrySend(id, signProperties) : this.retrySign(id);
  }

  async retrySend(id: string, signProperties: string): Promise<any> {
    const headers = new Headers({
      ticket: this.utils.getHeaderTicket(),
      uuids: id,
      validationType: '0',
      validationTimeInDays: '30',
      documentProperties: signProperties
    });
    return await fetch(endpoints.fiduSignSendDocumentForSigning, {
      method: 'POST',
      headers: headers
    });
  }

  async retrySign(id: string): Promise<any> {
    const headers = new Headers({
      ticket: this.utils.getHeaderTicket(),
      uuid: id,
      validationType: '0'
    });
    return await fetch(endpoints.fiduSignRetrySigningDemand, {
      method: 'POST',
      headers: headers
    });
  }

  async cancelSigning(id: string): Promise<any> {
    await fetch(endpoints.fiduSignCancelSigningDemand, {
      method: 'POST',
      headers: new Headers({
        ticket: this.utils.getHeaderTicket(),
        uuid: id
      })
    }).then(response => {
      response.ok ?
        this.snack.openSuccess('Votre demande de signature a été annulée.') :
        this.snack.openError(`Un erreur s'est produite lors de l'annulation. Veuillez réessayer.`);
      response.ok ? this.updateService.triggerRefreshChange(true) : this.updateService.triggerRefreshChange(false);
    }).catch(err => {
      this.snack.openError(`Un erreur s'est produite lors de la relance. Veuillez réessayer.`);
    });
  }

  private resultsMapperName(entry: ResultNode): string {
    return entry.name;
  }

  private resultsMapperJuridiqueSignataire(entry: ResultNode): Object {
    const {properties} = entry;

    return {
      name: properties['liste:libelle2'],
      lastName: properties['liste:libelle3'],
      email: properties['liste:libelle1']
    };
  }

  private resultsMapperAchatSignataire(entry: ResultNode): Object {
    const {properties} = entry;

    return {
      name: properties['liste:libelle3'],
      lastName: properties['liste:libelle2'],
      email: properties['liste:libelle1']
    };
  }

  private getGroupType(): FidusignGroupType {
    if (this.groupService.isInGroups([GroupsEnums.isUserFidusignAchat, GroupsEnums.isUserFidusignAchatAccesSpec])) {
      return 'achat';
    }

    if (this.groupService.isInGroups([GroupsEnums.isUserFidusignJuridique])) {
      return 'juridique';
    }

    if (this.groupService.isInGroups([GroupsEnums.isUserFidusignYProximite, GroupsEnums.isUserFidusignYProximiteCommercial])) {
      return 'proximite';
    }
  }

  replaceSpecialCharactersAndRemoveLineBreak(m: string): { message: string, replacedChars: string[] } {
    let message: string = m;
    const replacedChars: string[] = [];
    const charactersToReplace: string[] = ['\n', '\r', '\u20AC', '\u2018\u2019', '\u0153'];
    charactersToReplace.forEach(char => {
      switch (char) {
        case '\n':
        case '\r':
          if (message.includes(char)) {
            message = message.replace(/\r\n|\n|\r/g, ' ');
            replacedChars.push('saut de ligne');
          }
          break;
        case '\u20AC':
          if (message.includes(char)) {
            message = message.replace(/\u20AC/g, 'euros');
            replacedChars.push(char);
          }
          break;
        case '\u2018\u2019':
          if (message.includes(char)) {
            message = message.replace(/\u2018\u2019/g, '\u0027');
            replacedChars.push(char);
          }
          break;
        case '\u0153':
          if(message.includes(char)) {
            message = message.replace(/\u0153/g, 'oe');
            replacedChars.push(char);
          }
      }
    });

    for (const char of message) {
      if(this.testUniqueCharacter(char, charactersToReplace)) {
        message = message.replace(char, '');
        replacedChars.push(char);
      }
    }

    return {message, replacedChars};
  }

  testUniqueCharacter(chararacter: string, replacedCharacters: string[]) {
    var regex = new RegExp('^[^[a-z1-9àùèéâêîôûäëïöüç+=/#£$%&@ .,\_\'\-()!?]*$]*$', "i");
    if(replacedCharacters.includes(chararacter) || regex.test(chararacter)) {
      return true;
    }
      return false;
  }

  pastedTextToFormat() {
    if (navigator.clipboard) {
      navigator.clipboard.readText()
        .then(f => this.textToPaste = f)
        .then(v => navigator.clipboard.writeText(v))
        .then(() => navigator.clipboard.readText())
        .then((value) => this.utils.removeSpecialCharacters(value))
        .then(v => navigator.clipboard.writeText(v));
    }
  }

  pastedTextToUnFormat() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.textToPaste);
    }
  }

}
