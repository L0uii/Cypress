export const PROCESSED_GERANCE_ASSOCIES = `AND !gerance:numeroAssocie:000000 AND gerance:atraiter:non`;
export const PENDING_PROCESSING_GERANCE_ASSOCIES_ADMIN =
	`AND ((=gerance:numeroAssocie:000000 OR =gerance:atraiter:oui) AND =gerance:typeDossierAssocie:ADMINISTRATIF)`;
export const PENDING_PROCESSING_GERANCE_ASSOCIES_SUCCES =
	`AND ((=gerance:numeroAssocie:000000 OR =gerance:atraiter:oui) AND =gerance:typeDossierAssocie:SUCCESSION)`;
export const PENDING_PROCESSING_GERANCE_ASSOCIES_RETRAIT =
	`AND ((=gerance:numeroAssocie:000000 OR =gerance:atraiter:oui) AND =gerance:typeDossierAssocie:RETRAIT)`;
export const PENDING_PROCESSING_GERANCE_ASSOCIES_SOUSCRIP =
	`AND ((=gerance:numeroAssocie:000000 OR =gerance:atraiter:oui) AND =gerance:typeDossierAssocie:SOUSCRIPTION)`;
export const PENDING_PROCESSING_GERANCE_ASSOCIES_DIVERS =
	`AND ((=gerance:numeroAssocie:000000 OR =gerance:atraiter:oui) AND =gerance:typeDossierAssocie:DIVERS)`;
export interface CommonGeranceAssocie {
	label: string,
	metadata: string,
	name: string,
	obligatoire: boolean,
	type: string,
	value?: string;
	options?: string;
	hint?: string;
	number?: number;
	order?: number
}

export interface ClassementGeranceAssocie {
	labelFamille: string,
	famille: string,
	labelSousFamille: string,
	sousFamille: string,
	onglet: string,
	displayClient: boolean,
	listeMetadatas: CommonGeranceAssocie[],
  product?: string
}

