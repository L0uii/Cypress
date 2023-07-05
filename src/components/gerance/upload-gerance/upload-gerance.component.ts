import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, NgForm, UntypedFormControl } from '@angular/forms';
import { SnackbarService } from 'services/snackbar.service';
import { AuthenticationService, NodesApiService, PeopleContentService } from '@alfresco/adf-core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FidusignService } from 'services/fidusign.service';
import { UtilsService } from 'services/utils.service';
import { SPACE, COMMA } from '@angular/cdk/keycodes';
import * as moment from 'moment';
import {ViewChildren, QueryList} from '@angular/core';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import * as Sentry from "@sentry/angular-ivy";
import { endpoints } from 'endpoints/endpoints';

export const SIGNATAIRES = [
    {
        fullName: 'Martine SELLE',
        name: 'Martine ',
        surname: 'SELLE',
        email: 'martine.selle@fiducial.net',
        phone: ''
    },
    {
        fullName: 'Thierry GAIFFE',
        name: 'Thierry',
        surname: 'GAIFFE',
        email: 'thierry.gaiffe@fiducial.net',
        phone: ''
    }

];

export const TYPE_BAIL = [
  'Loi de 1948',
  'Autres nature de Bail',
  'Bail administratif',
  'Bail chasse',
  'Commercial 10 ans Ferme',
  'Dérogatoire',
  'Commercial 1-2-3-6-9-10',
  'Commercial 3-6-9',
  'Commercial 3-6-9-10',
  'Commercial 3-6-9-12',
  'Commercial 6-9',
  'Commercial 6-9-10',
  'Commercial 6-9-12',
  'Commercial 9 ans Ferme',
  'Code civil',
  'Autre Durée Ferme',
  'Commercial 12 ans Ferme',
  'Commercial 4-6-9',
  'Commercial 9-10',
  'Commercial 3+3mois-6-9',
  'Commercial 1-2-3-6-9',
  'Commercial 22 ans',
  'Emplacement publicitaire',
  'Equipements techniques',
  'Habitation 3 ans',
  'Habitation 6 ans',
  'Habitation conventionné',
  'Habitation meublé',
  'Professionnel',
  'Parking',
  'Précaire',
  'Sortie Loi de 1948'
];

export const PROPRIETAIRES = [
  {
    label: 'BUROBOUTIC',
    value: 'BUROBOUTIC',
    code: 'C1'
  },
  {
    label: 'FICOMMERCE',
    value: 'FICOMMERCE',
    code: 'C2'
  },
  {
    label: 'CAPIFORCE PIERRE',
    value: 'CAPIFORCE_PIERRE',
    code: 'C3'
  },
  {
    label: 'FONCIER ETUDES',
    value: 'FONCIER_ETUDES',
    code: 'C4'
  },
    {
    label: 'LOGIPIERRE 1',
    value: 'LOGIPIERRE_1',
    code: 'C5'
  },
  {
    label: 'LOGIPIERRE 3',
    value: 'LOGIPIERRE_3',
    code: 'C6'
  },
  {
    label: 'PRIMO 1',
    value: 'PRIMO_1',
    code: 'C7'
  },
  {
    label: 'PIERRE EXPANSION',
    value: 'PIERRE_EXPANSION',
    code: 'C8'
  },
  {
    label: 'SELECTIPIERRE 2',
    value: 'SELECTIPIERRE_2',
    code: 'C9'
  },
  {
    label: 'FORET GEREE III',
    value: 'FORET_GEREE_III',
    code: 'I1'
  },
  {
    label: 'FORET GEREE IV',
    value: 'FORET_GEREE_IV',
    code: 'I2'
  },
  {
    label: 'FORET GEREE VI',
    value: 'FORET_GEREE_VI',
    code: 'I3'
  },
  {
    label: 'FORET GEREE VIII',
    value: 'FORET_GEREE_VIII',
    code: 'I4'
  },
  {
    label: 'LES DOUZE FORETS',
    value: 'LES_DOUZE_FORETS',
    code: 'I5'
  },
  {
    label: 'GF DE SAINT-LOUIS',
    value: 'GF_DE_SAINT-LOUIS',
    code: 'I6'
  },
  {
    label: 'CANNES CROISETTE',
    value: 'CANNES_CROISETTE',
    code: 'I7'
  },
  {
    label: 'ROUEN BIHOREL',
    value: 'ROUEN_BIHOREL',
    code: 'I8'
  },
  {
    label: 'EUROPE LUXEMBOURG',
    value: 'EUROPE_LUXEMBOURG',
    code: 'I9'
  },
  {
    label: 'PIERRE 1',
    value: 'PIERRE_1',
    code: 'M1'
  },
  {
    label: 'FIDIMMO',
    value: 'FIDIMMO',
    code: 'M2'
  },
  {
    label: 'SOMITAP',
    value: 'SOMITAP',
    code: 'M3'
  }
];

