// import { Node, NodeEntry, NodePaging, NodePagingList } from 'alfresco-js-api';

// Register TypeScript types, interfaces etc...

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
namespace FetchData {

declare type SearchEntries = {
    CodeClient: any;
    Nommage: any;
    DateDocument: any;
    Nature: any;
    Statut: any;
    SousCategory: any;
    id: any;
    isFile: any;
    name: any;
  };
  declare type SearchResult = {
    entries: SearchEntries[];
    total: number;
  };
}

declare type Avoir = {
  CodeClient: any;
  Nommage: any;
  DateDocument: any;
  Nature: any;
  Statut: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

declare type Contract = {
  CodeClient: any;
  Nommage: any;
  DateDocument: any;
  Nature: any;
  Statut: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

namespace Utils.Test {
  declare type Case = {
    name?: string;
    params?: any[];
    expected: any;
 };
}

declare type DocLAB = {
  CodeClient: any;
  Nommage: any;
  DateDocument: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

declare type MandatETEBAC = {
  CodeClient: any;
  Nommage: any;
  DateDocument: any;
  Statut: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

declare type MandatSEPA = {
  CodeClient: any;
  Nommage: any;
  DateDocument: any;
  Statut: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

declare type RIB = {
  CodeClient: any;
  Nommage: any;
  SousCategory: any;
  id: any;
  isFile: any;
  name: any;
};

declare type Facture = {
  CodeClient: any;
  NomClient: any;
  NumFacture: any;
  NomSociete: any;
  DateFacture: any;
  DateDebut: any;
  DateFin: any;
  Periodicite: any;
  Nommage: any;
  Montant: any;
  Duplicata: any;
  id: any;
  isFile: any;
  name: any;
};

interface StringAnyMap extends StringTMap<any> {}

interface StringAnyMap extends StringTMap<any> {}

namespace Home {
  interface Tab {
    name: string;
    fetchFn: string;
    columns: Columns[];
    count?: number;
  }
  interface Tabs extends StringTMap<Home.Tab> {}
}
