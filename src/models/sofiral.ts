export const MANDATORY_METADATAS = [
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
    }
];

//export const OPTIONS_STATUT = ['projet', 'signé'];

export const DATE_DOCUMENT = {
    metadata: 'fp:dateDocument',
    name: 'dateDocument',
    type: 'date',
    obligatoire: true,
    position: 'sidenav'
};

export const OBJET = {
    metadata: 'fp:objet',
    name: 'objet',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

/* export const STATUT = {
    metadata: 'fp:statut',
    name: 'statut',
    type: 'options',
    options: OPTIONS_STATUT,
    obligatoire: true,
    position: 'sidenav'
}; */

export const DATE_ASSEMBLEE_GENERALE = {
    metadata: 'fp:dateAssembleeGenerale',
    name: 'dateAssembleeGenerale',
    type: 'date',
    obligatoire: true,
    position: 'sidenav'
};

export const NATURE = {
    metadata: 'fp:nature',
    name: 'nature',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

export const DATE_FIN_EXERCICE = {
    metadata: 'fp:dateFinExercice',
    name: 'dateFinExercice',
    type: 'date',
    obligatoire: true,
    position: 'sidenav'
};

export const DESTINATAIRE = {
    metadata: 'fp:destinataire',
    name: 'destinataire',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

export const NOM_PRENOM = {
    metadata: 'fp:nomPrenom',
    name: 'nomPrenom',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

export const NUMERO_FORMULAIRE = {
    metadata: 'fp:numeroFormulaire',
    name: 'numeroFormulaire',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

export const NATURE_OBJET = {
    metadata: 'fp:natureObjet',
    name: 'natureObjet',
    type: 'text',
    obligatoire: true,
    position: 'sidenav'
};

export const DESCRIPTION = {
    metadata: 'cm:description',
    name: 'description',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
    hint: '100'
};

export const MOIS_DECLARE = {
    metadata: 'fp:moisReference',
    name: 'moisReference',
    type: 'month',
    typedDate: '',
    obligatoire: true,
    position: 'sidenav',
};

export const DECLARATION = {
    metadata: 'fp:declaration',
    name: 'declaration',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};
export const DOMAINE = {
    metadata: 'fp:domaineExpertise',
    name: 'domaineExpertise',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};
export const NOM = {
    metadata: 'fp:nom',
    name: 'nom',
    type: 'searchSalarie',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DEBUT_CONTRAT = {
    metadata: 'fp:dateDebutContrat',
    name: 'dateDebutContrat',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DEBUT_AVENANT = {
    metadata: 'fp:dateAvenant',
    name: 'dateAvenant',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_FIN_PERIODE = {
    metadata: 'fp:dateFinPeriode',
    name: 'dateFinPeriode',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const SOCIETE_EMETTRICE = {
    metadata: 'fp:societeEmettrice',
    name: 'societeEmettrice',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const MOIS_PAIEMENT = {
    metadata: 'fp:moisPaiement',
    name: 'moisPaiement',
    type: 'month',
    typedDate: '',
    obligatoire: true,
    position: 'sidenav',
};


export const TYPE = {
    metadata: 'fp:type',
    name: 'type',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const CONTENTIEUX = {
    metadata: 'fp:contentieux',
    name: 'contentieux',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const EMETTEUR = {
    metadata: 'fp:emetteur',
    name: 'emetteur',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const ORGANISME = {
    metadata: 'fp:organisme',
    name: 'organisme',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const NOM_FOURNISSEUR = {
    metadata: 'fp:nomFournisseur',
    name: 'nomFournisseur',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const NOM_ASSOCIE = {
    metadata: 'fp:nomAssocie',
    name: 'nomAssocie',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const PRENOM_ASSOCIE = {
    metadata: 'fp:prenomAssocie',
    name: 'prenomAssocie',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const MONTANT = {
    metadata: 'fp:montant',
    name: 'montant',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const NATURE_IMMOBILISATION = {
    metadata: 'fp:natureImmobilisation',
    name: 'natureImmobilisation',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_ADHESION = {
    metadata: 'fp:dateAdhesion',
    name: 'dateAdhesion',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const NOM_AUTRE = {
    metadata: 'fp:nomAutre',
    name: 'nomAutre',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const NOM_CONTRIBUABLE = {
    metadata: 'fp:nomContribuable',
    name: 'nomContribuable',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const PRENOM_CONTRIBUABLE = {
    metadata: 'fp:prenomContribuable',
    name: 'prenomContribuable',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const BANQUE = {
    metadata: 'fp:banque',
    name: 'banque',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const IBAN = {
    metadata: 'fp:iban',
    name: 'iban',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DEBUT_PERIODE = {
    metadata: 'fp:dateDebutPeriode',
    name: 'dateDebutPeriode',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DEBUT_EXERCICE = {
    metadata: 'fp:dateDebutExercice',
    name: 'dateDebutExercice',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const SOCIETE_BENEFICIAIRE = {
    metadata: 'fp:societeBeneficiaire',
    name: 'societeBeneficiaire',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const LOCAL = {
    metadata: 'fp:local',
    name: 'local',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const NUMERO_CHRONO = {
    metadata: 'fp:numChrono',
    name: 'numeroChrono',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_FIN_CONTRAT = {
    metadata: 'fp:dateFinContrat',
    name: 'dateFinContrat',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_ENVOI = {
    metadata: 'fp:dateEnvoi',
    name: 'dateEnvoi',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DERNIER_JOUR_TRAVAIL = {
    metadata: 'fp:dateDernierJourTravail',
    name: 'dateDernierJourTravail',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_SIGNATURE = {
    metadata: 'fp:dateSignature',
    name: 'dateSignature',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const REFERENCE_IMPRIME = {
    metadata: 'fp:refImprime',
    name: 'referenceImprime',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_DE_REPRISE = {
    metadata: 'fp:dateReprise',
    name: 'dateReprise',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const DATE_EDITION = {
    metadata: 'fp:dateHeureEdition',
    name: 'dateEdition',
    type: 'date',
    obligatoire: true,
    position: 'sidenav',
};

export const SIREN = {
    metadata: 'fp:',
    name: 'Siren',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const TVA = {
    metadata: 'fp:',
    name: 'TVA',
    type: 'text',
    obligatoire: true,
    position: 'sidenav',
};

export const CLASSEMENT = [
    {
        labelSousFamille: 'Facturation client',
        sousFamille: 'FacturationClient',
        famille: 'Facture',
        labelFamille: 'Facture',
        onglet: 'Factures et Avoirs',
        displayClient: true,
        fpNommageCalc: '{fp:dateDocument|yyyy/MM/dd} - Facture -',
        listeMetadatas: [
            Object.assign(SIREN, { label: 'Numéro SIREN', order: 2 }),
            Object.assign(DATE_DOCUMENT, { label: 'Date de l\'acte', order: 3 }),
            Object.assign(DATE_DEBUT_CONTRAT, { label: 'Date de début facture', order: 4 }),
            Object.assign(DATE_FIN_CONTRAT, { label: 'Date de fin facture', order: 5 }),
            Object.assign(MONTANT, { label: 'Montant facture TTC', order: 6 }),
            Object.assign(TVA, { label: 'TVA', order: 7 }),
        ],
        tags: ['']
    }

];