@Component({
  selector: 'app-upload-gerance',
  templateUrl: './upload-gerance.component.html',
  styleUrls: ['./upload-gerance.component.scss']
})
export class UploadGeranceComponent implements OnInit {
  uploadForm: UntypedFormGroup;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  codeProprietaire: string;
  signataires = SIGNATAIRES.map(el => { const o = Object.assign({}, el); o['selected'] = false; return o; });
  filteredSignataires = this.signataires;
  selectedSignataires: any = [];
  extensions = [
    'pdf',
    'PDF'
  ];
  filteredProprietaires = PROPRIETAIRES.sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));
  filteredTypeBails = TYPE_BAIL.sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  fileList: any = [];
  invalidFiles: any = [];
  failList: any = [];
  successList: any = [];
  nodeId: string;
  nodeList: any = [];
  ticket: any;
  failed = 0;
  disabled = false;
  isSendFailed = false;

  showInputSignature2 = false;
  showInputSignature3 = false;
  showInputSignature4 = false;
  dateDebutBailInvalid = false;
  showViewer = false;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  @ViewChild('formDirective', { static: true }) private formDirective: NgForm;
  @ViewChild('fileUploaded', { static: true }) fileUploaded: ElementRef;
  sendBottom = '100%';
  sendDisplay = 'none';
  sendOpacity = '0';
  createPending = false;
  createFailed = false;
  createSuccess = false;
  sendPending = false;
  sendSuccess = false;
  sendFailed = false;
  retryFailed = false;
  retryPending = false;
  retrySuccess = false;

  lastSentId: any;
  lastSignProperties: string;
  errorRetry: any;
  errorSend: any;
  timestampRetry: any;

  copieMailCtrl = new UntypedFormControl();
  separatorKeysCodes: number[] = [SPACE, COMMA];
  copieMails = [];
  mailCopieInvalid = false;

  constructor(
    private snack: SnackbarService,
    private formBuilder: UntypedFormBuilder,
    private auth: AuthenticationService,
    private nodesApi: NodesApiService,
    private utils: UtilsService,
    private _adapter: DateAdapter<any>,
    private fidusign: FidusignService,
    private peopleApi: PeopleContentService
  ) { }

  add(event: MatChipInputEvent) {
      const { input, value } = event;
      // Add the value
      if (value?.trim()) {
        if (this.utils.validateEmail(value)) {
          this.copieMails.push({value: value.trim(), valid: true});
        } else {
          this.copieMails.push({value: value.trim(), valid: false});
        }
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }

      if (this.copieMailCtrl) {
        this.copieMailCtrl.setValue(null);
      }
      this.validateCopieMail();

  }

  validateCopieMail() {
    this.mailCopieInvalid = this.copieMails.map(key => key.valid).includes(false);
      if (this.mailCopieInvalid) {
        this.uploadForm.controls['mailCopie'].setErrors({ 'incorrect': true });
        this.uploadForm.controls['mailCopie'].markAsDirty();
      } else {
        this.uploadForm.controls['mailCopie'].setErrors(null);
        this.uploadForm.controls['mailCopie'].markAsPristine();
      }
  }

  remove(value) {
    const index = this.copieMails.indexOf(value);
    if (index >= 0) {
      this.copieMails.splice(index, 1);
    }
    this.validateCopieMail();
    return this.copieMails;
  }

  filterTypeBail(data) {
    if (data) {
      return this.filteredTypeBails = TYPE_BAIL
        .filter(el => this.utils.removeAccents(el).toLowerCase().indexOf(this.utils.removeAccents(data).toLowerCase()) !== -1)
        .sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
    }
    return this.filteredTypeBails = TYPE_BAIL
      .sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  }

  // Affecte la value du type de document au clic sur la valeur du select
  setValueTypeBail(data) {
    if (data) {
      this.uploadForm.patchValue({typeBail: data});
    }
  }

  onFocus(value) {
    this.autoComplete['_results'][value].openPanel();
  }

  filterProprietaire(data) {
    if (data) {
      return this.filteredProprietaires = PROPRIETAIRES
        .filter(el => this.utils.removeAccents(el.label).toLowerCase().indexOf(this.utils.removeAccents(data).toLowerCase()) !== -1)
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));
    }
    return this.filteredProprietaires = PROPRIETAIRES
      .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));

  }

  // Affecte la value du type de document au clic sur la valeur du select
  setValueProprietaire(data) {
    if (data) {
      this.uploadForm.patchValue({proprietaireImmeuble: data.value});
      this.uploadForm.patchValue({proprietaireImmeubleInput : data.label});
      this.codeProprietaire = data.code;
    }
  }

  // Liste des document valides en upload
  onFilesChange(fileList: Array<File>) {
    this.fileList = fileList;
  }

  // Liste des document invalides du formulaire
  onFilesInvalid(invalidFiles: Array<File>) {
    this.invalidFiles = invalidFiles;
  }

  // Déclenché au click sur l'élément div parent de la liste de signataires
  optionClicked(event: Event, person) {
    event.stopPropagation();
    this.toggleSelection(person);
  }
  isSignataire1Filled() {
    const prenom = this.uploadForm.value.recipient1FirstName !== '' ? true : false;
    const nom = this.uploadForm.value.recipient1LastName !== '' ? true : false;
    const mail = this.uploadForm.value.recipient1Email !== '' ? true : false;
    const phone = this.uploadForm.value.validationSMSNon ? true : this.uploadForm.value.recipient1FirstName !== '' ? true : false ;
    return prenom && nom && mail && phone ? true : false;
  }
  isSignataire2Filled() {
    const prenom = this.uploadForm.value.recipient2FirstName !== '' ? true : false;
    const nom = this.uploadForm.value.recipient2LastName !== '' ? true : false;
    const mail = this.uploadForm.value.recipient2Email !== '' ? true : false;
    const phone = this.uploadForm.value.validationSMSNon ? true : this.uploadForm.value.recipient2FirstName !== '' ? true : false ;
    return prenom && nom && mail && phone ? true : false;
  }
  isSignataire3Filled() {
    const prenom = this.uploadForm.value.recipient3FirstName !== '' ? true : false;
    const nom = this.uploadForm.value.recipient3LastName !== '' ? true : false;
    const mail = this.uploadForm.value.recipient3Email !== '' ? true : false;
    const phone = this.uploadForm.value.validationSMSNon ? true : this.uploadForm.value.recipient3FirstName !== '' ? true : false ;
    return prenom && nom && mail && phone ? true : false;
  }
  isSignataire4Filled() {
    const prenom = this.uploadForm.value.recipient4FirstName !== '' ? true : false;
    const nom = this.uploadForm.value.recipient4LastName !== '' ? true : false;
    const mail = this.uploadForm.value.recipient4Email !== '' ? true : false;
    const phone = this.uploadForm.value.validationSMSNon ? true : this.uploadForm.value.recipient4FirstName !== '' ? true : false ;
    return prenom && nom && mail && phone ? true : false;
  }

  // Gère l'ajout des signataires de la liste statique aux champs 1, 2, 3
  toggleSelection(person) {
    // Toggle slection de la personne clickée
    person.selected = !person.selected;

    // Si la personne a été sélectionnée :
    if (person.selected) {
      // Ajoute la personne au tableau des signataires ajoutés
      this.selectedSignataires.push(person);

      // Si le tableau contient une entrée, remplir la première ligne
      if (this.selectedSignataires.length >= 1) {
        this.uploadForm.patchValue({ recipient1FirstName: this.selectedSignataires[0].name });
        this.uploadForm.patchValue({ recipient1LastName: this.selectedSignataires[0].surname });
        this.uploadForm.patchValue({ recipient1Email: this.selectedSignataires[0].email });
        this.uploadForm.patchValue({ recipient1Phone: this.selectedSignataires[0].phone });

        // Si le tableau contient deux entrées, remplir la deuxieme ligne
        if (this.selectedSignataires.length >= 2) {
          this.showInputSignature2 = true;
          this.uploadForm.patchValue({ recipient2FirstName: this.selectedSignataires[1].name });
          this.uploadForm.patchValue({ recipient2LastName: this.selectedSignataires[1].surname });
          this.uploadForm.patchValue({ recipient2Email: this.selectedSignataires[1].email });
          this.uploadForm.patchValue({ recipient2Phone: this.selectedSignataires[1].phone });

          // Si le tableau contient trois entrées, remplir la troisième ligne
          if (this.selectedSignataires.length >= 3) {
            this.showInputSignature3 = true;
            this.uploadForm.patchValue({ recipient3FirstName: this.selectedSignataires[2].name });
            this.uploadForm.patchValue({ recipient3LastName: this.selectedSignataires[2].surname });
            this.uploadForm.patchValue({ recipient3Email: this.selectedSignataires[2].email });
            this.uploadForm.patchValue({ recipient3Phone: this.selectedSignataires[2].phone });

          // Si le tableau contient quatre entrées, remplir la quatrième ligne
          if (this.selectedSignataires.length >= 4) {
            this.showInputSignature4 = true;
            this.uploadForm.patchValue({ recipient4FirstName: this.selectedSignataires[4].name });
            this.uploadForm.patchValue({ recipient4LastName: this.selectedSignataires[4].surname });
            this.uploadForm.patchValue({ recipient4Email: this.selectedSignataires[4].email });
            this.uploadForm.patchValue({ recipient4Phone: this.selectedSignataires[4].phone });
          }
          }
        }
      }
    } else { // Si la personne est dé-sélectionnée

      // Trouve l'index de la personne dans le tableau
      const i = this.selectedSignataires.findIndex(value => value.fullName === person.fullName);
      // Enlève la personne du tableau
      this.selectedSignataires.splice(i, 1);

      // Effacer les champs de saisie correspondant au signataire déselectionné
      switch (i) {
        case 0:
          this.clearSignataire1();
          break;
        case 1:
          this.clearSignataire2();
          break;
        case 2:
          this.clearSignataire3();
          break;
        case 2:
          this.clearSignataire4();
        break;
      }
      // Remplir les inputs vides
      switch (this.selectedSignataires.length) {
        case 1:
          if (this.isSignataire2Filled()) {
            this.uploadForm.patchValue({ recipient1FirstName: this.uploadForm.value.recipient2FirstName });
            this.uploadForm.patchValue({ recipient1LastName: this.uploadForm.value.recipient2LastName });
            this.uploadForm.patchValue({ recipient1Email: this.uploadForm.value.recipient2Email });
            this.uploadForm.patchValue({ recipient1Phone: this.uploadForm.value.recipient2Phone });
            this.clearSignataire2();
          }
          if (this.isSignataire3Filled()) {
            this.uploadForm.patchValue({ recipient1FirstName: this.uploadForm.value.recipient3FirstName });
            this.uploadForm.patchValue({ recipient1LastName: this.uploadForm.value.recipient3LastName });
            this.uploadForm.patchValue({ recipient1Email: this.uploadForm.value.recipient3Email });
            this.uploadForm.patchValue({ recipient1Phone: this.uploadForm.value.recipient3Phone });
            this.clearSignataire3();
          }
          if (this.isSignataire4Filled()) {
            this.uploadForm.patchValue({ recipient1FirstName: this.uploadForm.value.recipient4FirstName });
            this.uploadForm.patchValue({ recipient1LastName: this.uploadForm.value.recipient4LastName });
            this.uploadForm.patchValue({ recipient1Email: this.uploadForm.value.recipient4Email });
            this.uploadForm.patchValue({ recipient1Phone: this.uploadForm.value.recipient4Phone });
            this.clearSignataire4();
          }
          break;
        case 2:
          if (!this.isSignataire1Filled()) {
            this.uploadForm.patchValue({ recipient1FirstName: this.uploadForm.value.recipient2FirstName });
            this.uploadForm.patchValue({ recipient1LastName: this.uploadForm.value.recipient2LastName });
            this.uploadForm.patchValue({ recipient1Email: this.uploadForm.value.recipient2Email });
            this.uploadForm.patchValue({ recipient1Phone: this.uploadForm.value.recipient2Phone });
            this.clearSignataire2();
            this.uploadForm.patchValue({ recipient2FirstName: this.uploadForm.value.recipient3FirstName });
            this.uploadForm.patchValue({ recipient2LastName: this.uploadForm.value.recipient3LastName });
            this.uploadForm.patchValue({ recipient2Email: this.uploadForm.value.recipient3Email });
            this.uploadForm.patchValue({ recipient2Phone: this.uploadForm.value.recipient3Phone });
            this.clearSignataire3();
            this.uploadForm.patchValue({ recipient3FirstName: this.uploadForm.value.recipient4FirstName });
            this.uploadForm.patchValue({ recipient3LastName: this.uploadForm.value.recipient4LastName });
            this.uploadForm.patchValue({ recipient3Email: this.uploadForm.value.recipient4Email });
            this.uploadForm.patchValue({ recipient3Phone: this.uploadForm.value.recipient4Phone });
            this.clearSignataire4();
          }
          break;
        default:
          break;
      }
    }
    // Actualise la liste des signataires sélectionnés dans le champ de recherche
    this.uploadForm.patchValue({ signataire1: this.selectedSignataires });
  }

  // Formate l'affichage des signataires sélectionnés dans le champ de recherche 'signataires'
  displayFn(value): string {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((person, index) => {
        if (index === 0) {
          displayValue = person.fullName;
        } else {
          displayValue += ', ' + person.fullName;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  // * FILTRER DES LISTES DE SAISIE AUTOCOMPLETE *


  // Filtre la liste de signataires sur leur nom complet
  selectSignataires(value) {
    if (value) {
      return this.filteredSignataires = this.signataires.filter(el =>
        this.utils.removeAccents(el.fullName).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1);
    }
  }

  // * EFFACER DES CHAMPS DU FORMULAIRE *

  // Vide les 4 champs de saisie correspondant au signataire 1
  clearSignataire1() {
    this.uploadForm.patchValue({ recipient1FirstName: '' });
    this.uploadForm.patchValue({ recipient1LastName: '' });
    this.uploadForm.patchValue({ recipient1Email: '' });
    this.uploadForm.patchValue({ recipient1Phone: '' });
  }

  // Vide les 4 champs de saisie correspondant au signataire 2
  clearSignataire2() {
    this.uploadForm.patchValue({ recipient2FirstName: '' });
    this.uploadForm.patchValue({ recipient2LastName: '' });
    this.uploadForm.patchValue({ recipient2Email: '' });
    this.uploadForm.patchValue({ recipient2Phone: '' });
  }

  // Vide les 4 champs de saisie correspondant au signataire 3
  clearSignataire3() {
    this.uploadForm.patchValue({ recipient3FirstName: '' });
    this.uploadForm.patchValue({ recipient3LastName: '' });
    this.uploadForm.patchValue({ recipient3Email: '' });
    this.uploadForm.patchValue({ recipient3Phone: '' });
  }

  // Vide les 4 champs de saisie correspondant au signataire 4
  clearSignataire4() {
    this.uploadForm.patchValue({ recipient4FirstName: '' });
    this.uploadForm.patchValue({ recipient4LastName: '' });
    this.uploadForm.patchValue({ recipient4Email: '' });
    this.uploadForm.patchValue({ recipient4Phone: '' });
  }

  // Réinitialise tout le formulaire
  clear() {
    if (this.createSuccess && (this.sendSuccess || this.retrySuccess)) {
      // Masquer les champs de saisie libre
      this.showInputSignature2 = false;
      this.showInputSignature3 = false;
      this.showInputSignature4 = false;

      // Réinitialise les objets filtres des champs de saisie type select
      this.filteredProprietaires = PROPRIETAIRES;
      this.filteredSignataires = this.signataires;

      // Efface toutes les valeurs de l'objet formulaire
      this.formDirective.resetForm();
      this.copieMailCtrl = new UntypedFormControl();
      this.copieMails = [];

      // Efface la valeur de l'input file
      this.fileUploaded.nativeElement.value = null;

      // Initialise les valeurs par défaut du formulaire et les validateurs de saisie
      this.initializeForm();

      // Efface les listes de documents
      this.fileList = [];
      this.invalidFiles = [];
      this.failList = [];
      this.successList = [];

      // Efface les dernières informations d'envoi
      this.nodeList = [];
      this.lastSentId = '';
      this.lastSignProperties = '';
    }

    // Rend le bouton submit clickable à nouveau
    this.disabled = false;

    // Réinitialiser les messages de création / d'envoi
    this.createPending = false;
    this.createFailed = false;
    this.createSuccess = false;
    this.sendPending = false;
    this.sendSuccess = false;
    this.sendFailed = false;
    this.retryFailed = false;
    this.retryPending = false;
    this.retrySuccess = false;
  }

  async send() {
    if (this.uploadForm.invalid) {
      this.snack.openWarn('Certaines saisies sont inccorrectes. Veuillez modifier les champs en rouge');
    } else if (this.fileList.length > 0 && this.invalidFiles.length === 0) {
      this.disabled = true;
      this.sendBottom = '0';
      this.sendDisplay = 'flex';
      this.sendOpacity = '1';
      const form = this.uploadForm.value;
      this.createPending = true;
      for (let index = 0; index < this.fileList.length; index++) {
        const file = this.fileList[index];
        const renamedFile = new File([file], this.utils.formatFilename(file.name), { type: file.type });
        // Définition métadonnées
        const documentProperties = JSON.stringify({
          'cm:author': this.auth.getEcmUsername(),
          'cmis:name': renamedFile.name,
          'fiducial:domainContainerBranche': 'Gerance',
          'fiducial:domainContainerSociete': 'gestionImmobiliere',
          'fiducial:domainContainerApplication': this.utils.removeAccents(form.proprietaireImmeuble),
          'fiducial:domainContainerFamille': 'bail',
          'fiducial:domainContainerSousFamille': 'bail',
          'cm:title': renamedFile.name.split('.')[0],
          'fp:nommage': `Bail / ${this.utils.removeAccents(form.nomImmeuble)} / ${form.codeLocataire} - ${this.utils.removeAccents(form.nomLocataire)}`,
          'gerance:bailType' : this.utils.removeAccents(form.typeBail),
          'gerance:bailCode' : form.codeBail,
          'gerance:bailDate' : form.dateDebutBail && form.dateDebutBail.isValid() ? form.dateDebutBail.format('YYYY-MM-DDTHH:mm:ss.SSSZ') : undefined ,
          'gerance:immeubleCode' : `${this.codeProprietaire}${form.codeImmeuble}`,
          'gerance:immeubleNom' : this.utils.removeAccents(form.nomImmeuble),
          'gerance:immeubleAdresse' : this.utils.removeSpecialCharacters(form.adresseImmeuble),
          'gerance:immeubleProprietaire' : this.utils.removeAccents(form.proprietaireImmeuble),
          'gerance:lotCode' : form.codeLot,
          'gerance:locataireCode' : form.codeLocataire,
          'gerance:locataireNom' : form.nomLocataire ? this.utils.removeAccents(form.nomLocataire.toLowerCase()) : undefined,
          'cmis:description': this.utils.removeSpecialCharacters(form.description),
          'fp:organisme': 'FIDUCIAL'

        });
      // Création du document dans la GED
        await fetch(endpoints.frontGEDCreateDocument, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/pdf',
            ticket: this.utils.getHeaderTicket(),
            docType: 'D:fp:document',
            aspects: 'P:fp:mr,P:fiducial:domainContainer,P:fp:contenuNonIndexeControl,P:gerance:immobilier',
            'Document-Properties': documentProperties
          }),
          body: renamedFile
        })
          .then(response => response.ok ? response.text() : this.failList.push(file.name))
          .then(resp => {
            this.nodeList.push(resp.split(';')[0]);
            this.successList.push(renamedFile.name);
            Sentry.captureMessage(`document created: ${renamedFile.name}`, 'log');
          }).catch((err) => {
            this.createFailed = true;
            this.failList.push(renamedFile.name);
          });
      }
      if (this.failList.length === 0) {
        setTimeout(async () => {
          this.createSuccess = true;
          this.sendPending = true;
          // Définition métadonnées de signature
          const signProperties = JSON.stringify({
            'fiduSign:origine': 'FiduSign',
            'fiduSign:prenomSignataire1': this.utils.removeAccents(this.utils.capitalize(form.recipient1FirstName)),
            'fiduSign:nomSignataire1': this.utils.removeAccents(form.recipient1LastName).toUpperCase(),
            'fiduSign:mailSignataire1': form.recipient1Email,
            'fiduSign:telSignataire1': form.recipient1Phone,
            'fiduSign:prenomSignataire2': this.utils.removeAccents(this.utils.capitalize(form.recipient2FirstName)),
            'fiduSign:nomSignataire2': form.recipient2LastName !== '' ? this.utils.removeAccents(form.recipient2LastName).toUpperCase() : '',
            'fiduSign:mailSignataire2': form.recipient2Email,
            'fiduSign:telSignataire2': form.recipient2Phone,
            'fiduSign:prenomSignataire3': this.utils.removeAccents(this.utils.capitalize(form.recipient3FirstName)),
            'fiduSign:nomSignataire3': form.recipient3LastName !== '' ? this.utils.removeAccents(form.recipient3LastName).toUpperCase() : '',
            'fiduSign:mailSignataire3': form.recipient3Email,
            'fiduSign:telSignataire3': form.recipient3Phone,
            'fiduSign:prenomSignataire4': this.utils.removeAccents(this.utils.capitalize(form.recipient4FirstName)),
            'fiduSign:nomSignataire4': form.recipient4LastName !== '' ? this.utils.removeAccents(form.recipient4LastName).toUpperCase() : '',
            'fiduSign:mailSignataire4': form.recipient4Email,
            'fiduSign:telSignataire4': form.recipient4Phone,
            'fiduSign:callback': endpoints.fiduSignCallback + this.nodeList[0] + '&status=%1',
            'fiduSign:prenomEmetteur': this.utils.removeAccents(this.utils.capitalize(this.senderFirstName)),
            'fiduSign:nomEmetteur': this.utils.removeAccents(this.senderLastName.toUpperCase()),
            'fiduSign:mailEmetteur': this.senderEmail,
            'fiduSign:mailCopie': this.copieMails.map(el => el.value).join(';'),
            'fp:message': this.utils.removeSpecialCharacters(form.message)
          });

          this.lastSignProperties = signProperties;
          this.lastSentId = this.nodeList[0];

          // Envoi de l'enveloppe en signature
          await fetch(endpoints.fiduSignSendDocumentForSigning, {
            method: 'POST',
            headers: new Headers({
              ticket: this.utils.getHeaderTicket(),
              uuids: this.nodeList.join(),
              validationType: form.validationSMSOui ? '1' : '0',
              validationTimeInDays: '30',
              documentProperties: signProperties,
              applyOrder: form.applyOrderOui ? '1' : '0',
              useBuyerEntity: '1'
            })
          })
            .then(signResponse => {
              if (signResponse.ok) {
                this.sendSuccess = true;
              } else {
                signResponse.json().then(signResp => {
                  this.errorSend = this.utils.isJSON(signResp.message) ? JSON.parse(signResp.message).label : signResp.message;
                  this.sendFailed = true;
                });
              }
            });
        }, 2000);
      }
    } else {
      this.disabled = false;
      this.snack.openWarn('Vous devez ajouter des documents valides (.pdf)');
    }
  }

  closeSendMessage() {
    this.clear();
    this.sendBottom = '100%';
    this.sendDisplay = 'none';
    this.sendOpacity = '0';
  }

  retry(id, signProperties) {
    this.retryPending = true;
    this.fidusign.retrySend(id, signProperties)
      .then(retry => {
        if (retry.ok) {
          this.sendFailed = false;
          this.retrySuccess = true;
        } else {
          retry.json().then(resp => {
            this.errorRetry = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
            this.timestampRetry = resp.timestamp;
            this.sendFailed = false;
            this.retryFailed = true;
          });
        }
      }).catch(error => {
        error.json().then(resp => {
          this.errorRetry = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
          this.timestampRetry = resp.timestamp;
          this.sendFailed = false;
          this.retryFailed = true;
        });
      });
  }

  cancel(uuids) {
    uuids.forEach(id => this.nodesApi.deleteNode(id));
    const message = uuids.length > 1 ?
      'La demande est annulée : les documents ont été supprimés.' :
      'La demande est annulée : le document a été supprimé.';
    this.snack.openInfo(message);
    this.closeSendMessage();
  }
  getUserInfos() {
    // Récupérer les informations de l'utilisateur
    this.peopleApi.getPerson(this.auth.getEcmUsername()).toPromise().then(resp => {
      this.senderFirstName = resp.firstName;
      this.senderLastName = resp.lastName;
      this.senderEmail = resp.email;
    });
  }

  changeValueReconductionNon() {
    this.uploadForm.get('reconductionNon').setValue(!this.uploadForm.value.reconductionNon);
  }

  changeValueReconductionOui() {
    this.uploadForm.get('reconductionOui').setValue(!this.uploadForm.value.reconductionOui);
  }

  changeValueValidationSMSNon() {
    this.uploadForm.get('validationSMSNon').setValue(!this.uploadForm.value.validationSMSNon);
  }

  changeValueValidationSMSOui() {
    this.uploadForm.get('validationSMSOui').setValue(!this.uploadForm.value.validationSMSOui);
  }

  changeValueApplyOrderNon() {
    this.uploadForm.get('applyOrderNon').setValue(!this.uploadForm.value.applyOrderNon);
  }

  changeValueApplyOrderOui() {
    this.uploadForm.get('applyOrderOui').setValue(!this.uploadForm.value.applyOrderOui);
  }

  clearCodeImmeuble(event) {
    event.preventDefault();
    this.uploadForm.patchValue({codeImmeuble : ''});
  }

  clearCodeLot(event) {
    event.preventDefault();
    this.uploadForm.patchValue({codeLot : ''});
  }

  clearCodeBail(event) {
    event.preventDefault();
    this.uploadForm.patchValue({codeBail : ''});
  }

  clearCodeLocataire(event) {
    event.preventDefault();
    this.uploadForm.patchValue({codeLocataire : ''});
  }

  clearDateDebutBail(event) {
    event.preventDefault();
    this.uploadForm.patchValue({dateDebutBail : ''});
  }

  clearNomImmeuble(event) {
    event.preventDefault();
    this.uploadForm.patchValue({nomImmeuble : ''});
  }

  clearNomLocataire(event) {
    event.preventDefault();
    this.uploadForm.patchValue({nomLocataire : ''});
  }

  clearTypeBail(event) {
    event.preventDefault();
    this.uploadForm.patchValue({typeBail : ''});
    this.filteredTypeBails = TYPE_BAIL.sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
  }

  clearAdresseImmeuble(event) {
    event.preventDefault();
    this.uploadForm.patchValue({adresseImmeuble : ''});
  }

  clearProprietaireImmeuble(event) {
    event.preventDefault();
    this.uploadForm.patchValue({proprietaireImmeuble : ''});
    this.uploadForm.patchValue({proprietaireImmeubleInput : ''});
    this.codeProprietaire = '';
    this.filteredProprietaires = PROPRIETAIRES.sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));

  }

  clearMessage(event) {
    event.preventDefault();
    this.uploadForm.patchValue({message : ''});
  }

  clearDescription(event) {
    event.preventDefault();
    this.uploadForm.patchValue({description : ''});
  }

  clearMailCopie(event) {
    event.preventDefault();
    this.uploadForm.patchValue({mailCopie : ''});
  }

  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      typeBail: ['', Validators.required],
      codeImmeuble: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), this.utils.validateNumber]],
      nomImmeuble: ['', Validators.required],
      adresseImmeuble: ['', Validators.required],
      proprietaireImmeubleInput: ['', Validators.required],
      proprietaireImmeuble: [''],
      codeLot: ['', Validators.required],
      codeBail: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), this.utils.validateNumber]],
      nomLocataire: ['', Validators.required],
      codeLocataire: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), this.utils.validateNumber]],
      dateDebutBail: ['', [Validators.required]],
      senderFirstName: '',
      senderLastName: '',
      senderEmail: ['', Validators.email],
      recipient1FirstName: ['', Validators.required],
      recipient1LastName: ['', Validators.required],
      recipient1Email: ['', [Validators.email, Validators.required]],
      recipient1Phone: '',
      recipient2FirstName: '',
      recipient2LastName: '',
      recipient2Email: ['', Validators.email],
      recipient2Phone: '',
      recipient3FirstName: '',
      recipient3LastName: '',
      recipient3Email: ['', Validators.email],
      recipient3Phone: '',
      recipient4FirstName: '',
      recipient4LastName: '',
      recipient4Email: ['', Validators.email],
      recipient4Phone: '',
      validationSMSNon: true, // [{ value: false, disabled: true }],
      validationSMSOui: false, // [{ value: false, disabled: true }],
      applyOrderNon: true,
      applyOrderOui: false,
      mailCopie: '',
      signataires: '',
      message: '',
      description: ''
    });
  }
  ngOnInit() {
    this.initializeForm();
    this.getUserInfos();
    this._adapter.setLocale('fr');
  }
}
