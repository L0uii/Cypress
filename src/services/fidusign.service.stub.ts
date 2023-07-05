import { of } from "rxjs";

export const fidusignServiceStub = () => ({
  getEntiteJuridiqueList: () => of([]),
  getNatureOperationList: () => of([]),
  getBrancheActiviteList: () => of([]),
  getNatureDocumentList: () => of([]),
  commonRechercheAvanceeFields: {
    enveloppe: []
  },
  getFournisseurList: () => of([]),
  getAcheteurList: () => of([]),
  getCategorieList: () => of([]),
  retrySigning: (id, statutSignature, signProperties) => of({response: {ok: true}}).toPromise(),
  userSubspace: () => ({}),
  disableUpdateEmailChange: { subscribe: f => f({}) },
  forward: (arg, copieMails) => ({}),
});
