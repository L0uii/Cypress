import { endpoints } from './../endpoints/endpoints';
import {AuthenticationService, NodesApiService} from '@alfresco/adf-core';
import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';
import {CLASSEMENT, MANDATORY_METADATAS, MrDateDocuments} from 'models/mr';
import {environment} from 'environments/environment';
import * as moment from 'moment';
import {FormBase} from 'models/form';
import {Observable, of} from 'rxjs';
import {extensions} from 'consts/file-extensions';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {CustomerDocumentProperties} from 'models/customer-document-properties';
import {UntypedFormBuilder, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {
  basicAuth = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);
  aspects = 'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:firme:docFirme';
  familles = this.getFamilles();
  displayClient = this.getDocumentTypeVisibleClient();
  metadatas = CLASSEMENT
    .map(el => el.listeMetadatas)
    .reduce((acc: any, val: any) => acc.concat(val), [])
    .map(el => el.metadata)
    .filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
  defaultMetadatas = MANDATORY_METADATAS;
  classementsUpload = CLASSEMENT.filter(el => !el.noUpload);


  constructor(
    private utils: UtilsService,
    private nodesApi: NodesApiService,
    private auth: AuthenticationService,
    private http: HttpClient,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  getExtensions() {
    return extensions;
  }

  getAspects() {
    return this.aspects;
  }

  getDocumentTypeObj(classement, formSousFamille: string) {
    return classement.filter((el) => el.labelSousFamille === formSousFamille);
  }

  generateDocumentProperties(form, fileName: string) {
    const now = this.utils.getDateNow();
    const documentPropObj = {
      'cmis:name': encodeURI(fileName),
      'cm:title': form.documentType,
      'cm:author': this.auth.getEcmUsername(),
      'cm:isContentIndexed': true,
      'cm:description': form.description,
      'fiducial:domainContainerBranche': 'MR',
      'fiducial:domainContainerSociete': 'FIDEXP',
      'fiducial:domainContainerApplication': form.application ? form.application : 'GEDUP',
      'fiducial:domainContainerFamille': form.famille,
      'fiducial:domainContainerSousFamille': form.sousFamille,
      'fp:dateDocument': form.dateDocument ? moment(form.dateDocument).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'firme:codeBudget': form.codeBudget ? form.codeBudget : null,
      'firme:codeClient': form.numeroDossier ? form.numeroDossier : null,
      'firme:matriculeCollab': form.matriculeCollab ? form.matriculeCollab : ['000000'],
      'fp:nature': form.nature ? form.nature : null,
      'fp:message': form.message ? form.message : null,
      'fp:natureObjet': form.natureObjet ? form.natureObjet : null,
      'fp:statut': form.statut ? form.statut : null,
      'fp:objet': form.objet ? form.objet : null,
      'fp:dateAssembleeGenerale': form.dateAssembleeGenerale ? moment(form.dateAssembleeGenerale).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateDebutExercice': form.dateDebutExercice ? moment(form.dateDebutExercice).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateDernierJourTravail': form.dateDernierJourTravail ? moment(form.dateDernierJourTravail).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateEnvoi': form.dateEnvoi ? moment(form.dateEnvoi).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateFinContrat': form.dateFinContrat ? moment(form.dateFinContrat).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateFinExercice': form.dateFinExercice ? moment(form.dateFinExercice).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:matricule': form.matricule ? form.matricule : null,
      'fp:nir': form.nir ? form.nir : null,
      'fp:nom': form.nom ? form.nom : null,
      'fp:num': form.num ? parseInt(form.num, 10) : null,
      'fp:numChrono': form.numChrono ? parseInt(form.numChrono, 10) : null,
      'fp:type': form.type ? form.type : null,
      'fp:dateFinPeriode': form.dateFinPeriode ? moment(form.dateFinPeriode).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:societeEmettrice': form.societeEmettrice ? form.societeEmettrice : null,
      'fp:dateDebutPeriode': form.dateDebutPeriode ? moment(form.dateDebutPeriode).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:destinataire': form.destinataire,
      'fp:dateSignature': form.dateSignature ? moment(form.dateSignature).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:anneeDeclaration': form.anneeDeclaration ? moment(form.anneeDeclaration).format('YYYY') : null,
      'fp:nomAssocie': form.nomAssocie ? form.nomAssocie : null,
      'fp:prenomAssocie': form.prenomAssocie ? form.prenomAssocie : null,
      'fp:emetteur': form.emetteur ? form.emetteur : null,
      'fp:contentieux': form.contentieux ? form.contentieux : null,
      'fp:nomAssureur': form.nomAssureur ? form.nomAssureur : null,
      'fp:numeroFormulaire': form.numeroFormulaire ? form.numeroFormulaire : null,
      'fp:dateAvenant': form.dateAvenant ? moment(form.dateAvenant).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:nomPrenom': form.nomPrenom ? form.nomPrenom : null,
      'fp:organisme': form.organisme ? form.organisme : null,
      'fp:refImprime': form.refImprime ? form.refImprime : null,
      'fp:moisPaiement': form.moisPaiement ? form.moisPaiement : null,
      'fp:numCompl': form.numCompl ? parseInt(form.numCompl, 10) : null,
      'fp:numOrig': form.numOrig ? parseInt(form.numOrig, 10) : null,
      'fp:numRempl': form.numRempl ? parseInt(form.numRempl, 10) : null,
      'fp:dateHeureEdition': form.dateHeureEdition ? moment(form.dateHeureEdition).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:dateDebutContrat': form.dateDebutContrat ? moment(form.dateDebutContrat).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:numReprise': form.numReprise ? parseInt(form.numReprise, 10) : null,
      'fp:montant': form.montant ? parseInt(form.montant, 10) : null,
      'fp:nomFournisseur': form.nomFournisseur ? form.nomFournisseur : null,
      'fp:natureImmobilisation': form.natureImmobilisation ? form.natureImmobilisation : null,
      'fp:iban': form.iban ? form.iban : null,
      'fp:banque': form.banque ? form.banque : null,
      'fp:local': form.local ? form.local : null,
      'fp:societeBeneficiaire': form.societeBeneficiaire ? form.societeBeneficiaire : null,
      'fp:dateAdhesion': form.dateAdhesion ? moment(form.dateAdhesion).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null,
      'fp:nomAutre': form.nomAutre ? form.nomAutre : null,
      'fp:nomOGA': form.nomOGA ? form.nomOGA : null,
      'fp:organeGestion': form.organeGestion ? form.organeGestion : null,
      'fp:moisReference': form.moisReference ? form.moisReference : null,
      'fp:declaration': form.declaration ? form.declaration : null,
      'fp:domaineExpertise': form.domaineExpertise ? form.domaineExpertise : null,
      'fp:nomContribuable': form.nomContribuable ? form.nomContribuable : null,
      'fp:prenomContribuable': form.prenomContribuable ? form.prenomContribuable : null,
    };

    if (form.factNumero) {
      this.aspects = this.aspects + ',P:fact:facture';
      const factNumero = {'fact:numero': form.factNumero ? form.factNumero : null};
      Object.assign(documentPropObj, factNumero);
      const factEmetteur = {'fact:emetteur': (form.factNumero !== '' && form.nomFournisseur) ? form.nomFournisseur : null};
      Object.assign(documentPropObj, factEmetteur);
      const factDestinataire = {'fact:destinataire': (form.factNumero !== '' && form.numeroDossier) ? form.numeroDossier : null};
      Object.assign(documentPropObj, factDestinataire);
      const factDuplicata = {'fact:duplicata': form.factNumero !== '' ? !!form.factNumero : null};
      Object.assign(documentPropObj, factDuplicata);
      const factAvoir = {'fact:avoir': form.factNumero !== '' ? !form.factNumero : null};
      Object.assign(documentPropObj, factAvoir);
      const factDateFacture = {
        'fact:dateFacture': (form.factNumero !== '' && form.dateDocument) ?
          moment(form.dateDocument).format('YYYY-MM-DDTHH:mm:ss.SSSZ') : null
      };
      Object.assign(documentPropObj, factDateFacture);
    }

    if (form.documentType) {
      const docTypObj = this.getDocumentTypeObj(this.classementsUpload, form.documentType)[0];
      if (docTypObj.fpNommageCalc) {
        const regex = /\{|\}/g;
        const nommage = docTypObj.fpNommageCalc.split(regex);
        const regPipe = /\|/g;
        const regDate = /(.*date.*)+/gmi;
        const regIncludYear = /((yy|aa)[\/\-\\\_])|([\/\-\\\_](yy|aa))|(yyyy|aaaa)/gmi;
        const fpNommage = nommage.map(el => {
          let update = '';
          if (documentPropObj[`${el.split(regPipe)[0]}`]) {
            if ((regIncludYear).test(el.split(regPipe)[1])) {
              update = moment(documentPropObj[`${el.split(regPipe)[0]}`]).format(el.split(regPipe)[1].toString().toUpperCase());
            } else if (regDate.test(el.split(regPipe)[0]) && docTypObj.sousFamille !== 'DeclarationFiscaleAutre') {
              update = moment(documentPropObj[`${el.split(regPipe)[0]}`]).format('YYYY-MM-DD');
            } else {
              update = documentPropObj[`${el.split(regPipe)[0]}`];
            }
          } else {
            update = el;
          }
          return update;
        })
          .reduce((x, y) => x + y);
        const updateFpNommage = {'fp:nommage': fpNommage};
        Object.assign(documentPropObj, updateFpNommage);
      } else {
        const updateFpNommage = {'fp:nommage': form.documentType ? `${now} - ${form.documentType}` : null};
        Object.assign(documentPropObj, updateFpNommage);
      }
    }
    return JSON.stringify(documentPropObj);
  }

  getFamilles() {
    const famillesParOnglet = {};
    const sousFamillesParOnglet = {};
    const classementParOnglet = CLASSEMENT.reduce(function (r, a) {
      r[a.onglet] = r[a.onglet] || [];
      r[a.onglet].push(a);
      return r;
    }, Object.create(null));

    for (const key in classementParOnglet) {
      if (key) {
        famillesParOnglet[key] = classementParOnglet[key]
          .map(el => Object.assign({}, {famille: el.famille, sousFamille: el.sousFamille}))
          .reduce((a, b) => {
            if (a.indexOf(b) < 0) {
              a.push(b);
            }
            return a;
          }, []);

        sousFamillesParOnglet[key] = classementParOnglet[key]
          .map(el => el.sousFamille)
          .reduce((a, b) => {
            if (a.indexOf(b) < 0) {
              a.push(b);
            }
            return a;
          }, []);
      }
    }
    return famillesParOnglet;
  }

  generateQueryFamille(onglet) {
    let query = '(';
    this.familles[onglet].forEach((el, index, array) => {
      const modifier = index < array.length - 1 ? 'OR' : '';
      query = `${query} (=fiducial:domainContainerFamille:'${el.famille}' AND =fiducial:domainContainerSousFamille:'${el.sousFamille}') ${modifier}`;
    });
    query = `${query})`;
    return query;
  }

  getDocumentTypeVisibleClient() {
    const displayClient = {};
    const listeDocumentTypes = CLASSEMENT.reduce(function (r, a) {
      const display = a.displayClient ? 'displayClientOui' : 'displayClientNon';
      r[display] = r[display] || [];
      r[display].push(a);
      return r;
    }, Object.create(null));

    for (const key in listeDocumentTypes) {
      if (key) {
        displayClient[key] = listeDocumentTypes[key]
          .map(el => el.sousFamille)
          .reduce((a, b) => {
            if (a.indexOf(b) < 0) {
              a.push(b);
            }
            return a;
          }, []);
      }
    }
    return displayClient;
  }

  getPropertiesFormDocument(nodeId: string): Observable<CustomerDocumentProperties> {
    return this.nodesApi.getNode(nodeId)
      .pipe(
        map(resp => {
          const document = {id: nodeId, title: resp.name};
          const customerProperties = {
            numeroDossier: resp.properties['firme:codeClient'],
            codeBudget: resp.properties['firme:codeBudget']
          };
          const documentProperties = {};
          const properties = resp.properties;
          this.metadatas.forEach(metadata => {
            if (properties[metadata]) {
              documentProperties[metadata] = properties[metadata];
            }
          });
          this.defaultMetadatas.forEach(defaultMetadatas => {
            if (properties[defaultMetadatas.metadata]) {
              documentProperties[defaultMetadatas.metadata] = properties[defaultMetadatas.metadata];
            }
          });
          return {documentProperties, document, customerProperties};
        })
      );
  }

  fetchCustomerName(clientCode) {
    const allowedSocieties = ['FIDEXP', 'FIDAGC', 'FIDBUR'];
    return this.getCustomerName(clientCode)
      .pipe(
        map(response => {
          if (response) {
            const results = [];
            for (const key in response['Affaire']) {
              if (Object.prototype.hasOwnProperty.call(response['Affaire'], key)) {
                const element = response['Affaire'][key];
                if (allowedSocieties.includes(element['societeFiducial'])) {
                  results.push({
                    numeroDossier: element['numeroAffaire'],
                    nomDossier: element['libelleAffaire'],
                    codeBudget: element['codeBudget']
                  });
                }
              }
            }
            return results;
          }
          return [];
        }),
        catchError(() => of([]))
      );
  }

  getCustomerName(clientCode: string): Observable<any> {
    return this.http.post(endpoints.frontGEDInfoClient, {}, {headers: {clientCode}});
  }

  toFormGroup(inputs: Array<MrDateDocuments>) {
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

  initializeForm() {
    return this.formBuilder.group({
      matriculeCollab: ['000000'],
      documentType: ['', Validators.required],
      famille: [''],
      sousFamille: [''],
      description: [''],
      message: [''],
      nature: [''],
      natureObjet: [''],
      statut: [''],
      objet: [''],

      dateDocument: [''],
      dateFinExercice: [''],
      dateFinPeriode: [''],
      dateDebutPeriode: [''],
      dateAssembleeGenerale: [''],
      dateDebutContrat: [''],
      dateAvenant: [''],
      dateAdhesion: [''],

      anneeDeclaration: [''],
      moisReference: [''],
      moisPaiement: [''],

      nom: [''],
      nomPrenom: [''],
      nomAutre: [''],
      nomOGA: [''],
      prenomAssocie: [''],
      nomAssocie: [''],
      prenomContribuable: [''],
      nomContribuable: [''],
      type: [''],
      societeEmettrice: [''],
      emetteur: [''],
      destinataire: [''],
      contentieux: [''],
      nomAssureur: [''],
      numeroFormulaire: [''],
      organisme: [''],
      montant: [''],
      nomFournisseur: [''],
      natureImmobilisation: [''],
      iban: [''],
      local: [''],
      societeBeneficiaire: [''],
      organeGestion: [''],
      declaration: [''],
      domaineExpertise: [''],
      banque: [''],
      factNumero: [''],
      factEmetteur: [''],
      factDestinataire: [''],
      factDuplicata: [''],
      factAvoir: [''],
      dateFacture: [''],
      classement: [''],
      categorie: ['']
    });
  }


  getCustomerEmail(clientCode: string): Observable<string> {
    return this.getCustomerName(clientCode).pipe(
      catchError(() => of(undefined)),
      map((response) => {
        let customerEmail: string;

        if (response) {
          const personnePhysique = response['PersonnePhysique'];
          const key = Object.keys(personnePhysique)[0];
          const ppData = personnePhysique[key];
          if (ppData) {
            customerEmail = (
              ppData.courrielConnexion ??
              ppData.CoordonneesProfessionnelles.courriel ??
              ppData.CoordonneesPersonnelles.courriel ??
              ppData.CoordonneesAutres.courriel
            );
          }
        }

        return customerEmail;
      })
    );
  }

  getDocumentMetadata(uuid: string) {
    return fetch(endpoints.frontGEDGetMetadata, {
      method: 'GET',
      headers: new Headers({
        'uuid': uuid,
        'ticket': this.utils.getHeaderTicket(),
        'Accept': 'application/json'
      })
    });
  }

  async transfer(id: string, category: string) {
    return await fetch(endpoints.frontGEDUpdateDocument, {
      method: 'PUT',
      headers: new Headers({
        'uuid': id,
        'ticket': this.utils.getHeaderTicket(),
        'docType': 'D:fp:document',
        'aspects': 'P:collecte:massive',
        'updateContent': 'false',
        'Document-Properties': `{"collecte:type":"${category}"}"`
      })
    });
  }
}
