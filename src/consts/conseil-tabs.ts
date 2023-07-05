import {Columns} from '../enums/columns.enum';

export const TABS_CONSULTATION: Home.Tabs = {
  SOUSCRIPTION: {
    name: 'Souscription',
    fetchFn: 'souscription',
    columns: [
      Columns.Select,
      Columns.Acheteur,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Produit,
      Columns.Famille,
      Columns.DatesConseil,
      Columns.DirectionRegionale,
      Columns.OptionsConseil
    ]
  },
  CONFORMITE: {
    name: 'Conformité générale',
    fetchFn: 'conformite',
    columns: [
      Columns.Select,
      Columns.Acheteur,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Famille,
      Columns.DatesConseil,
      Columns.DirectionRegionale,
      Columns.OptionsConseil
    ]
  },
  CORRESPONDANCE: {
    name: 'Sinistre', 
    fetchFn: 'sinistre',
    columns: [
      Columns.Select,
      Columns.Acheteur,
      // Columns.Reference,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Produit,
      Columns.Famille,
      Columns.DatesConseil,
      Columns.DirectionRegionale,
      Columns.OptionsConseil
    ]
  },
  RECLAMATION: {
    name: 'Réclamation',
    fetchFn: 'reclamation',
    columns: [
      Columns.Select,
      Columns.Acheteur,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Produit,
      Columns.Famille,
      Columns.DatesConseil,
      Columns.DirectionRegionale,
      Columns.OptionsConseil
    ]
  },
  FACTURES: {
    name: 'Factures',
    fetchFn: 'facturesConseil',
    columns: [
      Columns.Select,
      Columns.ClientFacture,
      Columns.NumFacture,
      Columns.NomSociete,
      Columns.DateFacture,
      Columns.DateDebutFacture,
      Columns.DateFinFacture,
      Columns.Duplicata,
      Columns.Periodicite,
      Columns.Nommage,
      Columns.Montant,
      Columns.OptionsConseil
    ]
  }
};

export const TABS_PROCESSING: Home.Tabs = {
  PENDING_PROCESSING: {
    name: 'En attente',
    fetchFn: 'pendingProcessing',
    columns: [
      Columns.Select,
      Columns.AcheteurPending,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Produit,
      Columns.Famille,
      Columns.DatesATraiter,
      Columns.DirectionRegionale,
      Columns.Createur,
      Columns.OptionsConseil
    ]
  }
};
export const TABS_PROCESSING_CGP: Home.Tabs = {
  PENDING_PROCESSING: {
    name: 'En attente',
    fetchFn: 'pendingProcessingCGP',
    columns: [
      Columns.Select,
      Columns.AcheteurPending,
      Columns.TypeDocument,
      Columns.Description,
      Columns.Produit,
      Columns.Famille,
      Columns.DatesATraiter,
      Columns.DirectionRegionale,
      Columns.Createur,
      Columns.OptionsConseil
    ]
  }
};
