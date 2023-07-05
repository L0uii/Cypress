export interface LabelValue {
    label: string,
    value: any
}

export interface ArchivesMetadata {
    label: string,
    show: boolean,
    order: number,
    metadata: string,
    name: string,
    type: string,
    obligatoire: boolean,
    position: string,
    typedDate?: string,
    options?: LabelValue[] | string[],
    typedValue?: undefined,
    saisieLibre?: boolean;
    hint?: string,
    context?: string
}

export const OPTIONS_NATURE = [
    'Classeur',
    'Boîte',
    'Pochette',
    'Document relié',
    'Lutin',
    'Carton',
    'Cassette',
    'CD/DVD',
    'Sacoche'
];

export const OPTIONS_ETAT_DOSSIER = [
    'Présent',
    'Transmis',
    'Transition',
    'Absent',
    'Archivé',
    'Détruit'
];

export const OPTIONS_LOCALISATION = [
    'Lyon',
    'Paris',
    'Chères',
    'Eygalières',
    'Angers',
    'Bruxelles',
    'New York'
];

export const OPTIONS_NIVEAU_LOCALISATION = [
    'Secretariat',
    'Bureau CL',
    'Salle du coffre',
    'Salle de travail',
    'Couloir',
    'Cybele',
    'Calliope',
    'Artermis',
    'Danae',
    'Bibliotheque',
    'Bureau archivistes',
    'Petites archives',
    'Grandes archives',
];

export const OPTIONS_THEMATIQUE = [
    'ADMINISTRATIF',
    'AGRICOLE',
    'ARCHIVISTE',
    'ASSURANCE',
    'AUDIT',
    'BANQUE',
    'BUDGET',
    'CENTRES DE GESTION ET ASSOCIATIONS',
    'COMMUNICATION',
    'CONSEIL',
    'CONTENTIEUX',
    'DEONTOLOGIE',
    'ECONOMIE',
    'EXPANSION',
    'EXPERTISE/CONSULTING',
    'FINANCES',
    'FISCALITE',
    'FORMATION',
    'FOS',
    'IMMOBILIER',
    'INFORMATIQUE',
    'INTERNATIONAL',
    'JURIDIQUE',
    'MEDIA',
    'NOTAIRE',
    'PERSO CL',
    'POLITIQUE',
    'RESSOURCES HUMAINES',
    'SECURITE',
    'VEILLE'
];

export const OPTIONS_COMPLEMENT_LOCALISATION = [
    'Carton',
    'Rayonnage'
];

export const OPTIONS_SOMMAIRE: LabelValue[] = [
    {
        label: 'Oui',
        value: 'SOMMAIRE_PRESENT'
    },
    {
        label: 'Non',
        value: 'SOMMAIRE_ABSENT'
    },
];

export const TITRE: ArchivesMetadata = {
    label: 'Titre',
    show: true,
    order: 1,
    metadata: 'cm:title',
    name: 'titre',
    type: 'text',
    obligatoire: true,
    hint: '100',
    position: 'main'
};

export const DATE_CREATION: ArchivesMetadata = {
    label: 'Date de création',
    show: true,
    order: 2,
    metadata: 'cm:created',
    name: 'dateCreation',
    type: 'dateRange',
    obligatoire: false,
    position: 'sidenav',
    context: 'search'
};

export const NATURE: ArchivesMetadata = {
    label: 'Nature du dossier',
    show: true,
    order: 3,
    metadata: 'fp:nature',
    name: 'nature',
    type: 'optionsArray',
    options: OPTIONS_NATURE,
    typedValue: undefined,
    obligatoire: true,
    position: 'sidenav'
};

export const ANNEE_DEBUT: ArchivesMetadata = {
    label: 'Année "Début"',
    show: true,
    order: 4,
    metadata: 'fp:dateDebutPeriode',
    name: 'anneeDebut',
    type: 'year',
    typedDate: '',
    obligatoire: true,
    position: 'sidenav'
};

