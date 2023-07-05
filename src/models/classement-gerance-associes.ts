export interface ListMetaDatasClassementAssocies {
  label: string;
  metadata: string;
  name: string;
  type: string;
  obligatoire: boolean;
  order: number;
}

export interface ClassementGeranceAssocies {
  labelFamille: string;
  famille: string;
  labelSousFamille: string;
  sousFamille: string;
  onglet: string;
  displayClient: boolean;
  listeMetadatas: Array<ListMetaDatasClassementAssocies>;
}
