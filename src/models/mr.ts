export interface MrMetadatas {
  label: string,
  metadata: string,
  name: string,
  obligatoire: boolean,
  type: string
}

export interface MrDateDocuments {
  metadata: string,
  name: string,
  label?: string,
  type: string,
  order?: number,
  obligatoire: boolean,
  position: string,
  options?: string[],
  hint?: string,
  typedDate?: string
}

export const MANDATORY_METADATAS: MrMetadatas[] = [
  {
    label: 'Numéro de dossier',
    metadata: 'firme:codeClient',
    name: 'codeClient',
    obligatoire: true,
    type: 'text'
  },
  {
    label: 'Matricule du collaborateur',
    metadata: 'firme:matriculeCollab',
    name: 'matriculeCollab',
    obligatoire: true,
    type: 'text'
  },
  {
    label: 'Code budget',
    metadata: 'firme:codeBudget',
    name: 'codeBudget',
    obligatoire: true,
    type: 'text'
  },
  {
    label: 'Type de document',
    metadata: 'fiducial:domainContainerSousFamille',
    name: 'sousFamille',
    obligatoire: true,
    type: 'text'
  },
  {
    label: 'Classement : dossier / sous dossier',
    metadata: 'fiducial:domainContainerFamille',
    name: 'famille',
    obligatoire: true,
    type: 'text'
  },
  {
    label: 'Nom du document',
    metadata: 'fp:nommage',
    name: 'nommage',
    obligatoire: true,
    type: 'text'
  },
  {
    label: '',
    metadata: 'fiducial:domainContainerApplication',
    name: 'application',
    obligatoire: false,
    type: 'text'
  },
];

export const OPTIONS_STATUT: string[] = ['projet', 'signé'];

export const DATE_DOCUMENT: MrDateDocuments = {
  metadata: 'fp:dateDocument',
  name: 'dateDocument',
  type: 'date',
  obligatoire: true,
  position: 'sidenav'
};

