import {GroupService} from 'services/group.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {FidusignService} from 'services/fidusign.service';
import {SnackbarService} from 'services/snackbar.service';
import {NodesApiService} from '@alfresco/adf-core';
import {GroupsEnums} from 'enums/groups.enums';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
  uploadForm: UntypedFormGroup;
  uuids: Array<string>;

  prenomSignataire1: string;
  nomSignataire1: string;
  mailSignataire1: string;
  isPrenom1Changed = false;
  isNom1Changed = false;
  isEmail1Changed = false;
  isSignedBy1 = false;

  prenomSignataire2: string;
  nomSignataire2: string;
  mailSignataire2: string;
  isPrenom2Changed = false;
  isNom2Changed = false;
  isEmail2Changed = false;
  isSignedBy2 = false;

  prenomSignataire3: string;
  nomSignataire3: string;
  mailSignataire3: string;
  isPrenom3Changed = false;
  isNom3Changed = false;
  isEmail3Changed = false;
  isSignedBy3 = false;

  prenomSignataire4: string;
  nomSignataire4: string;
  mailSignataire4: string;
  isPrenom4Changed = false;
  isNom4Changed = false;
  isEmail4Changed = false;
  isSignedBy4 = false;

  disabled = false;

  isJuridique = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private nodesApiService: NodesApiService,
    private router: Router,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private fidusignService: FidusignService,
    private groupService: GroupService
  ) {
    this.isJuridique = this.groupService.isInGroups([GroupsEnums.isUserFidusignJuridique]);
    this.fidusignService.disableUpdateEmailChange.subscribe(change => {
      this.disabled = change;
    });
  }

  // Ferme l'overlay et retourne à la navigation courante
  close(event) {
    event.preventDefault();
    this.router.navigate(['/fidusign/consultation']);
  }

  // Récupération des informations des signataires des documents
  initializeProperties(id) {
    this.nodesApiService.getNode(id).toPromise().then(resp => {
      const properties = resp.properties;
      // Signataire 1
      this.prenomSignataire1 = properties['fiduSign:prenomSignataire1'];
      this.uploadForm.patchValue({prenomSignataire1: properties['fiduSign:prenomSignataire1']});
      this.nomSignataire1 = properties['fiduSign:nomSignataire1'];
      this.uploadForm.patchValue({nomSignataire1: properties['fiduSign:nomSignataire1']});
      this.mailSignataire1 = properties['fiduSign:mailSignataire1'];
      this.uploadForm.patchValue({mailSignataire1: properties['fiduSign:mailSignataire1']});
      this.isSignedBy1 = !!properties['fiduSign:statut'].includes('1');
      this.onChangesPrenom1();
      this.onChangesNom1();
      this.onChangesEmail1();

      // Signataire 2
      this.prenomSignataire2 = properties['fiduSign:prenomSignataire2'];
      this.uploadForm.patchValue({prenomSignataire2: properties['fiduSign:prenomSignataire2']});
      this.nomSignataire2 = properties['fiduSign:nomSignataire2'];
      this.uploadForm.patchValue({nomSignataire2: properties['fiduSign:nomSignataire2']});
      this.mailSignataire2 = properties['fiduSign:mailSignataire2'];
      this.uploadForm.patchValue({mailSignataire2: properties['fiduSign:mailSignataire2']});
      this.isSignedBy2 = !!properties['fiduSign:statut'].includes('2');
      this.onChangesPrenom2();
      this.onChangesNom2();
      this.onChangesEmail2();

      // Signataire 3
      this.prenomSignataire3 = properties['fiduSign:prenomSignataire3'];
      this.uploadForm.patchValue({prenomSignataire3: properties['fiduSign:prenomSignataire3']});
      this.nomSignataire3 = properties['fiduSign:nomSignataire3'];
      this.uploadForm.patchValue({nomSignataire3: properties['fiduSign:nomSignataire3']});
      this.mailSignataire3 = properties['fiduSign:mailSignataire3'];
      this.uploadForm.patchValue({mailSignataire3: properties['fiduSign:mailSignataire3']});
      this.isSignedBy3 = !!properties['fiduSign:statut'].includes('3');
      this.onChangesPrenom3();
      this.onChangesNom3();
      this.onChangesEmail3();

      // Signataire 4
      this.prenomSignataire4 = properties['fiduSign:prenomSignataire4'];
      this.uploadForm.patchValue({prenomSignataire4: properties['fiduSign:prenomSignataire4']});
      this.nomSignataire4 = properties['fiduSign:nomSignataire4'];
      this.uploadForm.patchValue({nomSignataire4: properties['fiduSign:nomSignataire4']});
      this.mailSignataire4 = properties['fiduSign:mailSignataire4'];
      this.uploadForm.patchValue({mailSignataire4: properties['fiduSign:mailSignataire4']});
      this.isSignedBy4 = !!properties['fiduSign:statut'].includes('4');
      this.onChangesPrenom4();
      this.onChangesNom4();
      this.onChangesEmail4();
    });
  }

  // Initialisation du formulaire (validation des e-mails)
  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      prenomSignataire1: [''],
      prenomSignataire2: [''],
      prenomSignataire3: [''],
      prenomSignataire4: [''],
      nomSignataire1: [''],
      nomSignataire2: [''],
      nomSignataire3: [''],
      nomSignataire4: [''],
      mailSignataire1: ['', Validators.email],
      mailSignataire2: ['', Validators.email],
      mailSignataire3: ['', Validators.email],
      mailSignataire4: ['', Validators.email]
    });
  }

  // On submit, update de(s) propriété(s) pour chaque document de l'enveloppe + appel API /retrySigningOne
  updateEmail() {

    if (this.isEmail1Changed || this.isPrenom1Changed || this.isNom1Changed) {
      const signataire1 = {
        nom: this.uploadForm.value.nomSignataire1,
        prenom: this.uploadForm.value.prenomSignataire1,
        email: this.uploadForm.value.mailSignataire1
      };
      this.fidusignService.changeSignataire(signataire1, 1, this.uuids.join(','));
      // Empêche de submit à nouveau tant que les appels aux API ne sont pas fullfill
      this.disabled = true;
    }
    if (this.isEmail2Changed || this.isPrenom2Changed || this.isNom2Changed) {
      const signataire2 = {
        nom: this.uploadForm.value.nomSignataire2,
        prenom: this.uploadForm.value.prenomSignataire2,
        email: this.uploadForm.value.mailSignataire2
      };
      this.fidusignService.changeSignataire(signataire2, 2, this.uuids.join(','));
      // Empêche de submit à nouveau tant que les appels aux API ne sont pas fullfill
      this.disabled = true;
    }
    if (this.isEmail3Changed || this.isPrenom3Changed || this.isNom3Changed) {
      const signataire3 = {
        nom: this.uploadForm.value.nomSignataire3,
        prenom: this.uploadForm.value.prenomSignataire3,
        email: this.uploadForm.value.mailSignataire3
      };
      this.fidusignService.changeSignataire(signataire3, 3, this.uuids.join(','));

      // Empêche de submit à nouveau tant que les appels aux API ne sont pas fullfill
      this.disabled = true;
    }
    if (this.isEmail4Changed || this.isPrenom4Changed || this.isNom4Changed) {
      const signataire4 = {
        nom: this.uploadForm.value.nomSignataire4,
        prenom: this.uploadForm.value.prenomSignataire4,
        email: this.uploadForm.value.mailSignataire4
      };
      this.fidusignService.changeSignataire(signataire4, 4, this.uuids.join(','));

      // Empêche de submit à nouveau tant que les appels aux API ne sont pas fullfill
      this.disabled = true;
    }
    if (!this.isEmail1Changed &&
      !this.isEmail2Changed &&
      !this.isEmail3Changed &&
      !this.isEmail4Changed &&
      !this.isPrenom1Changed &&
      !this.isPrenom2Changed &&
      !this.isPrenom3Changed &&
      !this.isPrenom4Changed &&
      !this.isNom1Changed &&
      !this.isNom2Changed &&
      !this.isNom3Changed &&
      !this.isNom4Changed) {
      this.snackbarService.openInfo(`Vous n'avez modifié aucune information.`);
    }
  }

  // Monitoring des changements de valeur pour l'input de l'adresse mail 1
  onChangesEmail1() {
    this.uploadForm.get('mailSignataire1').valueChanges.subscribe(val => {
      this.isEmail1Changed = this.mailSignataire1 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input de l'adresse mail 2
  onChangesEmail2() {
    this.uploadForm.get('mailSignataire2').valueChanges.subscribe(val => {
      this.isEmail2Changed = this.mailSignataire2 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input de l'adresse mail 3
  onChangesEmail3() {
    this.uploadForm.get('mailSignataire3').valueChanges.subscribe(val => {
      this.isEmail3Changed = this.mailSignataire3 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input de l'adresse mail 4
  onChangesEmail4() {
    this.uploadForm.get('mailSignataire4').valueChanges.subscribe(val => {
      this.isEmail4Changed = this.mailSignataire4 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du nom 1
  onChangesNom1() {
    this.uploadForm.get('nomSignataire1').valueChanges.subscribe(val => {
      this.isNom1Changed = this.nomSignataire1 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du nom 2
  onChangesNom2() {
    this.uploadForm.get('nomSignataire2').valueChanges.subscribe(val => {
      this.isNom2Changed = this.nomSignataire2 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du nom 3
  onChangesNom3() {
    this.uploadForm.get('nomSignataire3').valueChanges.subscribe(val => {
      this.isNom3Changed = this.nomSignataire3 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du nom 4
  onChangesNom4() {
    this.uploadForm.get('nomSignataire4').valueChanges.subscribe(val => {
      this.isNom4Changed = this.nomSignataire4 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du prénom 1
  onChangesPrenom1() {
    this.uploadForm.get('prenomSignataire1').valueChanges.subscribe(val => {
      this.isPrenom1Changed = this.prenomSignataire1 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du prénom 2
  onChangesPrenom2() {
    this.uploadForm.get('prenomSignataire2').valueChanges.subscribe(val => {
      this.isPrenom2Changed = this.prenomSignataire2 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du prénom 3
  onChangesPrenom3() {
    this.uploadForm.get('prenomSignataire3').valueChanges.subscribe(val => {
      this.isPrenom3Changed = this.prenomSignataire3 !== val;
    });
  }

  // Monitoring des changements de valeur pour l'input du prénom 4
  onChangesPrenom4() {
    this.uploadForm.get('prenomSignataire4').valueChanges.subscribe(val => {
      this.isPrenom4Changed = this.prenomSignataire4 !== val;
    });
  }

  ngOnInit() {
    this.initializeForm();

    // Récupère dans la query string les id des documents de l'enveloppe
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');

      // Récupère les métadonnées associées à l'enveloppe
      this.initializeProperties(this.uuids[0]);
    });
  }
}
