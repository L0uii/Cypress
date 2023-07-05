import {UtilsService} from './utils.service';
import {SearchParams, SearchResult} from 'models/search';
import {Injectable} from '@angular/core';
import {SearchService} from '@alfresco/adf-core';
import {ExpertiseService} from './expertise.service';
import {ConseilService} from './conseil.service';
import {
  PENDING_PROCESSING_GERANCE_ASSOCIES_ADMIN,
  PENDING_PROCESSING_GERANCE_ASSOCIES_DIVERS,
  PENDING_PROCESSING_GERANCE_ASSOCIES_RETRAIT,
  PENDING_PROCESSING_GERANCE_ASSOCIES_SOUSCRIP,
  PENDING_PROCESSING_GERANCE_ASSOCIES_SUCCES,
  PROCESSED_GERANCE_ASSOCIES,
} from '../models/gerance-associes';
import {PENDING} from '../models/achats';
import {QueryBody, RequestFacetField, RequestPivot, ResultNode, ResultSetPaging} from '@alfresco/js-api';
import {map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

export interface FetchDataSearchParams extends SearchParams {
  query: string,
  facets?: RequestFacetField[],
  resultsMapper?: (entry: ResultNode) => any,
  pivots?: RequestPivot[]
}

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(
    private searchService: SearchService,
    private expertiseService: ExpertiseService,
    private conseilService: ConseilService,
    private utilsService: UtilsService
  ) {
  }

  makeSearch(params: FetchDataSearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      searchQuery: '',
      maxItems: 10,
      skipCount: 0,
      resultsMapper: (entry: ResultNode) => entry,
      ...params
    };
    const queryBody: QueryBody = this.getQueryBody(searchParams);
    return this.searchService.searchByQueryBody(queryBody).pipe(
      map(({list}) => {
        const {entries, pagination, context} = list;
        return {
          entries: entries.map(e => searchParams.resultsMapper(e.entry)),
          pagination: pagination,
          facets: context.facetsFields ?? context.facets,
        };
      })
    );
  }

  getClassementProduitGerance() {
    const searchParams: FetchDataSearchParams = {
      maxItems: 50,
      query: 'fiducial:domainContainerSociete:Liste_produit_gerance',
      facets: [{field: 'created'}],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          codeProduit: properties['liste:libelle1'],
          labelCategorie: properties['liste:libelle2'],
          labelProduit: properties['liste:libelle3'],
        };
      },
    };

    return this.makeSearch(searchParams);
  }

  getCodeBudgetDetails(codeBudgetList: string[]): Observable<any> {
    const searchParams: FetchDataSearchParams = {
      maxItems: 100,
      query: 'fiducial:domainContainerSociete:Liste_MR_budget',
      facets: [{field: 'created'}],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          codeBudget: properties['fp:codeBudget'],
          label: properties['liste:Nom']
        };
      },
      searchQuery: `AND (${codeBudgetList.map(c => `=fp:codeBudget:${c}`).join(' OR ')})`
    };

    return this.makeSearch(searchParams);
  }

  simpleSearch(searchTerm: string, maxResults = 50): Observable<ResultSetPaging> {
    return this.searchService.search(searchTerm, maxResults, 0);
  }

  callMethodByName(methodName: string, params: SearchParams): Observable<SearchResult> {
    if (!(methodName in this)) {
      return throwError(`Invalid method: ${methodName}`);
    }

    return this[methodName](params) as Observable<SearchResult>;
  }

  getClassementProduitConseil() {
    const searchParams: FetchDataSearchParams = {
      maxItems: 1000,
      query: 'fiducial:domainContainerSociete:Liste_produit_conseil',
      facets: [{field: 'created'}],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          nature: properties['liste:libelle1'],
          fournisseurs: [{
            nom: properties['liste:libelle2'] ? properties['liste:libelle2'] : properties['liste:libelle1'].toUpperCase(),
            produits: properties['liste:libelle3'] ? properties['liste:libelle3'] : properties['liste:libelle1'].toUpperCase()
          }]
        };
      },
    };

    return this.makeSearch(searchParams);
  }

  getListDRConseil() {
    const searchParams: FetchDataSearchParams = {
      maxItems: 100,
      query: 'fiducial:domainContainerSociete:Liste_DR_conseil',
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          label: properties['liste:Nom'].substring(3),
          societe: properties['liste:Nom'],
          codeBudget: properties['fp:codeBudget'],
        };
      },
    };

    return this.makeSearch(searchParams);
  }

  getContrats(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        'fiducial:domainContainerBranche:MR AND ' +
        `TYPE:'fp:document' AND (fiducial:domainContainerSousFamille:ContratDeServicesFiducialConsulting ` +
        'OR fiducial:domainContainerSousFamille:ContratDeServicesFiducialConsultinge_ConditionsGeneralesDePrestationDeServices ' +
        'OR fiducial:domainContainerSousFamille:LettreMissionFiducialExpertise ' +
        'OR fiducial:domainContainerSousFamille:LettreMissionFiducialExpertise_ConditionsGeneralesDeCollaboration)',
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonClientProperties(entry),
          DateDocument: properties['fp:dateDocument'],
          Nature: properties['fp:nature'],
          Statut: properties['fp:statut'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getMandatsETEBAC(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerBranche:MR AND TYPE:'fp:document' AND fiducial:domainContainerSousFamille:MandatEtebac`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonClientProperties(entry),
          DateDocument: properties['fp:dateDocument'],
          Statut: properties['fp:statut'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getDocsLAB(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerBranche:MR AND TYPE:'fp:document' AND fiducial:domainContainerSousFamille:DocumentsDIdentification`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        return {
          ...this.commonClientProperties(entry),
          DateDocument: entry.properties['fp:dateDocument'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getMandatsSEPA(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerBranche:MR AND TYPE:'fp:document' AND fiducial:domainContainerSousFamille:MandatPrelevementSepaExpertiseOuConsulting`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonClientProperties(entry),
          DateDocument: properties['fp:dateDocument'],
          Statut: properties['fp:statut'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  reclamation(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' AND (fiducial:domainContainerFamille:'administratif_reclamation' OR fiducial:domainContainerFamille:'correspondance_reclamation') ${this.conseilService.getValidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonConseilProperties(entry),
          Produit: properties['conseil:produit'],
          Fournisseur: properties['contrat:fournisseur'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getRIB(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerBranche:MR AND TYPE:'fp:document' AND fiducial:domainContainerSousFamille:releveDIdentiteBancaire`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonClientProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getFactures(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerBranche:MR AND TYPE:'fp:document' AND fact:numero:*`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        return {
          ...this.commonFactureProperties(entry),
          Nommage: entry.properties['cm:description'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  conformite(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' AND (fiducial:domainContainerFamille:'conformite' OR fiducial:domainContainerFamille:'scoring') ${this.conseilService.getValidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonConseilProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  souscription(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' AND (fiducial:domainContainerFamille:'administratif_souscription' OR fiducial:domainContainerFamille:'conformite_souscription' OR fiducial:domainContainerFamille:'correspondance_souscription') ${this.conseilService.getValidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonConseilProperties(entry),
          Produit: properties['conseil:produit'],
          Fournisseur: properties['contrat:fournisseur'],
          ContratNature: properties['contrat:nature'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingGeranceAdministratif(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' ${PENDING_PROCESSING_GERANCE_ASSOCIES_ADMIN}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonGeranceAssociesProperties(entry),
          FamilleGeranceAssocies: properties['fiducial:domainContainerFamille'],
          PriseEnChargePar:
            properties['gerance:attributionCollaborateurAssocie'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  sinistre(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' AND (fiducial:domainContainerFamille:'administratif_sinistre' OR fiducial:domainContainerFamille:'correspondance_sinistre') ${this.conseilService.getValidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonConseilProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingGeranceSuccess(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' ${PENDING_PROCESSING_GERANCE_ASSOCIES_SUCCES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonGeranceAssociesProperties(entry),
          FamilleGeranceAssocies: properties['fiducial:domainContainerFamille'],
          PriseEnChargePar:
            properties['gerance:attributionCollaborateurAssocie'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingGeranceRetrait(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' ${PENDING_PROCESSING_GERANCE_ASSOCIES_RETRAIT}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonGeranceAssociesProperties(entry),
          FamilleGeranceAssocies: properties['fiducial:domainContainerFamille'],
          PriseEnChargePar:
            properties['gerance:attributionCollaborateurAssocie'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingGeranceSouscrip(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' ${PENDING_PROCESSING_GERANCE_ASSOCIES_SOUSCRIP}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonGeranceAssociesProperties(entry),
          FamilleGeranceAssocies: properties['fiducial:domainContainerFamille'],
          PriseEnChargePar:
            properties['gerance:attributionCollaborateurAssocie'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingGeranceDivers(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' ${PENDING_PROCESSING_GERANCE_ASSOCIES_DIVERS}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonGeranceAssociesProperties(entry),
          FamilleGeranceAssocies: properties['fiducial:domainContainerFamille'],
          PriseEnChargePar:
            properties['gerance:attributionCollaborateurAssocie'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  conseilCustomers(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND fiducial:domainContainerSociete:Liste_clients_conseil`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          NumeroDossier: properties['liste:NumeroDossier'],
          TypeClient: properties['liste:TypeClient'],
          Nom: properties['liste:Nom'],
          Prenom: properties['liste:Prenom'],
          CodeBudget: properties['fp:codeBudget'],
          CodePostal: properties['contact:cp'],
          id: entry.id,
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessing(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' ${this.conseilService.getInvalidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonPendingProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingProcessingCGP(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerBranche:Conseil AND TYPE:'fp:document' ${this.conseilService.getInvalidDR()}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonPendingProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  facturesConseil(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND fact:emetteur:'FIDUCIAL CONSEIL'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties, content } = entry;
        return {
          ...this.commonFactureProperties(entry),
          Nommage: properties['cm:description'],
          SizeInBytes: content?.sizeInBytes ?? 0,
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  facturesSofiral(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND fiducial:domainContainerFamille:Documents_comptables ` +
        'AND fiducial:domainContainerSousFamille:Facture ' +
        `AND fact:emetteur:'SOFIRAL' AND fiducial:domainContainerSociete:SFIRAL`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties, content } = entry;
        return {
          ...this.commonFactureProperties(entry),
          Nommage: properties['fp:nommage'],
          SizeInBytes: content?.sizeInBytes ?? 0,
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  fidusignAchatsBase(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:DIR_ACHAT AND ISNOTNULL:'fiduSign:nomEmetteur'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => ({
        ...this.fidusignCoreProperties(entry),
        DomainContainerSousFamille:
          entry.properties['fiducial:domainContainerSousFamille'],
      }),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getAchatsSigned(params: SearchParams): Observable<SearchResult> {
    const documentSignedClause = `AND (fiduSign:statut:'DOCUMENT_SIGNE' OR ISNOTNULL:"fiduSign:dateCertification")`;
    const searchQuery = params.searchQuery.replace(documentSignedClause, '');
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:DIR_ACHAT AND ISNOTNULL:'fiduSign:nomEmetteur' ${documentSignedClause}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.fidusignCoreProperties(entry),
          Categorie: properties['fiducial:domainContainerFamille'],
          SousCategorie: properties['fiducial:domainContainerSousFamille'],
        };
      },
      ...params,
      searchQuery,
      sortBy: {
        field: 'fiduSign:dateCertification',
        ascending: false
      }
    };

    return this.makeSearch(searchParams);
  }

  getAchatsCancelled(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:DIR_ACHAT AND ISNOTNULL:'fiduSign:nomEmetteur' AND (fiduSign: statut:'DEMANDE_ANNULEE' OR fiduSign: statut:'DEMANDE_EXPIREE')`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.fidusignCoreProperties(entry),
          Categorie: properties['fiducial:domainContainerFamille'],
          SousCategorie: properties['fiducial:domainContainerSousFamille'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getAchatsPending(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:DIR_ACHAT AND ISNOTNULL:'fiduSign:nomEmetteur' AND (${this.getFidusignStatutQuery()})`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.fidusignCoreProperties(entry),
          Categorie: properties['fiducial:domainContainerFamille'],
          SousCategorie: properties['fiducial:domainContainerSousFamille'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  //#region Fidusign - Direction Juridique

  getDirectionJuridiqueSigned(params: SearchParams): Observable<SearchResult> {
    const documentSignedClause = `AND (fiduSign:statut:'DOCUMENT_SIGNE' OR ISNOTNULL:"fiduSign:dateCertification")`;
    const searchQuery = params.searchQuery.replace(documentSignedClause, '');
    params = {
      ...params,
      searchQuery,
      sortBy: {
        field: 'fiduSign:dateCertification',
        ascending: false
      }
    };
    return this.fidusignDirJuridiqueBase(params, documentSignedClause);
  }

  getDirectionJuridiqueCancelled(params: SearchParams): Observable<SearchResult> {
    return this.fidusignDirJuridiqueBase(params, `AND (fiduSign:statut:'DEMANDE_ANNULEE' OR fiduSign:statut:'DEMANDE_EXPIREE')`);
  }

  getDirectionJuridiquePending(params: SearchParams): Observable<SearchResult> {
    return this.fidusignDirJuridiqueBase(params, `AND (${this.getFidusignStatutQuery()})`);
  }

  fidusignDirJuridiqueBase(params: SearchParams, queryComplement: string): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:DIR_JURIDIQUE ${queryComplement ?? ''}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.fidusignCoreProperties(entry),
          Categorie: properties['fiducial:domainContainerFamille'],
          SousCategorie: properties['fiducial:domainContainerSousFamille'],
          NatureOperation: properties['juridique:droitSocNatureOperation'],
          DateOperation: properties['juridique:droitSocDateOperation'],
          DatePriseEffet: properties['juridique:droitSocDatePriseEffet'],
          NatureDocument: properties['juridique:droitSocNatureDocument']
        };
      },
      ...params
    };

    return this.makeSearch(searchParams);
  }

  //#endregion

  //#region Fidusign - Y-Proximité

  getYProximiteSigned(params: SearchParams): Observable<SearchResult> {
    const documentSignedClause = `AND (fiduSign:statut:'DOCUMENT_SIGNE' OR ISNOTNULL:"fiduSign:dateCertification")`;
    const searchQuery = params.searchQuery.replace(documentSignedClause, '');
    params = {
      ...params,
      searchQuery,
      sortBy: {
        field: 'fiduSign:dateCertification',
        ascending: false
      }
    };
    return this.fidusignYProximiteBase(params, documentSignedClause);
  }

  getYProximiteCancelled(params: SearchParams): Observable<SearchResult> {
    return this.fidusignYProximiteBase(params, `AND (fiduSign:statut:'DEMANDE_ANNULEE' OR fiduSign:statut:'DEMANDE_EXPIREE')`);
  }

  getYProximitePending(params: SearchParams): Observable<SearchResult> {
    return this.fidusignYProximiteBase(params, `AND (${this.getFidusignStatutQuery()})`);
  }

  private fidusignYProximiteBase(params: SearchParams, queryComplement: string): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:YPROXIMITE ${queryComplement ?? ''}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.fidusignCoreProperties(entry),
          SegmentMarche: properties['fiducial:domainContainerApplication'],
          Client: properties['yproximite:nomClient'],
          DateValidite: properties['yproximite:dateValiditeBonCommande']
        };
      },
      ...params
    };

    return this.makeSearch(searchParams);
  }

  //#endregion

  isDocumentWithMoreThan10Months(searchQuery: string): Observable<boolean> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND fiducial:domainContainerApplication:NXT AND (collecte:type:achat OR collecte:type:vente OR collecte:type:social OR collecte:type:autre) AND cm:created:['${this.utilsService.shortestDate()}' TO '${this.utilsService.subtractMonth(10)}']`,
      facets: [{field: 'created' }],
      maxItems: 1,
      searchQuery: searchQuery,
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
    };

    return this.makeSearch(searchParams).pipe(map(resp => !!resp.entries.length));
  }

  getSocial(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Social'
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          ...this.commonExpertiseProperties(entry),
          NomSalarie: properties['fp:nom'],
          DateAvenant: properties['fp:dateAvenant'],
          DateDebutContrat: properties['fp:dateDebutContrat'],
          DateAdhesion: properties['fp:dateAdhesion'],
          Message: properties['fp:message'],
          DateFinPeriode: properties['fp:dateFinPeriode'],
          DateFinExercice: properties['fp:dateFinExercice'],
          Organisme: properties['fp:organisme'],
          NomAutre: properties['fp:nomAutre'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getComptabilite(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Comptabilité / Gestion'
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getFiscal(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Fiscal'
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getArchivesPresidence(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:ARCHIVES AND TYPE:'fp:document'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          Titre: properties['cm:title'],
          Localisation: properties['fiducial:domainContainerApplication'],
          Thematique: properties['fiducial:domainContainerFamille'],
          Sommaire: properties['fiducial:domainContainerSousFamille'],
          Nature: properties['fp:nature'],
          AnneeDebut: properties['fp:dateDebutPeriode'],
          AnneeFin: properties['fp:dateFinPeriode'],
          EtatDossier: properties['fp:statut'],
          DateTraitement: properties['fp:dateTraitement'],
          Destinataire: properties['fp:destinataire'],
          Local: properties['fp:local'],
          ComplementLocalisation: properties['contact:complement'],
          Keywords: properties['fp:natureObjet'],
          Description: properties['cm:description'],
          DateCreation: entry.createdAt,
          id: entry.id,
          isFile: entry.isFile,
          name: entry.name,
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getJuridique(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Juridique'
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeneralite(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Généralités'
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getFiducial(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        'Fiducial'
      )}`,
      // ath: `PATH:'/app:company_home/cm:Cache/cm:MR//*'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getChefEntreprise(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND ${this.expertiseService.generateQueryFamille(
        `Chef d'entreprise`
      )}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonExpertiseProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getPendingDocsAchatVente(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND fiducial:domainContainerApplication:NXT AND (collecte:type:achat OR collecte:type:vente)`,
      facets: [{field: 'collecte:type'}],
      resultsMapper: (entry: ResultNode) => this.commonDocsProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getPendingDocsSocial(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND fiducial:domainContainerApplication:NXT AND collecte:type:social`,
      facets: [{field: 'collecte:type'}],
      resultsMapper: (entry: ResultNode) => this.commonDocsProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getPendingDocsAutre(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND fiducial:domainContainerApplication:NXT AND collecte:type:autre`,
      facets: [{field: 'collecte:type'}],
      resultsMapper: (entry: ResultNode) => this.commonDocsProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getAllDocsMR(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `TYPE:'fp:document' AND (fiducial:domainContainerSociete:'FIDEXP' OR fiducial:domainContainerSociete:'FIDAGC' OR fiducial:domainContainerSociete:'FIDBUR') AND !fiducial:domainContainerApplication:SCAN AND !fiducial:domainContainerApplication:NXT`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonDocsProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  signedGerance(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:gestionImmobiliere AND ISNOTNULL:'fiduSign:nomEmetteur' AND fiduSign:statut:'DOCUMENT_SIGNE'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceImmobilierProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  cancelledGerance(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:gestionImmobiliere AND ISNOTNULL:'fiduSign:nomEmetteur' AND (fiduSign: statut:'DEMANDE_ANNULEE' OR fiduSign: statut:'DEMANDE_EXPIREE')`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceImmobilierProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  pendingGerance(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:gestionImmobiliere AND ISNOTNULL:'fiduSign:nomEmetteur' ${PENDING}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => ({
        ...this.commonFidusignProperties(entry),
        ...this.coreImmobilierProperties(entry),
      }),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  fidusignGerance(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:gestionImmobiliere AND ISNOTNULL:'fiduSign:nomEmetteur'`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonFidusignProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceSouscription(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:souscription ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceConformite(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:conformite ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceAdministratif(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:administratif ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceCorrespondancesAssocies(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:correspondances ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceVente(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:vente ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceSuccessions(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `fiducial:domainContainerSociete:Associes AND TYPE:\'fp:document\' AND fiducial:domainContainerFamille:successions_donations ${PROCESSED_GERANCE_ASSOCIES}`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) =>
        this.commonGeranceAssociesProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceCorrespondancesPartenaire(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:Partenaires AND TYPE:'fp:document' AND fiducial:domainContainerFamille:correspondances`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonGerancePartenaireProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceConvention(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:Partenaires AND TYPE:'fp:document' AND fiducial:domainContainerFamille:convention`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonGerancePartenaireProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceDUE(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:Partenaires AND TYPE:'fp:document' AND fiducial:domainContainerFamille:due_diligence`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonGerancePartenaireProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceAdministratifPartenaire(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:Partenaires AND TYPE:'fp:document' AND fiducial:domainContainerFamille:administratif`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => ({
        ...this.commonGerancePartenaireProperties(entry),
        Contact: entry.properties['gerance:contact'],
      }),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  getGeranceFacturation(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query:
        `fiducial:domainContainerSociete:Partenaires AND TYPE:'fp:document' AND fiducial:domainContainerFamille:facturation`,
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => this.commonGerancePartenaireProperties(entry),
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  // getAgentPartenaireGerance(): Observable<LabelValue[]> {
  //   const searchQuery = `AND cm:name:*`;

  //   return this.getPartenaireGerance(
  //     {searchQuery},
  //     'GERANCE.AgentList',
  //     (entry) => {
  //       const {properties, name} = entry;
  //       return {
  //         label: `${name} - ${properties['liste:compteur1']}`,
  //         value: name,
  //       };
  //     });
  // }

  // getPartenaireGerance(): Observable<LabelValue[]> {
  //   const searchQuery = `AND liste:libelle1:???? AND liste:libelle2:?*`;

  //   return this.getPartenaireGerance(
  //     {searchQuery},
  //     'GERANCE.ManagerList',
  //     (entry) => {
  //       const {properties} = entry;
  //       return {
  //         label: `${properties['liste:libelle1']} - ${properties['liste:libelle2']}`,
  //         value: properties['liste:libelle1'],
  //       };
  //     });
  // }

  getPartenaireGerance(skipCount = 0): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: `SITE:'liste' and fiducial:domainContainerSociete:Liste_partenaire_gerance AND cm:name:*`,
      facets: [{field: 'created' }],
      skipCount,
      resultsMapper: (entry) => {
        const {properties, name} = entry;
        return {
          libelle1: properties['liste:libelle1'],
          libelle2: properties['liste:libelle2'],
          compteur1: properties['liste:compteur1'],
          name: name
        };
      },
      maxItems: 300,
    };

    return this.makeSearch(searchParams);
  }

  // getPartenaireGerance(params: SearchParams, key: string, resultsMapper: (entry: ResultNode) => any) {
  //   if (key in localStorage) {
  //     return of(this.utils.loadAndDecompress(key));
  //   }

  //   const searchParams: FetchDataSearchParams = {
  //     query: `SITE:'liste' and fiducial:domainContainerSociete:Liste_partenaire_gerance`,
  //     facets: 'created',
  //     resultsMapper,
  //     maxItems: 600,
  //     ...params
  //   };

  //   return this.makeSearch(searchParams).pipe(
  //     map((res) => res.entries as any),
  //     map((res) => res.filter((el, index, self) => self.findIndex(e => el.value === e.value) === index)),
  //     tap((res) => this.utils.compressAndSave(key, res))
  //   );
  // }

  getUser(params: SearchParams): Observable<SearchResult> {
    const searchParams: FetchDataSearchParams = {
      query: '',
      facets: [{field: 'created' }],
      resultsMapper: (entry: ResultNode) => {
        const {properties} = entry;
        return {
          EmployeeNumber: properties['ldap:employeeNumber'],
          DepartmentNumber: properties['ldap:departmentNumber'],
          LastName: properties['cm:lastName'],
          FirstName: properties['cm:firstName'],
          Owner: properties['cm:owner'],
          UserName: properties['cm:userName'],
          Department: properties['ldap:department'],
          Email: properties['cm:email'],
          CodeBudgetPlus: properties['ldap:codeBudgetPlus'],
          OrganizationId: properties['cm:organizationId'],
          Organization: properties['cm:organization'],
        };
      },
      ...params,
    };

    return this.makeSearch(searchParams);
  }

  private getQueryBody(params: FetchDataSearchParams): QueryBody {
    const {sortBy, query, searchQuery, facets, maxItems, skipCount, pivots} = params;

    const sort = sortBy ? sortBy : {field: 'created', ascending: false};

    return {
      query: {
        query: `${query} ${searchQuery ?? ''}`,
      },
      facetFields: {
        facets: facets.map(f => {
          return {
            ...f,
            mincount: 1
          }
        }),
      },
      include: ['properties'],
      sort: [
        {
          type: 'FIELD',
          field: sort.field,
          ascending: sort.ascending,
        },
      ],
      paging: {
        maxItems,
        skipCount,
      },
      pivots: pivots
    };
  }

  //#region Common methods

  private coreProperties(entry: ResultNode) {
    return {
      id: entry.id,
      isFile: entry.isFile,
      name: entry.name,
      LastModification: entry.modifiedAt,
    };
  }

  private commonFactureProperties(entry: ResultNode) {
    const {properties} = entry;

    return {
      ...this.coreProperties(entry),
      CodeClient: properties['firme:codeClient'],
      NomClient: properties['fact:destinataire'],
      NumFacture: properties['fact:numero'],
      NomSociete: properties['fact:emetteur'],
      DateFacture: properties['fact:dateFacture'],
      DateDebutFacture: properties['fact:dateDebutPeriode'],
      DateFinFacture: properties['fact:dateFinPeriode'],
      Periodicite: properties['fact:periodicite'],
      Montant: properties['fact:totalTTC'],
      Duplicata: properties['fact:duplicata'],
    };
  }

  private commonExpertiseProperties(entry: ResultNode) {
    const {properties, content} = entry;

    return {
      ...this.commonDocsProperties(entry),
      Creator: properties['cm:creator'],
      SizeInBytes: content?.sizeInBytes ?? 0,
    };
  }

  private commonFidusignProperties(entry: ResultNode) {
    const {properties} = entry;

    return {
      ...this.fidusignCoreProperties(entry),
      Nommage: properties['fp:nommage'],
      DomainContainerSousFamille:
        properties['fiducial:domainContainerSousFamille'],
    };
  }

  private fidusignCoreProperties(entry: ResultNode) {
    const {properties, createdAt} = entry;

    return {
      ...this.coreProperties(entry),
      Description: properties['cm:description'],
      StatutSignature: properties['fiduSign:statut'],
      idMail: properties['fiduSign:idMail'],
      MailEmetteur: properties['fiduSign:mailEmetteur'],
      NomEmetteur: properties['fiduSign:nomEmetteur'],
      PrenomEmetteur: properties['fiduSign:prenomEmetteur'],
      MailSignataire1: properties['fiduSign:mailSignataire1'],
      NomSignataire1: properties['fiduSign:nomSignataire1'],
      PrenomSignataire1: properties['fiduSign:prenomSignataire1'],
      DateSignature1: properties['fiduSign:dateSignature1'],
      MailSignataire2: properties['fiduSign:mailSignataire2'],
      NomSignataire2: properties['fiduSign:nomSignataire2'],
      PrenomSignataire2: properties['fiduSign:prenomSignataire2'],
      DateSignature2: properties['fiduSign:dateSignature2'],
      MailSignataire3: properties['fiduSign:mailSignataire3'],
      NomSignataire3: properties['fiduSign:nomSignataire3'],
      PrenomSignataire3: properties['fiduSign:prenomSignataire3'],
      DateSignature3: properties['fiduSign:dateSignature3'],
      MailSignataire4: properties['fiduSign:mailSignataire4'],
      NomSignataire4: properties['fiduSign:nomSignataire4'],
      PrenomSignataire4: properties['fiduSign:prenomSignataire4'],
      DateSignature4: properties['fiduSign:dateSignature4'],
      DateDocument: createdAt,
      FinContrat: properties['contrat:dateFinContrat'],
      Resiliation: properties['contrat:resiliation'],
      Reconduction: properties['contrat:reconduction'],
      Origine: properties['fiduSign:origine'],
      Callback: properties['fiduSign:callback'],
      Fournisseur: properties['contrat:fournisseur'],
      DatePriseEffet: properties['contrat:dateContrat'],
      ClientInterne: properties['contrat:clientinterne'],
      Nature: properties['contrat:nature'],
      Organisme: properties['fp:organisme'],
      IdClient: properties['fp:idClient'],
      UuidsLink: properties['fiduSign:uuidsLink'],
      RecordId: properties['fiduSign:recordId'],
      DateCertification: properties['fiduSign:dateCertification']
    };
  }

  private commonGeranceAssociesProperties(entry: ResultNode) {
    const {properties, content} = entry;

    return {
      ...this.coreGeranceProperties(entry),
      DernierIntervenant: properties['cm:author'],
      NomAssocie: properties['gerance:nomAssocie'],
      NumeroAssocie: properties['gerance:numeroAssocie'],
      PartenaireGerance: properties['gerance:contact'],
      TypeDocumentGerance: properties['fiducial:domainContainerSousFamille'],
      SizeInBytes: content?.sizeInBytes ?? 0,
    };
  }

  private commonGeranceImmobilierProperties(entry: ResultNode) {
    const {properties} = entry;

    return {
      ...this.fidusignCoreProperties(entry),
      ...this.coreImmobilierProperties(entry),
      Nommage: properties['fp:nommage'],
      Categorie: properties['fiducial:domainContainerFamille'],
      SousCategorie: properties['fiducial:domainContainerSousFamille'],
    };
  }

  private coreImmobilierProperties(entry: ResultNode) {
    const {properties} = entry;

    return {
      Proprietaire: properties['gerance:immeubleProprietaire'],
      NomImmeuble: properties['gerance:immeubleNom'],
      NomLocataire: properties['gerance:locataireNom'],
      Title: properties['cm:title'],
    };
  }

  private conseilCoreProperties(entry: ResultNode) {
    const {properties, createdAt} = entry;
    return {
      ...this.coreProperties(entry),
      Reference: properties['contrat:numero'],
      Nommage: properties['cm:title'],
      Nature: properties['contrat:nature'],
      TypeDocument: properties['fiducial:domainContainerSousFamille'],
      Categorie: properties['fiducial:domainContainerFamille'],
      DateReception: properties['conseil:dateReception'],
      DateContrat: properties['contrat:dateContrat'],
      DateSignature: properties['fp:dateSignature'],
      DateFinValidite: properties['contrat:dateFinContrat'],
      DateEmission: properties['fp:dateDocument'],
      DateCreation: createdAt,
      CodeClient: properties['firme:codeClient'],
      Description: properties['cm:description'],
      Acheteur: properties['contrat:acheteur'],
      Createur: properties['cm:author'],
      CodeBudget: properties['firme:codeBudget'],
    };
  }

  private commonConseilProperties(entry: ResultNode) {
    const {content} = entry;

    return {
      ...this.conseilCoreProperties(entry),
      SizeInBytes: content?.sizeInBytes ?? 0,
    };
  }

  private commonPendingProperties(entry: ResultNode) {
    const {properties} = entry;

    return {
      ...this.conseilCoreProperties(entry),
      Fournisseur: properties['contrat:fournisseur'],
      Produit: properties['conseil:produit'],
      ContratNature: properties['contrat:nature'],
    };
  }

  private commonClientProperties(entry: ResultNode) {
    const {properties} = entry;
    return {
      ...this.coreProperties(entry),
      CodeClient: properties['firme:codeClient'],
      Nommage: properties['fp:nommage'],
      SousCategory: properties['fiducial:domainContainerSousFamille'],
    };
  }

  private commonGerancePartenaireProperties(entry: ResultNode) {
    const {properties} = entry;
    return {
      ...this.coreGeranceProperties(entry),
      TypePartenaire: properties['gerance:typePartenaire'],
      TypeDocumentGerance: properties['fiducial:domainContainerSousFamille'],
    };
  }

  private coreGeranceProperties(entry: ResultNode) {
    const {properties, createdAt} = entry;
    return {
      ...this.coreProperties(entry),
      CategorieProduit: properties['gerance:categorieProduit'],
      CodeAgent: properties['gerance:codeAgent'],
      CodeManager: properties['gerance:codeManager'],
      DateCreation: createdAt,
      DateDocument: properties['fp:dateDocument'],
      DateValidite: properties['gerance:dateValidite'],
      NomAgent: properties['gerance:nomAgent'],
      NommageGerance: properties['fp:nommage'],
      NomManager: properties['gerance:nomManager'],
      Produit: properties['gerance:produit'],
      SousDossiers: properties['gerance:sousDossier'],
      Description: properties['cm:description'],
      TypeDossierAssocie: properties['gerance:typeDossierAssocie'],
      StatutDocumentAssocie: properties['gerance:statutDocumentAssocie'],
    };
  }

  private commonDocsProperties(entry: ResultNode) {
    const {properties, createdAt} = entry;
    return {
      ...this.coreProperties(entry),
      Branche: properties['fiducial:domainContainerBranche'],
      Societe: properties['fiducial:domainContainerSociete'],
      Application: properties['fiducial:domainContainerApplication'],
      Famille: properties['fiducial:domainContainerFamille'],
      CollecteMessage: properties['collecte:msg'],
      SousFamille: properties['fiducial:domainContainerSousFamille'],
      Author: properties['cm:author'],
      Title: properties['cm:title'],
      DateCreation: createdAt,
      Nommage: properties['fp:nommage'],
      CollecteType: properties['collecte:type'],
      DateDocument: properties['fp:dateDocument'],
      NatureObjet: properties['fp:natureObjet'],
      Statut: properties['fp:statut'],
      CodeBudget: properties['firme:codeBudget'],
      CodeClient: properties['firme:codeClient'],
      Matricule: properties['firme:matriculeCollab'],
      Ecoffre: properties['firme:coffreStatutEnvoi'],
    };
  }

  private getFidusignStatutQuery() {
    return [
      'SIGNATURE_EC_*',
      'MAIL_ENVOYE',
      'DOCUMENT_LU',
      'MAIL_RENVOYE'
    ]
      .map((s) => `fiduSign:statut:'${s}'`)
      .join(' OR ');
  }

  //#endregion
}
