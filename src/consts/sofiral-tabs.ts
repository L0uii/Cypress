import {Columns} from '../enums/columns.enum';

export const TABS_CONSULTATION: Home.Tabs = {
  FACTURES: {
    name: 'Factures et Avoirs',
    fetchFn: 'facturesSofiral',
    columns: [
      Columns.Select,
      Columns.AcheteurSofiral,
      Columns.NumFacture,
      Columns.NomSociete,
      Columns.DateFacture,
      Columns.DateDebutFacture,
      Columns.DateFinFacture,
      Columns.Duplicata,
      Columns.Periodicite,
      Columns.TitreSofiral,
      Columns.Montant,
      Columns.OptionsSofiral
    ]
  }
};

