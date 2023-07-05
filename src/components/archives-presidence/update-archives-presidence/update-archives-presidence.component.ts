import { endpoints } from './../../../endpoints/endpoints';
import { AuthenticationService } from '@alfresco/adf-core';
import { SPACE } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { METADATAS } from 'models/archives-presidence';
import moment from 'moment-es6';
import { Subject } from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators';
import { ArchivesPresidenceService } from 'services/archives-presidence.service';
import { SnackbarService } from 'services/snackbar.service';
import { UpdateResultsService } from 'services/update-results.service';
import { UtilsService } from 'services/utils.service';
import {cloneDeep} from 'lodash';
import * as Sentry from "@sentry/angular-ivy";

@Component({
  selector: 'app-update-archives-presidence',
  templateUrl: './update-archives-presidence.component.html',
  styleUrls: ['./update-archives-presidence.component.scss']
})
export class UpdateArchivesPresidenceComponent implements OnInit, OnDestroy {
  uuid: any = [];
  document: any = [];
  // minDate: Date;
  uploadForm: UntypedFormGroup;
  subcriptions = [];
  unsubscribe$: Subject<void> = new Subject<void>();
  // inputs
  metadatas = cloneDeep(METADATAS);
  inputs = {};
  file: File;
  fileName: string;
  invalidFile = false;
  subscriptions = [];
  // keywords
  separatorKeysCodes: number[] = [SPACE];
  // Listes valeurs
  classements = {};
  filtered = {};

  updateLaunched = false;
  updatePending = false;
  updateFailed = false;
  updateSuccess = false;
  disabled = false;
  showLists = false;
  failList: any = [];
  successList: any = [];

  constructor(
    private archivesPresidenceService: ArchivesPresidenceService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private snack: SnackbarService,
    private _adapter: DateAdapter<any>,
    private updateService: UpdateResultsService,
    private utils: UtilsService,
  ) {
     // Set the minimum date to January 1st 1970
    // this.minDate =  new Date('1970-01-01T00:00:00.000');
  }

  close(): void {
    this.router.navigate(['/archives-presidence/consultation']);
  }

  onFocus(event: Event, trigger: any): void {
    event.preventDefault();
    trigger.openPanel();
  }


  filterFields = (input: any): boolean => {
    return input.context !== 'search';
  }

  filterOptions(value: string, array: string): any {
    if (value) {
      return this.filtered[array] = this.classements[array].filter(el =>
        this.utils.removeAccents(el.label).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));
    } else {
      return this.filtered[array] = this.classements[array]
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true }));
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

  remove(value: string): void {
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


  init(): void {
    this.uploadForm = this.formBuilder.group({});
    for (const key in this.inputs) {
      if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
        const input = this.inputs[key];
        if (['destinataire', 'local', 'complementLocalisation'].includes(input.name)) {
          input.show = input.value || false;
        }
        this.uploadForm.controls[input.name] =
          input.obligatoire && input.value ? new UntypedFormControl(input.value, Validators.required) :
          input.obligatoire && !input.value ? new UntypedFormControl('', Validators.required) :
          !input.obligatoire && input.value ? new UntypedFormControl(input.value) :
          new UntypedFormControl('');
      }
    }
    this.metadatas.forEach(metadata => {
      const hasOptions =  metadata.type === 'optionsArray' || metadata.type === 'optionsObject';
      if (hasOptions) {
        const options =
        metadata.type === 'optionsArray' ?
          metadata['options']
            .map( el => ({label: el.toUpperCase(), value: this.utils.removeAccents(el.toUpperCase()).replace(/\s|\//g, '_')}))
            .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true })) :
        metadata.type === 'optionsObject' ?
          metadata['options']
            .sort((a, b) => a.label.localeCompare(b.label, 'fr', { ignorePunctuation: true })) :
        null;
        this.classements[metadata.name] = options;
        this.filtered[metadata.name] = options;

      }
    });
    this.onChanges();
  }


/*   onFilesChange(fileList) {
    const file: File = fileList[0];
    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.invalidFile = false;
    }
  }

  onFilesInvalid(fileList) {
    const file: File = fileList[0];
    if (file) {
      this.file = undefined;
      this.fileName = '';
      this.invalidFile = true;
    }
  } */
  hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({}as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  clearInput(event: Event, input: string): void {
    event.preventDefault();
    this.inputs[input].value = undefined;
    this.inputs[input].actif = false;
    if (this.inputs[input]['typedValue']) { this.inputs[input]['typedValue'] = undefined; }
    if (this.inputs[input]['typedDate']) { this.inputs[input]['typedDate'] = ''; }
    if (this.inputs[input]['options']) {
      this.filtered[input] = this.classements[input];
    }
    if (this.hasRequiredField(this.uploadForm.controls[input])) {
      this.uploadForm.controls[input].setErrors({'incorrect': true});
    }
    this.uploadForm.controls[input].setValue(null);
  }

  onChanges(): void {
    this.uploadForm.get('etatDossier').valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.archivesPresidenceService.onChangeState(value, this.inputs, this.uploadForm);
    });

    this.uploadForm.get('localisation').valueChanges.pipe(takeUntil(this.unsubscribe$))
    .subscribe(value => {
        this.archivesPresidenceService.onChangeLocalisation(value, this.inputs, this.uploadForm);
    });

    this.uploadForm.get('local').valueChanges.pipe(takeUntil(this.unsubscribe$))
    .subscribe(value => {
        this.archivesPresidenceService.onChangeLocal(value, this.inputs, this.uploadForm);
        const reg = /Grandes archives/gi;
        if (value) {
          this.filtered['complementLocalisation'] = reg.test(value) ? [] : this.classements['complementLocalisation'];
        }
    });
  }




  async update(id: string, documentProperties: string): Promise<Response> {
    return await fetch(endpoints.frontGEDUpdateAllDocument, {
      method: 'PUT',
      headers: new Headers({
        uuid: id,
        ticket: this.utils.getHeaderTicket(),
        docType: 'D:fp:document',
        aspects: this.archivesPresidenceService.aspects,
        'Document-Properties': documentProperties,
        updateContent: '0'
      })
    });
  }

  async send(event: Event): Promise<any> {
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
      this.updateLaunched = true;
      this.updatePending = true;
      const title = this.document.name;
      const documentProperties = this.archivesPresidenceService.createDocumentProperties(form, true);
      await this.update(this.uuid, documentProperties).then(resp => resp.text()).then((response: any) => {
        if (response.split(';')[0] === this.uuid) {
          this.successList.push(title);
          Sentry.captureMessage(`document updated: ${this.uuid}`, 'log');
        } else {
          const resp = JSON.parse(response);
          const erreur = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
          this.failList.push({ title: this.document.name, error: erreur });
        }
      });

      if (this.failList.length > 0) {
        this.updatePending = false;
        this.updateFailed = true;
      } else {
        this.updatePending = false;
        this.updateSuccess = true;
        this.updateService.triggerRefreshChange(true);
      }

    }
  }


  async initProperties(uuids: string[]): Promise<any> {
    return Promise.all(uuids.map(nodeId => this.archivesPresidenceService.getDocumentProperties(nodeId))).then((resp: any) => {
      this.inputs = resp[0].documentProperties;
      this.document = resp[0].document;
      this.init();
    });
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.route.params.subscribe(params => {
      this.uuid = params.nodeId.split(',')[0];
      this.initProperties(params.nodeId.split(','));
    });
  }
  ngOnDestroy() {
    this.inputs = {};
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.uploadForm.reset();
  }
}