export const COMMON_GERANCEASSOCIES = [
	{
		label: 'Auteur du document',
		metadata: 'cm:author',
		name: 'author',
		obligatoire: true,
		type: 'calculated',
		value: '{author}'
	}, {
		label: 'Description du document',
		metadata: 'cm:description',
		name: 'description',
		obligatoire: false,
		type: 'text'
	}, {
		label: 'Application',
		metadata: 'fiducial:domainContainerApplication',
		name: 'domainContainerApplication',
		obligatoire: true,
		type: 'calculated',
		value: 'Associe'
	}, {
		label: 'Branche',
		metadata: 'fiducial:domainContainerBranche',
		name: 'domainContainerBranche',
		obligatoire: true,
		type: 'calculated',
		value: 'GERANCE'
	}, {
		label: 'Famille',
		metadata: 'fiducial:domainContainerFamille',
		name: 'domainContainerFamille',
		obligatoire: true,
		type: 'calculated',
		value: '{famille}'
	}, {
		label: 'Société',
		metadata: 'fiducial:domainContainerSociete',
		name: 'domainContainerSociete',
		obligatoire: true,
		type: 'calculated',
		value: 'Associes'
	}, {
		label: 'Type de document',
		metadata: 'fiducial:domainContainerSousFamille',
		name: 'domainContainerSousFamille',
		obligatoire: true,
		type: 'calculated',
		value: '{sousFamille}'
	}, {
		label: 'Code budget',
		metadata: 'firme:codeBudget',
		name: 'codeBudget',
		obligatoire: true,
		type: 'calculated',
		value: '11640'
	}, {
		label: 'Code client',
		metadata: 'firme:codeClient',
		name: 'codeClient',
		obligatoire: true,
		type: 'calculated',
		value: '{gerance:numeroAssocie}'
	}, {
		label: 'Matricule du collaborateur',
		metadata: 'firme:matriculeCollab',
		name: 'matriculeCollab',
		obligatoire: true,
		type: 'calculated',
		value: '{matriculeCollab}'
	}, {
		label: 'Nom du document',
		metadata: 'fp:nommage',
		name: 'nommage',
		obligatoire: true,
		type: 'calculated',
		value: '{fp:dateDocument|dd/MM/yyyy} - {labelsousFamille}'
	}, {
		label: 'Document a traiter',
		metadata: 'gerance:atraiter',
		name: 'atraiter',
		obligatoire: true,
		type: 'text'
	}, {
		label: 'Prise en charge',
		metadata: 'gerance:attributionCollaborateurAssocie',
		name: 'attributionCollaborateurAssocie',
		obligatoire: false,
		type: 'text'
	}, {
		label: 'Nom de l\'associé',
		metadata: 'gerance:nomAssocie',
		name: 'nomAssocie',
		obligatoire: true,
		type: 'calculated',
		value: '{nomAssocie}'
	}, {
		label: 'Numéro d\'associé',
		metadata: 'gerance:numeroAssocie',
		name: 'numeroAssocie',
		obligatoire: true,
		type: 'calculated',
		value: '{numeroAssocie}'
	}

]
export const CLASSEMENT_GERANCEASSOCIES: ClassementGeranceAssocie[] = [
	{
		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Check list souscription',
		sousFamille: 'gerance_assoc_checklist_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Statut document',
				metadata: 'gerance:statutDocumentAssocie',
				name: 'statutDocumentAssocie',
				type: 'text',
				hint: '100',
				obligatoire: true,
				order: 16,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 2,
			}
		],
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Bulletin de souscription',
		sousFamille: 'gerance_assoc_bulletin_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: false,
				order: 5,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Convention démembrement',
		sousFamille: 'gerance_assoc_convention_demembrement',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: false,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Règlement',
		sousFamille: 'gerance_assoc_reglement_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'AR souscription',
		sousFamille: 'gerance_assoc_ar_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Courrier Envoi attestation',
		sousFamille: 'gerance_assoc_envoi_attestation_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Attestation',
		sousFamille: 'gerance_assoc_attestation_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Souscription',
		famille: 'souscription',
		labelSousFamille: 'Reprise dossier souscription',
		sousFamille: 'gerance_assoc_reprise_dossier_souscription',
		onglet: 'Souscription',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'KYC',
		sousFamille: 'gerance_assoc_KYC',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'Origine des fonds',
		sousFamille: 'gerance_assoc_justif_origine_fonds',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'Scoring / LAB',
		sousFamille: 'gerance_assoc_scoring_lab',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Pièce d\'identité',
		sousFamille: 'gerance_assoc_piece_identite',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Justificatif de domicile (JDD)',
		sousFamille: 'gerance_assoc_justif_domicile',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Statuts',
		sousFamille: 'gerance_assoc_statuts',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Kbis',
		sousFamille: 'gerance_assoc_extrait_kbis',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'RIB',
		sousFamille: 'gerance_assoc_rib',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Nantissements',
		sousFamille: 'gerance_assoc_nantissements',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Autres (Tutelle - Livret de famille ...)',
		sousFamille: 'gerance_assoc_autres',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Reprise acte administratif',
		sousFamille: 'gerance_assoc_reprise_acte_administratif',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'NPAI',
		sousFamille: 'gerance_assoc_npai',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'Correspondances (Courriers / mails)',
		sousFamille: 'gerance_assoc_correspondances',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'ADMINISTRATIF',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'Réclamations',
		sousFamille: 'gerance_assoc_reclamations',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'DIVERS',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Check list vente',
		sousFamille: 'gerance_assoc_checklist_vente',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Bulletin de retrait',
		sousFamille: 'gerance_assoc_bulletin_retrait',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Statut document',
				metadata: 'gerance:statutDocumentAssocie',
				name: 'statutDocumentAssocie',
				type: 'text',
				hint: '100',
				obligatoire: true,
				order: 16,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Formulaire plus value',
		sousFamille: 'gerance_assoc_formulaire_plus_value',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'AR retrait',
		sousFamille: 'gerance_assoc_ar_retrait',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Courrier règlement',
		sousFamille: 'gerance_assoc_courrier_reglement',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Déclaration plus value',
		sousFamille: 'gerance_assoc_declaration_plus_value',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'RETRAIT',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Vente',
		famille: 'vente',
		labelSousFamille: 'Reprise dossier vente',
		sousFamille: 'gerance_assoc_reprise_dossier_vente',
		onglet: 'Vente',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Acte décès',
		sousFamille: 'gerance_assoc_acte_deces',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Notoriété',
		sousFamille: 'gerance_assoc__notoriete',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Check list successions - donations',
		sousFamille: 'gerance_assoc_checklist_successions_donations',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Statut document',
				metadata: 'gerance:statutDocumentAssocie',
				name: 'statutDocumentAssocie',
				type: 'text',
				hint: '100',
				obligatoire: true,
				order: 16,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Correspondances successions - donations (Courriers / mails)',
		sousFamille: 'gerance_assoc_correspondances_successions_donations',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Facture Fiducial Gérance',
		sousFamille: 'gerance_assoc_facture_gerance_successions_donations',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Mandat d\'indivision',
		sousFamille: 'gerance_assoc_mandat_indivision',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Tableau de répartition ayants droits',
		sousFamille: 'gerance_assoc_repartition_ayant_droit',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Règlement facture succession',
		sousFamille: 'gerance_assoc_reglement_succession',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Pièce d\'identité ayant droit',
		sousFamille: 'gerance_assoc_piece_identite_ayant_droit',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'RIB ayant droit',
		sousFamille: 'gerance_assoc_rib_ayant_droit',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Justificatif de domicile ayant droit',
		sousFamille: 'gerance_assoc_justif_domicile_ayant_droit',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Fiche d\'instruction succession',
		sousFamille: 'gerance_assoc_fiche_instruction_succession',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SUCCESSION',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Successions - Donations',
		famille: 'successions_donations',
		labelSousFamille: 'Reprise dossier succession',
		sousFamille: 'gerance_assoc_reprise_dossier_succession',
		onglet: 'Successions - Donations',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle3',
				obligatoire: false,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'Down Jones',
		sousFamille: 'gerance_assoc_down_jones',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'DIVERS',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'Traçabilité des fonds',
		sousFamille: 'gerance_assoc_tracabilite_fonds',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'SOUSCRIPTION',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}, {

		labelFamille: 'Conformite',
		famille: 'conformite',
		labelSousFamille: 'Gel des avoirs',
		sousFamille: 'gerance_assoc_gel_avoirs',
		onglet: 'Conformite',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				options: 'liste:Liste_produit_gerance,liste:libelle2',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'DIVERS',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Fiche d\'instruction',
		sousFamille: 'gerance_assoc_fiche_instruction',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'DIVERS',
				obligatoire: true,
				order: 15,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Note interne',
		sousFamille: 'gerance_assoc_note_interne',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Type de dossier',
				metadata: 'gerance:typeDossierAssocie',
				name: 'typeDossierAssocie',
				type: 'calculated',
				value: 'DIVERS',
				obligatoire: true,
				order: 15,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}
		]
	}
]
