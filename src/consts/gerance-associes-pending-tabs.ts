import {Columns} from '../enums/columns.enum';

export const TABS_PROCESSING_GERANCE: Home.Tabs = {
  ADMINISTRATIF: {
    name: 'Administratif',
    fetchFn: 'pendingProcessingGeranceAdministratif',
    columns: [
      Columns.Select,
      Columns.AssocieGerancePending,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitMixed,
      Columns.FamilleGeranceAssocies,
      Columns.DatesATraiter,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  SUCCESSION: {
    name: 'Succession',
    fetchFn: 'pendingProcessingGeranceSuccess',
    columns: [
      Columns.Select,
      Columns.AssocieGerancePending,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitMixed,
      Columns.FamilleGeranceAssocies,
      Columns.DatesATraiter,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  RETRAIT: {
    name: 'Retrait',
    fetchFn: 'pendingProcessingGeranceRetrait',
    columns: [
      Columns.Select,
      Columns.AssocieGerancePending,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitMixed,
      Columns.FamilleGeranceAssocies,
      Columns.DatesATraiter,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  SOUSCRIPTION: {
    name: 'Souscription',
    fetchFn: 'pendingProcessingGeranceSouscrip',
    columns: [
      Columns.Select,
      Columns.AssocieGerancePending,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitMixed,
      Columns.FamilleGeranceAssocies,
      Columns.DatesATraiter,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  },
  DIVERS: {
    name: 'Divers',
    fetchFn: 'pendingProcessingGeranceDivers',
    columns: [
      Columns.Select,
      Columns.AssocieGerancePending,
      Columns.PartenaireGerance,
      Columns.TypeDocumentGerance,
      Columns.NommageGerance,
      Columns.Description,
      Columns.CategorieProduitMixed,
      Columns.FamilleGeranceAssocies,
      Columns.DatesATraiter,
      Columns.DernierIntervenant,
      Columns.OptionsGerance
    ]
  }
};
