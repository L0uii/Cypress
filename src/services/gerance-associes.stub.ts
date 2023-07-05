import { of } from "rxjs";

export const geranceAssociesServiceStub = () => ({
  documentType: { subscribe: f => f({}) },
  getExtensions: () => ({}),
  getFullProduitList: () => of([]),
  getTypeDossierAssocie: sousFamille => ({}),
  updateDocumentType: checkbox => ({}),
  getProductList: () => of([]),
  getProductCategoryList: (list) => [],
  agentData: of({nom: '', code: ''}),
  managerData: of({nom: '', code: ''}),
  searchDossier: query => ({ pipe: () => ({}) }),
  getPropertiesFormDocument: nodeId => of([
    {
      customerProperties: {
        nomAssocie: "NOM ASSOCIE",
        numeroAssocie: "000000",
        codeBudget: "11111"
      }
    }
  ]).toPromise(),
  toFormGroup: arg => ({}),
  clearContext: () => ({}),
  generateDocumentProperties: (form, title) => ({})
});
