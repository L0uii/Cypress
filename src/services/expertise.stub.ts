import { FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";

export const expertiseServiceStub = () => ({
  getExtensions: () => ({}),
  initializeForm: () => new FormGroup({
    'documentType': new FormControl(''),
    'classement': new FormControl(''),
    'categorie': new FormControl('')
  }),
  toFormGroup: arg => ([{ name: 'name' , obligatoire: false }]),
  generateDocumentProperties: (formValues, title) => ({}),
  getPropertiesFormDocument: nodeId => ({}),
  fetchCustomerName: numeroDossier => ({ nomDossier: {} }),
  getCustomerEmail: numeroDossier => of('email@email.com')
});
