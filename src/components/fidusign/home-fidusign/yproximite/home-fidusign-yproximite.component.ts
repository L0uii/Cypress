import { UserService } from 'services/user.service';
import { UtilsService } from './../../../../services/utils.service';
import { Component } from '@angular/core';
import { Columns } from 'components/fidusign/search-fidusign/search-fidusign.component';
import { FidusignRechercheAvanceeData, FidusignSearchFieldsData, FidusignService } from 'services/fidusign.service';
import { HomeFidusignTemplateComponent } from '../home-fidusign-template.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-fidusign-yproximite',
  templateUrl: '../home-fidusign-template.component.html',
  styleUrls: ['../home-fidusign-template.component.scss']
})
export class HomeFidusignYProximiteComponent extends HomeFidusignTemplateComponent {
  subspaceName = 'Y-Proximité';

  baseFn = 'fidusignYProximiteBase';
  cancelledFn = 'getYProximiteCancelled';
  pendingFn = 'getYProximitePending';

  private isCommercial: boolean = false;

  constructor(
    utils: UtilsService,
    title: Title,
    fidusignService: FidusignService,
    private userService: UserService
  ) {
    super(utils, title, fidusignService);
    if (this.fidusignService.userSubspace.permission === 'rw_self') {
      this.isCommercial = true;
      this.searchQuery = this.getEmetteurClause();
    }
  }

  private commonColumns = [
    Columns.Description,
    Columns.Files,
    Columns.SegmentMarche,
    Columns.Client,
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
      fetchFn: 'getYProximitePending',
      columns: this.pendingColumns
    },
    SIGNED: {
      name: 'Documents signés',
      fetchFn: 'getYProximiteSigned',
      columns: [
        ...this.commonColumns,
        Columns.DateSignature,
        Columns.OptionsSigned
      ]
    },
    CANCELLED: {
      name: 'Annulés / Expirés',
      fetchFn: 'getYProximiteCancelled',
      columns: this.pendingColumns
    }
  };

  mainSearchFormData: FidusignSearchFieldsData[] = [
    {
      name: 'segmentMarche',
      description: 'Segment marché',
      metadatas: ['fiducial:domainContainerApplication'],
      data: this.fidusignService.getProximiteSegmentMarcheList(),
      inputType: 'autocomplete',
      inputSubtype: 'label-value'
    },
    {
      name: 'emetteur',
      description: `Emetteur`,
      metadatas: ['fiduSign:nomEmetteur', 'fiduSign:prenomEmetteur'],
      inputType: 'text'
    }
  ];

  rechercheAvanceeFormData: FidusignRechercheAvanceeData = {
    enveloppe: [
      ...this.fidusignService.commonRechercheAvanceeFields.enveloppe,
      {
        name: 'client',
        description: `Client`,
        metadatas: ['yproximite:nomClient'],
        inputType: 'text'
      },
      {
        name: 'validiteBonCommande',
        description: `Validité de bon de commande`,
        metadatas: ['yproximite:dateValiditeBonCommande'],
        inputType: 'date'
      },
    ],
    signature: this.fidusignService.commonRechercheAvanceeFields.signature
  };

  mainSearchQueryHandler(data: FidusignSearchFieldsData, inputValue: string) {
    if (data.name === 'emetteur') {
      return `AND (${data.metadatas.map(m => `${m}:"${inputValue?.trim()}*"`).join(' OR ')})`;
    }

    return super.mainSearchQueryHandler(data, inputValue);
  }

  onSearch(): void {
    const extraClause = this.isCommercial ? this.getEmetteurClause() : null;
    super.onSearch(extraClause);
  }

  private getEmetteurClause() {
    const { firstName, lastName } = this.userService.currentUser;
    return `AND (fiduSign:prenomEmetteur:"${firstName.toUpperCase()}" AND fiduSign:nomEmetteur:"${lastName.toUpperCase()}")`;
  }
}
