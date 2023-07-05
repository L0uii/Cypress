import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {SPACE} from '@angular/cdk/keycodes';
import {ArchivesMetadata, METADATAS} from 'models/archives-presidence';
import moment from 'moment-es6';
import {ArchivesPresidenceService} from 'services/archives-presidence.service';
import {UtilsService} from 'services/utils.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {SnackbarService} from 'services/snackbar.service';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-form-archives-presidence',
  templateUrl: './form-archives-presidence.component.html',
  styleUrls: ['./form-archives-presidence.component.scss']
})
export class FormArchivesPresidenceComponent implements OnInit {
  // minDate: Date;
  uploadForm: UntypedFormGroup;
  // inputs
  metadatas: any[] = cloneDeep(METADATAS);
  inputs = this.metadatas.slice(0).reduce((o, key) => Object.assign(o, {[key.name]: {...key, value: undefined, actif: false}}), {});

  file: File;
  fileName: string;
  invalidFile = false;

  // keywords
  separatorKeysCodes: number[] = [SPACE];
  // Listes valeurs
  classements = {};
  filtered = {};
  showForm = true;
  showSend = false;
  data = {};

  constructor(
    private archivesPresidenceService: ArchivesPresidenceService,
    private formBuilder: UntypedFormBuilder,
    private snack: SnackbarService,
    private _adapter: DateAdapter<any>,
    private utils: UtilsService,
  ) {
    // Set the minimum date to January 1st 1970
    // this.minDate =  new Date('1970-01-01T00:00:00.000');
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.uploadForm = this.formBuilder.group({});
    for (const key in this.inputs) {
      if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
        const input = this.inputs[key];
        if (['destinataire', 'local', 'complementLocalisation'].includes(input.name)) {
          input.show = false;
        }

        this.uploadForm.controls[input.name] = input.obligatoire ?
          new UntypedFormControl('', Validators.required) :
          new UntypedFormControl('');
      }
    }
    this.inputs['sommaire'].value = 'SOMMAIRE_ABSENT';
    this.uploadForm.patchValue({sommaire: 'Non'});

    this.metadatas.forEach(metadata => {
      const hasOptions = metadata.type === 'optionsArray' || metadata.type === 'optionsObject';
      if (hasOptions) {
        const options =
          metadata.type === 'optionsArray' ?
            metadata['options']
              .map(el => ({label: el.toUpperCase(), value: this.utils.removeAccents(el.toUpperCase()).replace(/\s|\//g, '_')}))
              .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true})) :
            metadata.type === 'optionsObject' ?
              metadata['options']
                .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true})) :
              null;
        this.classements[metadata.name] = options;
        this.filtered[metadata.name] = options;

      }
    });
    this.onChanges();
  }

  filterFields = (input) => {
    return input.context !== 'search';
  };

  onFocus(event, trigger) {
    event.preventDefault();
    trigger.openPanel();
  }

  filterOptions(value, array) {
    if (value) {
      return this.filtered[array] = this.classements[array].filter(el =>
        this.utils.removeAccents(el.label).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    } else {
      return this.filtered[array] = this.classements[array]
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    }
  }

  setValue(event: Event, value: any, input: string): void {
    event.preventDefault();
    if (value) {
      this.inputs[input].value = value;
    }
  }

  // Mat-chip
  add(event: MatChipInputEvent): void {
    const { input, value } = event;
    if (value?.trim()) {
      if (this.inputs['keywords']['value']) {
        this.inputs['keywords']['value'].push(value.trim());
      } else {
        this.inputs['keywords']['value'] = [value.trim()];
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(value: any): void {
    const array = this.inputs['keywords'].value;
    const index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  // Mat-datepicker year
  setYear(input: any, selectedDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(11);
    ctrlValue.date(31);
    this.uploadForm.controls[input].setValue(ctrlValue);
    this.inputs[input]['typedDate'] = selectedDate.format('YYYY');
    datepicker.close();
  }

  onFilesChange(fileList) {
    const file: File = fileList[0];
    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.invalidFile = false;
    }
  }

  onFilesInvalid(fileList: File[]): void {
    const file: File = fileList[0];
    if (file) {
      this.file = undefined;
      this.fileName = '';
      this.invalidFile = true;
    }
  }

  hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  clearInput(event: Event, input: any): void {
    event.preventDefault();
    this.inputs[input].value = undefined;
    this.inputs[input].actif = false;
    if (this.inputs[input]['typedValue']) {
      this.inputs[input]['typedValue'] = undefined;
    }
    if (this.inputs[input]['typedDate']) {
      this.inputs[input]['typedDate'] = '';
    }
    if (this.inputs[input]['options']) {
      this.filtered[input] = this.classements[input];
    }
    if (this.hasRequiredField(this.uploadForm.controls[input])) {
      this.uploadForm.controls[input].setErrors({'incorrect': true});
    }
    this.uploadForm.controls[input].setValue(null);
  }

  onChanges(): void {
    this.uploadForm.get('etatDossier').valueChanges.subscribe(value => {
      this.archivesPresidenceService.onChangeState(value, this.inputs, this.uploadForm);
    });
    this.uploadForm.get('localisation').valueChanges.subscribe(value => {
      this.archivesPresidenceService.onChangeLocalisation(value, this.inputs, this.uploadForm);
    });
    this.uploadForm.get('local').valueChanges.subscribe(value => {
      this.archivesPresidenceService.onChangeLocal(value, this.inputs, this.uploadForm);
      const reg = /Grandes archives/gi;
      if (value) {
        this.filtered['complementLocalisation'] = reg.test(value) ? [] : this.classements['complementLocalisation'];
      }
    });
  }

  saveMetadataFromInput(event: Event): void {
    event.preventDefault();
    const valid = [];
    for (const key in this.uploadForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.uploadForm.controls, key)) {
        const control = this.uploadForm.controls[key];
        valid.push(control.valid);
      }
    }
    const form = {};
    if (valid.every(el => el)) {
      for (const key in this.inputs) {
        if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
          const input = this.inputs[key];
          if (input.context !== 'search') {
            if (input.value) {
              form[input.name] = input.name === 'keywords' ? input.value.join(' ') : input.value;
            } else if (input.typedValue) {
              form[input.name] = input['typedValue'];
            } else if (this.uploadForm.controls[input.name].value) {
              form[input.name] = this.uploadForm.controls[input.name].value;
            }
          }
        }
      }
      if (form['sommaire'] === 'SOMMAIRE_PRESENT') {
        if (this.file && this.file.size && !this.invalidFile) {
          this.send({form: form});
        } else {
          const message = this.invalidFile ?
            'Ce format de pièce jointe n\'est pas accepté: .docx ou .odt uniquement.' :
            !this.file ?
              'Vous n\'avez pas ajouté de sommaire.' :
              'Le document n\'est pas valide.';
          this.snack.openWarn(message);
        }
      } else {
        this.send({form: form});
      }
    } else {
      this.snack.openWarn('Les informations saisies sont incomplètes ou invalides');
    }
  }

  send(data: Object) {
    this.showForm = false;
    this.showSend = true;
    return this.data = data;
  }


}
