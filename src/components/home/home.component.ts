import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {removeWhitespace, replaceCommaByDot} from '../../utils/string';
import {SearchResult} from 'models/search';
import * as moment from 'moment';
import {Title} from '@angular/platform-browser';
import {SnackbarService} from 'services/snackbar.service';
import {Columns} from 'enums/columns.enum';
import {ActivatedRoute, Router} from '@angular/router';

const TABS: Home.Tabs = {
  FACTURES: {
    name: 'Factures et Avoirs',
    fetchFn: 'getFactures',
    columns: [
      Columns.Select,
      Columns.CodeClient,
      Columns.NomClient,
      Columns.NumFacture,
      Columns.NomSociete,
      Columns.DateFacture,
      Columns.DateDebutFacture,
      Columns.DateFinFacture,
      Columns.Duplicata,
      Columns.Periodicite,
      Columns.Nommage,
      Columns.Montant,
      Columns.Options
    ]
  },
  CONTRACTS: {
    name: 'Contrats',
    fetchFn: 'getContrats',
    columns: [
      Columns.Select,
      Columns.CodeClient,
      Columns.DateDocument,
      Columns.Nature,
      Columns.Statut,
      Columns.Nommage,
      Columns.SousCategory,
      Columns.Options
    ]
  },
  DOCUMENTS_LAB: {
    name: 'Documents LAB',
    fetchFn: 'getDocsLAB',
    columns: [Columns.Select, Columns.CodeClient, Columns.DateDocument, Columns.Nommage, Columns.SousCategory, Columns.Options]
  },
  MANDATS_ETEBAC: {
    name: 'Mandats ETEBAC',
    fetchFn: 'getMandatsETEBAC',
    columns: [
      Columns.Select,
      Columns.CodeClient,
      Columns.DateDocument,
      Columns.Statut,
      Columns.Nommage,
      Columns.SousCategory,
      Columns.Options
    ]
  },
  MANDATS_SEPA: {
    name: 'Mandats SEPA',
    fetchFn: 'getMandatsSEPA',
    columns: [
      Columns.Select,
      Columns.CodeClient,
      Columns.DateDocument,
      Columns.Statut,
      Columns.Nommage,
      Columns.SousCategory,
      Columns.Options
    ]
  },
  RIB: {
    name: 'RIB',
    fetchFn: 'getRIB',
    columns: [Columns.Select, Columns.CodeClient, Columns.Nommage, Columns.SousCategory, Columns.Options]
  }
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  customerId = '';
  customerName = '';
  factureNum = '';
  societeEmName = undefined;
  billAmount = '';
  siren = '';
  sousCategory = undefined;
  codeBudget = '';
  factureStartDate = '';
  factureEndDate = '';
  factureTVA = undefined;
  dateDocument = undefined;
  tabs = { ...TABS };

  societeEmettriceOptions = [
    'A.G.A-P.L. FRANCE',
    'AUDIT CONSEIL STRATEGIE',
    'C.G.A FRANCE',
    'FIDEURAF',
    'FIDUCIAL AUDIT',
    'FIDUCIAL BELGIQUE',
    'FIDUCIAL CONSEIL',
    'FIDUCIAL CONSULTING',
    'FIDUCIAL EXPERTISE',
    'FIDUCIAL LUXEMBOURG',
    'FIDUCIAL SA',
    'SOFIRAL',
    'FIDUCIAL.FR',
    'FIGES AUDIT',
    'REVCO',
    'SECAC'
  ];

  currentYear = new Date().getFullYear();

  constructor(private utils: UtilsService,
    private snack: SnackbarService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router )
    { }

  onSync(key) {
    return ({ pagination: { totalItems } }: SearchResult) => {
      this.tabs[key].count = totalItems;
    };
  }

  clearCustomer() {
    this.customerId = '';
    this.router.navigate(['/adv/consultation']);
    this.onSearch();
  }

  clearAll() {
    this.customerId = '';
    this.customerName = '';
    this.factureNum = '';
    this.societeEmName = undefined;
    this.billAmount = '';
    this.siren = '';
    this.sousCategory = undefined;
    this.codeBudget = '';
    this.factureStartDate = '';
    this.factureEndDate = '';
    this.dateDocument = undefined;
    this.factureTVA = undefined;
    this.searchQuery = '';
    this.onSearch();
  }

  onSearch() {
    let searchQuery = '';
    if (this.customerId !== '') {
      searchQuery = `${searchQuery} AND firme:codeClient:${this.customerId.trim()}`;
    }

    if (this.customerName !== '') {
      searchQuery = `${searchQuery} AND fact:destinataire:'${this.customerName.trim()}'`;
    }

    if (this.factureNum !== '') {
      searchQuery = `${searchQuery} AND fact:numero:'${this.factureNum.trim()}'`;
    }

    if (this.societeEmName !== undefined) {
      searchQuery = `${searchQuery} AND =fact:emetteur:'${this.societeEmName}'`;
    }

    const formatedBillAmount = replaceCommaByDot(removeWhitespace(this.billAmount));
    if (formatedBillAmount) {
      searchQuery = `${searchQuery} AND fact:totalTTC:'${formatedBillAmount}'`;
    }

    if (this.siren !== '') {
      searchQuery = `${searchQuery} AND fact:sirenDestinataire:${this.siren.trim()}`;
    }

    if (this.sousCategory !== undefined) {
      searchQuery = `${searchQuery} AND =fiducial:domainContainerSousFamille:'${this.sousCategory}'`;
    }

    if (this.codeBudget !== '') {
      searchQuery = `${searchQuery} AND firme:codeBudget:'${this.codeBudget}'`;
    }

    if (this.dateDocument) {
      const dateQuery = this.utils.getDateQuery(
        this.dateDocument,
        `Date document`,
        'fp:dateDocument',
        'fact:dateFacture'
      );
      if (dateQuery) {
        searchQuery = `${searchQuery} ${dateQuery}`
      } else {
        return;
      }
    }

    if (this.factureStartDate !== '' && this.factureEndDate === '') {
      searchQuery = `${searchQuery} AND fact:dateFacture:[${this.factureStartDate} TO MAX]`;
    }

    if (this.factureEndDate !== '' && this.factureStartDate === '') {
      searchQuery = `${searchQuery} AND fact:dateFacture:[MIN TO ${this.factureEndDate}]`;
    }

    if (this.factureStartDate !== '' && this.factureEndDate !== '') {
      searchQuery = `${searchQuery} AND fact:dateFacture:[${this.factureStartDate} TO ${this.factureEndDate}]`;
    }

    if (this.factureTVA === 'NON') {
      searchQuery = `${searchQuery} AND fact:totalTVA:0 AND !fact:totalTTC:0`;
    }

    if (this.factureTVA === 'OUI') {
      searchQuery = `${searchQuery} AND !fact:totalTVA:0 AND !fact:totalTTC:0`;
    }

    return (this.searchQuery = searchQuery);
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
        this.customerId = params.customerId || '';
        this.onSearch();
      });
  this.title.setTitle('Espace GED - ADV');
  }
}
