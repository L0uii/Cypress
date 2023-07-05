import { ClassementGeranceAssocie } from './gerance-associes';

export interface GerancePaternaire {
  libelle1: string;
  libelle2: string;
  compteur1: string;
  name: string;
};

export const COMMON_GERANCEPARTENAIRES = [
	{
		label: 'Document a traiter',
		metadata: 'gerance:atraiter',
		name: 'atraiter',
		obligatoire: true,
		type: 'calculated',
		value: 'oui'
	}, {
		label: 'Branche',
		metadata: 'fiducial:domainContainerBranche',
		name: 'domainContainerBranche',
		obligatoire: true,
		type: 'calculated',
		value: 'GERANCE'
	}, {
		label: 'Societe',
		metadata: 'fiducial:domainContainerSociete',
		name: 'domainContainerSociete',
		obligatoire: true,
		type: 'calculated',
		value: 'Partenaires'
	}, {
		label: 'Code budget',
		metadata: 'firme:codeBudget',
		name: 'codeBudget',
		obligatoire: true,
		type: 'calculated',
		value: '11640'
	}, {
		label: 'Famille',
		metadata: 'fiducial:domainContainerFamille',
		name: 'domainContainerFamille',
		obligatoire: true,
		type: 'calculated',
		value: '{famille}'
	}, {
		label: 'SousFamille',
		metadata: 'fiducial:domainContainerSousFamille',
		name: 'domainContainerSousFamille',
		obligatoire: true,
		type: 'calculated',
		value: '{sousFamille}'
	}, {
		label: 'Code client',
		metadata: 'firme:codeClient',
		name: 'codeClient',
		obligatoire: true,
		type: 'calculated',
		value: '{gerance:codeAgent}'
	}, {
		label: 'Matricule du collaborateur',
		metadata: 'firme:matriculeCollab',
		name: 'matriculeCollab',
		obligatoire: true,
		type: 'calculated',
		value: '{matriculeCollab}'
	}, {
		label: 'Application',
		metadata: 'fiducial:domainContainerApplication',
		name: 'domainContainerApplication',
		obligatoire: true,
		type: 'calculated',
		value: 'Partenaire'
	}, {
		label: 'Nom du document',
		metadata: 'fp:nommage',
		name: 'nommage',
		obligatoire: true,
		type: 'calculated',
		value: '{fp:dateDocument|yyyy/MM/dd} {labelsousFamille}'
	}, {
		label: 'Description du document',
		metadata: 'cm:description',
		name: 'description',
		obligatoire: false,
		type: 'text'
	}

]
export const CLASSEMENT_GERANCEPARTENAIRES: ClassementGeranceAssocie[] = [
	{

		labelFamille: 'Convention',
		famille: 'convention',
		labelSousFamille: 'Convention signée',
		sousFamille: 'gerance_partenaire_convention_signee',
		onglet: 'Convention',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: true,
				order: 9,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}
		]
	}, {

		labelFamille: 'Convention',
		famille: 'convention',
		labelSousFamille: 'Avenant convention',
		sousFamille: 'gerance_partenaire_avenant_convention',
		onglet: 'Convention',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: true,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Convention',
		famille: 'convention',
		labelSousFamille: 'Fiche de renseignement partenaire',
		sousFamille: 'gerance_partenaire_fiche_renseignement',
		onglet: 'Convention',
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
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: true,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Convention',
		famille: 'convention',
		labelSousFamille: 'Reprise dossier partenaire',
		sousFamille: 'gerance_partenaire_reprise_dossier_partenaire',
		onglet: 'Convention',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: true,
				order: 9,
			}
		]
	}, {

		labelFamille: 'Due diligence',
		famille: 'due_diligence',
		labelSousFamille: 'Due diligence',
		sousFamille: 'gerance_partenaire_due_diligence',
		onglet: 'Due diligence',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Due diligence',
		famille: 'due_diligence',
		labelSousFamille: 'Annexes Due diligence',
		sousFamille: 'gerance_partenaire_annexe_due_diligence',
		onglet: 'Due diligence',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
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
				obligatoire: false,
				order: 3,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Kbis',
		sousFamille: 'gerance_partenaire_extrait_kbis',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Statuts',
		sousFamille: 'gerance_partenaire_statuts',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
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
		labelSousFamille: 'Casier judiciaire original',
		sousFamille: 'gerance_partenaire_casier_judiciaire',
		onglet: 'Administratif',
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
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
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
		labelSousFamille: 'Pièce d\'identité',
		sousFamille: 'gerance_partenaire_piece_identite',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
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
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'RCP',
		sousFamille: 'gerance_partenaire_rcp',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
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
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Syndicat professionnel',
		sousFamille: 'gerance_partenaire_syndicat_professionnel',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'Orias',
		sousFamille: 'gerance_partenaire_orias',
		onglet: 'Administratif',
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
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
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
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
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
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}
		]
	}, {

		labelFamille: 'Administratif',
		famille: 'administratif',
		labelSousFamille: 'RIB',
		sousFamille: 'gerance_partenaire_rib',
		onglet: 'Administratif',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
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
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
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
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
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

		labelFamille: 'Facturation',
		famille: 'facturation',
		labelSousFamille: 'Relevés commissionnement',
		sousFamille: 'gerance_partenaire_releve_commissionnement',
		onglet: 'Facturation',
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
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
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
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: true,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
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
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}
		]
	}, {

		labelFamille: 'Facturation',
		famille: 'facturation',
		labelSousFamille: 'Factures reçues',
		sousFamille: 'gerance_partenaire_factures_recues',
		onglet: 'Facturation',
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
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: true,
				order: 4,
			}
		]
	}, {

		labelFamille: 'Facturation',
		famille: 'facturation',
		labelSousFamille: 'Factures validées et envoyées',
		sousFamille: 'gerance_partenaire_factures_envoyees',
		onglet: 'Facturation',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: true,
				order: 5,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
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

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'Correspondances associés',
		sousFamille: 'gerance_partenaire_correspondances_associes',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: true,
				order: 7,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 7,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: false,
				order: 6,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
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
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: true,
				order: 6,
			}
		]
	}, {

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'Correspondances produits',
		sousFamille: 'gerance_partenaire_correspondances_produits',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
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
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: true,
				order: 7,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: true,
				order: 4,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: true,
				order: 3,
			}, {
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 1,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: true,
				order: 6,
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

		labelFamille: 'Correspondances',
		famille: 'correspondances',
		labelSousFamille: 'Correspondances administratives',
		sousFamille: 'gerance_partenaire_correspondances_admin',
		onglet: 'Correspondances',
		displayClient: false,
		listeMetadatas: [
			{
				label: 'Date validité',
				metadata: 'gerance:dateValidite',
				name: 'dateValidite',
				type: 'date',
				obligatoire: false,
				order: 3,
			}, {
				label: 'Nom agent',
				metadata: 'gerance:nomAgent',
				name: 'nomAgent',
				type: 'text',
				obligatoire: false,
				order: 11,
			}, {
				label: 'Code agent',
				metadata: 'gerance:codeAgent',
				name: 'codeAgent',
				type: 'text',
				obligatoire: false,
				order: 10,
			}, {
				label: 'Nom manager',
				metadata: 'gerance:nomManager',
				name: 'nomManager',
				type: 'text',
				obligatoire: false,
				order: 9,
			}, {
				label: 'Code manager',
				metadata: 'gerance:codeManager',
				name: 'codeManager',
				type: 'text',
				obligatoire: false,
				order: 8,
			}, {
				label: 'Nom de l\'associé',
				metadata: 'gerance:nomAssocie',
				name: 'nomAssocie',
				type: 'text',
				obligatoire: true,
				order: 7,
			}, {
				label: 'Numéro d\'associé',
				metadata: 'gerance:numeroAssocie',
				name: 'numeroAssocie',
				type: 'text',
				obligatoire: true,
				order: 6,
			}, {
				label: 'Catégorie produit',
				metadata: 'gerance:categorieProduit',
				name: 'categorieProduit',
				type: 'options',
				obligatoire: false,
				order: 4,
			}, {
				label: 'Date du document',
				metadata: 'fp:dateDocument',
				name: 'dateDocument',
				type: 'date',
				obligatoire: false,
				order: 2,
			}, {
				label: 'Contact',
				metadata: 'gerance:contact',
				name: 'contact',
				type: 'text',
				obligatoire: false,
				order: 12,
			}, {
				label: 'Produit',
				metadata: 'gerance:produit',
				name: 'produit',
				type: 'options',
				obligatoire: false,
				order: 5,
			}
		]
	}
]