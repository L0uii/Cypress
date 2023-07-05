import { endpoints } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { CustomerExpertise } from 'models/customer-expertise';
import { UtilsService } from './utils.service';
import { FetchDataSearchParams, FetchDataService } from './fetch-data.service';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { ResultBucketsBuckets, ResultNode, RequestPivot, GenericBucket } from '@alfresco/js-api';
import { CLASSEMENT } from 'models/mr';

export interface SimpleMissingDocuments {
  nomDocument: string;
  isMissing: boolean;
  commentaires?: string;
}

export interface MissingDocuments extends SimpleMissingDocuments {
  onglet: string;
  classement: string;
  showOnEmail: boolean;
}

export interface MissingDocuments {
  onglet: string;
  classement: string;
  nomDocument: string;
  isMissing: boolean;
  showOnEmail: boolean;
  commentaires?: string;
}

interface DocumentsRequiredBySousFamille {
  sousFamille: string;
  sousFamilleLabel: string;
  isAlwaysMissing: boolean;
  conditionalOkDocuments: string[];
  expirationClause?: string;
  criteria?: 'DocumentEntreprise' | 'DocumentSalarie';
}

interface DocumentsBySousFamille {
  sousFamille: string;
  sousFamilleLabel?: string;
  count: number;
}

interface DocumentsByEmployee {
  employeeName: string;
  employeeDocuments: string[];
}

export interface MissingDocumentsByEmployee {
  name: string;
  documents: MissingDocuments[];
  missingCount: number;
}

export interface MissingDocumentByOnglet {
  onglet: string;
  documents: SimpleMissingDocuments[];
  order: number;
}

interface ClientEmployee {
  contractNumber: string;
  employeeCommonName?: string;
  employeeFirstName: string;
  employeeIdentificationNumber: string;
  employeeNIR: string;
  employeeName: string;
  employeeStatus: string;
}

@Injectable({
  providedIn: 'root',
})
export class MissingDocumentsMrService {
  private tabsMapper = Object.fromEntries(
    CLASSEMENT.map((x) => [
      x.sousFamille,
      { classement: x.labelFamille, onglet: x.onglet },
    ])
  );

  constructor(
    private fetchDataService: FetchDataService,
    private utils: UtilsService,
    private http: HttpClient
  ) { }

  getMissingDocumentsComptables(profileType: string, customer: CustomerExpertise) {
    return this.getRequiredDocumentsList(profileType)
      .pipe(
        switchMap(
          requiredList => this.getCompanyDocs(requiredList, customer.numeroDossier)
          	.pipe(map((res) => this.missingDocumentsComptablesMapper(res, requiredList)))
        )
      );
  }

  getMissingDocumentsSocial(customer: CustomerExpertise) {
    return this.getRequiredDocumentsList('Social')
      .pipe(switchMap(res => this.getDocsSocial(res, customer.numeroDossier)));
  }

  private getRequiredDocumentsList(listName: string): Observable<DocumentsRequiredBySousFamille[]> {
    const localStorageKey = `MR.${listName}`
    const cachedResults = this.utils.loadAndDecompress(localStorageKey);

    if (!this.utils.isEmpty(cachedResults)) {
      return of(cachedResults)
    }

    const params: FetchDataSearchParams = {
      query: `SITE:'liste' and fiducial:domainContainerSociete:Liste_docManquants_${listName}`,
      facets: [{field: 'created'}],
      maxItems: 50,
      sortBy: {
        field: 'name',
        ascending: true
      },
      resultsMapper: (entry: ResultNode) => {
        const { properties, name } = entry;
        return {
          sousFamille: name,
          sousFamilleLabel: properties['liste:libelle1'],
          isAlwaysMissing: properties['liste:docMToujoursInclus'] === 'oui',
          conditionalOkDocuments: properties['liste:docMOkSiPresent']?.split(','),
          expirationClause: properties['liste:docMRechercheSupp'],
          criteria: listName === 'Social' ? properties['liste:docMCritereSupp'] : undefined
        }
      },
    };

    return this.fetchDataService.makeSearch(params)
      .pipe(
        map((resp) => resp.entries),
        tap((list: any[]) => this.utils.compressAndSave(localStorageKey, list))
      );
  }

