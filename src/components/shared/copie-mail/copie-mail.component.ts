import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SPACE, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { FidusignService } from 'services/fidusign.service';
import { SnackbarService } from 'services/snackbar.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { UtilsService } from 'services/utils.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-copie-mail',
  templateUrl: './copie-mail.component.html',
  styleUrls: ['./copie-mail.component.scss']
})
export class CopieMailComponent implements OnInit {
  uploadForm: UntypedFormGroup;
  uuids: Array<string>;

  copieMailCtrl = new UntypedFormControl();
  separatorKeysCodes: number[] = [SPACE, COMMA];
  copieMails = [];
  mailCopieInvalid = false;

  disabled = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private utils: UtilsService,
    private location: Location,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private fidusign: FidusignService
  ) {
    this.fidusign.disableUpdateEmailChange.subscribe(change => {
      this.disabled = change;
    });
  }

    // Ferme l'overlay et retourne à la navigation courante
  close(event) {
    event.preventDefault();
    this.location.back();
  }

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



  forwardDocument() {
    if (this.uploadForm.invalid) {
      this.snack.openWarn('Certaines saisies sont inccorrectes. Veuillez modifier les champs en rouge');
    } else {
      this.disabled = true;
      this.fidusign.forward(this.uuids[0], this.copieMails);
    }
  }

  initializeForm() {
    this.uploadForm = this.formBuilder.group({
      mailCopie: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeForm();

    // Récupère dans la query string les id des documents de l'enveloppe
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');
    });
  }

}
