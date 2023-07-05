import { UpdateDocumentService } from 'services/update-document.service';
import {ContextSearchMrService} from 'services/context-search-mr.service';
import {catchError, finalize, map, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {EMPTY, forkJoin, Observable, of, Subject} from 'rxjs';
import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {DateAdapter} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {CLASSEMENT, MANDATORY_METADATAS, MrClassement} from 'models/mr';
import {ExpertiseService} from 'services/expertise.service';
import {SnackbarService} from 'services/snackbar.service';
import {UpdateResultsService} from 'services/update-results.service';
import {UserService} from 'services/user.service';
import {UtilsService} from 'services/utils.service';
import {CustomerExpertise} from '../../../models/customer-expertise';
import {CustomerDocumentProperties} from '../../../models/customer-document-properties';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {SearchDossierExpertiseService} from 'services/search-dossier-expertise.service';
import {TABS} from 'consts/home-tabs';
import * as Sentry from "@sentry/angular-ivy";

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-update-mr',
  templateUrl: './update-mr.component.html',
  styleUrls: ['./update-mr.component.scss']
})
export class UpdateMrComponent implements OnInit, OnDestroy {
  uuids: string[] = [];
  documents: any = [];
  minDate: Date;
  matriculeUser = this.userService.currentUser.matricule;
  codeBudgetUser = this.userService.selectedCodeBudget;
  classements = {
    documentType: CLASSEMENT
      .filter(el => !el.noUpload)
      .sort((a, b) =>
        a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true})),
    mandatoryMetadata: MANDATORY_METADATAS
  };
  customerSearchPending = false;
  isLoadingDocument = false;
  updateCustomer: UntypedFormGroup;
  updateDocumentForm: UntypedFormGroup;
  inputs: Array<any> = [];
  updateLaunched = false;
  updatePending = false;
  successList = [];
  failList = [];
  updateFailed = false;
  updateSuccess = false;
  showDirectory = true;
  showSelectedCustomer = false;
  showCustomerForm = false;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  initialDocumentValue = {};
  initialCustomerValue = {};
  private destroy$ = new Subject();
  private familleList: { famille: string, sousFamille: string }[];
  private dossierList: CustomerExpertise[] = [];
  private categorieList = Object.values(TABS).map(tab => tab.name);
  private classementList = [...new Set([...this.classements.documentType].map(docTyp => docTyp.labelFamille))];
  private documentTypeList = [...new Set([...this.classements.documentType].map(docType => docType.labelSousFamille))];
  private document: MrClassement;
  private initDocumentType: string;
  private documentToBeUpdated: MrClassement[];
  private documentMetadatas;
  disabled: boolean;

  private initialUploadFormValues: any;

  constructor(
    private router: Router,
    private utils: UtilsService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private updateService: UpdateResultsService,
    public contextSearchMrService: ContextSearchMrService,
    private formBuilder: UntypedFormBuilder,
    private expertiseService: ExpertiseService,
    private _adapter: DateAdapter<any>,
    private userService: UserService,
    private searchDossierService: SearchDossierExpertiseService,
    private updateDocumentService: UpdateDocumentService
  ) {
    this.minDate = this.utils.getMinDate();
    this.updateCustomer = this.formBuilder.group({
      numeroDossier: ['', Validators.required],
      nomDossier: [''],
      codeBudget: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.updateDocumentForm = this.expertiseService.initializeForm();
    this.initialUploadFormValues = {...this.updateDocumentForm.value};
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');
      if (this.uuids.length > 0) {
        this.initializePropertiesDocument(this.uuids);
      }
    });

    this.updateDocumentForm.get('categorie').valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.categorieHandler(newValue);
    });

    this.updateDocumentForm.get('classement').valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.classementHandler(newValue);
    });
    this.updateDocumentForm.get('documentType').valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.documentTypeHandler(newValue);
    });


    this.userService.selectedCodeBudgetRef
      .pipe(switchMap(codeBudget => this.getFullCustomerList(codeBudget)),
        takeUntil(this.destroy$))
      .subscribe(() => this.destroySelectedCustomer());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  categorieHandler(newValue: string) {
    if (!newValue) {
      this.updateDocumentForm.get('classement').setValue('', {emitEvent: false});
      this.updateDocumentForm.get('documentType').setValue('');
      this.categorieList = Object.values(TABS).map(tab => tab.name);
      this.classementList = [...new Set([...this.classements.documentType].map(docType => docType.labelFamille))];
      this.documentTypeList = [...new Set([...this.classements.documentType].map(docType => docType.labelSousFamille))];
    } else {
      this.classementList = [...new Set([...this.classements.documentType]
        .filter(docType => docType.onglet === newValue)
        .map(docType => docType.labelFamille))];
      if(this.updateDocumentForm.get('classement').value){
        this.documentTypeList = [...new Set(this.classements.documentType
          .filter(docType => docType.onglet === newValue && docType.onglet === this.updateDocumentForm.get('classement').value)
          .map(docType => docType.labelSousFamille))];
      } else {
        this.documentTypeList = [...new Set(this.classements.documentType
          .filter(docType => docType.onglet === newValue)
          .map(docType => docType.labelSousFamille))];
      }
      if (this.classementList.length === 1) {
        this.updateDocumentForm.get('classement').setValue(this.classementList[0]);
      }
    }
  }

  classementHandler(newValue: string) {
    if (newValue) {
      this.documentTypeList = [...new Set([...this.classements.documentType]
        .filter(value => value.labelFamille === newValue)
        .map(docType => docType.labelSousFamille))];
      if (this.documentTypeList.length === 1) {
        this.updateDocumentForm.get('documentType').setValue(this.documentTypeList[0]);
      }
      if (!this.updateDocumentForm.get('categorie').value) {
        this.categorieList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === newValue)
          .map(docType => docType.onglet))];
        this.updateDocumentForm.get('categorie').setValue(this.categorieList[0], {emitEvent: false});
      }
    } else {
      this.updateDocumentForm.get('documentType').setValue('', {emitEvent: false});
      if (this.updateDocumentForm.get('categorie').value) {
        this.classementList = [...new Set([...this.classements.documentType]
          .filter(classement => classement.onglet === this.updateDocumentForm.get('categorie').value)
          .map(docType => docType.labelFamille))];
        this.documentTypeList = [...new Set(this.classements.documentType
          .filter(docType => docType.onglet === this.updateDocumentForm.get('categorie').value)
          .map(docType => docType.labelSousFamille))];
      } else {
        this.classementList = [...new Set([...this.classements.documentType].map(docType => docType.labelFamille))];
      }
    }
  }

  documentTypeHandler(newValue: string) {
    this.utils.clearValidators(this.initialUploadFormValues, this.updateDocumentForm, ['documentType']);

    if (newValue) {
      if (!this.updateDocumentForm.get('classement').value) {
        this.classementList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelSousFamille === newValue)
          .map(docType => docType.labelFamille))];
        this.updateDocumentForm.get('classement').setValue(this.classementList[0], {emitEvent: false});
      }
      if (!this.updateDocumentForm.get('categorie').value) {
        this.categorieList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === this.updateDocumentForm.get('classement').value)
          .map(docType => docType.onglet))];
        this.updateDocumentForm.get('categorie').setValue(this.categorieList[0], {emitEvent: false});
      }
      this.document = [...this.classements.documentType]
        .filter(value => value.labelSousFamille === newValue)[0];
      this.selectInputs(this.document);
      this.clearUnrelatedFields();
    } else {
      this.document = {
        displayClient: false,
        famille: '',
        fpNommageCalc: '',
        labelFamille: '',
        labelSousFamille: '',
        listeMetadatas: [],
        onglet: '',
        sousFamille: ''
      };
      if (this.updateDocumentForm.get('classement').value) {
        this.documentTypeList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === this.updateDocumentForm.get('classement').value)
          .map(docType => docType.labelSousFamille))];
      } else if(!this.updateDocumentForm.get('classement').value && this.updateDocumentForm.get('categorie').value) {
        this.documentTypeList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.onglet === this.updateDocumentForm.get('categorie').value)
          .map(docType => docType.labelSousFamille))];
      } else {
        this.documentTypeList = [...new Set([...this.classements.documentType].map(docType => docType.labelSousFamille))];
      }
      this.selectInputs(this.document);
    }
  }

  destroySelectedCustomer() {
    this.showDirectory = true;
    this.showSelectedCustomer = false;
  }

  onFocus(value: number) {
    this.autoComplete['_results'][value].openPanel();
  }

  close(refreshList?: boolean): void {
    if (refreshList) {
      this.updateService.refreshDocumentList.next(this.updateService.baseSearchTabId);
    }
    this.router.navigate([{outlets: {view: null}}]);
  }

  setYear(input: string, selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    const index = this.inputs.findIndex(el => el.name === input);
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(11);
    ctrlValue.date(31);
    this.updateDocumentForm.controls[input].setValue(ctrlValue);
    this.inputs[index]['typedDate'] = selectedDate.format('YYYY');
    datepicker.close();
  }

  setMonth(input: string, selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    const index = this.inputs.findIndex(el => el.name === input);
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    selectedDate.endOf('month');
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(selectedDate.month());
    ctrlValue.day(selectedDate.date());
    this.updateDocumentForm.controls[input].setValue(ctrlValue);
    this.inputs[index]['typedDate'] = selectedDate.format('MM/YYYY');
    datepicker.close();
  }

  selectedEmployee(data, input) {
    this.updateDocumentForm.controls[input.name].setValue(data);
  }

  setCustomer(customer: CustomerExpertise) {
    if (customer) {
      this.showDirectory = false;
      this.showSelectedCustomer = true;
      this.updateCustomer.patchValue({
        numeroDossier: customer.numeroDossier,
        nomDossier: customer.nomDossier,
        codeBudget: customer.codeBudget
      });
    } else {
      this.destroyCustomer();
      this.showCustomerForm = true;
      this.showDirectory = false;
      this.updateCustomer.patchValue({codeBudget: this.codeBudgetUser});
    }
  }

  destroyCustomer() {
    this.updateCustomer.reset();
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.showCustomerForm = false;
  }

  selectInputs(data) {
    const oldValues = this.updateDocumentForm.value;
    this.updateDocumentForm.patchValue({
      famille: data.famille,
      sousFamille: data.sousFamille
    });
    this.inputs = this.expertiseService.toFormGroup(data.listeMetadatas);
    this.inputs.forEach(element => {
      const input = element.name;
      const value = oldValues[input] != null ? oldValues[input] : '';
      const control = element.obligatoire ?
        new UntypedFormControl(value, Validators.required) :
        new UntypedFormControl(value);
      this.updateDocumentForm.addControl(input, control);
    });
    this.matchMetadataToInput(this.inputs);
  }

  matchMetadataToInput(inputs) {
    inputs.forEach(element => {
      const input = element.name;
      element.obligatoire ?
        this.updateDocumentForm.controls[input].setValidators([Validators.required]) :
        this.updateDocumentForm.controls[input].clearValidators();
    });
    this.inputs = inputs;
  }

  reset(): void {
    this.updateDocumentForm.reset(this.initialUploadFormValues);
    this.inputs = [];
  }

  clearInput() {
    this.updateDocumentForm.patchValue({documentType: ''}, {emitEvent: false});
  }

  send() {
    if (
      this.utils.isEqual(this.updateDocumentForm.value, this.initialDocumentValue) &&
      this.utils.isEqual(this.updateCustomer.value, this.initialCustomerValue)
    ) {
      this.snack.openInfo(
        `Aucune modification identifiée.
        Merci de cliquer sur le bouton "Annuler" si vous ne souhaitez pas apporter de modification.`);
      return;
    }

    Object.keys(this.updateDocumentForm.controls).map(control => {
      if (!(this.inputs.map(x => x.name).concat(this.classements.mandatoryMetadata.map(x => x.name)))
        .includes(control) && control !== 'documentType') {
        this.updateDocumentForm.get(control).clearValidators();
        this.updateDocumentForm.removeControl(control);
      }
    });


    if (!this.updateDocumentForm.valid || !this.updateCustomer.valid) {
      this.snack.openInfo('Vous devez remplir les champs obligatoires pour envoyer votre fichier.');
      return;
    }

    this.updateLaunched = true;
    this.updatePending = true;

    forkJoin(this.documents.map((doc, index) => this.mapToUpdateRequest(doc, index)))
      .pipe(
        finalize(() => {
          this.updatePending = false;
          if (this.failList.length > 0) {
            this.updateFailed = true;
          } else {
            this.updateSuccess = true;
          }
        })
      )
      .subscribe();
  }

  private mapToUpdateRequest(doc: any, index: any): Observable<any> {
    let formValues = {
      ...this.updateCustomer.value,
      matriculeCollab: this.matriculeUser
    };

    if (this.uuids.length === 1) {
      formValues = {
        ...this.updateDocumentForm.value,
        ...formValues
      };
    }

    const { id, title } = doc;
    if (!!this.familleList) {
      const { famille, sousFamille } = this.familleList[index];
      formValues = { ...formValues, famille, sousFamille };
    }
    const documentProperties = this.expertiseService.generateDocumentProperties(formValues, title);
    return this.updateDocumentService.update(id, documentProperties)
      .pipe(
        catchError(
          error => {
            const erreur = this.utils.isJSON(error.message) ? JSON.parse(error.message).label : error.message;
            this.failList.push({ title: title, error: erreur });
            return EMPTY;
          }
        ),
        tap(res => {
          this.successList.push(title);
          Sentry.captureMessage(`document updated: ${id}`, 'log');
        }));
  }

  private initializePropertiesDocument(uuids: Array<string>): void {
    this.isLoadingDocument = true;
    forkJoin(uuids.map(nodeId => this.expertiseService.getPropertiesFormDocument(nodeId)))
      .pipe(
        switchMap(resp => this.handleCustomer(resp)),
        finalize(() => this.isLoadingDocument = false)
      )
      .subscribe((resp: Array<CustomerDocumentProperties>) => {
        this.handleDocument(resp);
      });
  }

  private handleDocument(resp: CustomerDocumentProperties[]): void {
    const {documentProperties} = resp[0];
    this.initDocumentType = [...this.classements.documentType]
      .filter(value => value.sousFamille === documentProperties['fiducial:domainContainerSousFamille']).map(x => x.labelSousFamille)[0];
    if (this.documents[0]['fiducial:domainContainerSousFamille'] !== 'Upload_Portail') {
      this.documentToBeUpdated = [...this.classements.documentType]
        .filter(value => value.sousFamille === this.documents[0]['fiducial:domainContainerSousFamille']);
      this.documentMetadatas = [...this.classements.documentType].filter(doc => this.documentToBeUpdated[0].sousFamille === doc.sousFamille)
        .map(v => v.listeMetadatas)[0];
      this.inputs = this.expertiseService.toFormGroup(this.documentMetadatas);
      for (const key in this.documentMetadatas) {
        if (Object.prototype.hasOwnProperty.call(this.documentMetadatas, key)) {
          const metadata = this.documentMetadatas[key].metadata;
          const name = this.documentMetadatas[key].name;
          this.updateDocumentForm.get(name).setValue(documentProperties[`${metadata}`], { emitEvent: false });
          this.updateDocumentForm.addControl(
            metadata.name,
            new UntypedFormControl(this.documentMetadatas[metadata.metadata] ?? '', metadata.obligatoire ? Validators.required : null)
          );
        }
      }

      const index = this.inputs.findIndex(el => el.name === 'anneeDeclaration');
      if (index >= 0) {
        const anneeDeclaration = this.updateDocumentForm.get('anneeDeclaration').value;
        this.inputs[index]['typedDate'] = moment(anneeDeclaration).format('YYYY');
      }
      const nomSalarie = this.updateDocumentForm.get('nom');
      if (nomSalarie) {
        const nomInput = this.inputs.find(el => el.name === 'nom');
        if (nomInput) {
          nomInput.value = nomSalarie.value;
        }
      }

      this.initialDocumentValue = this.updateDocumentForm.value;
    }
    if (documentProperties !== 'NXT') {
      this.updateDocumentForm.get('documentType').setValue(this.initDocumentType, { emitEvent: false });
      const classement = this.classements.documentType
        .find(docType => docType.labelSousFamille === this.initDocumentType).labelFamille;
      this.updateDocumentForm.get('classement').setValue(classement, {emitEvent: false});
      const categorie = this.classements.documentType
        .find(docType => docType.labelFamille === classement).onglet;
      this.updateDocumentForm.get('categorie').setValue(categorie, {emitEvent: false});
    }

    const metadata = resp.map(el => el.documentProperties);
    if (metadata?.length) {
      this.familleList = metadata.map(m => {
        return {
          famille: m['fiducial:domainContainerFamille'],
          sousFamille: m['fiducial:domainContainerSousFamille']
        };
      });
    } else {
      this.familleList = null;
    }
  }


  private handleCustomer(resp: CustomerDocumentProperties[]): Observable<Array<CustomerDocumentProperties>> {
    const customerList = resp.map(el => el.customerProperties);
    const firstCustomer = customerList[0];
    this.documents = resp.map(el => {
      return {...el.documentProperties, ...el.document}
    });

    if (customerList?.length === 1 || customerList.every(c => this.utils.isEqual(c, firstCustomer))) {
      return this.expertiseService.fetchCustomerName(firstCustomer.numeroDossier)
        .pipe(
          tap(infoCustomer => {
            this.updateCustomer.patchValue({
              nomDossier: infoCustomer[0]?.nomDossier ?? '',
              numeroDossier: firstCustomer.numeroDossier,
              codeBudget: firstCustomer.codeBudget
            });
            this.initialCustomerValue = this.updateCustomer.value;
            this.showSelectedCustomer = true;
            this.showDirectory = false;
            this.showCustomerForm = false;
          }),
          map(() => resp)
        );
    }

    return of(resp);
  }

  private getFullCustomerList(codeBudget: string): Observable<CustomerExpertise[]> {
    this.customerSearchPending = true;
    return this.searchDossierService.getCustomers(codeBudget).pipe(
      tap((res) => this.dossierList = res),
      finalize(() => this.customerSearchPending = false)
    );
  }

  private clearUnrelatedFields() {
    const fieldsToExclude = [
      ...this.inputs.map(i => i.name),
      'matriculeCollab',
      'documentType',
      'famille',
      'sousFamille',
      'classement',
      'categorie'
    ];

    this.utils.clearFormFields(fieldsToExclude, this.updateDocumentForm);
  }
}
