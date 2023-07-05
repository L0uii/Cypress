import { of } from 'rxjs';
import { UntypedFormGroup } from "@angular/forms";

export const conseilServiceStub = () => ({
  filterContrat: (input, classements) => ({}),
  getExtensions: () => ({}),
  initializeUploadForm: () => new UntypedFormGroup({}),
  initializeCustomerForm: () => new UntypedFormGroup({}),
  getCodeBudgetFromDR: value => ({}),
  getCachedDR: () => [],
  generateDocumentProperties: (form, title, arg) => ({}),
  getPropertiesFormDocument: nodeId => [
      {
        documentProperties: {
            "cm:description": "DescriptionTest",
            "conseil:produit": "",
            "contrat:fournisseur": "",
            "contrat:nature": "",
            "fiducial:domainContainerFamille": "conformite",
            "fiducial:domainContainerSousFamille": "convention_rto",
            "firme:codeBudget": "00000",
            "firme:codeClient": "123456",
            "firme:matriculeCollab": "000000",
            "fp:nommage": "01/01/2000 - Nommage",
            "id": "00000000-0000-0000-0000-000000000000",
            "title": "Title.pdf"
        }
      }
    ]
  ,
  toFormGroup: arg => ({}),
  initializeUpdateDocumentForm: () => ({}),
  getDRLabelFromCodeBudget: element => ({})
});