  private getCompanyDocs(requiredList: DocumentsRequiredBySousFamille[], codeClient: string): Observable<DocumentsBySousFamille[]> {
    const query = `firme:codeClient:${codeClient} AND (${this.buildGetAllDocumentsQuery(requiredList.filter(r => !r.isAlwaysMissing))})`;
    const params: FetchDataSearchParams = {
      query,
      facets: [{field: 'fiducial:domainContainerSousFamille'}],
      maxItems: 1
    };

    return this.fetchDataService.makeSearch(params).pipe(
      map((resp) => resp.facets ? resp.facets[0].buckets : []),
      map((resp: ResultBucketsBuckets[]) =>
        resp
          .map((r) => {
            return {
              sousFamille: r.label,
              count: r.count,
            };
          })
          .sort((a, b) => this.utils.sortStrings(a.sousFamille, b.sousFamille))
      )
    );
  }

  private getDocsSocial(
    requiredList: DocumentsRequiredBySousFamille[],
    codeClient: string
  ): Observable<{
    documentList: MissingDocuments[],
    byEmployeeList: MissingDocumentsByEmployee[]
  }> {
    return forkJoin([
      this.getCompanyDocs(requiredList.filter(r => r.criteria === 'DocumentEntreprise'), codeClient),
      this.getDocsSocialByEmployee(requiredList.filter(r => r.criteria === 'DocumentSalarie'), codeClient),
      this.getEmployeeList(codeClient)
    ]).pipe(
      map(([companyDocs, employeeeDocs, employees]) => this.missingDocumentsSocialMapper(companyDocs, employeeeDocs, requiredList, employees))
    );
  }

  private getDocsSocialByEmployee(requiredList: DocumentsRequiredBySousFamille[], codeClient: string): Observable<DocumentsByEmployee[]> {
    const query = `firme:codeClient:${codeClient} AND (${this.buildGetAllDocumentsQuery(requiredList.filter(r => !r.isAlwaysMissing))})`;

    const params: FetchDataSearchParams = {
      query,
      facets: [
        { field: 'fiducial:domainContainerSousFamille', label: 'SousFamille' },
        { field: 'fp:nom', label: 'client' }
      ],
      maxItems: 1,
      pivots: [{
        key: 'client',
        pivots: [
          {
            key: 'SousFamille'
          }
        ]
      }]
    };

    return this.fetchDataService.makeSearch(params).pipe(
      map(
        (resp) => !resp.facets
          ? []
          : resp.facets[0].buckets.filter(r => r.label)
      ),
      map((resp: GenericBucket[]) => resp
        .map((r) => {
          return {
            employeeName: r.label,
            employeeDocuments: r.facets[0].buckets.map(b => b.label)
          };
        })
      )
    );
  }

  private getEmployeeList(clientCode: string): Observable<ClientEmployee[]> {
    return this.http.post<ClientEmployee[]>(
      endpoints.frontGEDEmployeeList,
      {},
      { headers: { clientCode } }
    ).pipe(
      map(res => res ?? [])
    );
  }

  private buildGetAllDocumentsQuery(requiredList: DocumentsRequiredBySousFamille[]): string {
    const rowsWithoutExpiration = requiredList.filter(r => !r.expirationClause).map(r => r.sousFamille);
    const rowsWithExpiration = requiredList.filter(r => r.expirationClause);

    const rowsWithoutExpirationClause = rowsWithoutExpiration.length ?
      `fiducial:domainContainerSousFamille:(${rowsWithoutExpiration.join(' ')})` :
      '';
    const rowsWithExpirationClause = rowsWithExpiration
      .map(r => `(fiducial:domainContainerSousFamille:'${r.sousFamille}' ${r.expirationClause})`)
      .join(' OR ');

    return [rowsWithoutExpirationClause, rowsWithExpirationClause].filter(s => s).join(' OR ');
  }

