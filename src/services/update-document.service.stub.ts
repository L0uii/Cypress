import { of } from "rxjs";

export const updateDocumentServiceStub = () => ({
  reset: () => {},
  patchValue: () => {},
  update: (id, prop) => of('00000000-0000-0000-000000000000'),
  updateATraiter: (id, nommageGerance) => ({})
})
