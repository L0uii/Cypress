export interface CustomerDocumentProperties {
  documentProperties: any;
  document: any;
  customerProperties: {
    numeroDossier: string;
    codeBudget: string;
  };
}

export interface CustomerDocumentPropertiesGerance {
  documentProperties: any;
  document: any;
  customerProperties: {
    codeBudget: string;
    nomAssocie: string;
    numeroAssocie: string;
  };
}