export const OBJET: MrDateDocuments = {
  metadata: 'fp:objet',
  name: 'objet',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const STATUT: MrDateDocuments = {
  metadata: 'fp:statut',
  name: 'statut',
  type: 'options',
  options: OPTIONS_STATUT,
  obligatoire: true,
  position: 'sidenav'
};

export const DATE_ASSEMBLEE_GENERALE: MrDateDocuments = {
  metadata: 'fp:dateAssembleeGenerale',
  name: 'dateAssembleeGenerale',
  type: 'date',
  obligatoire: true,
  position: 'sidenav'
};

export const NATURE: MrDateDocuments = {
  metadata: 'fp:nature',
  name: 'nature',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const DATE_FIN_EXERCICE: MrDateDocuments = {
  metadata: 'fp:dateFinExercice',
  name: 'dateFinExercice',
  type: 'date',
  obligatoire: true,
  position: 'sidenav'
};

export const DESTINATAIRE: MrDateDocuments = {
  metadata: 'fp:destinataire',
  name: 'destinataire',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const NOM_PRENOM: MrDateDocuments = {
  metadata: 'fp:nomPrenom',
  name: 'nomPrenom',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const NUMERO_FORMULAIRE: MrDateDocuments = {
  metadata: 'fp:numeroFormulaire',
  name: 'numeroFormulaire',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const NOM_OGA: MrDateDocuments = {
  metadata: 'fp:nomOGA',
  name: 'nomOGA',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const NATURE_OBJET: MrDateDocuments = {
  metadata: 'fp:natureObjet',
  name: 'natureObjet',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const ORGANE_GESTION: MrDateDocuments = {
  metadata: 'fp:organeGestion',
  name: 'organeGestion',
  type: 'text',
  obligatoire: true,
  position: 'sidenav'
};

export const DESCRIPTION: MrDateDocuments = {
  metadata: 'cm:description',
  name: 'description',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
  hint: '100'
};

export const MOIS_DECLARE: MrDateDocuments = {
  metadata: 'fp:moisReference',
  name: 'moisReference',
  type: 'month',
  typedDate: '',
  obligatoire: true,
  position: 'sidenav',
};

export const DECLARATION: MrDateDocuments = {
  metadata: 'fp:declaration',
  name: 'declaration',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const DOMAINE: MrDateDocuments = {
  metadata: 'fp:domaineExpertise',
  name: 'domaineExpertise',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM: MrDateDocuments = {
  metadata: 'fp:nom',
  name: 'nom',
  type: 'searchSalarie',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DEBUT_CONTRAT: MrDateDocuments = {
  metadata: 'fp:dateDebutContrat',
  name: 'dateDebutContrat',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DEBUT_AVENANT: MrDateDocuments = {
  metadata: 'fp:dateAvenant',
  name: 'dateAvenant',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_FIN_PERIODE: MrDateDocuments = {
  metadata: 'fp:dateFinPeriode',
  name: 'dateFinPeriode',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM_ASSUREUR: MrDateDocuments = {
  metadata: 'fp:nomAssureur',
  name: 'nomAssureur',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const SOCIETE_EMETTRICE: MrDateDocuments = {
  metadata: 'fp:societeEmettrice',
  name: 'societeEmettrice',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const MOIS_PAIEMENT: MrDateDocuments = {
  metadata: 'fp:moisPaiement',
  name: 'moisPaiement',
  type: 'month',
  typedDate: '',
  obligatoire: true,
  position: 'sidenav',
};

export const ANNEE_DECLARATION: MrDateDocuments = {
  metadata: 'fp:anneeDeclaration',
  name: 'anneeDeclaration',
  type: 'year',
  typedDate: '',
  obligatoire: true,
  position: 'sidenav',
};

export const TYPE: MrDateDocuments = {
  metadata: 'fp:type',
  name: 'type',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const CONTENTIEUX: MrDateDocuments = {
  metadata: 'fp:contentieux',
  name: 'contentieux',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const EMETTEUR: MrDateDocuments = {
  metadata: 'fp:emetteur',
  name: 'emetteur',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const ORGANISME: MrDateDocuments = {
  metadata: 'fp:organisme',
  name: 'organisme',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM_FOURNISSEUR: MrDateDocuments = {
  metadata: 'fp:nomFournisseur',
  name: 'nomFournisseur',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM_ASSOCIE: MrDateDocuments = {
  metadata: 'fp:nomAssocie',
  name: 'nomAssocie',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const PRENOM_ASSOCIE: MrDateDocuments = {
  metadata: 'fp:prenomAssocie',
  name: 'prenomAssocie',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const MONTANT: MrDateDocuments = {
  metadata: 'fp:montant',
  name: 'montant',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NATURE_IMMOBILISATION: MrDateDocuments = {
  metadata: 'fp:natureImmobilisation',
  name: 'natureImmobilisation',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_ADHESION: MrDateDocuments = {
  metadata: 'fp:dateAdhesion',
  name: 'dateAdhesion',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM_AUTRE: MrDateDocuments = {
  metadata: 'fp:nomAutre',
  name: 'nomAutre',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NOM_CONTRIBUABLE: MrDateDocuments = {
  metadata: 'fp:nomContribuable',
  name: 'nomContribuable',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const PRENOM_CONTRIBUABLE: MrDateDocuments = {
  metadata: 'fp:prenomContribuable',
  name: 'prenomContribuable',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const BANQUE: MrDateDocuments = {
  metadata: 'fp:banque',
  name: 'banque',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const IBAN: MrDateDocuments = {
  metadata: 'fp:iban',
  name: 'iban',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DEBUT_PERIODE: MrDateDocuments = {
  metadata: 'fp:dateDebutPeriode',
  name: 'dateDebutPeriode',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DEBUT_EXERCICE: MrDateDocuments = {
  metadata: 'fp:dateDebutExercice',
  name: 'dateDebutExercice',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const SOCIETE_BENEFICIAIRE: MrDateDocuments = {
  metadata: 'fp:societeBeneficiaire',
  name: 'societeBeneficiaire',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const LOCAL: MrDateDocuments = {
  metadata: 'fp:local',
  name: 'local',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const NUMERO_CHRONO: MrDateDocuments = {
  metadata: 'fp:numChrono',
  name: 'numeroChrono',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_FIN_CONTRAT: MrDateDocuments = {
  metadata: 'fp:dateFinContrat',
  name: 'dateFinContrat',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_ENVOI: MrDateDocuments = {
  metadata: 'fp:dateEnvoi',
  name: 'dateEnvoi',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DERNIER_JOUR_TRAVAIL: MrDateDocuments = {
  metadata: 'fp:dateDernierJourTravail',
  name: 'dateDernierJourTravail',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_SIGNATURE: MrDateDocuments = {
  metadata: 'fp:dateSignature',
  name: 'dateSignature',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const REFERENCE_IMPRIME: MrDateDocuments = {
  metadata: 'fp:refImprime',
  name: 'referenceImprime',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_DE_REPRISE: MrDateDocuments = {
  metadata: 'fp:dateReprise',
  name: 'dateReprise',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_EDITION: MrDateDocuments = {
  metadata: 'fp:dateHeureEdition',
  name: 'dateEdition',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const DATE_FACTURE: MrDateDocuments = {
  metadata: 'fact:dateFacture',
  name: 'dateFacture',
  type: 'date',
  obligatoire: true,
  position: 'sidenav',
};

export const FACTURE_NUMERO: MrDateDocuments = {
  metadata: 'fact:numero',
  name: 'factNumero',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const FACTURE_EMETTEUR: MrDateDocuments = {
  metadata: 'fact:emetteur',
  name: 'factEmetteur',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const FACTURE_DESTINATAIRE: MrDateDocuments = {
  metadata: 'fact:destinataire',
  name: 'factDestinataire',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
};

export const FACTURE_DUPLICATA: MrDateDocuments = {
  metadata: 'fact:duplicata',
  name: 'factDuplicata',
  type: 'boolean',
  obligatoire: true,
  position: 'sidenav',
};

export const FACTURE_AVOIR: MrDateDocuments = {
  metadata: 'fact:avoir',
  name: 'factAvoir',
  type: 'boolean',
  obligatoire: true,
  position: 'sidenav',
};
export const FACTURE_MONTANT: MrDateDocuments = {
  metadata: 'fact:totalTTC',
  name: 'factMontant',
  type: 'text',
  obligatoire: true,
  position: 'sidenav',
}
export const MESSAGE_DEST_CLIENT: MrDateDocuments = {
  metadata: 'fp:message',
  name: 'messageDestClient',
  type: 'text',
  obligatoire: false,
  position: 'sidenav',
}

export interface MrClassement {
  labelSousFamille: string,
  sousFamille: string,
  famille: string,
  labelFamille: string,
  onglet: string,
  displayClient: boolean,
  fpNommageCalc?: string,
  listeMetadatas: MrDateDocuments[]
  tags?: string[],
  noUpload?: boolean,
}

export const CLASSEMENT: MrClassement[] = [
  {
    labelSousFamille: 'Acte divers',
    sousFamille: 'ActeDivers',
    famille: 'acquisition',
    labelFamille: 'Actes d\'acquisition',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Acte - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date de l\'acte', order: 2 },
      { ...OBJET, label: 'Objet de l\'acte', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['acquisition']
  },
  {
    labelSousFamille: 'Ambulanciers',
    sousFamille: 'Ambulanciers',
    famille: 'Suivi_Temps_de_travail',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - EVP - Correspondances paie',
    onglet: 'Social',
    noUpload: true,
    displayClient: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ],
    tags: ['Eléments variables de paie', 'Prévisionnel temps de travail', 'Relevé d\'activité']
  },
  {
    labelSousFamille: 'Aide à domicile',
    sousFamille: 'AideADomicile',
    famille: 'Suivi_Temps_de_travail',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - EVP - Correspondances paie',
    onglet: 'Social',
    noUpload: true,
    displayClient: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ],
    tags: ['Eléments variables de paie', 'Prévisionnel temps de travail', 'Relevé d\'activité']
  },
  {
    labelSousFamille: 'Liaison comptable',
    sousFamille: 'Liaison_Comptable',
    famille: 'Documents_comptables',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Fichier FEC',
    sousFamille: 'FEC',
    famille: 'Documents_comptables',
    labelFamille: 'Fichier des écritures comptables',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Fichier FEC surveillance',
    sousFamille: 'FEC_HORS_TENUE',
    famille: 'Documents_comptables',
    labelFamille: 'Fichier des écritures comptables',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Compte de résultat analytique de clôture',
    sousFamille: 'VolumeCloture_CompteResultatAnalytique',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'SIG analytiques de clôture',
    sousFamille: 'VolumeCloture_SIGAnalytiques',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Balance analytique de clôture',
    sousFamille: 'VolumeCloture_BalanceAnalytique',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Grand-livre analytique de clôture',
    sousFamille: 'VolumeCloture_GrandLivreAnalytique',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Compte de résultat analytique de clôture Visible',
    sousFamille: 'VolumeCloture_CompteResultatAnalytique_Visible',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'SIG analytiques de clôture Visible',
    sousFamille: 'VolumeCloture_SIGAnalytiques_Visible',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Balance analytique de clôture Visible',
    sousFamille: 'VolumeCloture_BalanceAnalytique_Visible',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Grand-livre analytique de clôture Visible',
    sousFamille: 'VolumeCloture_GrandLivreAnalytique_Visible',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Etats analytiques',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
  },
  {
    labelSousFamille: 'Factures',
    sousFamille: 'Facture',
    famille: 'Documents_comptables',
    labelFamille: 'Factures',
    onglet: 'Fiducial',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...FACTURE_NUMERO, label: 'Référence de la facture', order: 2 },
      { ...FACTURE_EMETTEUR, label: 'Emetteur', order: 3 },
      { ...DATE_FACTURE, label: 'Date facture', order: 4 },
      { ...FACTURE_MONTANT, label: 'Montant facture', order: 5 },
    ],
  },
  {
    labelSousFamille: 'Facture',
    sousFamille: 'Facture',
    famille: 'Facture',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...FACTURE_NUMERO, label: 'Référence de la facture', order: 2 },
      { ...FACTURE_EMETTEUR, label: 'Emetteur', order: 3 },
      { ...DATE_FACTURE, label: 'Date facture', order: 4 },
      { ...FACTURE_MONTANT, label: 'Montant facture', order: 5 },
    ],
  },
  {
    sousFamille: 'AG_ProcesVerbal',
    labelSousFamille: 'AG - Procès-verbal',
    famille: 'AG',
    labelFamille: 'Secrétariat juridique - Assemblées générales',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'PV {fp:nature} du {fp:dateAssembleeGenerale|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_ASSEMBLEE_GENERALE, label: 'Date de l\'assemblée générale', order: 2 },
      { ...NATURE, label: 'Nature du PV', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['pv', 'assemblée générale', 'AGO', 'AGE', 'p v', 'p-v', 'p.v']
  },
  {
    sousFamille: 'AG_AutreDocument',
    labelSousFamille: 'AG - Autre document',
    famille: 'AG',
    labelFamille: 'Secrétariat juridique - Assemblées générales',
    onglet: 'Juridique',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} - AG du {fp:dateDocument|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['pv', 'assemblée générale', 'AGO', 'AGE']
  },
  {
    sousFamille: 'DsnSalarieAT',
    labelSousFamille: 'DSN Arrêt de travail',
    famille: 'Arret_de_travail',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 6 }
    ]
  },
  {
    sousFamille: 'DsnSalarieRT',
    labelSousFamille: 'DSN Reprise de travail anticipée',
    famille: 'Arret_de_travail',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 6 },
      { ...DATE_DE_REPRISE, label: 'Date de reprise', order: 7 }
    ]
  },
  {
    sousFamille: 'DSNDeclarationIndividuelle',
    labelSousFamille: 'DSN Déclaration individuelle',
    famille: 'DSN_mensuelle',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
    ]
  },
  {
    sousFamille: 'ListeDesAssocies',
    labelSousFamille: 'Liste des associés',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Associés Dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Liste des associés  - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'ListeDesDirigeants',
    labelSousFamille: 'Liste des dirigeants',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Associés Dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Liste des dirigeants  - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'ListeDesMembresDesOrganesDeGestion',
    labelSousFamille: 'Liste des membres des organes de gestion',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Associés Dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Liste des des membres des organes de gestion  - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },

    ],
    tags: [
      'conseil d\'administration',
      'conseil de surveillance directoire'
    ]
  },
  {
    sousFamille: 'ListeDesActionsDeGarantie',
    labelSousFamille: 'Liste des actions de garantie',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Associés Dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Liste des actions de garantie  - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'Associes_Dirigeants_Divers',
    labelSousFamille: 'Associés-dirigeants - Divers',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Associés Dirigeants',
    onglet: 'Juridique',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet}  - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'ConventionReglementee',
    labelSousFamille: 'Convention réglementée',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Conventions avec associés ou dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Convention réglementée - {fp:nomPrenom} - {fp:dateDocument|yyyy/MM/dd}  {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_PRENOM, label: 'Nom et prénom de la personne concernée', order: 3 },
      { ...OBJET, label: 'Objet de la convention', order: 4 },
    ]
  },
  {
    sousFamille: 'ConventionAutre',
    labelSousFamille: 'Convention autre',
    famille: 'Associes_Dirigeants',
    labelFamille: 'Secrétariat juridique - Conventions avec associés ou dirigeants',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} - {fp:nomPrenom} - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_PRENOM, label: 'Nom et prénom de la personne concernée', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'ContratDAssurance',
    labelSousFamille: 'Contrat d\'assurance',
    famille: 'assurance',
    labelFamille: 'Assurances',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Assurance - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_ASSUREUR, label: 'Nom de l\'assureur', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de contrat', order: 4 },
      { ...OBJET, label: 'Objet du contrat', order: 5 },
    ]
  },
  {
    sousFamille: 'BonDeCommandeAutreEntiteFirme',
    labelSousFamille: 'Bon de commande autre entité Firme',
    famille: 'bonDeCommande',
    labelFamille: 'Contrats Fiducial - Bon de commande autres entités Fiducial',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} -  {fp:natureObjet} - {fp:societeEmettrice}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...SOCIETE_EMETTRICE, label: 'Société émettrice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: [
      'kits',
      'logiciels'
    ]

  },
  {
    sousFamille: 'VirementSalaires',
    labelSousFamille: 'Récapitulatif des virements de salaires',
    famille: 'Bulletin',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'VirementAcompte',
    labelSousFamille: 'Récapitulatif des acomptes de salaires',
    famille: 'Bulletin',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]

  },
  {
    sousFamille: 'ModesReglement',
    labelSousFamille: 'Récapitulatif des modes de règlement des salaires',
    famille: 'Bulletin',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]

  },
  {
    sousFamille: 'VirementSalairesFichier',
    labelSousFamille: 'Fichier des virements bancaires relatifs aux salaires',
    famille: 'Bulletin',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'VirementAcomptesFichier',
    labelSousFamille: 'Fichier des virements bancaires relatifs aux acomptes',
    famille: 'Bulletin',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'Bulletin',
    labelSousFamille: 'Bulletin de salaire',
    famille: 'Bulletin',
    labelFamille: 'Salarié - Bulletins de paie',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 }
    ]
  },
  {
    sousFamille: 'FicheSyntheseSalarie',
    labelSousFamille: 'Fiche de synthèse salarié',
    famille: 'Elements_Salaries',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
    ]
  },
  {
    sousFamille: 'Portabilite',
    labelSousFamille: 'Portabilité',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
    ]
  },
  {
    sousFamille: 'HistoriqueMontantsPAS',
    labelSousFamille: 'Historique des montants du PAS',
    famille: 'Bulletin',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
    ],
    tags: [
      'retenue à la source',
      'prélèvement à la source',
      'impôt sur le revenu'
    ]
  },
  {
    sousFamille: 'CertificatCesFonct',
    labelSousFamille: 'Certificat de cessation de fonctions',
    famille: 'CRPCEN',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 }
    ]
  },
  {
    sousFamille: 'DeclarationCotisationsCongesSpectacles',
    labelSousFamille: 'Bordereau de cotisation et versement des cotisations caisse des congés',
    famille: 'Caisse_CP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'JournalPeriodique',
    labelSousFamille: 'Journal de paie',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JournalPeriodiqueOrganisme',
    labelSousFamille: 'Journal de paie par organisme',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JournalPeriodiqueSalarieOrganisme',
    labelSousFamille: 'Journal de paie par salarie et organisme',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JournalPeriodiqueSalarie',
    labelSousFamille: 'Journal de paie par salarié',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CertificatEmploiCongesSpectaclesEDI',
    labelSousFamille: 'Certificat d\'emploi congé spectacle EDI',
    famille: 'Caisse_CP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'DeclarationNominativeCongesSpectaclesEDI_Rpt',
    labelSousFamille: 'Déclaration nominative caisse des congés spectacle',
    famille: 'Caisse_CP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_EDITION, label: 'Date édition', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 }
    ]
  },
  {
    sousFamille: 'EtatPreparatoireCaisseCP',
    labelSousFamille: 'Etat préparatoire caisse des congés payés',
    famille: 'Caisse_CP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'BulletinControle',
    labelSousFamille: 'Bulletins de contrôle',
    famille: 'Bulletin',
    labelFamille: 'Salarié - Bulletins de paie',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 }
    ],
    tags: [
      'bulletin de paie',
      'bulletin de contrôle',
      'bulletin de pige de contrôle',
      'bulletin de salaire de contrôle',
      'bulletin de mandat de contrôle'
    ]
  },
  {
    sousFamille: 'BulletinRedresseControle',
    labelSousFamille: 'Bulletin de contrôle redressé',
    famille: 'Bulletin',
    labelFamille: 'Salarié - Bulletins de paie',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 }
    ],
    tags: [
      'bulletin de mandat',
      'bulletin de salaire',
      'bulletin de pige'
    ]
  },
  {
    sousFamille: 'CFE_Declaration1447C',
    labelSousFamille: 'CFE - Déclaration 1447C',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations des biens imposables',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CFE-Déclaration 1447C - {fp:dateFinExercice|yyyy}',
    listeMetadatas: [
      { ...STATUT, label: 'Projet - Signé', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Année visée par la déclaration', order: 3 },
    ],
    tags: ['contribution foncière des entreprises']

  },
  {
    sousFamille: 'CFE_Declaration1447M',
    labelSousFamille: 'CFE - Déclaration 1447M',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations des biens imposables',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CFE-Déclaration 1447M - {fp:dateFinExercice|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Année visée par la déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['contribution foncière des entreprises']

  },
  {
    sousFamille: 'ChefDEntreprise_Divers',
    labelSousFamille: 'Chef d\'entreprise - Divers',
    famille: 'diversChefDEntreprise',
    labelFamille: 'Divers chef d\'entreprise',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}  ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'ChefDEntrepriseConsultationEtude',
    labelSousFamille: 'Chef d\'entreprise - Consultation - Etude',
    famille: 'consultationJuridiqueFinanciere',
    labelFamille: 'Consultations juridiques ou financières',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|dd/MM/yyyy} - {fp:natureObjet}  ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet de la consultation', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'ChefDEntreprise_LettreDeMissionPersonnelle',
    labelSousFamille: 'Chef d\'entreprise - Lettre de mission personnelle',
    famille: 'diversChefDEntreprise',
    labelFamille: 'Divers chef d\'entreprise',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Lettre de mission - {fp:nature}  ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature de la mission', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'ChefDEntreprise_MandatFiducial',
    labelSousFamille: 'Chef d\'entreprise - Mandat Fiducial',
    famille: 'diversChefDEntreprise',
    labelFamille: 'Divers chef d\'entreprise',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} Mandat  - {fp:nature}  ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature du mandat', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'CFE_BiensImposables_AutreDocument',
    labelSousFamille: 'CFE - Biens imposables - Autre document',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations des biens imposables',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'CFE - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['contribution foncière des entreprises']

  },
  {
    sousFamille: 'CVAE_Declaration1330HorsWinsis',
    labelSousFamille: 'CVAE - Déclaration 1330 hors Winsis',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CVAE-Déclaration 1330 au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: ['valeur ajoutée']

  },
  {
    sousFamille: 'CVAE_Paiement',
    labelSousFamille: 'CVAE - Paiement',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CVAE - {fp:numeroFormulaire} {fp:moisPaiement|MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 3 },
      { ...MOIS_PAIEMENT, label: 'Mois de paiement', order: 4 },
    ],
    tags: ['valeur ajoutée', '1329']
  },
  {
    sousFamille: 'CET_DemandeDePlafonnement1327CET',
    labelSousFamille: 'CET - Demande de plafonnement 1327CET',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CFE-Demande de plafonnement 1327CET - {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année visée par la déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'contribution économique territoriale',
      'CVAE',
      'valeur ajoutée 1327'
    ]
  },
  {
    sousFamille: 'CET_CFE_CVAE_AutreDocumentExercice',
    labelSousFamille: 'CET / CFE / CVAE - Autre document exercice',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'CFE/CVAE - {fp:natureObjet} {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: [
      'contribution foncière des entreprises',
      'valeur ajoutée',
      'contribution économique territoriale'
    ]

  },
  {
    sousFamille: 'CFE_Avis',
    labelSousFamille: 'CFE - Avis',
    famille: 'cet_cfe_cvae',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CFE - {fp:anneeDeclaration|yyyy} - Avis numéro {fp:declaration}',
    listeMetadatas: [
      { ...DECLARATION, label: 'Référence de l’avis d\'imposition', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par l\'avis', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ]
  },
  {
    sousFamille: 'CiceEtatPrefinancement',
    labelSousFamille: 'Etat de préfinancement CICE',
    famille: 'CICE',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CiceEtatPreparatoireFiscal',
    labelSousFamille: 'CICE - Etat préparatoire fiscal',
    famille: 'CICE',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CiceEtatPreparatoireFiscal',
    labelSousFamille: 'CICE - Etat préparatoire fiscal',
    famille: 'CICE',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CiceEtatControle',
    labelSousFamille: 'Etat de controle CICE',
    famille: 'CICE',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Autres documents',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CiceEtatControle',
    labelSousFamille: 'Etat de controle CICE',
    famille: 'CICE',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CICE_DeclarationHorsWinsis',
    labelSousFamille: 'CICE - Déclaration hors Winsis',
    famille: 'Cice',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CICE-Déclaration exercice au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
    ],
    tags: ['2079']

  },
  {
    sousFamille: 'CICE_AttestationPrefinancement',
    labelSousFamille: 'CICE - Attestation préfinancement',
    famille: 'Cice',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CICE - Attestation préfinancement  - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 3 },

    ]
  },
  {
    sousFamille: 'CICE_AutreDocumentPrefinancement',
    labelSousFamille: 'CICE - Autre document préfinancement',
    famille: 'Cice',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'CICE-Préfinancement - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'CICE_AutreDocumentEexercice',
    labelSousFamille: 'CICE - Autre document exercice',
    famille: 'Cice',
    labelFamille: 'CICE',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'CICE - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'CitsEtatControle',
    labelSousFamille: 'Etat de contrôle CITS',
    famille: 'TS',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    //fpNommageCalc: 'CITS - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [],
    tags: [
      'Crédit d’impôt',
      'taxe sur les salaires',
      'association',
      'crédit d’impôt de taxe sur les salaires'
    ]
  },
  {
    sousFamille: 'CAC_SuiviDesMandats',
    labelSousFamille: 'CAC - Suivi des mandats',
    famille: 'CommissaireAuxComptes',
    labelFamille: 'Secrétariat juridique - Commissaire aux comptes',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Suivi des mandats CAC - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: ['commissaire aux comptes']

  },
  {
    sousFamille: 'CAC_RapportAnnuel',
    labelSousFamille: 'CAC - Rapport annuel',
    famille: 'CommissaireAuxComptes',
    labelFamille: 'Secrétariat juridique - Commissaire aux comptes',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Rapport CAC - {fp:type} - Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...TYPE, label: 'Type de rapport', order: 4 },
    ],
    tags: ['commissaire aux comptes', 'rapport général', 'rapport spécial', 'rapport contrôle interne']

  },
  {
    sousFamille: 'CAC_AutreRapport',
    labelSousFamille: 'CAC - Autre rapport',
    famille: 'CommissaireAuxComptes',
    labelFamille: 'Secrétariat juridique - Commissaire aux comptes',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Rapport CAC - {fp:type} - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...TYPE, label: 'Type de rapport', order: 4 },
    ],
    tags: ['commissaire aux comptes', 'rapport spécial', 'rapport', 'contrôle interne']

  },
  {
    sousFamille: 'PlaquetteDesComptesAnnuelsHorsWinsis',
    labelSousFamille: 'Plaquette des comptes annuels hors Winsis',
    famille: 'comptesAnnuels',
    labelFamille: 'Comptes annuels',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Plaquette des comptes annuels au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
    ],
    tags: [
      'bilan',
      'documents annuels'
    ]

  },
  {
    sousFamille: 'PatrimoinePersonnel',
    labelSousFamille: 'Patrimoine personnel',
    famille: 'situationPatrimoniale',
    labelFamille: 'Situation patrimoniale',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|dd/MM/yyyy} - {fp:natureObjet}  ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'BilanImageExercice',
    labelSousFamille: 'Bilan imagé exercice',
    famille: 'comptesAnnuels',
    labelFamille: 'Comptes annuels',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Bilan imagé au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
    ]
  },
  {
    sousFamille: 'Contentieux',
    labelSousFamille: 'Contentieux',
    famille: 'contentieux',
    labelFamille: 'Contentieux juridiques',
    onglet: 'Juridique',
    displayClient: false,
    fpNommageCalc: '{fp:contentieux} - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...CONTENTIEUX, label: 'Contentieux concerné', order: 4 },
      { ...EMETTEUR, label: 'Émetteur du document', order: 5 },
    ],
    tags: ['litige', 'procès', 'procédure', 'prud\'homme']
  },
  {
    sousFamille: 'ControleFiscal',
    labelSousFamille: 'Controle fiscal',
    famille: 'controleFiscal',
    labelFamille: 'Contrôles fiscaux',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: [
      'notification',
      'redressement',
      'proposition'
    ]
  },
  {
    sousFamille: 'CourrierEnvoye',
    labelSousFamille: 'Courrier envoyé',
    famille: 'correspondance',
    labelFamille: 'Correspondances - Courriers envoyés',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Courrier {fp:destinataire} - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DESTINATAIRE, label: 'Destinataire', order: 3 },
      { ...OBJET, label: 'Objet de l\'acte', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['lettre']
  },
  {
    sousFamille: 'BordereauEnvoi',
    labelSousFamille: 'Bordereau d\'envoi',
    famille: 'correspondance',
    labelFamille: 'Correspondances - Bordereaux d\'envoi',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Bordereau d\'envoi  {fp:destinataire}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DESTINATAIRE, label: 'Destinataire', order: 3 },
      { ...OBJET, label: 'Objet de l\'acte', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['courrier']
  },
  {
    sousFamille: 'CourrierRecu',
    labelSousFamille: 'Courrier reçu',
    famille: 'correspondance',
    labelFamille: 'Correspondances - Courriers reçus',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Courrier {fp:emetteur} - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...EMETTEUR, label: 'Émetteur', order: 3 },
      { ...OBJET, label: 'Objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['courrier']
  },
  {
    sousFamille: 'CreditBailContrat',
    labelSousFamille: 'Crédit-bail - Contrat',
    famille: 'creditBail',
    labelFamille: 'Crédits-bails',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Contrat de crédit bail - {fp:organisme} - {fp:objet} -  {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 4 },
      { ...OBJET, label: 'Objet du contrat', order: 5 },
    ]
  },
  {
    sousFamille: 'CreditBailEcheancier',
    labelSousFamille: 'Crédit-bail - Echéancier',
    famille: 'creditBail',
    labelFamille: 'Crédits-bails',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Echéancier de crédit bail- {fp:organisme} - {fp:objet} -  {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de contrat', order: 4 },
      { ...OBJET, label: 'Objet du contrat', order: 5 },
    ]
  },
  {
    sousFamille: 'DeclarationCRPCEN',
    labelSousFamille: 'Déclaration des cotisations sur salaires dues à la CRPCEN',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'DeclarationCRPCENEmoluments',
    labelSousFamille: 'Déclaration des cotisations sur émoluments et honoraires dues à la CRPCEN',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'DeclarationCRPCEN_AlsaceMoselle',
    labelSousFamille: 'Déclaration des cotisations sur salaires dues à la CRPCEN (Alsace Moselle)',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'DNA',
    labelSousFamille: 'Déclaration annuelle notaire',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DNA_Annexe',
    labelSousFamille: 'Déclaration annuelle notaire - Annexe',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DNA_AlsaceMoselle',
    labelSousFamille: 'Déclaration annuelle notaire (Alsace Moselle)',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DNA_Annexe_AlsaceMoselle',
    labelSousFamille: 'Déclaration annuelle notaire - Annexe (Alsace Moselle)',
    famille: 'CRPCEN',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CVAE_1330',
    labelSousFamille: 'CVAE - Déclaration 1330',
    famille: 'CVAE',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'CVAE_1329DEF',
    labelSousFamille: 'CVAE - Liquidation 1329DEF',
    famille: 'CVAE',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'CVAE_1329AC',
    labelSousFamille: 'CVAE - Relevé d\'acompte 1329AC',
    famille: 'CVAE',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'DadsuDossierIdentification',
    labelSousFamille: 'DADSU - Identification Dossier',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 }
    ]
  },
  {
    sousFamille: 'DadsuDossierRecapitulatif',
    labelSousFamille: 'DADSU - Récapitulatif Dossier',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 }
    ]
  },
  {
    sousFamille: 'DadsuSalarieDetailPeriode',
    labelSousFamille: 'DADSU - Détail Salarié',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DadsuSalarieRecapitulatif',
    labelSousFamille: 'DADSU - Récapitulatif Salarié',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DadsuDeclarationIndividuelle',
    labelSousFamille: 'DADSU - Déclaration individuelle',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DadsuCIBTPDossierIdentification',
    labelSousFamille: 'DADSU  CI-BTP - Identification Dossier',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 }
    ]
  },
  {
    sousFamille: 'DadsuCIBTPDossierRecapitulatif',
    labelSousFamille: 'DADSU  CI-BTP - Récapitulatif Dossier',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 }
    ]
  },
  {
    sousFamille: 'DadsuCIBTPSalarieDetailPeriode',
    labelSousFamille: 'DADSU  CI-BTP - Détail Salarié',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DadsuCIBTPSalarieRecapitulatif',
    labelSousFamille: 'DADSU  CI-BTP - Récapitulatif Salarié',
    famille: 'DADSU',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - DADS',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DAS-2HorsWinsis',
    labelSousFamille: 'DAS-2 hors Winsis',
    famille: 'DAS-2',
    labelFamille: 'DAS-2',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'DAS2 année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...ANNEE_DECLARATION, label: 'Année déclarée', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['DAS2']
  },
  {
    sousFamille: 'DAS-2',
    labelSousFamille: 'Déclarations DAS-2',
    famille: 'DAS-2',
    labelFamille: 'DAS-2',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [],
    tags: ['DAS2']
  },
  {
    sousFamille: 'DeclarationFiscaleAutre',
    labelSousFamille: 'Déclaration fiscale autre',
    famille: 'declarationFiscale',
    labelFamille: 'Autres déclarations fiscales et avis d\'imposition divers',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} - {fp:numeroFormulaire} - {fp:dateFinPeriode}',
    listeMetadatas: [
      {...NATURE_OBJET, label: 'Nature et objet de la déclaration', order: 2},
      {...NUMERO_FORMULAIRE, label: 'Numéro de déclaration', order: 3},
      {...DATE_FIN_PERIODE, label: 'Date fin période', order: 4},
      {...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 5},
      {...STATUT, label: 'Projet - Signé', order: 5},
    ]
  },
  {
    labelSousFamille: 'Avis d\'imposition divers',
    sousFamille: 'AvisImpositionDivers',
    famille: 'declarationFiscale',
    labelFamille: 'Autres déclarations fiscales et avis d\'imposition divers',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: '{fp:declaration} du {fp:dateDocument} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date de l\'avis d\'imposition', order: 2 },
      { ...NATURE, label: 'Nature de l\'imposition', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...DECLARATION, label: 'Référence de l\'avis d\'imposition', order: 5 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 6 },
    ]
  },
  {
    sousFamille: 'DeclarationLoyersProfessionnels',
    labelSousFamille: 'Déclaration des loyers professionnels',
    famille: 'DeclarationLoyersProfessionnels',
    labelFamille: 'CET (CFE / CVAE) - Déclarations des biens imposables',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'ComptabiliteGestionConsultation',
    labelSousFamille: 'Comptabilité / Gestion - Consultation',
    famille: 'diversComptabiliteGestion',
    labelFamille: 'Divers - Comptabilité / Gestion',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['étude analyse']
  },

  {
    sousFamille: 'ComptabiliteGestionDivers',
    labelSousFamille: 'Comptabilité / Gestion - Divers',
    famille: 'diversComptabiliteGestion',
    labelFamille: 'Divers - Comptabilité / Gestion',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'FiducialDivers',
    labelSousFamille: 'Fiducial - Divers',
    famille: 'diversFiducial',
    labelFamille: 'Divers Fiducial',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'FiscalitePersonnelle_AutreDeclaration',
    labelSousFamille: 'Fiscalité personnelle - Autre déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Autres déclarations fiscales personnelles',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: 'Déclaration  {fp:numeroFormulaire} - Année {fp:anneeDeclaration|yyyy|',
    listeMetadatas: [
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 2 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'FiscalitePersonnelle_AnnexeAutreDeclaration',
    labelSousFamille: 'Fiscalité personnelle - Annexe autre déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Autres déclarations fiscales personnelles',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: '{fp:declaration} -Année  {fp:anneeDeclaration|yyyy} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 3 },
      { ...DECLARATION, label: 'Déclaration concernée', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 5 },
      { ...STATUT, label: 'Projet - Signé', order: 6 },
    ]
  },
  {
    sousFamille: 'FiscalitePersonnelle_DiversAutreDeclaration',
    labelSousFamille: 'Fiscalité personnelle - Divers autre déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Autres déclarations fiscales personnelles',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: '{fp:declaration} -Année {fp:anneeDeclaration|yyyy} -  {fp:natureObjet}',
    listeMetadatas: [
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 3 },
      { ...DECLARATION, label: 'Déclaration concernée', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 5 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'FiscalitePersonnelle_DiversAdministration',
    labelSousFamille: 'Fiscalité personnelle - Divers Administration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Documents divers administration fiscale',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  { fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'Fiscalite_Consultation',
    labelSousFamille: 'Fiscalité - Consultation',
    famille: 'diversFiscalite',
    labelFamille: 'Divers - Fiscalité',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet de la consultation', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['étude', 'analyse']
  },
  {
    sousFamille: 'Fiscalite_DiversEntreprise',
    labelSousFamille: 'Fiscalité - Divers entreprise',
    famille: 'diversFiscalite',
    labelFamille: 'Divers - Fiscalité',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'Juridique_Divers',
    labelSousFamille: 'Juridique - Divers',
    famille: 'diversJuridique',
    labelFamille: 'Divers - Juridique',
    onglet: 'Juridique',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    labelSousFamille: 'Franchise - Autres documents',
    sousFamille: 'FranchiseAutresDocuments',
    famille: 'franchise',
    labelFamille: 'Franchise',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'franchiseur',
      'franchisé',
      'marque',
      'commissionnaire',
      'revendeur',
      'commission',
      'affiliation',
      'affilié'
    ]
  },
  {
    labelSousFamille: 'Franchise-Contrat',
    sousFamille: 'FranchiseContrat',
    famille: 'franchise',
    labelFamille: 'Franchise',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet} - {fp:nomPrenom}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM_PRENOM, label: 'Nom de l\'autre partie au contrat', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'franchiseur',
      'franchisé',
      'marque',
      'commissionnaire',
      'revendeur',
      'commission',
      'affiliation',
      'affilié'
    ]
  },
  {
    sousFamille: 'AutresDocumentsBancaires',
    labelSousFamille: 'Autres documents bancaires',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Banque numéro {fp:numeroFormulaire} - {fp:dateDocument} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de compte banque en comptabilité', order: 5 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'banque',
      'bordereau',
      'remise chèque',
      'traite',
      'effet',
      'virement',
      'carte agios',
      'intérêts',
      'commissions',
      'frais',
      'prélèvement',
      'compte'
    ]
  },
  {
    sousFamille: 'AutresDocumentsCaisse',
    labelSousFamille: 'Autres documents de caisse',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Caisse numéro {fp:numeroFormulaire} - {fp:dateDocument} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de compte banque en comptabilité', order: 5 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'recette',
      'justificatif',
      'frais',
      'dépense',
      'espèces',
      'ticket',
      'agenda',
      'main courante',
      'brouillard'
    ]
  },
  {
    sousFamille: 'AutresDocumentsClients',
    labelSousFamille: 'Autres documents clients',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: '{fp:nomPrenom} - {fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...NOM_PRENOM, label: 'Nom du client', order: 5 },
    ],
    tags: [
      'ventes',
      'justificatifs',
      'pièce',
      'devis',
      'bon commande',
      'livraison',
      'réception'
    ]
  },
  {
    sousFamille: 'AutresDocumentsFournisseurs',
    labelSousFamille: 'Autres documents fournisseurs',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: '{fp:nomFournisseur} - {fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NOM_FOURNISSEUR, label: 'Nom du fournisseur', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 5 },
    ],
    tags: [
      'achats',
      'justificatifs',
      'frais',
      'charges',
      'pièce',
      'note',
      'bon commande',
      'livraison',
      'devis',
      'réception'
    ]
  },
  {
    sousFamille: 'ElementsNecessitantLAccordDuClient',
    labelSousFamille: `13-Eléments nécessitant l'accord du client`,
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: 'Eléments nécessitant l\'accord du client - Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['Feuille de travail', 'FT']
  },
  {
    sousFamille: 'CompteDeLExploitant',
    labelSousFamille: `09-Compte de l'exploitant`,
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: 'Compte de l\'exploitant - Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },

    ],
    tags: ['Feuille de travail', 'FT']
  },
  {
    sousFamille: 'CompteCourant',
    labelSousFamille: '08-Compte courant',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: 'Compte courant - {fp:nomAssocie} {fp:prenomAssocie} - Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...NOM_ASSOCIE, label: 'Nom de l\'associé', order: 3 },
      { ...PRENOM_ASSOCIE, label: 'Prénom de l\'associé', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'Feuille de travail',
      'FT',
      'associé'
    ]
  },
  {
    sousFamille: 'Inventaire',
    labelSousFamille: '05-Inventaire',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:nature} au {fp:dateFinExercice}',
    listeMetadatas: [
      { ...NATURE, label: 'Titre du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 }
    ],
    tags: [
      'stock en cours',
      'travaux',
      'marchandises',
      'matières',
      'fournitures',
      'produits',
      'consommables'
    ]

  },
  {
    sousFamille: 'InventaireDesImmobilisations',
    labelSousFamille: '06-Inventaire des immobilisations',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: 'Inventaire des immobilisations - Exercice  {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'inventaire des immos',
      'liste fichier'
    ]
  },
  {
    sousFamille: 'PiecesJustificativesCaisse',
    labelSousFamille: 'Pièces justificatives de caisse',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Caisse numéro {fp:numeroFormulaire} - {fp:dateDocument} - {fp:natureObjet}',
    listeMetadatas: [
      { ...NUMERO_FORMULAIRE, label: 'Numéro de compte caisse en comptabilité', order: 2 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 5 },
    ],
    tags: [
      'recette',
      'justificatif',
      'frais',
      'dépense',
      'espèces',
      'ticket',
      'agenda',
      'main courante',
      'brouillard'
    ]
  },
  {
    sousFamille: 'PiecesJustificativesComptablesDiverses',
    labelSousFamille: 'Pièces justificatives comptables diverses',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ],
    tags: [
      'divers',
      'autre'
    ]
  },
  {
    sousFamille: 'RelevesBancaires',
    labelSousFamille: 'Relevés bancaire',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Pièces justificatives',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Banque numéro {fp:numeroFormulaire} - Relevé au {fp:dateDocument}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de compte banque en comptabilité', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'compte',
      'banque',
      'extrait'
    ]
  },
  {
    sousFamille: 'DossierDeLExercice_Divers',
    labelSousFamille: 'Dossier de l\'exercice - Divers',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Autres documents de l\'exercice',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} - Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'DTIAssocies',
    labelSousFamille: '08-DTI Associés',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'DTIAutresImpotsTaxes',
    labelSousFamille: '11-DTI Autres impôts et taxes',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'DTIBanques',
    labelSousFamille: '02-DTI Banques',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ]
  },
  {
    sousFamille: 'DTICaisse',
    labelSousFamille: '02-DTI Caisse',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTICapitauxPropres',
    labelSousFamille: '09-DTI Capitaux propres',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIClientsVentes',
    labelSousFamille: '03-DTI Clients et ventes',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTICotisationsTNS',
    labelSousFamille: '12-DTI Cotisations TNS',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIDivers',
    labelSousFamille: '10-DTI Divers',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIEmprunts',
    labelSousFamille: '08-DTI Emprunts',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIEtatsPreparatoiresFinalisation',
    labelSousFamille: '13-DTI Etats préparatoires et finalisation',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIFournisseursAchatsChargesExternes',
    labelSousFamille: '04-DTI Fournisseurs, achats et charges externes',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIImmobilisations',
    labelSousFamille: '06-DTI Immobilisations',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTILocations',
    labelSousFamille: '06-DTI Locations',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIPersonnel',
    labelSousFamille: '07-DTI Personnel',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIPetitsMaterielsEntretiens',
    labelSousFamille: '06-DTI Petits matériels-Entretiens',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIRegulariteFormelle',
    labelSousFamille: '01-DTI Régularité formelle',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIResultatFiscal',
    labelSousFamille: '12-DTI Résultat fiscal',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTIStocksMarges',
    labelSousFamille: '05-DTI Stocks et marges',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTISupervisionSynthese',
    labelSousFamille: '14-DTI Supervision et synthèse',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DTITva',
    labelSousFamille: '11-DTI TVA',
    famille: 'documentsExercice',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DsnCaisseM',
    labelSousFamille: 'DSN mensuelle - Eléments par Organisme',
    famille: 'DSN_mensuelle',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DsnReglt',
    labelSousFamille: 'DSN mensuelle - Règlement des charges sociales',
    famille: 'DSN_mensuelle',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DsnDossier',
    labelSousFamille: 'DSN mensuelle - Eléments du Dossier',
    famille: 'DSN_mensuelle',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DsnSalarieM',
    labelSousFamille: 'DSN mensuelle - Eléments par Nom',
    famille: 'DSN_mensuelle',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 5 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 6 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 7 }
    ]
  },
  {
    sousFamille: 'DsnCaisse',
    labelSousFamille: 'DSN mensuelle - Eléments par Organisme',
    famille: 'DSN_mensuelle',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DucsPeriodiqueRetraite',
    labelSousFamille: 'DUCS - EDI Retraite',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsPeriodiqueRetPrev',
    labelSousFamille: 'DUCS - EDI Retraite / Prévoyance',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsPeriodiquePrevoyance',
    labelSousFamille: 'DUCS - EDI Prévoyance',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsEdiAnnuelleRetraite',
    labelSousFamille: 'DUCS - EDI Retraite annuelle',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsEdiAnnuellePrevoyance',
    labelSousFamille: 'DUCS - EDI Prévoyance annuelle',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsEdiAnnuelleRetPrev',
    labelSousFamille: 'DUCS - EDI Retraite / Prévoyance annuelle',
    famille: 'DUCS_RP',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsPeriodiqueUrssaf',
    labelSousFamille: 'DUCS - EDI Urssaf',
    famille: 'DUCS_Urssaf',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DucsEdiAnnuelleUrssaf',
    labelSousFamille: 'DUCS - EDI TR Urssaf annuelle',
    famille: 'DUCS_Urssaf',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 }
    ]
  },
  {
    sousFamille: 'DPAE',
    labelSousFamille: 'Déclaration préalable à l\'embauche',
    famille: 'Embauche',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DEBUT_CONTRAT, label: 'Date début contrat', order: 3 }
    ]
  },
  {
    sousFamille: 'Emprunt_Contrat',
    labelSousFamille: 'Emprunt - Contrat',
    famille: 'emprunt',
    labelFamille: 'Emprunts',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Contrat d\'emprunt - {fp:organisme} {fp:montant} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de contrat', order: 4 },
      { ...MONTANT, label: 'Montant emprunté', order: 5 }
    ]
  },
  {
    sousFamille: 'EmpruntEcheancier',
    labelSousFamille: 'Emprunt - Echéancier',
    famille: 'emprunt',
    labelFamille: 'Emprunts',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Echéancier d\'emprunt- {fp:organisme} - {fp:montant} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de contrat', order: 4 },
      { ...MONTANT, label: 'Montant emprunté', order: 5 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'tableau d\'amortissement',
      'tableau de remboursement'
    ]
  },
  {
    sousFamille: 'FactureImmobilisation',
    labelSousFamille: 'Facture d\'immobilisation',
    famille: 'Facture',
    labelFamille: 'Immobilisations',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:nomFournisseur} - {fp:natureImmobilisation}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_FOURNISSEUR, label: 'Nom du fournisseur', order: 3 },
      { ...NATURE_IMMOBILISATION, label: 'Nature de l\'immobilisation', order: 4 },
      { ...FACTURE_NUMERO, label: 'Référence de la facture', order: 5 },
      //{ ...FACTURE_EMETTEUR) {label: 'Emetteur', order: 6 },
      //{ ...FACTURE_DESTINATAIRE) {label: 'Destinataire', order: 7 },
      //{ ...FACTURE_DUPLICATA) {label: 'Duplicata', order: 8 },
      //{ ...FACTURE_AVOIR) {label: 'Avoir', order: 9 },
      //{ ...DATE_FACTURE) {label: 'Date d\'émission de la facture', order: 10 },
    ],
    tags: [
      'factures d\'immos acquisition',
      'achat',
      'immo',
      'immos'
    ]
  },
  {
    sousFamille: 'ElementsVariablesDePaie_RecusDuClient',
    labelSousFamille: 'Eléments variables de paie - Reçus du Client',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Autres documents',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateFinPeriode|MM/yyyy} {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['EVP', 'Elément variable de paie', 'relevé d\'activité', 'feuilles de temps', 'variables de paie']
  },
  {
    sousFamille: 'ElementsVariablesDePaie_Calculs_Divers',
    labelSousFamille: 'Eléments variables de paie - Calculs/Divers',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Autres documents',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateFinPeriode|MM/yyyy} {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['EVP', 'Elément variable de paie', 'relevé d\'activité']
  },
  {
    sousFamille: 'CotisationsSocialesAnnuellesOrganismes',
    labelSousFamille: 'Cotisations sociales annuelles organismes',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:organisme} {fp:natureObjet} {fp:dateFinExercice|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Année de rattachement', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 4 },
    ],
    tags: ['Cotisations annuelles organismes']
  },
  {
    sousFamille: 'CotisationsSociales_DSI',
    labelSousFamille: 'Cotisations sociales - DSI',
    famille: 'couvertureSociale',
    labelFamille: 'Couverture sociale - Cotisations sociales de l\'exercice',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: 'DSI Année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'déclaration sociale des indépendants',
      'cotisation sociale',
      'RSI',
      'MSA',
      'URSSAF',
      'DCR',
    ]
  },
  {
    sousFamille: 'CouvertureSocialeContrat',
    labelSousFamille: 'Couverture sociale - Contrat',
    famille: 'couvertureSociale',
    labelFamille: 'Couverture sociale - Documents permanents couverture sociale',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...OBJET, label: 'Objet de l\'acte', order: 3 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 4 },
    ],
    tags: [
      'cotisations obligatoires',
      'cotisation obligatoire',
      'cotisations facultatives',
      'cotisation facultative',
      'tns',
      'madelin',
      'complémentaire facultative',
      'organismes sociaux'
    ]
  },
  {
    sousFamille: 'CouvertureSocialeContratDivers',
    labelSousFamille: 'Couverture sociale - Divers',
    famille: 'couvertureSociale',
    labelFamille: 'Couverture sociale - Documents permanents couverture sociale',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  { fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'CotisationsSocialesDocuments',
    labelSousFamille: 'Cotisations sociales - Documents',
    famille: 'couvertureSociale',
    labelFamille: 'Couverture sociale - Cotisations sociales de l\'exercice',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    noUpload: false,
    fpNommageCalc: '{fp:natureObjet} - Exercice au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: [
      'sage',
      'tns',
      'cotisation sociale',
      'RSI',
      'MSA',
      'URSSAF',
      'échéancier cotisations'
    ]
  },
  {
    sousFamille: 'CotisationsSociales_FeuillesDeTravailCollaborateur',
    labelSousFamille: 'Cotisations sociales - Feuilles de travail collaborateur',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Année de rattachement', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['Cotisations annuelles']
  },
  {
    sousFamille: 'TaxeDApprentissage',
    labelSousFamille: 'Taxe d\'apprentissage',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Cotisations annuelles', 'Taxes d\'apprentissage']
  },
  {
    sousFamille: 'TaxeDApprentissage_FeuilleDeTravailCollaborateur',
    labelSousFamille: 'Taxe d\'apprentissage - Feuille de travail collaborateur',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Cotisations annuelles', 'Taxes d\'apprentissage']
  },
  {
    sousFamille: 'FormationContinue',
    labelSousFamille: 'Formation continue',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Cotisations annuelle', 'Formation continue']

  },
  {
    sousFamille: 'FormationContinue_FeuilleDeTravailCollaborateur',
    labelSousFamille: 'Formation continue - Feuille de travail collaborateur',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Cotisations annuelle', 'Formation continue']

  },
  {
    sousFamille: 'DeclarationsDeTaxeSurLesSalairesNonEtabliesAvecEDI_TSDeWinsis',
    labelSousFamille: 'Déclarations de taxe sur les salaires non établies avec EDI-TS de Winsis',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Cotisations annuelle', 'Taxe sur les salaires']
  },
  {
    sousFamille: 'TaxeSurLesSalaires_FeuilleDeTravailCollaborateur',
    labelSousFamille: 'Taxe sur les salaires - Feuille de travail collaborateur',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Cotisations annuelle', 'Taxe sur les salaires']
  },
  {
    sousFamille: 'EffortConstruction',
    labelSousFamille: 'Effort construction',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Cotisations annuelle', 'Effort construction']

  },
  {
    sousFamille: 'EffortConstruction_FeuilleDeTravailCollaborateur',
    labelSousFamille: 'Effort construction - Feuille de travail collaborateur',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Cotisations annuelle', 'Effort construction']
  },
  {
    sousFamille: 'DeclarationsDeTaxeSurLesSalairesDeLExercice_AutresDocumentsPartagesClient',
    labelSousFamille: 'Déclarations de taxe sur les salaires de l\'exercice - Autres documents partagés client',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Cotisations annuelle', 'Taxe sur les salaires']

  },
  {
    sousFamille: 'DeclarationsDeTaxeSurLesSalairesDeLExercice_AutresDocumentsNonPartagesClient',
    labelSousFamille: 'Déclarations de taxe sur les salaires de l\'exercice - Autres documents non partagés client',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Taxes diverses',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Cotisations annuelle', 'Taxe sur les salaires']
  },
  {
    sousFamille: 'SyndicatEmployeur_OrganisationsPatronales',
    labelSousFamille: 'Syndicat employeur - organisations patronales',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Adhésions',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'Syndicat employeur {fp:natureObjet} {fp:dateAdhesion|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_ADHESION, label: 'Date d\'adhésion', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['Adhésion syndicat', 'démission syndicat']

  },
  {
    sousFamille: 'MedecineDuTravail_AdhesionEntreprise',
    labelSousFamille: 'Médecine du travail - Adhésion entreprise',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Adhésions',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'Adhésion {fp:nomAutre} {fp:dateAdhesion|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_ADHESION, label: 'Date d\'adhésion', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...NOM_AUTRE, label: 'Nom du service médical', order: 5 },
      { ...STATUT, label: 'Projet - Signé', order: 6 },
    ]
  },
  {
    sousFamille: 'OrganismesSociaux_AdhesionEntreprise',
    labelSousFamille: 'Organismes sociaux - Adhésion entreprise',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Adhésions',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'Adhésion {fp:organisme} {fp:natureObjet} {fp:dateAdhesion|yyyy/MM/dd} {fp:statut}',
    listeMetadatas: [
      { ...DATE_ADHESION, label: 'Date d\'adhésion', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 5 },
      { ...STATUT, label: 'Projet - Signé', order: 6 },
    ],
    tags: ['adhésions diverses', 'organismes de retraite', 'prévoyance', 'mutuelles', 'autres organismes']

  },
  {
    sousFamille: 'AccordDEentreprise_DUE',
    labelSousFamille: 'Accord d\'entreprise - DUE',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Accord d\'entreprise - Décision unilatérale',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['Accord', 'DUE', 'décision unilatérale de l\'employeur', 'accord d\'entreprise']

  },
  {
    sousFamille: 'EpargneSalariale_DocumentsEntreprise',
    labelSousFamille: 'Epargne salariale - Documents entreprise',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Épargne salariale',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['Epargne salariale', 'Participation', 'Intéressement', 'PEE', 'PERCO']

  },
  {
    sousFamille: 'RepresentationDuPersonnel',
    labelSousFamille: 'Représentation du personnel',
    famille: 'entreprise',
    labelFamille: 'Entreprise : dossier permanent - Représentation du personnel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:nomAutre} {fp:natureObjet} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_AUTRE, label: 'Nom institution représentative', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Elections', 'protocoles affichage', 'PV de carence', 'délégués du personnel', 'comité d\'entreprise', 'comité d\'hygiène', 'comité d\'entreprise', 'unité écononique et sociale']

  },
  {
    sousFamille: 'ReglementsIinterieur_Hygiene_Securite',
    labelSousFamille: 'Réglements intérieur - Hygiène - Sécurité',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Réglements intérieur - Hygiène - Sécurité',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['Discipline règlement intérieur', 'Chartes notes d\'information salariés', 'DUER', 'Document unique d\'évaluation des risques', 'Pénibilité', 'Fiche pénibilité']
  },
  {
    sousFamille: 'ControleURSSAF_Suivi_Redressement',
    labelSousFamille: 'Controle URSSAF - Suivi - Redressement',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Contrôles sociaux',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'ControlesSociaux_Autres',
    labelSousFamille: 'Controles sociaux - Autres',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Contrôles sociaux',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: [
      'contrôle',
      'inspection du travail',
      'inspection des transports',
      'inspection caisse des congés payés',
      'CIBTP',
      'pro-BTP',
      'MCEN',
      'CRPCEN',
      'MSA',
      'caisse de congés'
    ]

  },
  {
    sousFamille: 'Social_Entreprise_Permanent_DocumentsDivers_FicheSynthetiqueConventionCollective',
    labelSousFamille: 'Social - Entreprise - Permanent - Documents divers - Fiche synthétique convention collective',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Divers entreprise',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} document permanent {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      //{ ...ESSAGE_DEST_CLIENT) {label: 'message destiné au client', order: 4 },
    ],
    tags: [
      'Document permanent',
      'Document unique d\'évaluation des risques',
      'Pénibilité',
      'Fiche pénibilité',
      'Fiche d\'entreprise',
      'médecine du travail',
      'protocole de sécurité',
      'note d\'information personnel'
    ]

  },
  {
    sousFamille: 'Social_Entreprise_Permanent_DocumentsDivers',
    labelSousFamille: 'Social - Entreprise - Permanent - Documents divers',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Divers entreprise',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} document permanent {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      //{ ...MESSAGE_DEST_CLIENT) {label: 'message destiné au client', order: 4 },
    ],
    tags: [
      'Document permanent',
      'Document unique d\'évaluationdes risques',
      'Pénibilité',
      'Fiche pénibilité',
      'Fiche d\'entreprise',
      'médecine du travail',
      'protocole de sécurité',
      'note d\'information personnel'
    ]
  },
  {
    sousFamille: 'Social_Consultations',
    labelSousFamille: 'Social - Consultations',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Divers entreprise',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet}',
    listeMetadatas: [
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'Social_MissionsDeConseils',
    labelSousFamille: 'Social - Missions de conseils',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier permanent - Divers entreprise',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'AER',
    labelSousFamille: 'Attestation d\'employeur destinée au Pole Emploi - AER',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 7 }
    ]
  },
  {
    sousFamille: 'AER_AED',
    labelSousFamille: 'Attestation d\'employeur destinée au Pole Emploi - AED',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 7 }
    ]
  },
  {
    sousFamille: 'TableauBord',
    labelSousFamille: 'Tableau de bord',
    famille: 'Tableau_de_bord',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
    ]
  },
  {
    sousFamille: 'AttestationAssedic',
    labelSousFamille: 'Attestation d\'employeur destinée au Pole Emploi - Attestation Assedic',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 3 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 4 }
    ]
  },
  {
    sousFamille: 'AttestationAssedicArtiste',
    labelSousFamille: 'Attestation d\'employeur destinée au Pole Emploi - Attestation Assedic Artiste',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 3 }
    ]
  },
  {
    sousFamille: 'AutreMembreDeLaFamille_Impot_DocumentPermanent',
    labelSousFamille: 'Autre membre de la famille - Impôts - Document permanent',
    famille: 'autresMembresFamille',
    labelFamille: 'Autres membres de la famille - Impôts - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:nomContribuable} {fp:prenomContribuable} {fp:natureObjet}',
    listeMetadatas: [
      { ...NOM_CONTRIBUABLE, label: 'Nom contribuable', order: 3 },
      { ...PRENOM_CONTRIBUABLE, label: 'Prénom contribuable', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 5 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'AutreMembreDeLaFamille_Impot_DocumentAnnexeDeclaration',
    labelSousFamille: 'Autre membre de la famille - Impôt - Document annexe déclaration',
    famille: 'autresMembresFamille',
    labelFamille: 'Autres membres de la famille - Impôts - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:natureObjet} - {fp:nomContribuable} {fp:prenomContribuable} -Année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...NOM_CONTRIBUABLE, label: 'Nom contribuable', order: 3 },
      { ...PRENOM_CONTRIBUABLE, label: 'Prénom contribuable', order: 4 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 5 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 6 },
      { ...STATUT, label: 'Projet - Signé', order: 7 },
    ]
  },
  {
    sousFamille: 'AutreMembreDeLaFamille_Impot_DocumentDeclaration',
    labelSousFamille: 'Autre membre de la famille - Impôt - Déclaration',
    famille: 'autresMembresFamille',
    labelFamille: 'Autres membres de la famille - Impôts - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: 'Déclaration {fp:numeroFormulaire} - {fp:nomContribuable} {fp:prenomContribuable} - Année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...NOM_CONTRIBUABLE, label: 'Nom contribuable', order: 3 },
      { ...PRENOM_CONTRIBUABLE, label: 'Prénom contribuable', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 6 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de la déclaration', order: 7 },
    ]
  },
  {
    sousFamille: 'AutreMembreDeLaFamille_Impot_AutreDocument',
    labelSousFamille: 'Autre membre de la famille - Impôt - Autre document',
    famille: 'autresMembresFamille',
    labelFamille: 'Autres membres de la famille - Impôts - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:natureObjet} - {fp:nomContribuable} {fp:prenomContribuable} -Année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...NOM_CONTRIBUABLE, label: 'Nom contribuable', order: 3 },
      { ...PRENOM_CONTRIBUABLE, label: 'Prénom contribuable', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 6 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 5 },
    ]
  },
  {
    sousFamille: 'AutreMembreDeLaFamille_DocumentDivers',
    labelSousFamille: 'Autre membre de la famille - Document divers',
    famille: 'autresMembresFamille',
    labelFamille: 'Autres membres de la famille - Autres',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet} - {fp:nomContribuable} {fp:prenomContribuable}',
    listeMetadatas: [
      { ...NOM_CONTRIBUABLE, label: 'Nom contribuable', order: 3 },
      { ...PRENOM_CONTRIBUABLE, label: 'Prénom contribuable', order: 4 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 6 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'SoldeToutCompte',
    labelSousFamille: 'Reçu pour solde de tout compte',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 3 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 4 }
    ]
  },
  {
    sousFamille: 'CertificatTravail',
    labelSousFamille: 'Certificat de travail',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 },
      { ...DATE_DEBUT_CONTRAT, label: 'Date début contrat', order: 5 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 6 }
    ]
  },
  {
    sousFamille: 'Biaf',
    labelSousFamille: 'Bordereau individuel d\'accès à la formation',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...DATE_SIGNATURE, label: 'Date signature', order: 3 }
    ]
  },
  {
    sousFamille: 'DsnSalarieFC',
    labelSousFamille: 'DSN Fin de contrat',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 5 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 6 }
    ]
  },
  {
    sousFamille: 'AED',
    labelSousFamille: 'Attestation employeur dématérialisée',
    famille: 'Fin_de_contrat',
    labelFamille: 'Salarié - Dossier permanent - Autres documents',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 },
      { ...TYPE, label: 'Type', order: 3 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 4 },
      { ...DATE_FIN_CONTRAT, label: 'Date fin contrat', order: 5 },
      { ...DATE_ENVOI, label: 'Date envoi', order: 6 },
      { ...DATE_DERNIER_JOUR_TRAVAIL, label: 'Date dernier jour travail', order: 7 }
    ]
  },
  {
    sousFamille: 'TauxAT',
    labelSousFamille: 'Taux AT',
    famille: 'entreprise',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'Notification Taux AT  {fp:dateFinExercice|yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Année de rattachement', order: 2 },
    ]
  },
  {
    sousFamille: 'OrganisationDeLEntreprise',
    labelSousFamille: 'Organisation de l\'entreprise',
    famille: 'generalite',
    labelFamille: 'Généralités',
    onglet: 'Généralités',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['procédures internes', 'procédure interne']
  },
  {
    sousFamille: 'ImprimeInterneALEntreprise',
    labelSousFamille: 'Imprimé interne à l\'entreprise',
    famille: 'generalite',
    labelFamille: 'Généralités',
    onglet: 'Généralités',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['document papier', 'documentation']

  },
  {
    sousFamille: 'Generalites_DiversEntreprise',
    labelSousFamille: 'Généralités - Divers entreprise',
    famille: 'generalite',
    labelFamille: 'Généralités',
    onglet: 'Généralités',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'InformationsurLEntrepriseOuLeSecteurDActivite',
    labelSousFamille: 'Informations sur l\'entreprise ou le secteur d\'activité',
    famille: 'generalite',
    labelFamille: 'Généralités',
    onglet: 'Généralités',
    displayClient: false,
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: [
      'documentation',
      'statistiques',
      'métier',
      'professionnelles',
      'chiffres'
    ]
  },
  {
    sousFamille: 'releveDIdentiteBancaire',
    labelSousFamille: 'Relevé d\'identité bancaire',
    famille: 'generalite',
    labelFamille: 'Généralités',
    onglet: 'Généralités',
    displayClient: false,
    fpNommageCalc: 'RIB - {fp:banque} - {fp:iban}',
    listeMetadatas: [
      { ...BANQUE, label: 'Nom de la banque', order: 2 },
      { ...IBAN, label: 'Code IBAN', order: 3 },
    ],
    tags: ['rib', 'iban']
  },
  {
    sousFamille: 'TableauDeBord',
    labelSousFamille: 'Tableau de bord',
    famille: 'informationIntermediaire',
    labelFamille: 'Informations intermédiaires',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Tableau de bord au {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: [
      'indicateurs',
      'suivi de résultats',
      'PCI',
      'point',
      'chiffré',
      'intermédiaire'
    ]
  },
  {
    sousFamille: 'SituationComptableHorsWinsis',
    labelSousFamille: 'Situation comptable hors Winsis',
    famille: 'informationIntermediaire',
    labelFamille: 'Informations intermédiaires',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Situation comptable au {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: ['situation intermédiaire']

  },
  {
    sousFamille: 'BilanImageAutre',
    labelSousFamille: 'Bilan imagé autre',
    famille: 'informationIntermediaire',
    labelFamille: 'Informations intermédiaires',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Bilan imagé au  {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ]
  },
  {
    sousFamille: 'EtudePrevisionnelle',
    labelSousFamille: 'Etude prévisionnelle',
    famille: 'informationPrevisionnelle',
    labelFamille: 'Informations prévisionnelles',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Etude prévisionnelle du {fp:dateDebutPeriode|dd/MM/yyyy} au {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date de début de période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ],
    tags: [
      'budget',
      'business plan',
      'prévisionnel',
      'prévision'
    ]

  },
  {
    sousFamille: 'RCSExtraitInfolegale',
    labelSousFamille: 'RCS - Extrait Infolégale',
    famille: 'inscriptionRegistrePublic',
    labelFamille: 'Inscriptions registres publics',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - RCS Extrait Infolégale',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date de l\'extrait', order: 2 },
    ]
  },
  {
    sousFamille: 'SireneExtraitInfolegale',
    labelSousFamille: 'Répertoire Sirene - Extrait Infolégale',
    famille: 'inscriptionRegistrePublic',
    labelFamille: 'Inscriptions registres publics',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Répertoire Sirene',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date de l\'extrait', order: 2 },
    ],
    tags: ['Insee', 'avis situation', 'siren']

  },
  {
    sousFamille: 'InscriptionEntreprise',
    labelSousFamille: 'Inscription entreprise',
    famille: 'inscriptionRegistrePublic',
    labelFamille: 'Inscriptions registres publics',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: [
      'Kbis',
      'RC',
      'registre commerce',
      'RCS',
      'répertoire',
      'métier',
      'publication',
      'Insee',
      'CFE',
      'M0 P0'
    ]
  },
  {
    sousFamille: 'RBEDeclarationGreffe',
    labelSousFamille: 'RBE - Déclaration Greffe',
    famille: 'inscriptionRegistrePublic',
    labelFamille: 'Inscriptions registres publics',
    onglet: 'Juridique',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  - RBE Déclaration Greffe - {fp:numeroFormulaire}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du dépôt', order: 2 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro du dépôt', order: 3 },
    ],
    tags: [
      'registre bénéficiaire effectif',
      'RBE',
      'notification',
      'greffe'
    ]
  },
  {
    sousFamille: 'DeclarationDAffectationEIRL',
    labelSousFamille: 'Déclaration d\'affectation EIRL',
    famille: 'inscriptionRegistrePublic',
    labelFamille: 'Inscriptions registres publics',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Déclaration d\'affectation',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },

    ],
    tags: ['patrimoine affecté']
  },
  {
    sousFamille: 'SuiviInteressement',
    labelSousFamille: 'Récapitulatif de l\'intéressement',
    famille: 'Interessement_Abondements',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_EXERCICE, label: 'Date de début de l\'exercice concerné', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ]
  },
  {
    sousFamille: 'SuiviAbondementsPee',
    labelSousFamille: 'Récapitulatif des abondements PEE',
    famille: 'Interessement_Abondements',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_EXERCICE, label: 'Date de début de l\'exercice concerné', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ]
  },
  {
    sousFamille: 'SuiviAbondementPerco',
    labelSousFamille: 'Récapitulatif des abondements PERCO',
    famille: 'Interessement_Abondements',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_EXERCICE, label: 'Date de début de l\'exercice concerné', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ]
  },
  {
    sousFamille: 'IS_2571',
    labelSousFamille: 'IS - Impôt sur les sociétés - Relevé d\'acompte 2571',
    famille: 'IS',
    labelFamille: 'Impôt sur les sociétés',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'IS_2572',
    labelSousFamille: 'IS - Impôt sur les sociétés - Relevé de solde 2572',
    famille: 'IS',
    labelFamille: 'Impôt sur les sociétés',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'IS_2573',
    labelSousFamille: 'IS - Impôt sur les sociétés - Demande de remboursement 2573',
    famille: 'IS',
    labelFamille: 'Impôt sur les sociétés',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'IS_DeclarationHorsWinsis',
    labelSousFamille: ' IS - Impôt sur les sociétés - Déclaration hors Winsis',
    famille: 'Is',
    labelFamille: 'Impôt sur les sociétés',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'IS-Déclaration {fp:numeroFormulaire} - {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...NUMERO_FORMULAIRE, label: 'Numéro de déclaration', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ],
    tags: [
      'impôt société',
      'impôt sur les sociétés',
      'relevé d\'acompte',
      'relevé de solde',
      'acompte solde',
      '2571',
      '2572',
      '2573'
    ]
  },
  {
    sousFamille: 'IS_AutreDocumentExercice',
    labelSousFamille: 'IS - Impôt sur les sociétés - Autre document exercice',
    famille: 'Is',
    labelFamille: 'Impôt sur les sociétés',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'IS - {fp:natureObjet} - {fp:dateFinPeriode|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: ['impôt société', 'impôt sur les sociétés']

  },
  {
    sousFamille: 'IR_DocumentsPermanents',
    labelSousFamille: 'IR - Impôt sur le revenu - Documents permanents',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur le revenu - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: [
      'impôt sur le revenu',
      'document permanent'
    ]
  },
  {
    sousFamille: 'IR_Declaration',
    labelSousFamille: 'IR - Impôt sur le revenu - Déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur le revenu - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    fpNommageCalc: 'IR-Déclaration {fp:numeroFormulaire} - Année {fp:anneeDeclaration|yyyy}',
    listeMetadatas: [
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'impôt sur le revenu',
      '2042',
      '2044',
      '2074',
      '2047',
      '2041',
      '2083'
    ]
  },
  {
    sousFamille: 'IR_AnnexeDeclaration',
    labelSousFamille: 'IR - Impôt sur le revenu - Annexe Déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur le revenu - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    fpNommageCalc: 'IR-Déclaration Année {fp:anneeDeclaration|yyyy} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },

    ],
    tags: ['impôt sur le revenu']

  },
  {
    sousFamille: 'IR_Divers',
    labelSousFamille: 'IR - Impôt sur le revenu - Divers',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur le revenu - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    fpNommageCalc: 'IR-Déclaration Année {fp:anneeDeclaration|yyyy} {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 4 },
    ],
    tags: ['impôt sur le revenu']
  },
  {
    sousFamille: 'ISF_DocumentsPermanents',
    labelSousFamille: 'IFI - Impôt fortune immobilière - Documents permanents',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur la fortune immobilière - Documents permanents',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },

    ],
    tags: [
      'impôt de solidarité sur le fortune',
      'impôt sur la fortune',
      'document permanent'
    ]

  },
  {
    sousFamille: 'ISF_Declaration',
    labelSousFamille: 'IFI - Impôt fortune immobilière - Déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur la fortune immobilière - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    listeMetadatas: [
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 2 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'impôt de solidarité sur la fortune',
      'impôt sur la fortune 2725'
    ]

  },
  {
    sousFamille: 'ISF_AnnexeDeclaration',
    labelSousFamille: 'IFI - Impôt fortune immobilière - Annexe Déclaration',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur la fortune immobilière - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },

    ],
    tags: [
      'impôt de solidarité sur la fortune',
      'impôt sur la fortune'
    ]
  },
  {
    sousFamille: 'ISF_Divers',
    labelSousFamille: 'IFI - Impôt fortune immobilière - Divers',
    famille: 'fiscalitePersonnelle',
    labelFamille: 'Fiscalité personnelle - Impôt sur la fortune immobilière - Documents annuels',
    onglet: 'Chef d\'entreprise',
    displayClient: true,
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...ANNEE_DECLARATION, label: 'Année concernée par la déclaration', order: 4 },
    ],
    tags: [
      'impôt de solidarité sur la fortune',
      'impôt sur la fortune'
    ]
  },
  {
    sousFamille: 'JournalAnnuelSalarie',
    labelSousFamille: 'Journal annuel de paie par Nom',
    famille: 'Journal_de_paie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 }
    ]
  },
  {
    sousFamille: 'JournalAnnuel',
    labelSousFamille: 'Journal annuel de paie',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JournalAnnuelOrganisme',
    labelSousFamille: 'Journal annuel de paie par organisme',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JournalAnnuelSalarieOrganisme',
    labelSousFamille: 'Journal annuel de paie par salarié et organisme',
    famille: 'Journal_de_paie',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...NOM, label: 'Nom et prénom du salarié', order: 2 }
    ]
  },
  {
    sousFamille: 'LettreMissionFiducialExpertise_ConditionsGeneralesDeCollaboration',
    labelSousFamille: 'Lettre de mission Fiducial Expertise - Conditions générales de collaboration',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}- Lettre de mission - CGC',
    listeMetadatas: [
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'ContratDeServicesFiducialConsulting',
    labelSousFamille: 'Contrat de services Fiducial Consulting',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}- Contrat de services - {fp:nature}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Traitement concerné', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['contrat de service']

  },
  {
    sousFamille: 'ContratDeServicesFiducialConsultinge_ConditionsGeneralesDePrestationDeServices',
    labelSousFamille: 'Contrat de services Fiducial Consulting - Conditions générales de prestations de services',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Contrat de services CGPS',
    listeMetadatas: [
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },

    ],
    tags: ['contrat de service']

  },
  {
    sousFamille: 'LettreDeMissionFiscadial',
    labelSousFamille: 'Lettre de mission Fiscadial',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Lettre de mission Fiscadial',
    listeMetadatas: [
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },

    ]
  },
  {
    sousFamille: 'LettreDeMission_Avenant',
    labelSousFamille: 'Lettre de mission - Avenant',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}- Avenant lettre de mission - {fp:nature}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature de la mission', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'MandatPrelevementSepaExpertiseOuConsulting',
    labelSousFamille: 'Mandat prélèvement SEPA Expertise ou Consulting',
    famille: 'lettreDeMission',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}- Mandat prélèvement SEPA - {fp:societeBeneficiaire}',
    listeMetadatas: [
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...SOCIETE_BENEFICIAIRE, label: 'Société bénéficiaire', order: 3 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'DT_LiaisonSecretariatJuridique',
    labelSousFamille: 'Liaison secrétariat juridique',
    famille: 'Liaison_juridique',
    labelFamille: 'Secrétariat juridique - Documents de liaison avocat',
    onglet: 'Juridique',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DT_PropDistribExerSuivant',
    labelSousFamille: 'Proposition de distribution du résultat sur l\'exercice suivant',
    famille: 'Liaison_juridique',
    labelFamille: 'Secrétariat juridique - Documents de liaison avocat',
    onglet: 'Juridique',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'DT_Prepa2777_InteretsCptesCourants',
    labelSousFamille: 'Préparation déclaration 2777 - Intérêts comptes courants',
    famille: 'Liaison_juridique',
    labelFamille: 'Secrétariat juridique - Documents de liaison avocat',
    onglet: 'Juridique',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 }
    ]
  },
  {
    sousFamille: 'DT_Prepa2777_Dividendes',
    labelSousFamille: 'Préparation déclaration 2777 - Dividendes',
    famille: 'Liaison_juridique',
    labelFamille: 'Secrétariat juridique - Documents de liaison avocat',
    onglet: 'Juridique',
    displayClient: false,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 }
    ]
  },
  {
    sousFamille: 'LiasseFiscaleHhorsWinsis',
    labelSousFamille: 'Liasse fiscale hors Winsis',
    famille: 'liassefFiscale',
    labelFamille: 'Liasses fiscales',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'Liasse fiscale au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 2 },
    ],
    tags: [
      'déclaration fiscale',
      '2031',
      '2065',
      '2072',
      '2035',
      '2036',
      '2139',
      '2143'
    ]
  },
  {
    sousFamille: 'Location_BailLocal',
    labelSousFamille: 'Location - Bail local',
    famille: 'location',
    labelFamille: 'Locations',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Bail - {fp:local}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...LOCAL, label: 'Identification du local', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['murs']
  },
  {
    sousFamille: 'Location_AutreContrat',
    labelSousFamille: 'Location - Autre contrat',
    famille: 'location',
    labelFamille: 'Locations',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Location - {fp:objet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...OBJET, label: 'Objet', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'LocationFinanciereContrat',
    labelSousFamille: 'Location financière - Contrat',
    famille: 'locationFinanciere',
    labelFamille: 'Locations financières',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Contrat de location financière- {fp:organisme} - {fp:objet} -  {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de contrat', order: 4 },
      { ...OBJET, label: 'Objet', order: 5 },
    ]
  },
  {
    sousFamille: 'EcheancierDeLocationFinanciere',
    labelSousFamille: 'Echéancier de location financière',
    famille: 'locationFinanciere',
    labelFamille: 'Locations financières',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Echéancier de location financière- {fp:organisme} - {fp:objet} -  {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANISME, label: 'Nom de l\'organisme', order: 3 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 4 },
      { ...OBJET, label: 'Objet', order: 5 },
    ]
  },
  {
    sousFamille: 'MandatEtebac',
    labelSousFamille: 'Mandat - Etebac',
    famille: 'mandat',
    labelFamille: 'Mandats Fiducial - Entreprise',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Mandat Etebac - {fp:iban}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...IBAN, label: 'Numéro d\'IBAN', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'télétransmission',
      'transmission',
      'relevés bancaires',
      'relevé bancaire'
    ]
  },
  {
    sousFamille: 'MandatTransmissionDeDocuments',
    labelSousFamille: 'Mandat - Transmission de documents',
    famille: 'mandat',
    labelFamille: 'Mandats Fiducial - Entreprise',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Mandat transmission  {fp:nature} - {fp:destinataire}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DESTINATAIRE, label: 'Destinataire', order: 3 },
      { ...NATURE, label: 'Nature des documents transmis', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['autorisation', 'télétransmission']
  },
  {
    sousFamille: 'MandatTravailleurIndependant',
    labelSousFamille: 'Mandat - Tiers déclarant travailleur indépendant',
    famille: 'mandat',
    labelFamille: 'Mandats Fiducial - Entreprise',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Mandat tiers déclarant - {fp:nomPrenom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_PRENOM, label: 'Nom et prénom du travailleur indépendant', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'autorisation', 'télétransmission',
      'déclarations sociales',
      'immatriculations'
    ]
  },
  {
    sousFamille: 'FicheAcceptationMission',
    labelSousFamille: 'Fiche d\'acceptation de la mission',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Fiche d\'acceptation de la mission',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: [
      'T 4.1',
      'LAB'
    ]
  },
  {
    sousFamille: 'RBEDeclarationINPI',
    labelSousFamille: 'RBE - Declaration INPI',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - RBE Déclaration INPI - {fp:numeroFormulaire}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NUMERO_FORMULAIRE, label: 'Numéro de dépôt', order: 3 },
    ]
  },
  {
    sousFamille: 'DocumentsDIdentification',
    labelSousFamille: 'Documents d\'identification',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:nature} - {fp:nomPrenom} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature du document', order: 3 },
      { ...NOM_PRENOM, label: 'Nom et prénom de la personne concernée', order: 4 },
    ],
    tags: [
      'LAB',
      'justificatif de domicile',
      'CNI',
      'carte d\'identité',
      'carte de séjour',
      'Kbis',
      'Insee',
      'registre du commerce'
    ]
  },
  {
    sousFamille: 'PriseDeConnaissanceDuClient',
    labelSousFamille: 'Prise de connaissance du client',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: 'Prise de connaissance du client - {fp:dateDocument|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: ['AN4-1']
  },
  {
    sousFamille: 'RBEAbsenceDeclarationINPI',
    labelSousFamille: 'RBE - Absence déclaration INPI',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - RBE Absence déclaration INPI',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ]
  },
  {
    sousFamille: 'FicheSignaletiqueEmployeur',
    labelSousFamille: 'Fiche signalétique employeur',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: 'Fiche signalétique employeur - {fp:dateDocument|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: ['AN4-2']
  },
  {
    sousFamille: 'AcceptationDeLaMission_AutreDocument',
    labelSousFamille: 'Acceptation de la mission - Autre document',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:nature} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature du document', order: 3 },
    ]
  },
  {
    sousFamille: 'BEReconnaissanceStatut',
    labelSousFamille: 'BE - Reconnaissance du statut',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  - Reconnaissance statut BE - {fp:nomPrenom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_PRENOM, label: 'Nom et prénom de la personne concernée', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: ['bénéficiaire', 'effectif']
  },
  {
    sousFamille: 'RNGACompteRenduRecherche',
    labelSousFamille: 'RNGA - Compte rendu de recherche',
    famille: 'missionFiducial',
    labelFamille: 'Acceptation et maintien de la mission',
    onglet: 'Fiducial',
    displayClient: false,
    noUpload: true,
    fpNommageCalc: '{fp:dateDocument|DD/MM/YYYY} - RNGA Compte rendu de recherche',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date de recherche', order: 2 }
    ],
    tags: ['bénéficiaire', 'effectif']
  },
  {
    sousFamille: 'Devis',
    labelSousFamille: 'Devis mission',
    famille: 'missionFiducial',
    labelFamille: 'Contrats Fiducial - Devis missions agence',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: 'Devis - {fp:dateDocument|yyyy/MM/dd} - {fp:nature}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'proposition',
      'honoraires',
      'facture',
      'facturation'
    ]
  },
  {
    sousFamille: 'LettreMissionFiducialExpertise',
    labelSousFamille: 'Lettre de mission Fiducial Expertise',
    famille: 'missionFiducial',
    labelFamille: 'Contrats Fiducial - Lettres de mission',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}- Lettre de mission - {fp:nature}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature de la mission', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 }
    ]
  },
  {
    sousFamille: 'OGABulletinAdhesion',
    labelSousFamille: 'OGA - Bulletin d\'adhésion',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Adhésion',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:nomOGA} - Bulletin d\'adhésion',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM_OGA, label: 'Nom de l\'OGA', order: 3 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OGADocumentPermanent',
    labelSousFamille: 'OGA - Document permanent',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Adhésion',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OGA_DossierDeGestion',
    labelSousFamille: 'OGA - Dossier de gestion',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Exercices',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'OGA Dossier de gestion au {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OGA_AttestationAdhesion',
    labelSousFamille: 'OGA - Attestation adhésion',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Exercices',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'OGA-Attestation adhésion Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OGA_CRM',
    labelSousFamille: 'OGA - CRM',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Exercices',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'OGA-CRM Exercice {fp:dateFinExercice|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OGA_DocumentAnnuelAutre',
    labelSousFamille: 'OGA - Document annuel autre',
    famille: 'Oga',
    labelFamille: 'Organisme de gestion agréé - Exercices',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'OGA- {fp:natureObjet} - {fp:dateFinExercice|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
    tags: [
      'centre de gestion',
      'CGA',
      'AGA',
      'OA',
      'organisme agréé',
      'centre de gestion agréé',
      'association de gestion',
      'association de gestion agréée'
    ]
  },
  {
    sousFamille: 'OperationExceptionnelleJuridiqueSociete',
    labelSousFamille: 'Opération exceptionnelle juridique société',
    famille: 'operationExceptionnelle',
    labelFamille: 'Secrétariat juridique - Opération exceptionnelle',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ]
  },
  {
    sousFamille: 'OptionFiscale',
    labelSousFamille: 'Option fiscale',
    famille: 'optionFiscale',
    labelFamille: 'Options fiscales',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:nature}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE, label: 'Nature de la mission', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 }
    ],
    tags: ['courrier d\'option', 'lettre d\'option']
  },
  {
    sousFamille: 'OrganeDeGestion_ProcesVerbal',
    labelSousFamille: 'Organe de gestion - Procès verbal',
    famille: 'organeDeGestion',
    labelFamille: 'Secrétariat juridique - Organes de gestion',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:organeGestion} -PV du {fp:dateDocument|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANE_GESTION, label: 'Nom de l\'organe de gestion', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
    ],
    tags: [
      'conseil d\'administration',
      'conseil de surveillance',
      'directoire',
      'pv',
    ]
  },
  {
    sousFamille: 'OrganeDeGestion_Rapport',
    labelSousFamille: 'Organe de gestion - Rapport',
    famille: 'organeDeGestion',
    labelFamille: 'Secrétariat juridique - Organes de gestion',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:organeGestion} - Rapport du {fp:dateDocument|dd/MM/yyyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANE_GESTION, label: 'Nom de l\'organe de gestion', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: [
      'conseil d\'administration',
      'conseil de surveillance',
      'directoire',
      'gérance',
      'gérant'
    ]
  },
  {
    sousFamille: 'OrganeDeGestion_AutreDocumentEmis',
    labelSousFamille: 'Organe de gestion - Autre document émis',
    famille: 'organeDeGestion',
    labelFamille: 'Secrétariat juridique - Organes de gestion',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: '{fp:organeGestion} - {fp:natureObjet} - {fp:dateDocument|dd/mm/yyy}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...ORGANE_GESTION, label: 'Nom de l\'organe de gestion', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: [
      'conseil d\'administration',
      'conseil de surveillance',
      'directoire',
      'gérance',
      'gérant'
    ]
  },
  {
    sousFamille: 'PlanComptableHorsWinsis',
    labelSousFamille: 'Plan comptable hors winsis',
    famille: 'organisation',
    labelFamille: 'Organisation',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: 'Plan comptable - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
    ],
    tags: ['plan de comptes']
  },
  {
    sousFamille: 'PlanComptes',
    labelSousFamille: 'Plan comptable',
    famille: 'Documents_comptables',
    labelFamille: 'Organisation',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_EDITION, label: 'Date édition', order: 2 }
    ]
  },
  {
    sousFamille: 'VolumeCloture_Balance',
    labelSousFamille: 'Balance de clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DESCRIPTION, label: 'Description', order: 2 },
    ]
  },
  {
    sousFamille: 'VolumeCloture_Journaux',
    labelSousFamille: 'Journaux de clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_MouvementsCessions',
    labelSousFamille: 'Immobilisations - Cessions',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_MouvementsAcquisition',
    labelSousFamille: 'Immobilisations - Acquisitions',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_MouvementsCessionsLot',
    labelSousFamille: 'Immobilisations - Cessions par lot',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_ComptesAnnuelsLiasse',
    labelSousFamille: 'Liasse fiscale - Volume clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Liasses fiscales',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'ComptesAnnuelsLiasse',
    labelSousFamille: 'Liasse fiscale',
    famille: 'Liasse_fiscale',
    labelFamille: 'Liasses fiscales',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_DeclarationLoyersProfessionnels',
    labelSousFamille: 'Déclaration des loyers professionnels - Volume clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'CET (CFE / CVAE) - Déclarations des biens imposables',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_CVAE_1330',
    labelSousFamille: 'CVAE - Déclaration 1330 - Volume clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'CET (CFE / CVAE) - Déclarations annuelles et avis d\'imposition',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
    ]
  },
  {
    sousFamille: 'VolumeCloture_DossierRevision',
    labelSousFamille: 'Dossier de révision',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Dossiers de l\'exercice - Dossier de travail',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'ComptesAnnuelsPlaquette',
    labelSousFamille: 'Plaquette des comptes annuels',
    famille: 'Comptes_annuels',
    labelFamille: 'Comptes annuels',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_MouvementsVirements',
    labelSousFamille: 'Immobilisations - Virements',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_GrandLivre',
    labelSousFamille: 'Grand livre de clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_DotationsDetaillees',
    labelSousFamille: 'Immobilisations - Dotations',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_ComptesAnnuelsPlaquette',
    labelSousFamille: 'Plaquette des comptes annuels - Volume clôture',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Comptes annuels',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'VolumeCloture_JournalCentralisateur',
    labelSousFamille: 'Journal centralisateur',
    famille: 'Volume_de_Cloture',
    labelFamille: 'Clôture',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'PlanProfessionnel',
    labelSousFamille: 'Plan professionnel',
    famille: 'organisation',
    labelFamille: 'Organisation',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: '{fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ],
    tags: ['avis de conformité']
  },
  {
    sousFamille: 'DescriptifDeProcedures',
    labelSousFamille: 'Descriptif de procédures',
    famille: 'organisation',
    labelFamille: 'Organisation',
    onglet: 'Comptabilité / Gestion',
    displayClient: true,
    fpNommageCalc: 'Descriptif - {fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },

    ]
  },
  {
    sousFamille: 'DocumentPersonnelDirigeant',
    labelSousFamille: 'Document personnel dirigeant',
    famille: 'situationDeFamille',
    labelFamille: 'Situation de famille',
    onglet: 'Chef d\'entreprise',
    displayClient: false,
    noUpload: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'OrganisationComptable_Autre',
    labelSousFamille: 'Organisation comptable - Autre',
    famille: 'organisation',
    labelFamille: 'Organisation',
    onglet: 'Comptabilité / Gestion',
    displayClient: false,
    fpNommageCalc: '{fp:natureObjet} - {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
    ]
  },
  {
    sousFamille: 'RCM_2777D',
    labelSousFamille: 'RCM - Déclaration 2777',
    famille: 'RCM',
    labelFamille: 'Prélèvements sociaux sur RCM',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'RCM_2777DHorsWinsis',
    labelSousFamille: 'RCM - Déclaration 2777 hors Winsis',
    famille: 'RCM',
    labelFamille: 'Prélèvements sociaux sur RCM',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'RCM-Déclaration {fp:declaration} au titre de {fp:moisReference|MM/yyyy}',
    listeMetadatas: [
      { ...MOIS_DECLARE, label: 'Mois déclaré', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...STATUT, label: 'Projet - Signé', order: 4 },
      { ...DECLARATION, label: 'Numéro de déclaration', order: 5 },
    ]
  },
  {
    sousFamille: 'Recommandations',
    labelSousFamille: 'Recommandation',
    famille: 'recommandation',
    labelFamille: 'Recommandations et conseils',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Courrier {fp:destinataire} - {fp:natureObjet}',
    listeMetadatas: [
      { ...DESTINATAIRE, label: 'Destinataire', order: 2 },
      { ...DATE_DOCUMENT, label: 'Date du document', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet de la recommandation', order: 4 },
      { ...DOMAINE, label: 'Domaine', order: 5 },
      { ...STATUT, label: 'Projet - Signé', order: 6 },
    ],
    tags: [
      'lettre',
      'préconisation',
      'conseil',
      'courrier'
    ]
  },
  {
    sousFamille: 'RappelDObligations',
    labelSousFamille: 'Employeur - Rappel obligations',
    famille: 'recommandation',
    labelFamille: 'Recommandations et conseils',
    onglet: 'Fiducial',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Rappel obligations employeur',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 3 },
    ]
  },
  {
    sousFamille: 'JustificatifReductionsCharges',
    labelSousFamille: 'Justificatif des réductions de charges',
    famille: 'Reductions_de_charges',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - Cotisations périodiques',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...TYPE, label: 'Type', order: 2 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 3 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 4 }
    ]
  },
  {
    sousFamille: 'JustificatifFillonAnnuel',
    labelSousFamille: 'Justificatif annuel Fillon',
    famille: 'Reductions_de_charges',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'JustificatifFillonAnnuelNotariat',
    labelSousFamille: 'Justificatif annuel Fillon - Notariat',
    famille: 'Reductions_de_charges',
    labelFamille: 'Entreprise : Dossier annuel - Documents paie - Cotisations et éditions annuelles',
    onglet: 'Social',
    displayClient: false,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'SalarieDiversAnnuel',
    labelSousFamille: 'Salarié - Divers annuel',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
    ],
    tags: ['non partagé', 'feuille travail', 'notes']

  },
  {
    sousFamille: 'SalarieDiversAnnuel_PartageAvecClient',
    labelSousFamille: 'Salarié - Divers annuel - Partagé avec client',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
    ],
    tags: ['arrêt travail', 'Demande congés', 'courrier salarié']
  },
  {
    sousFamille: 'FicheIndividuelleSalarie',
    labelSousFamille: 'Fiche individuelle salarié',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'Fiche individuelle du salarié {fp:nom} {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },
    ]
  },
  {
    sousFamille: 'Dpae_DeclarationDEmbauche',
    labelSousFamille: 'DPAE - Déclaration d\'embauche',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'DPAE {fp:nom} {fp:dateDocument|yyyy/MM/dd}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },
    ],
    tags: ['DPAE', 'déclaration préalable à l\'embauche', 'déclaration d\'embauche', 'DUE']

  },
  {
    sousFamille: 'MedecineDuTravail_SuivMedicalDuSalarie',
    labelSousFamille: 'Médecine du travail - Suivi médical du salarié',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
    ],
    tags: [
      'visite d\'embauche',
      'visite périodique',
      'visite médicale d\'embauche',
      'médecine du travail',
      'médecin du travail',
      'avis'
    ]

  },
  {
    sousFamille: 'Organismes_DocumentsSalarie',
    labelSousFamille: 'Organismes - Documents salarié',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Adhésions salariés', 'régimes collectifs', 'retraite', 'prévoyance', 'mutuelles', 'dispense', 'chèque santé']
  },
  {
    sousFamille: 'EpargneSalariale_DocumentsSalarie',
    labelSousFamille: 'Epargne salariale - Documents salarié',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Epargne salariale', 'Participation', 'Intéressement', 'PEE', 'PERCO']

  },
  {
    sousFamille: 'Salarie_Divers_DocumentsPermanents',
    labelSousFamille: 'Salarié - Divers - Documents permanents',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Informations générales',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
    ],
  },
  {
    sousFamille: 'ContratDeTravail',
    labelSousFamille: 'Contrat de travail',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Contrat de travail',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDebutContrat|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DEBUT_CONTRAT, label: 'Date de début de contrat', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Avenant', 'lettre d\'embauche', 'promesse d\'embauche']

  },
  {
    sousFamille: 'ContratDeTravailAvenant',
    labelSousFamille: 'Contrat de travail - Avenant',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Contrat de travail',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateAvenant|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DEBUT_AVENANT, label: 'Date de début avenant', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ]
  },
  {
    sousFamille: 'DisciplineSalarie',
    labelSousFamille: 'Discipline - Salarié',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier permanent - Suivi disciplinaire',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['avertissement', 'blâme', 'mise à pied', 'sanction disciplinaire']
  },
  {
    sousFamille: 'SoldeDeToutCompteSigne',
    labelSousFamille: 'Solde de tout compte signé',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} solde de tout compte {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },
    ]
  },
  {
    sousFamille: 'CertificatDeTravailSigne',
    labelSousFamille: 'Certificat de travail signé',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd}  certificat de travail {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },

    ]
  },
  {
    sousFamille: 'AttestationPoleEmploiSignee',
    labelSousFamille: 'Attestation Pole emploi signée',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: 'fp:dateDocument|yyyy/MM/dd} attestation pôle emploi {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },

    ]
  },
  {
    sousFamille: 'BIAF_Signe',
    labelSousFamille: 'BIAF signé',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} BIAF {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 3 },
    ]
  },
  {
    sousFamille: 'FinDeContratDeTravail_Rupture_DocumentsDeProcedure',
    labelSousFamille: 'Fin de contrat de travail - Rupture - documents de procédure',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: true,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom} {fp:statut}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
      { ...STATUT, label: 'Projet - Signé', order: 5 },
    ],
    tags: ['Convocation', 'Notification', 'Démission', 'rupture conventionnelle', 'licenciement']

  },
  {
    sousFamille: 'FinDeContratDeTravail_FeuilleDeTravail_NotesCollaborateur',
    labelSousFamille: 'Fin de contrat de travail - Feuille de travail - Notes collaborateur',
    famille: 'salarie',
    labelFamille: 'Salarié - Dossier annuel',
    onglet: 'Social',
    displayClient: false,
    fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} {fp:natureObjet} {fp:nom}',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 3 },
      { ...NOM, label: 'Nom et prénom du salarié', order: 4 },
    ]
  },
  {
    sousFamille: 'Statuts',
    labelSousFamille: 'Statuts',
    famille: 'statut',
    labelFamille: 'Statuts',
    onglet: 'Juridique',
    displayClient: true,
    fpNommageCalc: 'Statuts - {fp:dateDocument|yyyy/MM/dd} ',
    listeMetadatas: [
      { ...DATE_DOCUMENT, label: 'Date du document', order: 2 },
      { ...STATUT, label: 'Projet - Signé', order: 3 },
    ]
  },
  {
    sousFamille: 'Previsionnel',
    labelSousFamille: 'Prévisionnel temps de travail',
    famille: 'Suivi_Temps_de_travail',
    labelFamille: 'Entreprise : Dossier annuel - Documents périodiques - EVP - Correspondances paie',
    onglet: 'Social',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 3 }
    ]
  },
  {
    sousFamille: 'TS_2501',
    labelSousFamille: 'TS - Taxe sur salaire - Relevé de versement 2501',
    famille: 'TS',
    labelFamille: 'Taxes sur les salaires',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TS_2502',
    labelSousFamille: 'TS - Taxe sur salaire - Déclaration annuelle 2502',
    famille: 'TS',
    labelFamille: 'Taxes sur les salaires',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'Liasse_fiscale_Tiers',
    labelSousFamille: 'Fichier liasse fiscale pour tiers',
    famille: 'Liasse_fiscale',
    labelFamille: 'Liasses fiscales',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: []
  },
  {
    sousFamille: 'TVADeclarationHorsWinsis',
    labelSousFamille: 'TVA - Déclaration hors Winsis',
    famille: 'Tva',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    fpNommageCalc: 'TVA-Déclaration  {fp:numeroFormulaire} - {fp:dateFinPeriode|dd/MM/yyyy} ',
    listeMetadatas: [
      { ...NUMERO_FORMULAIRE, label: 'Numéro de formulaire de déclaration', order: 2 },
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 3 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 4 },
    ],
    tags: [
      'CA3',
      'CA3G',
      'CA12',
      'Demande de remboursement',
      '3310',
      '3517',
      '3514',
      '3525',
      '3519'
    ]
  },
  {
    sousFamille: 'TVAAutreDocumentExercice',
    labelSousFamille: 'TVA - Autre document exercice',
    famille: 'Tva',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: false,
    fpNommageCalc: 'TVA - {fp:natureObjet} - {fp:dateFinPeriode|dd/MM/yyyy} ',
    listeMetadatas: [
      { ...DATE_FIN_PERIODE, label: 'Date de fin de période', order: 2 },
      { ...DATE_FIN_EXERCICE, label: 'Date de clôture de l\'exercice concerné', order: 3 },
      { ...NATURE_OBJET, label: 'Nature et objet du document', order: 4 },
    ],
  },
  {
    sousFamille: 'TVA_3310CA3',
    labelSousFamille: 'TVA - Déclaration 3310CA3',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3310CA3G',
    labelSousFamille: 'TVA - Déclaration 3310CA3G',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3517SCA12',
    labelSousFamille: 'TVA - Déclaration 3517SCA12',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3517BCA12',
    labelSousFamille: 'TVA - Déclaration 3517BCA12',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3514',
    labelSousFamille: 'TVA - Déclaration 3514',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3525BIS',
    labelSousFamille: 'TVA - Déclaration 3525Bis',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3519',
    labelSousFamille: 'TVA - Demande de remboursement 3519',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  },
  {
    sousFamille: 'TVA_3517DDR',
    labelSousFamille: 'TVA - Demande de remboursement 3517DDR',
    famille: 'TVA',
    labelFamille: 'TVA',
    onglet: 'Fiscal',
    displayClient: true,
    noUpload: true,
    listeMetadatas: [
      { ...REFERENCE_IMPRIME, label: 'Référence imprimé', order: 2 },
      { ...NUMERO_CHRONO, label: 'Numéro chrono', order: 3 },
      { ...DATE_DEBUT_PERIODE, label: 'Date début période', order: 4 },
      { ...DATE_FIN_PERIODE, label: 'Date fin période', order: 5 }
    ]
  }

];
