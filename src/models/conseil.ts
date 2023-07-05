export interface ConseilMetaData {
  label: string;
  order?: number;
  metadata: string;
  name: string;
  type: string;
  obligatoire: boolean;
  options?: string[];
  hint?: string;
}

export interface ConseilClassment {
  labelSousFamille: string;
  sousFamille: string;
  famille: string;
  labelFamille: string;
  listeMetadatas: ConseilMetaData[];
}

export interface ProduitConseil {
  nature: string;
  fournisseur: string;
  produit: string;
}

export interface ConseilClassments {
  documentType: ConseilClassment[];
  contrat: ConseilContrat[];
  fournisseur: ConseilContrat[];
  produit: any;
}

export interface ConseilCustomer {
  CodeBudget: string;
  CodePostal: string;
  Nom: string;
  NumeroDossier: string;
  Prenom: string;
  TypeClient: string;
  id: string;
}

export interface ConseilUser {
  authorityType: string;
  displayName: string;
  fullName: string;
  shortName: string;
  url: string;
}

export interface ConseilUserResponse {
  data: ConseilUser[];
  paging: {
    confidence: string;
    maxItems: number;
    skipCount: number;
    totalItems: number;
    totalItemsRangeEnd: any;
  }
}

export interface ConseilDocuments {
  metadata: string;
  name: string;
  label?: string;
  type: string;
  order?: number;
  obligatoire: boolean;
  position: string;
  options?: string[];
  hint?: string;
  typedDate?: string;
}

export interface ConseilContrat {
  nature: string;
  fournisseurs: ConseilFournisseurs[];
}

export interface CustomerConseil {
  codeBudget: string;
  codePostal: string;
  nomClient: string;
  numeroClient: string;
}

export interface DirectionRegionale {
  label: string;
  societe: string;
  codeBudget: string[];
}

export interface MinifiedResponse {
  l?: string;
  s?: string;
  c?: string;
}

export interface DossierConseil {
  customerProperties: CustomerConseil;
  document: {
    id: string;
    title: string;
  };
  documentProperties: {
    'cm:description': string;
    'conseil:produit': string;
    'contrat:fournisseur': string;
    'contrat:nature': string;
    'fiducial:domainContainerFamille': string;
    'fiducial:domainContainerSousFamille': string;
    'firme:codeBudget': string;
    'firme:codeClient': string;
    'firme:matriculeCollab': string;
    'fp:nommage': string;
    id: string;
    'title': string;
  };
}

const DESCRIPTION: ConseilMetaData = {
  label: 'Description / Commentaire',
  order: 1,
  metadata: 'cm:description',
  name: 'description',
  type: 'text',
  obligatoire: false,
  hint: '100'
};
const NATURE: ConseilMetaData = {
  label: 'Catégorie du produit',
  order: 3,
  metadata: 'contrat:nature',
  name: 'nature',
  type: 'text',
  obligatoire: false
};
const FOURNISSEUR: ConseilMetaData = {
  label: 'Partenaire',
  order: 2,
  metadata: 'contrat:fournisseur',
  name: 'fournisseur',
  type: 'text',
  obligatoire: false
};
const PRODUIT: ConseilMetaData = {
  label: 'Nom du produit souscrit',
  order: 4,
  metadata: 'conseil:produit',
  name: 'produit',
  type: 'text',
  obligatoire: false
};
const NUMERO_DOSSIER: ConseilMetaData = {
  label: 'Numéro de dossier',
  order: 5,
  metadata: 'conseil:numero',
  name: 'numeroDossier',
  type: 'text',
  obligatoire: false
};
const NUMERO_CONTRAT: ConseilMetaData = {
  label: 'Numéro de contrat',
  order: 6,
  metadata: 'contrat:numero',
  name: 'numeroContrat',
  type: 'text',
  obligatoire: false
};
const SCPI: ConseilMetaData = {
  label: 'Nombre de parts',
  order: 7,
  metadata: 'conseil:SCPI',
  name: 'SCPI',
  type: 'text',
  obligatoire: false
};
const DATE_DOCUMENT: ConseilMetaData = {
  label: 'Date du document',
  order: 12,
  metadata: 'fp:dateDocument',
  name: 'dateDocument',
  type: 'date',
  obligatoire: false
};
const DATE_RECEPTION: ConseilMetaData = {
  label: 'Date de réception',
  order: 10,
  metadata: 'conseil:dateReception',
  name: 'dateReception',
  type: 'date',
  obligatoire: false
};
const DATE_CONTRAT: ConseilMetaData = {
  label: 'Date de prise d\'effet',
  order: 8,
  metadata: 'contrat:dateContrat',
  name: 'dateContrat',
  type: 'date',
  obligatoire: false
};
const DATE_FIN_CONTRAT: ConseilMetaData = {
  label: 'Date de fin de validité',
  order: 9,
  metadata: 'contrat:dateFinContrat',
  name: 'dateFinContrat',
  type: 'date',
  obligatoire: false
};
const DATE_SIGNATURE: ConseilMetaData = {
  label: 'Date de signature',
  order: 11,
  metadata: 'fp:dateSignature',
  name: 'dateSignature',
  type: 'date',
  obligatoire: false
};

