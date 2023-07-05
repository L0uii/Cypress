import {Columns} from '../enums/columns.enum';

export const TABS_PARTENAIRE: Home.Tabs = {
  ADMINISTRATIF: {
    name: 'Administratif',
    fetchFn: 'getGeranceAdministratifPartenaire',
    columns: [
      Columns.Select,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.OptionsGerance
    ]
  },
  CORRESPONDANCES: {
    name: 'Correspondances',
    fetchFn: 'getGeranceCorrespondancesPartenaire',
    columns: [
      Columns.Select,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.OptionsGerance
    ]
  },
  CONVENTION: {
    name: 'Convention',
    fetchFn: 'getGeranceConvention',
    columns: [
      Columns.Select,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.OptionsGerance
    ]
  },
  DUE_DILIGENCE: {
    name: 'DUE Diligence',
    fetchFn: 'getGeranceDUE',
    columns: [
      Columns.Select,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.OptionsGerance
    ]
  },

  FACTURATION: {
    name: 'Facturation',
    fetchFn: 'getGeranceFacturation',
    columns: [
      Columns.Select,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.OptionsGerance
    ]
  }
};
