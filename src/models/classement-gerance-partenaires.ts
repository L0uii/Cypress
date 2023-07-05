export interface ListMetaDatasClassementGeranceAssocies {
  label: string;
  metadata: string;
  name: string;
  type: string;
  obligatoire: boolean;
  options?: string[];
  order: number;
}

export interface ClassementGerancePartenaire {
  labelFamille: string;
  famille: string;
  labelSousFamille: string;
  sousFamille: string;
  onglet: string;
  displayClient: boolean;
  listeMetadatas: Array<ListMetaDatasClassementGeranceAssocies>;
}
