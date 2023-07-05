import { environment } from 'environments/environment';

const rcuApi = `${environment.rcuApi}/proxy`

export const endpoints = {
  frontGEDCreateDocument: `${rcuApi}/CreateDocumentWithContent`,
  frontGEDCreateDocumentWithoutContent: `${rcuApi}/CreateDocumentWithoutContent`,
  frontGEDCreateDocumentForSite: `${rcuApi}/createDocumentForSite`,
  frontGEDUpdateDocumentForSite: `${rcuApi}/updateDocumentForSite`,
  frontGEDUpdateAllDocument: `${rcuApi}/updateAllDocument`,
  frontGEDUpdateDocument: `${rcuApi}/UpdateDocument`,
  frontGEDInfoClient: `${rcuApi}/infoClient`,
  frontGEDEmployeeList: `${rcuApi}/employeeList`,
  frontGEDEditCodeBudgetPlus: `${rcuApi}/editCodeBudgetPlus`,
  frontGEDInfoFromLabel: `${rcuApi}/infoFromLabel`,
  frontGEDInfoFromQuery: `${rcuApi}/infoFromQueryLite`,
  frontGEDDeleteDocuments: `${rcuApi}/DeleteDocument`,
  frontGEDGetMetadata: `${rcuApi}/GetMetadata`,
  frontGEDGetMetadatas: `${rcuApi}/GetMetadatas`,
  fiduSignSendDocumentForSigning: `${rcuApi}/sendDocumentForSigning`,
  fiduSignCancelSigningDemand: `${rcuApi}/cancelSigningDemand`,
  fiduSignRetrySigningDemand: `${rcuApi}/retrySigningDemand`,
  fiduSignRetrySigningForOne: `${rcuApi}/retrySigningDemandForOne`,
  fiduSignSendCopyMailDocSigned: `${rcuApi}/sendMailDocSigned`,
  fiduSignCallback: `${rcuApi}/callbackDocumentSigned?uuid=`,
  getGroupUser: `${rcuApi}/getGroupUser`,
  frontGEDGetExportEnMasse: 'https://kong-int.fiducial.dom/services/sitransverse/1.0/ged/export-en-masse'
}
