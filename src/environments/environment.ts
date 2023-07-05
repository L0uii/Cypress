// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  fidushareAPI: 'https://lxlyodev30.fiducial.dom/fs3/makezimlink?u=',
  // RECETTE
  fidushareUser: 'joseph.de.viry@fiducial.net',
  // fidushareUser: 'etudes.transverses.firme.dsi@fiducial.net',

  // *DEV*
  /*
    frontGEDCreateDocument: 'http://10.69.173.86:8080/proxy/CreateDocument',
    frontGEDCreateDocumentForSite: 'http://10.69.173.86:8080/proxy/createDocumentForSite',
    frontGEDUpdateDocumentForSite: 'http://10.69.173.86:8080/proxy/updateDocumentForSite',
    frontGEDUpdateAllDocument: 'http://10.69.173.86:8080/proxy/updateAllDocument',
    frontGEDInfoClient: 'http://10.69.173.86:8080/proxy/infoClient',
    fiduSignSendDocumentForSigning: 'http://10.69.173.86:8080/proxy/sendDocumentForSigning',
    fiduSignCancelSigningDemand: 'http://10.69.173.86:8080/proxy/cancelSigningDemand',
    fiduSignRetrySigningDemand: 'http://10.69.173.86:8080/proxy/retrySigningDemand',
    fiduSignRetrySigningForOne: 'http://10.69.173.86:8080/proxy/retrySigningDemandForOne',
    fiduSignSendCopyMailDocSigned: 'http://10.69.173.86:8080/proxy/sendMailDocSigned',
    fiduSignCallback: 'http://10.69.173.86:8080/proxy/callbackDocumentSigned?uuid=',
    alfrescoAPI: 'http://lxlyogfa30:8080',
    alfrescoUser: 'dac_cd2',
    alfrescoPassword: 'mdp@dac_cd2',
    alfrescoGroupConseil: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_CONSEIL/children',
    alfrescoGroupConseilBO: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_CONSEIL_BO/children',
    alfrescoGroupConseilCGP: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_CONSEIL_CGP/children',
    alfrescoGroupConseilSiege: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_DR_SIEGE/children',
    alfrescoGroupADV: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV/children',
    alfrescoGroupDAC: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV_DAC/children',
    alfrescoGroupBEL: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV_BEL/children',
    alfrescoGroupAUD: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV_AUD/children',
    alfrescoGroupDNOA: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV_DNOA/children',
    alfrescoGroupFIN: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_ADV_FIN/children',
    alfrescoGroupFidusignAchats: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_FSG_ACHAT/children',
    alfrescoGroupFidusignAchatsSpec: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_FSG_ACHAT_ACCES_SPEC/children',
    alfrescoGroupMR: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_MR/children'
    alfrescoGroupGeranceImmobilier: 'http://lxlyogfa30:8080/alfresco/service/api/groups/GRP_MR/children'
    alfrescoGroupGeranceAssocies: 'http://ged-alf-rec.fiducial.dom:8080/alfresco/service/api/groups/GRP_GERANCE_ASSOCIES/children'

   */
  // *RECETTE*

  rcuApi: 'http://lxlyogfw30:8080',
  alfrescoAPI: 'http://lxlyogfa30:8080',
  alfrescoUser: 'dac_cd2',
  alfrescoPassword: 'mdp@dac_cd2',
  alfrescoGroupConseilBO: 'http://ged-alf-rec.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL_BO/children',
  alfrescoGroupConseilCGP: 'http://ged-alf-rec.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL_CGP/children',
  sentryDNSKey: 'http://3707d49f90e742d78ffe4d67c494ff0d@sentry.fiducial.dom:9000/26',

  // *PREPROD*
  //
  // frontGEDCreateDocument: 'http://ged-ws-preprod:8080/proxy/CreateDocumentWithContent',
  // frontGEDCreateDocumentWithoutContent: 'http://ged-ws-preprod:8080/proxy/CreateDocumentWithoutContent',
  // frontGEDCreateDocumentForSite: 'http://ged-ws-preprod:8080/proxy/createDocumentForSite',
  // frontGEDUpdateDocumentForSite: 'http://ged-ws-preprod:8080/proxy/updateDocumentForSite',
  // frontGEDUpdateAllDocument: 'http://ged-ws-preprod:8080/proxy/updateAllDocument',
  // frontGEDInfoClient: 'http://ged-ws-preprod:8080/proxy/infoClient',
  // frontGEDEmployeeList: 'http://ged-ws-preprod:8080/proxy/employeeList',
  // frontGEDInfoFromLabel: 'http://ged-ws-preprod:8080/proxy/infoFromLabel',
  // frontGEDInfoFromQuery: 'http://ged-ws-preprod:8080/proxy/infoFromQuery',
  // fiduSignSendDocumentForSigning: 'http://ged-ws-preprod:8080/proxy/sendDocumentForSigning',
  // fiduSignCancelSigningDemand: 'http://ged-ws-preprod:8080/proxy/cancelSigningDemand',
  // fiduSignRetrySigningDemand: 'http://ged-ws-preprod:8080/proxy/retrySigningDemand',
  // fiduSignRetrySigningForOne: 'http://ged-ws-preprod:8080/proxy/retrySigningDemandForOne',
  // fiduSignSendCopyMailDocSigned: 'http://ged-ws-preprod:8080/proxy/sendMailDocSigned',
  // fiduSignCallback: 'http://ged-ws-preprod:8080/proxy/callbackDocumentSigned?uuid=',
  // alfrescoAPI: 'http://lxlyogfa30:8080',
  // alfrescoUser: 'egd',
  // alfrescoPassword: 'QUR6HlQo7MJGeas7vZ25',
  // alfrescoGroupConseil: 'http://ged-alf-rec.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL/children',
  // alfrescoGroupConseilBO: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL_BO/children',
  // alfrescoGroupConseilCGP: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL_CGP/children',
  // alfrescoGroupConseilSiege: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_CONSEIL_SIEGE/children',
  // alfrescoGroupADV: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV/children',
  // // alfrescoGroupDAC: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV_DAC/children',
  // // alfrescoGroupBEL: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV_BEL/children',
  // // alfrescoGroupAUD: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV_AUD/children',
  // // alfrescoGroupDNOA: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV_DNOA/children',
  // // alfrescoGroupFIN: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ADV_FIN/children',
  // alfrescoGroupFidusignAchats: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_FSG_ACHAT/children',
  // alfrescoGroupFidusignAchatsSpec: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_FSG_ACHAT_ACCES_SPEC/children',
  // alfrescoGroupMR: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_MR/children',
  // alfrescoGroupGeranceImmobilier: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_GERANCE/children',
  // alfrescoGroupGeranceAssocies: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_GERANCE_ASSOCIES/children',
  // alfrescoGroupGeranceConformite: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_GERANCE_CONFORMITE/children',
  // alfrescoGroupArchivesPresidence: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ARCHIVESPRESIDENCE_ARCHIVISTES/children',
  // alfrescoGroupArchivesPresidenceConsultation: 'http://ged-alf-preprod.fiducial.dom:8080/alfresco/service/api/groups/GRP_ARCHIVESPRESIDENCE_CONSULTATION/children'
};
