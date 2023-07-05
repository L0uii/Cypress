import {Columns} from '../enums/columns.enum';

export const TABS: Home.Tabs = {
  COMPTABILITE: {
    name: 'Comptabilité / Gestion',
    fetchFn: 'getComptabilite',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  FISCAL: {
    name: 'Fiscal',
    fetchFn: 'getFiscal',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  SOCIAL: {
    name: 'Social',
    fetchFn: 'getSocial',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  JURIDIQUE: {
    name: 'Juridique',
    fetchFn: 'getJuridique',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  GENERALITE: {
    name: 'Généralités',
    fetchFn: 'getGeneralite',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  FIDUCIAL: {
    name: 'Fiducial',
    fetchFn: 'getFiducial',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.Origine,
      Columns.VisibilityClient,
      Columns.OptionsMR
    ]
  },
  CHEFENTREPRISE: {
    name: 'Chef d\'entreprise',
    fetchFn: 'getChefEntreprise',
    columns: [
      Columns.Select,
      Columns.CodeClientMR,
      Columns.NomClientMR,
      Columns.NommageMR,
      Columns.DateDocument,
      Columns.DateCreation,
      Columns.LastModification,
      Columns.ClassementMR,
      Columns.SousFamilleMR,
      Columns.VisibilityClient,
      Columns.Origine,
      Columns.OptionsMR
    ]
  }
};

export function getTabsPending(hasSelect: boolean): Home.Tabs {
  return {
    ACHAT_VENTE: {
      name: 'Achat / Vente',
      fetchFn: 'getPendingDocsAchatVente',
      columns: hasSelect ? [
        Columns.Select,
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation
      ] : [
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation,
        Columns.OptionsHomeMR
      ]
    },
    SOCIAL: {
      name: 'Social',
      fetchFn: 'getPendingDocsSocial',
      columns: hasSelect ? [
        Columns.Select,
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation,
        Columns.OptionsHomeMR
      ] : [
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation,
        Columns.OptionsHomeMR
      ]
    },
    AUTRE: {
      name: 'Autre',
      fetchFn: 'getPendingDocsAutre',
      columns: hasSelect ? [
        Columns.Select,
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation,
        Columns.OptionsHomeMR
      ] : [
        Columns.CodeClientMR,
        Columns.NomClientMR,
        Columns.TitreMR,
        Columns.DateCreation,
        Columns.OptionsHomeMR
      ]
    }
  };
}
