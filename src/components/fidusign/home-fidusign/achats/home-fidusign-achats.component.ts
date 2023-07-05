import {UtilsService} from 'services/utils.service';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {HomeFidusignTemplateComponent} from 'components/fidusign/home-fidusign/home-fidusign-template.component';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {FidusignCategorie, FidusignRechercheAvanceeData, FidusignSearchFieldsData, FidusignService} from 'services/fidusign.service';
import {AbstractControl} from '@angular/forms';
import {LabelValue} from 'models/archives-presidence';
import {Observable, Subject} from 'rxjs';
import {Columns} from 'components/fidusign/search-fidusign/search-fidusign.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home-fidusign-achats',
  templateUrl: '../home-fidusign-template.component.html',
  styleUrls: ['../home-fidusign-template.component.scss']
})
export class HomeFidusignAchatsComponent extends HomeFidusignTemplateComponent implements AfterViewInit, OnDestroy {
  subspaceName = 'Achats';

  baseFn = 'fidusignAchatsBase';
  cancelledFn = 'getAchatsCancelled';
  pendingFn = 'getAchatsPending';

  private sousFamilleList = new Subject<LabelValue[]>();
  private familleList: FidusignCategorie[];

  private reconductionOptions: string[] = [
    'Oui',
    'Non'
  ];

  private destroy$ = new Subject();

  constructor(
    utilsService: UtilsService,
    title: Title,
    fidusignService: FidusignService
  ) {
    super(utilsService, title, fidusignService);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.sousFamilleChanges();
    this.familleChanges();
    this.onSearch();
  }

  mainSearchFormData: FidusignSearchFieldsData[] = [
    {
      name: 'fournisseur',
      description: 'Fournisseur',
      metadatas: ['contrat:fournisseur'],
      data: this.fidusignService.getFournisseurList(),
      inputType: 'autocomplete',
      inputSubtype: 'allow-text',
      metadataOptions: 'strict-search'
    },
    {
      name: 'acheteur',
      description: 'Acheteur',
      metadatas: [
        'fiduSign:prenomEmetteur',
        'fiduSign:nomEmetteur'
      ],
      data: this.fidusignService.getAcheteurList(),
      inputType: 'autocomplete',
      inputSubtype: 'allow-text'
    },
  ];


  rechercheAvanceeFormData: FidusignRechercheAvanceeData = {
    enveloppe: [
      ...this.fidusignService.commonRechercheAvanceeFields.enveloppe,
      {
        name: 'famille',
        description: 'Catégorie du contrat',
        metadatas: ['fiducial:domainContainerFamille'],
        inputType: 'autocomplete',
        inputSubtype: 'label-value',
        data: this.getFamilleList(),
        metadataOptions: 'strict-search'
      },
      {
        name: 'sousFamille',
        description: 'Sous catégorie',
        metadatas: ['fiducial:domainContainerSousFamille'],
        inputType: 'autocomplete',
        inputSubtype: 'label-value',
        data: this.sousFamilleList.asObservable(),
        metadataOptions: 'strict-search'
      },
      {
        name: 'clientInterne',
        description: 'Client Interne',
        metadatas: ['contrat:clientinterne'],
        inputType: 'text'
      },
      {
        name: 'reconduction',
        description: 'Reconduction',
        metadatas: ['contrat:reconduction'],
        inputType: 'radio',
        data: this.reconductionOptions,
        metadataOptions: 'strict-search'
      },
      {
        name: 'emetteur',
        description: 'Emetteur',
        metadatas: ['fiduSign:prenomEmetteur', 'fiduSign:nomEmetteur'],
        inputType: 'text'
      }
    ],
    date: [
      {
        name: 'contractDateYear',
        description: `Date de prise d'effet`,
        metadatas: ['contrat:dateContrat'],
        inputType: 'year-range'
      },
      {
        name: 'contractEndDate',
        description: `Date de fin de contrat`,
        metadatas: ['contrat:dateFinContrat'],
        inputType: 'date'
      }
    ],
    signature: this.fidusignService.commonRechercheAvanceeFields.signature
  };

