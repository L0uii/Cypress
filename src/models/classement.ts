export interface SousFamille {
  labelSousFamille: string;
  sousFamille: string;
}

export interface Classement {
  labelFamille: string;
  famille: string;
  list: Array<SousFamille>;
}
