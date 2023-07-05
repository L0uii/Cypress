import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UtilsService} from 'services/utils.service';
import {Columns} from 'components/gerance/search-results-gerance/search-results-gerance.component';
import {SearchResult} from 'models/search';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {PROPRIETAIRES} from 'components/gerance/upload-gerance/upload-gerance.component';
import {UserService} from 'services/user.service';

const TABS: Home.Tabs = {
  PENDING: {
    name: 'En attente de signature',
    fetchFn: 'pendingGerance',
    columns: [
      Columns.Name,
      Columns.Files,
      Columns.Proprietaire,
      Columns.NomImmeuble,
      Columns.NomLocataire,
      Columns.Emetteur,
      Columns.Dates,
      Columns.StatutSignature,
      Columns.PendingSignataires,
      Columns.OptionsPending
    ]
  },

  SIGNED: {
    name: 'Documents signés',
    fetchFn: 'signedGerance',
    columns: [
      Columns.Name,
      Columns.Files,
      Columns.Proprietaire,
      Columns.NomImmeuble,
      Columns.NomLocataire,
      Columns.DateSignature,
      Columns.OptionsSigned

    ]
  },
  CANCELLED: {
    name: 'Annulés / Expirés',
    fetchFn: 'cancelledGerance',
    columns: [
      Columns.Name,
      Columns.Files,
      Columns.Proprietaire,
      Columns.NomImmeuble,
      Columns.NomLocataire,
      Columns.Emetteur,
      Columns.Dates,
      Columns.StatutSignature,
      Columns.PendingSignataires,
      Columns.OptionsPending
    ]
  }
};

@Component({
  selector: 'app-home-gerance',
  templateUrl: './home-gerance.component.html',
  styleUrls: ['./home-gerance.component.scss']
})

export class HomeGeranceComponent implements OnInit, AfterViewInit {

  // Toggle sideNav
  sideNavOpen = false;

  userEmail: string;
  // search inputs
  statutSignature = undefined;
  codeImmeuble = '';
  codeLot = '';
  codeBail = '';
  codeLocataire = '';
  nomImmeuble = '';
  nomLocataire = '';
  bailDate = undefined;
  proprietaireImmeuble = '';
  proprietaireImmeubleInput = '';
  filteredProprietaires = PROPRIETAIRES.sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
  searchQuery = '';
  pending = true;
  signed = false;
  cancelled = false;
  // Onglets
  tabs = {...TABS};

  currentYear = new Date().getFullYear();


  constructor(
    private utils: UtilsService,
    private title: Title,
    private user: UserService
  ) {
  }

  ngAfterViewInit() {
    this.onSearch();
  }

  ngOnInit() {
    this.userEmail = this.user.currentUser.email;
    this.title.setTitle('Espace GED - Gestion Immobilière');
  }

  onSync(key) {
    return ({pagination: {totalItems}}: SearchResult) => {
      this.tabs[key].count = totalItems;
    };
  }

  // Emitter affichage side nav
  refreshNav(value) {
    this.sideNavOpen = value;
  }

  // Affichage side nav
  toggleNav() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  // Réinitialise le formulaire
  clearAll() {
    this.proprietaireImmeuble = '';
    this.proprietaireImmeubleInput = '';
    this.statutSignature = '';
    this.codeImmeuble = '';
    this.codeLot = '';
    this.codeBail = '';
    this.codeLocataire = '';
    this.nomImmeuble = '';
    this.nomLocataire = '';
    this.bailDate = undefined;
    this.searchQuery = '';
    this.onSearch();
  }

  tabChanged(newIndex: number): void {
    switch (newIndex) {
      case 0:
        this.pending = true;
        this.signed = false;
        this.cancelled = false;
        break;
      case 1:
        this.pending = false;
        this.signed = true;
        this.cancelled = false;
        break;
      case 2:
        this.pending = false;
        this.signed = false;
        this.cancelled = true;
        break;
    }
  }

