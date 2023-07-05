export interface FilePropertiesExpertise {
  Application: string;
  Author: string;
  Branche: string;
  CodeBudget: string;
  CodeClient: string;
  CollecteType: string;
  CollecteMessage: string;
  Creator: undefined;
  DateCreation: Date;
  DateDocument: string;
  Ecoffre: string;
  Famille: string;
  LastModification: Date;
  Matricule: string;
  NatureObjet: undefined;
  NomDossier: string;
  Nommage: string;
  SizeInBytes: number;
  Societe: string;
  SousFamille: string;
  Statut: undefined;
  Title: string;
  id: string;
  isFile: boolean;
  name: string;
}

export interface FilesList {
  files: File[];
  sameCustomer: boolean;
  sameMetadata: boolean;
}