export const ANNEE_FIN: ArchivesMetadata = {
    label: 'Année "Fin"',
    show: true,
    order: 5,
    metadata: 'fp:dateFinPeriode',
    name: 'anneeFin',
    type: 'year',
    typedDate: '',
    obligatoire: false,
    position: 'sidenav'
};

export const ETAT_DOSSIER: ArchivesMetadata = {
    label: 'État du dossier',
    show: true,
    order: 6,
    metadata: 'fp:statut',
    name: 'etatDossier',
    type: 'optionsArray',
    options: OPTIONS_ETAT_DOSSIER,
    typedValue: undefined,
    obligatoire: true,
    position: 'sidenav'
};

export const DATE_TRAITEMENT: ArchivesMetadata = {
    label: 'Depuis le',
    show: true,
    order: 7,
    metadata: 'fp:dateTraitement',
    name: 'dateTraitement',
    type: 'date',
    obligatoire: true,
    position: 'sidenav'
};

export const DESTINATAIRE: ArchivesMetadata = {
    label: 'Transmis à',
    show: true,
    order: 8,
    metadata: 'fp:destinataire',
    name: 'destinataire',
    type: 'text',
    obligatoire: false,
    position: 'sidenav'
};

export const LOCALISATION: ArchivesMetadata = {
    label: 'Localisation',
    show: true,
    order: 9,
    metadata: 'fiducial:domainContainerApplication',
    name: 'localisation',
    type: 'optionsArray',
    options: OPTIONS_LOCALISATION,
    typedValue: undefined,
    obligatoire: true,
    position: 'sidenav',
    saisieLibre: true
};

export const NIVEAU_LOCALISATION: ArchivesMetadata = {
    label: 'Niveau de localisation',
    show: true,
    order: 10,
    metadata: 'fp:local',
    name: 'local',
    type: 'optionsArray',
    options: OPTIONS_NIVEAU_LOCALISATION,
    typedValue: undefined,
    obligatoire: false,
    position: 'sidenav',
    saisieLibre: true

};

export const COMPLEMENT_LOCALISATION: ArchivesMetadata = {
    label: 'Complément de localisation',
    show: true,
    order: 11,
    metadata: 'contact:complement',
    name: 'complementLocalisation',
    type: 'optionsArray',
    options: OPTIONS_COMPLEMENT_LOCALISATION,
    typedValue: undefined,
    obligatoire: false,
    position: 'sidenav',
    saisieLibre: true

};

export const THEMATIQUE: ArchivesMetadata = {
    label: 'Thématique',
    show: true,
    order: 12,
    metadata: 'fiducial:domainContainerFamille',
    name: 'thematique',
    type: 'optionsArray',
    options: OPTIONS_THEMATIQUE,
    typedValue: undefined,
    obligatoire: true,
    position: 'main'
};

export const KEYWORDS: ArchivesMetadata = {
    label: 'Mots clés',
    show: true,
    order: 13,
    metadata: 'fp:natureObjet',
    name: 'keywords',
    type: 'tags',
    obligatoire: false,
    position: 'main'
};

export const DESCRIPTION: ArchivesMetadata = {
    label: 'Remarques',
    show: true,
    order: 14,
    metadata: 'cm:description',
    name: 'description',
    type: 'text',
    obligatoire: false,
    position: 'sidenav',
    hint: '100'
};

export const SOMMAIRE: ArchivesMetadata = {
    label: 'Sommaire',
    show: true,
    order: 15,
    metadata: 'fiducial:domainContainerSousFamille',
    name: 'sommaire',
    type: 'optionsObject',
    options: OPTIONS_SOMMAIRE,
    typedValue: undefined,
    obligatoire: true,
    position: 'sidenav'
};

export const METADATAS: ArchivesMetadata[] = [
    SOMMAIRE,
    DESCRIPTION,
    KEYWORDS,
    THEMATIQUE,
    COMPLEMENT_LOCALISATION,
    NIVEAU_LOCALISATION,
    LOCALISATION,
    DESTINATAIRE,
    DATE_TRAITEMENT,
    ETAT_DOSSIER,
    ANNEE_FIN,
    ANNEE_DEBUT,
    NATURE,
    DATE_CREATION,
    TITRE
];