  private missingDocumentsComptablesMapper(allDocs: DocumentsBySousFamille[], requiredDocuments: DocumentsRequiredBySousFamille[]): MissingDocuments[] {
    let documents: MissingDocuments[] = [];
    const oneOrAnotherDocList = [
      'InscriptionEntreprise',
      'RCSExtraitInfolegale',
      'SireneExtraitInfolegale'
    ];
    const docExpirationList = [
      { name: 'CAC_RapportAnnuel', monthsToExpire: 18 },
      { name: 'OrganeDeGestion_ProcesVerbal', monthsToExpire: 18 },
      { name: 'AG_ProcesVerbal', monthsToExpire: 18 },
      { name: 'OrganeDeGestion_Rapport', monthsToExpire: 18 },
    ];
    const hideOnEmail = [
      'FicheAcceptationMission',
      'OptionFiscale',
      'InscriptionEntreprise',
      'RCSExtraitInfolegale',
      'LettreMissionFiducialExpertise',
      'LettreMissionFiducialExpertise_ConditionsGeneralesDeCollaboration',
      'ContratDeServicesFiducialConsulting',
      'ListeDesDirigeants',
      'ContratDeServicesFiducialConsultinge_ConditionsGeneralesDePrestationDeServices',
      'LettreDeMission_Avenant',
      'MandatPrelevementSepaExpertiseOuConsulting',
      'ConventionReglementee',
      'MandatEtebac',
      'MandatTravailleurIndependant',
      'MandatTransmissionDeDocuments',
      'SireneExtraitInfolegale'
    ];

    for (const reqDoc of requiredDocuments) {
      const { classement, onglet } = this.tabsMapper[reqDoc.sousFamille];
      let commentaires: string;

      if (reqDoc.sousFamille === 'LettreDeMission_Avenant') {
        commentaires = 'A vérifier selon les missions en cours';
      }

      if (oneOrAnotherDocList.includes(reqDoc.sousFamille)) {
        commentaires = 'Absent si aucun parmi (Inscription entreprise, RCS - Extrait Infolégale et Répertoire Sirene - Extrait Infolégale)';
      }

      const docWithExpiration = docExpirationList.find(d => d.name === reqDoc.sousFamille);
      if (docWithExpiration) {
        commentaires = `Absent si aucun document depuis ${docWithExpiration.monthsToExpire} mois`;
      }

      let document = {
        classement,
        onglet,
        nomDocument: reqDoc.sousFamilleLabel,
        commentaires
      };

      if (reqDoc.isAlwaysMissing) {
        documents.push({ ...document, isMissing: true, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
        continue;
      }

      if (allDocs.find(r => r.sousFamille === reqDoc.sousFamille)) {
        documents.push({ ...document, isMissing: false, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
        continue;
      }

      if (reqDoc.conditionalOkDocuments?.length) {
        const conditionalDocCount = allDocs.filter(r => reqDoc.conditionalOkDocuments.includes(r.sousFamille))
          .reduce((acc, curr) => acc + curr.count, 0);

        if (conditionalDocCount > 0) {
          documents.push({ ...document, isMissing: false, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
          continue;
        }
      }

      documents.push({ ...document, isMissing: true, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
    }

    return documents
      .sort((a, b) => this.utils.sortStrings(a.classement, b.classement))
      .sort((a, b) => this.utils.sortStrings(a.onglet, b.onglet));
  }

  private missingDocumentsSocialMapper(
    docsByCompany: DocumentsBySousFamille[],
    docsByEmployees: DocumentsByEmployee[],
    requiredDocuments: DocumentsRequiredBySousFamille[],
    employeeList: ClientEmployee[]
  ): {
    documentList: MissingDocuments[],
    byEmployeeList: MissingDocumentsByEmployee[]
  } {
    const activeEmployeesList = employeeList
      .filter(e => e.employeeStatus === 'Actif');
    const activeEmployeesNames = activeEmployeesList
      .map(e => `${e.employeeName} ${e.employeeFirstName}`);
    const docsByActiveEmployees = docsByEmployees
      .filter(d => activeEmployeesNames.includes(d.employeeName));


    const documentList = this.getMissingDocumentsSocialList(
      requiredDocuments.filter(d => d.criteria === 'DocumentEntreprise'),
      docsByCompany
    );

    const byEmployeeList = this.getMissingDocumentsSocialByEmployee(
      docsByActiveEmployees,
      activeEmployeesList,
      requiredDocuments.filter(d => d.criteria === 'DocumentSalarie')
    );

    return {
      documentList,
      byEmployeeList
    };
  }

  private getMissingDocumentsSocialList(
    requiredDocuments: DocumentsRequiredBySousFamille[],
    companyDocs: DocumentsBySousFamille[]
  ): MissingDocuments[] {
    let documents: MissingDocuments[] = [];
    const hideOnEmail = [
      'MandatTransmissionDeDocuments',
      'JournalPeriodiqueSalarie',
      'JustificatifReductionsCharges'
    ];


    if (companyDocs.length > 0) {
      for (const reqDoc of requiredDocuments) {
        const { classement, onglet } = this.tabsMapper[reqDoc.sousFamille];

        let document = {
          classement,
          onglet,
          nomDocument: reqDoc.sousFamilleLabel
        };

        if (reqDoc.isAlwaysMissing) {
          documents.push({ ...document, isMissing: true, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
          continue;
        }

        if (companyDocs.some(doc => doc.sousFamille === reqDoc.sousFamille)) {
          documents.push({ ...document, isMissing: false, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
          continue;
        }

        documents.push({ ...document, isMissing: true, showOnEmail: !hideOnEmail.find(d => d === reqDoc.sousFamille) });
      }
    } else {
      documents = requiredDocuments.map(r => this.missingDocumentsMapper(r, true, !hideOnEmail.find(d => d === r.sousFamille) ));
    }

    documents
      .sort((a, b) => this.utils.sortStrings(a.classement, b.classement))
      .sort((a, b) => this.utils.sortStrings(a.onglet, b.onglet));
    return documents;
  }

  private getMissingDocumentsSocialByEmployee(
    docsByActiveEmployees: DocumentsByEmployee[],
    activeEmployeesList: ClientEmployee[],
    requiredDocuments: DocumentsRequiredBySousFamille[]
  ) {
    let documentList: MissingDocumentsByEmployee[] = [];
    const docExpirationList = [
      { name: 'JournalPeriodiqueSalarie', monthsToExpire: 12 },
      { name: 'EpargneSalarie_DocumentsSalarie', monthsToExpire: 12 },
      { name: 'JustificatifReductionCharges', monthsToExpire: 12 },
    ]

    const signedDocList = [
      'ContratDeTravail',
      'ContratDeTravailAvenant',
    ];

    const reqDocsWithComments = requiredDocuments.map(r => {
      let commentaires: string;
      if (signedDocList.includes(r.sousFamille)) {
        commentaires = 'Absent si non signé';
      }

      const docWithExpiration = docExpirationList.find(d => d.name === r.sousFamille);
      if (docWithExpiration) {
        commentaires = `Absent si aucun document depuis ${docWithExpiration.monthsToExpire} mois`;
      }

      return {
        ...r,
        commentaires
      }
    })

    if (docsByActiveEmployees.length > 0) {
      documentList = activeEmployeesList.map(a => {
        const name = `${a.employeeName} ${a.employeeFirstName}`;
        const documents = reqDocsWithComments
          .filter(d => d.criteria === 'DocumentSalarie')
          .map(r => {
            return this.missingDocumentsMapper(
            r,
            this.checkSocialDocMissing(
              r,
              docsByActiveEmployees.find(d => d.employeeName === `${a.employeeName} ${a.employeeFirstName}`)?.employeeDocuments ?? []
            ),
            true,
            r.commentaires
          )})
          .sort((a, b) => this.utils.sortStrings(a.classement, b.classement));
        const missingCount = documents.filter(d => d.isMissing).length;

        return { name, documents, missingCount };
      });
    } else {
      documentList = activeEmployeesList.map(a => {
        const name = `${a.employeeFirstName} ${a.employeeName}`;
        const documents = requiredDocuments
          .map(r => this.missingDocumentsMapper(r, true))
          .sort((a, b) => this.utils.sortStrings(a.classement, b.classement));
        const missingCount = documents.length;

        return {
          name,
          documents,
          missingCount
        };
      });
    }

    return documentList;
  }

  private missingDocumentsMapper(
    requiredDocument: DocumentsRequiredBySousFamille,
    isMissing: boolean,
    showOnEmail: boolean = true,
    commentaires?: string
  ): MissingDocuments {
    const { classement, onglet } = this.tabsMapper[requiredDocument.sousFamille];
    return {
      classement,
      onglet,
      nomDocument: requiredDocument.sousFamilleLabel,
      isMissing,
      showOnEmail,
      commentaires
    };
  }

  private checkSocialDocMissing(
    reqDoc: DocumentsRequiredBySousFamille,
    docsByEmployee: string[]
  ): boolean {
    if (reqDoc.isAlwaysMissing || !docsByEmployee.length) {
      return true;
    }

    if (docsByEmployee.includes(reqDoc.sousFamille)) {
      return false;
    }

    return true;
  }
}