export const MANDATORY_METADATAS: ConseilMetaData[] = [
  {
    label: 'Numéro client',
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
    label: 'Famille document',
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
export const CLASSEMENT_REPRISE: ConseilClassment[] = [
  {
    labelSousFamille: 'Reprise : Dossier - Autre',
    sousFamille: 'dossier_autre',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR
    ]
  },
  {
    labelSousFamille: 'Reprise : Dossier - Contractuel',
    sousFamille: 'dossier_contractuel',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR
    ]
  },
  {
    labelSousFamille: 'Reprise : Dossier - Complet',
    sousFamille: 'dossier_complet',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR
    ]
  }
];

export const CLASSEMENT: ConseilClassment[] = [
  {
    labelSousFamille: 'Annexes',
    sousFamille: 'annexes',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT,
      DATE_SIGNATURE
    ]
  },
  {
    labelSousFamille: 'Arbitrage',
    sousFamille: 'arbitrage',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT,
      DATE_SIGNATURE
    ]
  },
  {
    labelSousFamille: 'AR de Fiducial Gérance (confirmation entrée en jouissance des parts)',
    sousFamille: 'AR_fiducial_gerance',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Arrêt de travail',
    sousFamille: 'arret_travail',
    famille: 'administratif_sinistre',
    labelFamille: 'Administratif sinistre',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Attestation client ne souhaitant pas remplir le QIF',
    sousFamille: 'att_client_qif',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Autorisation échange données santé',
    sousFamille: 'autorisation_echange_donnees_sante',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      DESCRIPTION,
      NATURE,
      FOURNISSEUR,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Attestation de délégation d\'assurance',
    sousFamille: 'att_delegation_assurance',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Autres / Divers',
    sousFamille: 'autres_divers',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      DATE_RECEPTION,
      DATE_DOCUMENT,
      DATE_SIGNATURE
    ]
  },
  {
    labelSousFamille: 'Avenant',
    sousFamille: 'avenant',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      DATE_DOCUMENT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
    ]
  },
  {
    labelSousFamille: 'Avoir',
    sousFamille: 'avoir',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT,
    ]
  },
  {
    labelSousFamille: 'Bilan patrimonial',
    sousFamille: 'bilan_patrimonial',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_SIGNATURE,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Bulletin de reversement',
    sousFamille: 'bulletin_reversement',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Bulletin de souscription',
    sousFamille: 'bull_souscription',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_SIGNATURE,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Bulletin de souscription (SCPI)',
    sousFamille: 'bull_souscription_scpi',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_SIGNATURE,
      NUMERO_CONTRAT,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Carte vitale',
    sousFamille: 'carte_vitale',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Certificat d\'adhésion',
    sousFamille: 'certificat_adhesion',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_DOCUMENT,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT
    ]
  },
  {
    labelSousFamille: 'Certificat d\'affiliation',
    sousFamille: 'certificat_affiliation',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_DOCUMENT,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT
    ]
  },
  {
    labelSousFamille: 'Check List',
    sousFamille: 'check_list',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Chiffrages',
    sousFamille: 'chiffrages',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Contrat',
    sousFamille: 'contrat',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Convention de démembrement',
    sousFamille: 'convention_demembrement',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Convention RTO',
    sousFamille: 'convention_rto',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Copie chèque - Avis de virement',
    sousFamille: 'copie_cheque_virement',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Correspondances diverses',
    sousFamille: 'correspondances_diverses',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Courrier Client',
    sousFamille: 'courrier_client',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Courrier Fiducial Conseil',
    sousFamille: 'courrier_fiducial_conseil',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Courrier Partenaire',
    sousFamille: 'courrier_partenaire',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Déclaration d\'adéquation',
    sousFamille: 'declaration_adequation_conseil',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Déclaration d\'origine des fonds (SCPI)',
    sousFamille: 'declaration_origine_fonds_scpi',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Demande de rachat partiel',
    sousFamille: 'demande_rachat_partiel',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Demande de rachat total',
    sousFamille: 'demande_rachat_total',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Demande de souscription',
    sousFamille: 'demande_souscription',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Demande de transfert',
    sousFamille: 'demande_transfert',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'DICI',
    sousFamille: 'dici',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {

    labelSousFamille: 'Document d\'entrée en relation',
    sousFamille: 'document_entree_relation',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {

    labelSousFamille: 'Documents contractuels',
    sousFamille: 'documents_contractuels',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'DUE',
    sousFamille: 'due',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Estimation/chiffrage liquidation',
    sousFamille: 'estimation_chiffrage_liquidation',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Étude tarifaire',
    sousFamille: 'etude_tarifaire',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT,
      DATE_SIGNATURE
    ]
  },
  {
    labelSousFamille: 'Extrait K-Bis',
    sousFamille: 'extrait_kbis',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Extrait RBE',
    sousFamille: 'extrait_rbe',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Preuve interrogation RBE',
    sousFamille: 'preuve_interrogation_rbe',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Fiche consultation',
    sousFamille: 'fiche_consultation',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Fiche standardisée d\'information',
    sousFamille: 'fiche_standard_information',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Justificatif d\'origine des fonds',
    sousFamille: 'justif_origine_fonds',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Justificatif d\'origine des fonds (SCPI)',
    sousFamille: 'declaration_justif_fond_scpi',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Justificatif de ressources',
    sousFamille: 'justif_ressources',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      DATE_DOCUMENT,
    ]
  },
  {
    labelSousFamille: 'Justificatif de situation',
    sousFamille: 'justif_situation',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Justificatif domicile',
    sousFamille: 'justif_domicile',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT
    ]
  },

  {
    labelSousFamille: 'Lettre de mission',
    sousFamille: 'lettre_mission',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Lettre de mission simplifiée',
    sousFamille: 'lettre_mission_simplifiee',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Livret de famille',
    sousFamille: 'livret_famille',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail CGP',
    sousFamille: 'mail_cgp',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail CGP Réclamation',
    sousFamille: 'mail_cgp_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail CGP Sinistre',
    sousFamille: 'mail_cgp_sinistre',
    famille: 'correspondance_sinistre',
    labelFamille: 'Correspondance sinistre',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail Client',
    sousFamille: 'mail_client',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail Client Réclamation',
    sousFamille: 'mail_client_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail Client Sinistre',
    sousFamille: 'mail_client_sinistre',
    famille: 'correspondance_sinistre',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail Conformité Réclamation',
    sousFamille: 'mail_conformite_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail conformité',
    sousFamille: 'mail_conformite',
    famille: 'conformite',
    labelFamille: 'Conformité',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail conformité produit',
    sousFamille: 'mail_conformite_produit',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail de Fiducial Conseil',
    sousFamille: 'mail_fiducial_conseil',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail de Fiducial Conseil Réclamation',
    sousFamille: 'mail_fiducial_conseil_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail de Fiducial Conseil Sinistre',
    sousFamille: 'mail_fiducial_conseil_sinistre',
    famille: 'correspondance_sinistre',
    labelFamille: 'Correspondance sinistre',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail MO réclamation',
    sousFamille: 'mail_mo_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail partenaire',
    sousFamille: 'mail_partenaire',
    famille: 'correspondance_souscription',
    labelFamille: 'Correspondance souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail partenaire Réclamation',
    sousFamille: 'mail_partenaire_reclamation',
    famille: 'correspondance_reclamation',
    labelFamille: 'Correspondance réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mail partenaire Sinistre',
    sousFamille: 'mail_partenaire_sinistre',
    famille: 'correspondance_sinistre',
    labelFamille: 'Correspondance sinistre',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Mandat prélèvement SEPA',
    sousFamille: 'mandat_prelev_sepa',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Note d\'honoraires',
    sousFamille: 'note_honoraires',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Notification de retraite',
    sousFamille: 'notification_retraite',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas:
      [
        DESCRIPTION,
        NUMERO_CONTRAT,
        PRODUIT,
        NUMERO_DOSSIER,
        SCPI,
        DATE_RECEPTION,
        DATE_DOCUMENT
      ]
  },
  {
    labelSousFamille: 'Notice d\'information',
    sousFamille: 'notice_information',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas:
      [
        DESCRIPTION,
        NUMERO_CONTRAT,
        PRODUIT,
        NUMERO_DOSSIER,
        SCPI,
        DATE_CONTRAT,
        DATE_FIN_CONTRAT,
        DATE_RECEPTION,
        DATE_SIGNATURE,
        DATE_DOCUMENT
      ]
  },
  {
    labelSousFamille: 'Offre de prêt',
    sousFamille: 'offre_pret',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Passeport',
    sousFamille: 'passeport',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      FOURNISSEUR,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT,
      DESCRIPTION
    ]
  },
  {
    labelSousFamille: 'PID',
    sousFamille: 'pid',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Pièce d\'identité',
    sousFamille: 'piece_identite',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      FOURNISSEUR,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_DOCUMENT,
      DESCRIPTION
    ]
  },
  {
    labelSousFamille: 'Proposition d\'assurance',
    sousFamille: 'proposition_assurance',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Questionnaire d\'entrée en relation (SCPI)',
    sousFamille: 'questionnaire_entree_relation_scpi',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Questionnaire d\'Information Financière (QIF)',
    sousFamille: 'qif',
    famille: 'conformite',
    labelFamille: 'Conformité générale',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Rapport de formalisation',
    sousFamille: 'rapport_formalisation',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Rapport Consultation Assistance Patrimoniale',
    sousFamille: 'rapport_consult_ass_patrimoniale',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',

    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'REBC',
    sousFamille: 'rebc',
    famille: 'conformite_souscription',
    labelFamille: 'Conformité produit',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_RECEPTION,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Relevé d\'identité bancaire(RIB)',
    sousFamille: 'rib',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Résiliation',
    sousFamille: 'resiliation',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT,
      DATE_SIGNATURE,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'RUM',
    sousFamille: 'rum',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Scoring LCB-FT (KYC)',
    sousFamille: 'scoring',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      NUMERO_DOSSIER,
      DATE_DOCUMENT,
      DATE_RECEPTION,
      DATE_CONTRAT,
      DATE_FIN_CONTRAT
    ]
  },
  {
    labelSousFamille: 'Statuts de la conformité',
    sousFamille: 'statuts',
    famille: 'conformite',
    labelFamille: 'Conformité générale',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Tableau d\'amortissement',
    sousFamille: 'tableau_amortissement',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_DOCUMENT,
      DATE_RECEPTION,
    ]
  },
  {
    labelSousFamille: 'Titre de rente',
    sousFamille: 'titre_rente',
    famille: 'administratif_souscription',
    labelFamille: 'Administratif souscription',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Transaction Remboursement',
    sousFamille: 'transaction_remboursement',
    famille: 'administratif_reclamation',
    labelFamille: 'Administratif réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
  {
    labelSousFamille: 'Validation DG',
    sousFamille: 'validation_dg',
    famille: 'administratif_reclamation',
    labelFamille: 'Administratif réclamation',
    listeMetadatas: [
      NATURE,
      FOURNISSEUR,
      DESCRIPTION,
      NUMERO_CONTRAT,
      PRODUIT,
      NUMERO_DOSSIER,
      SCPI,
      DATE_RECEPTION,
      DATE_DOCUMENT
    ]
  },
];

export interface ConseilFournisseurs {
  nom: string;
  produits: string[];
}