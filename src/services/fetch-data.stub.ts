import { of } from "rxjs";

export const fetchDataServiceStub = () => ({
  getClassementProduitConseil: () => of([]),
  callMethodByName: (name: string) => ({}),
  getPartenaireGerance: () => of({
    pagination: {},
    entries: []
  })
});
