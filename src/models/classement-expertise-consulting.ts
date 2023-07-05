export interface ListMetadatasExpertiseConsulting {
  label: string;
  metadata: string;
  name: string;
  obligatoire: boolean;
  order: number;
  position: string;
  type: string;
  value: string;
}

export interface ClassementExpertiseConsulting {
  labelFamille: string;
  famille: string;
  labelSousFamille: string;
  sousFamille: string;
  onglet: string;
  displayClient: boolean;
  listeMetadatas: Array<ListMetadatasExpertiseConsulting>;
  tags: Array<string>;
}