  private commonColumns = [
    Columns.Description,
    Columns.Files,
    Columns.Fournisseur,
    Columns.Nature,
  ];

  private pendingColumns = [
    ...this.commonColumns,
    Columns.Reconduction,
    Columns.Emetteur,
    Columns.Dates,
    Columns.StatutSignature,
    Columns.PendingSignataires,
    Columns.OptionsPending
  ]

  tabs: Home.Tabs = {
    PENDING: {
      name: 'En attente de signature',
      fetchFn: 'getAchatsPending',
      columns: this.pendingColumns
    },

    SIGNED: {
      name: 'Documents signés',
      fetchFn: 'getAchatsSigned',
      columns: [
        ...this.commonColumns,
        Columns.Categorie,
        Columns.SousCategorie,
        Columns.Reconduction,
        Columns.Emetteur,
        Columns.Dates,
        Columns.DateSignature,
        Columns.OptionsSigned
      ]
    },
    CANCELLED: {
      name: 'Annulés / Expirés',
      fetchFn: 'getAchatsCancelled',
      columns: this.pendingColumns
    }
  };

  mainSearchQueryHandler(data: FidusignSearchFieldsData, inputValue: string) {
    if (data.name === 'acheteur') {
      let query = '';
      const valueParts = inputValue.split(' ');
      if (valueParts?.length > 1) {
        query = `AND (${data.metadatas.map((m, i) => `${m}:"${valueParts[i]?.trim()}*"`).join(' AND ')})`;
      } else {
        query = `AND (${data.metadatas.map((m, i) => `${m}:"${valueParts[0]?.trim()}*"`).join(' OR ')})`;

      }
      return query;
    }

    return super.mainSearchQueryHandler(data, inputValue);
  }

  private get familleControl(): AbstractControl {
    return this.rechercheAvanceeForm.get('famille');
  }

  private get sousFamilleControl(): AbstractControl {
    return this.rechercheAvanceeForm.get('sousFamille');
  }

  private sousFamilleChanges(): void {
    this.sousFamilleControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !this.familleControl.value)
      )
      .subscribe((name: string) => {
        const findCategorieDuContratValue = this.familleList.find(categorie => name === categorie.name)?.libelle1;
        this.familleControl.setValue(findCategorieDuContratValue ?? '', { emitEvent: false });

        this.onSearch();
      });
  }

  private familleChanges(): void {
    this.familleControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((libelle1: string) => {
        if (!libelle1) {
          this.sousFamilleControl.setValue('', { emitEvent: false });
          this.sousFamilleList.next(this.convertSousFamilleList(this.familleList));
          return;
        }

        this.onSearch();
        this.generateSousCategorieList(libelle1);
      });
  }

  private getFamilleList(): Observable<LabelValue[]> {
    return this.fidusignService.getCategorieList()
      .pipe(
        tap((categorieList: FidusignCategorie[]) => {
          this.familleList = categorieList;
          this.sousFamilleList.next(this.convertSousFamilleList(this.familleList));
        }),
        map(this.removeDuplicateValues),
        map(this.convertFamilleList),
      );
  }

  private convertFamilleList(categorieList: FidusignCategorie[]): LabelValue[] {
    return categorieList.map(categorie => {
      return {
        value: categorie.libelle1,
        label: categorie.libelle2
      }
    });
  }

  private removeDuplicateValues(categorieList: FidusignCategorie[]): FidusignCategorie[] {
    return categorieList.filter((v,i,a) => a.findIndex(v2 => (v2.libelle2 === v.libelle2)) === i)
  }

  private generateSousCategorieList(libelle1: string): void {
    const filteredCategorieList = this.familleList
      .filter(categorie => libelle1 === categorie.libelle1);

    this.sousFamilleList.next(this.convertSousFamilleList(filteredCategorieList));
  }

  private convertSousFamilleList(categorieList: FidusignCategorie[]): LabelValue[] {
    return categorieList.map(categorie => {
      return {
        value: categorie.name,
        label: categorie.libelle3 === 'Matériel' ? `${categorie.libelle3} (${categorie.libelle2})` : categorie.libelle3
      }
    });
  }
}
