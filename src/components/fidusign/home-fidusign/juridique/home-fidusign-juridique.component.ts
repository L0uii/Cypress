import { UtilsService } from 'services/utils.service';
import { FidusignRechercheAvanceeData, FidusignSearchFieldsData, FidusignService } from 'services/fidusign.service';
import { HomeFidusignTemplateComponent } from 'components/fidusign/home-fidusign/home-fidusign-template.component';
import { Component } from '@angular/core';
import { Columns } from 'components/fidusign/search-fidusign/search-fidusign.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-fidusign-juridique',
  templateUrl: '../home-fidusign-template.component.html',
  styleUrls: ['../home-fidusign-template.component.scss']
})
export class HomeFidusignJuridiqueComponent extends HomeFidusignTemplateComponent {
  subspaceName = 'Direction Juridique';

  baseFn = 'fidusignDirJuridiqueBase';
  cancelledFn = 'getDirectionJuridiqueCancelled';
  pendingFn = 'getDirectionJuridiquePending';

  constructor(
    utilsService: UtilsService,
    title: Title,
    fidusignService: FidusignService
  ) {
    super(utilsService, title, fidusignService);
  }

  private commonColumns = [
    Columns.Description,
    Columns.Files,
    Columns.EntiteJuridique,
    Columns.NatureOperation,
    Columns.NatureDocument,
    Columns.Emetteur,
    Columns.Dates,
  ];

  private pendingColumns = [
    ...this.commonColumns,
    Columns.StatutSignature,
    Columns.PendingSignataires,
    Columns.OptionsPending
  ];

  tabs: Home.Tabs = {
    PENDING: {
      name: 'En attente de signature',
      fetchFn: 'getDirectionJuridiquePending',
      columns: this.pendingColumns
    },
    SIGNED: {
      name: 'Documents signés',
      fetchFn: 'getDirectionJuridiqueSigned',
      columns: [
        ...this.commonColumns,
        Columns.DateSignature,
        Columns.OptionsSigned
      ]
    },
    CANCELLED: {
      name: 'Annulés / Expirés',
      fetchFn: 'getDirectionJuridiqueCancelled',
      columns: this.pendingColumns
    }
  };


  mainSearchFormData: FidusignSearchFieldsData[] = [
    {
      name: 'entiteJuridique',
      description: 'Entité Juridique',
      metadatas: ['fiducial:domainContainerFamille'],
      data: this.fidusignService.getEntiteJuridiqueList(),
      inputType: 'autocomplete',
      inputSubtype: 'label-value'
    },
    {
      name: 'natureOperation',
      description: `Nature de l'opération juridique`,
      metadatas: ['juridique:droitSocNatureOperation'],
      data: this.fidusignService.getNatureOperationList(),
      inputType: 'autocomplete'
    },
  ];

  rechercheAvanceeFormData: FidusignRechercheAvanceeData = {
    enveloppe: [
      ...this.fidusignService.commonRechercheAvanceeFields.enveloppe,
      {
        name: 'brancheActivite',
        description: `Branche d'activité`,
        metadatas: ['juridique:droitSocBrancheActivite'],
        inputType: 'autocomplete',
        data: this.fidusignService.getBrancheActiviteList()
      },
      {
        name: 'natureDocument',
        description: `Nature du document`,
        metadatas: ['juridique:droitSocNatureDocument'],
        inputType: 'autocomplete',
        data: this.fidusignService.getNatureDocumentList()
      },
      {
        name: 'dateOperationJuridique',
        description: `Date de l'opération juridique`,
        metadatas: ['juridique:droitSocDateOperation'],
        inputType: 'date'
      },
      {
        name: 'datePriseEffetInput',
        description: `Date de prise d'effet de l'opération juridique`,
        metadatas: ['juridique:droitSocDatePriseEffet'],
        inputType: 'date'
      },
      {
        name: 'emetteur',
        description: 'Emetteur',
        metadatas: ['fiduSign:prenomEmetteur', 'fiduSign:nomEmetteur'],
        inputType: 'text'
      }
    ],
    signature: this.fidusignService.commonRechercheAvanceeFields.signature
  };
}