  clearCodeImmeuble() {
    this.codeImmeuble = '';
    this.onSearch();
  }

  clearCodeLot() {
    this.codeLot = '';
    this.onSearch();
  }

  clearCodeBail() {
    this.codeBail = '';
    this.onSearch();
  }

  clearCodeLocataire() {
    this.codeLocataire = '';
    this.onSearch();
  }

  clearBailDate() {
    this.bailDate = undefined;
    this.onSearch();
  }

  clearNomImmeuble() {
    this.nomImmeuble = '';
    this.onSearch();
  }

  clearNomLocataire() {
    this.nomLocataire = '';
    this.onSearch();
  }

  clearStatutSignature() {
    this.statutSignature = undefined;
    this.onSearch();
  }

  clearProprietaireImmeuble() {
    this.filteredProprietaires = PROPRIETAIRES.sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    this.proprietaireImmeuble = '';
    this.proprietaireImmeubleInput = '';
    this.onSearch();
  }

  filterProprietaire(data) {
    if (data) {
      this.filteredProprietaires = PROPRIETAIRES
        .filter(el => this.utils.removeAccents(el.label).toLowerCase().indexOf(this.utils.removeAccents(data).toLowerCase()) !== -1)
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    }
  }

  setValueProprietaire(data) {
    this.proprietaireImmeuble = data.value;
    this.proprietaireImmeubleInput = data.label;
    this.onSearch();
  }

  // Filtres search query
  onSearch(): void {
    let searchQuery = '';

    // Status signature
    if (this.statutSignature) {
      this.tabs['CANCELLED'].fetchFn = this.statutSignature === 'DEMANDE_EXPIREE' || this.statutSignature === 'DEMANDE_ANNULEE' ?
        'fidusignGerance' : 'cancelledGerance';
      this.tabs['PENDING'].fetchFn =
        this.statutSignature === 'MAIL_ENVOYE' ||
        this.statutSignature === 'MAIL_SEND' ||
        this.statutSignature === 'MAIL_RENVOYE' ||
        this.statutSignature === 'DOCUMENT_LU' ||
        this.statutSignature === 'SIGNATURE_EC_*' ?
          'fidusignGerance' : 'pendingGerance';

      this.statutSignature === 'ERROR' ?
        searchQuery = `${searchQuery} AND ISNULL:'fiduSign:statut'` :
        searchQuery = `${searchQuery} AND (=fiduSign:statut:'${this.statutSignature}')`;
    }

    if (this.codeImmeuble.trim()) {
      searchQuery = `${searchQuery} AND gerance:immeubleCode:${this.codeImmeuble.trim()}*`;
    }
    if (this.proprietaireImmeuble.trim()) {
      searchQuery = `${searchQuery} AND gerance:immeubleProprietaire:${this.proprietaireImmeuble.trim()}*`;
    }
    if (this.codeLot.trim()) {
      searchQuery = `${searchQuery} AND gerance:lotCode:${this.codeLot.trim()}*`;
    }
    if (this.codeBail.trim()) {
      searchQuery = `${searchQuery} AND gerance:bailCode:${this.codeBail.trim()}*`;
    }
    if (this.codeLocataire.trim()) {
      searchQuery = `${searchQuery} AND gerance:locataireCode:${this.codeLocataire.trim()}*`;
    }
    if (this.nomImmeuble.trim()) {
      searchQuery = `${searchQuery} AND gerance:immeubleNom:${this.nomImmeuble.trim()}*`;
    }
    if (this.nomLocataire.trim()) {
      searchQuery = `${searchQuery} AND gerance:locataireNom:${this.nomLocataire.trim()}*`;
    }

    if (this.bailDate) {
      const bailDate = this.utils.getDateQuery(
        this.bailDate,
        'Date de début de bail',
        'gerance:bailDate'
      );
      if (bailDate) {
        searchQuery = `${searchQuery} ${bailDate}`;
      } else {
        return;
      }
    }

    this.searchQuery = searchQuery;
  }
}
