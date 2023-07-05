import {Columns} from '../enums/columns.enum';

export const TABS_ASSOCIE: Home.Tabs = {
  ADMINISTRATIF: {
    name: 'Administratif',
    fetchFn: 'getGeranceAdministratif',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  CORRESPONDANCES: {
    name: 'Correspondances',
    fetchFn: 'getGeranceCorrespondancesAssocies',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  SOUSCRIPTION: {
    name: 'Souscription',
    fetchFn: 'getGeranceSouscription',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  COMFORMITE: {
    name: 'Conformité',
    fetchFn: 'getGeranceConformite',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  VENTE: {
    name: 'Vente',
    fetchFn: 'getGeranceVente',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  SUCCESSIONS: {
    name: 'Successions',
    fetchFn: 'getGeranceSuccessions',
    columns: [
      Columns.Select,
      Columns.AssocieGerance,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitGerance,
      Columns.ProduitGerance,
      Columns.DatesGerance,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  }
};

