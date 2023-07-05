import { Node, NodeEntry, NodePagingList, NodePaging, ResultBuckets, Pagination, RequestFacetField, ResultNode, ResultSetRowEntry } from '@alfresco/js-api';

export class SearchNodeProperties {
  'cm:description': any;
  'fact:dateDebutPeriode': any;
  'fact:dateFacture': any;
  'fact:dateFinPeriode': any;
  'fact:destinataire': any;
  'fact:emetteur': any;
  'fact:numero': any;
  'fact:periodicite': any;
  'fact:totalTTC': any;
  'fact:duplicata': any;
  'fiducial:domainContainerSousFamille': any;
  'firme:codeClient': any;
  'fp:codeClient': any;
  'fp:dateDocument': any;
  'fp:nature': any;
  'fp:nommage': any;
  'fp:statut': any;
  'cm:title': any;
  'fp:dateDebutContrat': any;
  'contrat:acheteur': any;
  'contrat:numero': any;
  'contrat:nature': any;
}

export class SearchNode extends Node {
  properties?: SearchNodeProperties;
}

export class SearchNodePagingList extends NodePagingList {
  entries?: NodeEntry[];
  context: any;
}

export class SearchNodePaging extends NodePaging {
  list?: SearchNodePagingList;
}

export class SubscribeResponse extends SearchNodePaging { }

export interface SearchEntries {
  fournisseurs: any;
  nature: any;
  RecordId: any;
  UuidsLink: any;
  CodeClient: any;
  NomClient: any;
  NumFacture: any;
  NomSociete: any;
  DateFacture: any;
  DateDebut: any;
  DateFin: any;
  Periodicite: any;
  Montant: any;
  Duplicata: any;
  Nommage: any;
  DateDocument: any;
  Nature: any;
  Statut: any;
  SousCategory: any;
  Title: any;
  Description: any;
  Fournisseur: any;
  Acheteur: any;
  NumeroDossier: any;
  DomainContainerSousFamille: any;
  SousFamille: any;
  DateCreation: Date;
  id: any;
  isFile: any;
  name: any;
}
export interface SearchResult {
  entries: SearchEntries[];
  pagination: Pagination;
  facets: ResultBuckets[];
}

export interface SearchParams {
  searchQuery?: string,
  maxItems?: number,
  skipCount?: number,
  sortBy?: SortBy
}

export interface SortBy {
  field?: string;
  ascending: boolean;
}
