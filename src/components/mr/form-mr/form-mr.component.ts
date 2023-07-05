import { ValueLabelItem } from './../../../app/modules/shared/shared-components/autocomplete/autocomplete.component';
import {TABS} from 'consts/home-tabs';
import {finalize, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {SnackbarService} from 'services/snackbar.service';
import {DateAdapter} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {UtilsService} from 'services/utils.service';
import {UserService} from 'services/user.service';
import {CLASSEMENT, MrClassement} from 'models/mr';
import moment from 'moment-es6';
import {cloneDeep} from 'lodash';
import paginate from 'jw-paginate';
import {ExpertiseService} from 'services/expertise.service';
import {CustomerExpertise} from '../../../models/customer-expertise';
import {SearchDossierExpertiseService} from 'services/search-dossier-expertise.service';
import {Observable, Subject} from 'rxjs';
import {FilesList} from '../../../models/file-properties-expertise';

@Component({
  selector: 'app-form-mr',
  templateUrl: './form-mr.component.html',
  styleUrls: ['./form-mr.component.scss']
})
export class FormMrComponent implements OnInit, OnChanges, OnDestroy {
  files: string[] = undefined;
  fileList: Array<File>;
  filePreviewList: Array<File>;
  extensions = undefined;
  showSend = false;
  showForm = false;
  showFiles = true;
  showMetadataOptions = true;

  sameMetadata = true;
  sameCustomer = false;
  metadata = [];
  metadataCustomer = {};
  data = {};

  // Pagination formulaire
  initialPage = 1;
  pageSize = 1;
  maxPages = 10;
  pager: any = {};
  pageOfItems: any[];

  matriculeUser = this.userService.currentUser.matricule;
  codeBudgetUser = this.userService.selectedCodeBudget;
  minDate: Date;
  uploadForm: UntypedFormGroup;
  customerForm: UntypedFormGroup;
  showDirectory = true;
  showCustomerForm = false;
  showSelectedCustomer = false;
  numeroDossier: string;

  classements = {
    documentType: cloneDeep(CLASSEMENT)
      .filter(el => !el.noUpload)
      .sort((a, b) => a.labelSousFamille.localeCompare(b.labelSousFamille, 'fr', {ignorePunctuation: true}))
  };
  customerSearchPending = false;
  inputs = [];
  noPluralforSinglDoc: boolean;
  categorieList = Object.values(TABS).map(tab => tab.name);
  classementList = this.classements.documentType.map(docType => docType.labelFamille);
  documentTypeList: ValueLabelItem[] = this.classements.documentType.map(docType => this.documentTypeMapper(docType));
  dossierList: CustomerExpertise[] = [];
  private destroy$ = new Subject();
  private document: MrClassement;

  private initialUploadFormValues: any;


  constructor(
    private utils: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private snack: SnackbarService,
    private userService: UserService,
    private _adapter: DateAdapter<any>,
    private expertiseService: ExpertiseService,
    private searchDossierService: SearchDossierExpertiseService,
  ) {
    this.minDate = this.utils.getMinDate();
    this.customerForm = this.formBuilder.group({
      numeroDossier: ['', Validators.required],
      nomDossier: [''],
      codeBudget: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.extensions = this.expertiseService.getExtensions();
    this.uploadForm = this.expertiseService.initializeForm();
    this.initialUploadFormValues = { ...this.uploadForm.value };
    if (this.pager.currentPage > 1 && this.sameCustomer) {
      this.showDirectory = false;
    }
    this.uploadForm.get('categorie').valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.categorieHandler(newValue);
    });
    this.uploadForm.get('classement').valueChanges.pipe(
      startWith(''),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.classementHandler(newValue);
    });
    this.uploadForm.get('documentType').valueChanges.pipe(
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

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (changes.hasOwnProperty(property)) {
        const change = changes[property];
        if (property === 'metadataCustomer') {
          if (change.currentValue['numeroDossier']) {
            this.numeroDossier = this.metadataCustomer['numeroDossier'];
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  categorieHandler(newValue: string) {
    if (!newValue) {
      this.uploadForm.get('classement').setValue('', {emitEvent: false});
      this.uploadForm.get('documentType').setValue('', {emitEvent: false});
      this.categorieList = Object.values(TABS).map(tab => tab.name);
      this.classementList = [...new Set([...this.classements.documentType].map(docType => docType.labelFamille))];
      this.documentTypeList = [...new Set([...this.classements.documentType].map(docType => this.documentTypeMapper(docType)))];
    } else {
      this.classementList = [...new Set([...this.classements.documentType]
        .filter(docType => docType.onglet === newValue)
        .map(docType => docType.labelFamille))];
      if(this.uploadForm.get('classement').value){
        this.documentTypeList = this.classements.documentType
          .filter(docType => docType.onglet === newValue && docType.onglet === this.uploadForm.get('classement').value)
          .map(docType => this.documentTypeMapper(docType));
      } else {
        this.documentTypeList = this.classements.documentType
          .filter(docType => docType.onglet === newValue)
          .map(docType => this.documentTypeMapper(docType));
      }
      if (this.classementList.length === 1) {
        this.uploadForm.get('classement').setValue(this.classementList[0]);
      }
    }
  }

  classementHandler(newValue: string) {
    if (newValue) {
      this.documentTypeList = this.classements.documentType
        .filter(value => value.labelFamille === newValue)
        .map(docType => this.documentTypeMapper(docType));
      if (this.documentTypeList.length === 1) {
        this.uploadForm.get('documentType').setValue(this.documentTypeList[0]);
      }
      if (!this.uploadForm.get('categorie').value) {
        this.categorieList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === newValue)
          .map(docType => docType.onglet))];
        this.uploadForm.get('categorie').setValue(this.categorieList[0], {emitEvent: false});
      }
    } else {
      if (this.uploadForm.get('categorie').value) {
        this.classementList = [...new Set([...this.classements.documentType]
          .filter(classement => classement.onglet === this.uploadForm.get('categorie').value)
          .map(docType => docType.labelFamille))];
        this.documentTypeList = this.classements.documentType
          .filter(docType => docType.onglet === this.uploadForm.get('categorie').value)
          .map(docType => this.documentTypeMapper(docType));
      } else {
        this.classementList = [...new Set([...this.classements.documentType].map(docType => docType.labelFamille))];
      }
      this.uploadForm.get('documentType').setValue('', { emitEvent: false });
    }
  }

  documentTypeHandler(newValue: string) {
    this.clearValidators();
    if (newValue) {
      if (!this.uploadForm.get('classement').value) {
        this.classementList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelSousFamille === newValue)
          .map(docType => docType.labelFamille))];
        this.uploadForm.get('classement').setValue(this.classementList[0], {emitEvent: false});
      }
      if (!this.uploadForm.get('categorie').value) {
        this.categorieList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === this.uploadForm.get('classement').value)
          .map(docType => docType.onglet))];
        this.uploadForm.get('categorie').setValue(this.categorieList[0], {emitEvent: false});
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
      if (this.uploadForm.get('classement').value) {
        this.documentTypeList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.labelFamille === this.uploadForm.get('classement').value)
          .map(docType => this.documentTypeMapper(docType)))];
      } else if(!this.uploadForm.get('classement').value && this.uploadForm.get('categorie').value) {
        this.documentTypeList = [...new Set([...this.classements.documentType]
          .filter(docType => docType.onglet === this.uploadForm.get('categorie').value)
          .map(docType => this.documentTypeMapper(docType)))];
      } else {
        this.documentTypeList = [...new Set([...this.classements.documentType].map(docType => this.documentTypeMapper(docType)))];
      }
      this.selectInputs(this.document);
    }
  }


  format(value: string) {
    return value.replace(/\'|\ |\-/ig, '');
  }

  filesLoaded(value: FilesList) {
    // Array<File>
    this.fileList = value.files;
    // Checkbox : tous les documents ont les mêmes métadonnées
    this.sameMetadata = (typeof value.sameMetadata === 'undefined') ? true : value.sameMetadata;
    this.noPluralforSinglDoc = (this.fileList.length === 1);

    if (this.sameMetadata) {
      this.filePreviewList = value.files;
    } else {
      this.filePreviewList = [value.files[0]];
    }

    // Checkbox : tous les documents ont les même métadonnées client uniquement
    this.sameCustomer = (typeof value.sameCustomer === 'undefined') ? true : value.sameCustomer;
    // Crée string[] des nom des documents -> renseigner les métadonnées en fonction du document asscocié
    this.files = this.sameMetadata ? [this.fileList.map(el => el.name).join(', ')] : this.fileList.map(el => el.name);
    // Initialise la pagination, cache le champ input file, affiche le composant formulaire
    if (this.files && this.files.length) {
      this.setPage(this.initialPage);
      this.showFiles = false;
      this.showForm = true;
      this.data = {};
      this.metadata = [];
      this.metadataCustomer = [];
    }
  }

  // Annuler la saisie du formulaire et retourner au chargement de document
  goToFiles() {
    this.showForm = false;
    this.showFiles = true;
  }

  // Aller au document suivant / sauvegarder les métadonnées renseignées dans le formulaire
  paginate(data) {
    if (this.pager.currentPage < this.pager.totalItems) {
      if (this.pager.currentPage === 1 && this.sameCustomer && data.hasOwnProperty('customer')) {
        this.metadataCustomer = data.customer;
      }

      if (!this.sameMetadata) {
        this.filePreviewList = [this.fileList[this.pager.currentPage]];
      }

      this.metadata.push(data.form);
      this.setPage(this.pager.currentPage + 1);
    }
  }

  send(data) {
    this.showForm = false;
    this.showFiles = false;
    this.showSend = true;
    this.metadata.push(data.form);
    if (this.pager.currentPage === 1 && this.sameCustomer && data.hasOwnProperty('customer')) {
      this.metadataCustomer = data.customer;
    }
    if (this.sameCustomer) {
      const same = Array(this.fileList.length).fill(Object.assign(data.form, this.metadataCustomer));
      const different = this.metadata.map(el => Object.assign(el, this.metadataCustomer));

      this.data = this.sameMetadata ?
        {fileList: this.fileList, form: same} :
        {fileList: this.fileList, form: different};

    } else {
      this.data = this.sameMetadata ?
        {fileList: this.fileList, form: Array(this.fileList.length).fill(data.form)} :
        {fileList: this.fileList, form: this.metadata};
    }
  }

  resetPage() {
    this.showFiles = true;
    this.showForm = false;
    this.showSend = false;
    this.files = undefined;
    this.fileList = [];
    this.filePreviewList = [];
    this.sameMetadata = undefined;
    this.sameCustomer = undefined;
    this.data = {};
    this.metadata = [];
    this.metadataCustomer = {};
    this.sameMetadata = true;
    this.sameCustomer = false;
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.files.length, page, this.pageSize, this.maxPages);
    // get new page of items from items array
    this.pageOfItems = this.files.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  // Mat-datepicker year
  setYear(input, selectedDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const index = this.inputs.findIndex(el => el.name === input);
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(11);
    ctrlValue.date(31);
    this.uploadForm.controls[input].setValue(ctrlValue);
    this.inputs[index]['typedDate'] = selectedDate.format('YYYY');
    datepicker.close();
  }

  setMonth(input, selectedDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const index = this.inputs.findIndex(el => el.name === input);
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    selectedDate.endOf('month');
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(selectedDate.month());
    ctrlValue.date(selectedDate.date());
    this.uploadForm.controls[input].setValue(ctrlValue);
    this.inputs[index]['typedDate'] = selectedDate.format('MM/YYYY');
    datepicker.close();
  }

  selectInputs(data: MrClassement) {
    if (data) {
      this.uploadForm.patchValue({
        famille: data.famille,
        sousFamille: data.sousFamille
      });
      this.inputs = data.listeMetadatas;
    }
    this.inputs.forEach(element => {
      const input = element.name;
      const control = element.obligatoire ?
        new UntypedFormControl(input, Validators.required) :
        new UntypedFormControl(input);
      this.uploadForm.addControl(input, control);
    });
    this.matchMetadataToInput(this.inputs);
  }

  selectedEmployee(data, input) {
    this.uploadForm.controls[input.name].setValue(data);
  }

  matchMetadataToInput(inputs) {
    inputs.forEach(element => {
      const input = element.name;
      element.obligatoire ?
        this.uploadForm.controls[input].setValidators([Validators.required]) :
        this.uploadForm.controls[input].clearValidators();
    });
    this.inputs = inputs;
  }

  addCustomer(customer: CustomerExpertise) {
    this.showDirectory = false;
    if (customer) {
      this.showSelectedCustomer = true;
      this.numeroDossier = customer.numeroDossier;
      this.customerForm.patchValue({
        numeroDossier: customer.numeroDossier,
        nomDossier: customer.nomDossier,
        codeBudget: customer.codeBudget
      });
    } else {
      this.showCustomerForm = true;
      this.customerForm.patchValue({codeBudget: this.codeBudgetUser});
    }
  }

  saveMetadataFromInput(event: PointerEvent, resetCustomer?: boolean) {
    event.preventDefault();
    this.uploadForm.patchValue({matriculeCollab: this.matriculeUser});
    // Même métadonnées client
    if (this.sameCustomer) {
      if (this.pager.currentPage === 1) {
        if (this.uploadForm.valid) {
          if (this.customerForm.valid) {
            // Un seul doc -> envoi, sinon pagination
            // envoi du formulaire client dans un objet séparé pour le sauvegarder comme client unique
            this.pager.currentPage < this.pager.totalItems ?
              this.paginate({form: this.uploadForm.value, customer: this.customerForm.value}) :
              this.send({form: this.uploadForm.value, customer: this.customerForm.value});
            this.reset();
          } else if (this.customerForm.invalid) {
            this.snack.openWarn('Les informations concernant le dossier sont incomplètes ou invalides.');
          }
        } else {
          if (this.uploadForm.invalid) {
            this.snack.openWarn('Les informations du document sont incomplètes ou invalides.');
          }

        }
      } else {
        if (this.uploadForm.valid) {
          // envoi du formulaire document (métadonnées client déjà enregistrées à la page 1)
          this.pager.currentPage < this.pager.totalItems ?
            this.paginate({form: {...this.uploadForm.value}}) :
            this.send({form: {...this.uploadForm.value}});
          this.reset();
        } else {
          this.snack.openWarn('Les informations saisies sont incomplètes ou invalides');
        }
      }
      // Métadonnées client différentes
    } else {
      if (this.uploadForm.valid && this.customerForm.valid) {
        // Si nb de documents > 1, paginer, else envoyer
        if (this.pager.currentPage < this.pager.totalItems) {
          this.paginate({form: {...this.uploadForm.value, ...this.customerForm.value}});
        } else {
          this.send({form: {...this.uploadForm.value, ...this.customerForm.value}});
        }
        this.reset();
        this.destroySelectedCustomer();
      } else {
        this.snack.openWarn('Les informations saisies sont incomplètes ou invalides');
      }
    }

    if (resetCustomer) {
      this.destroySelectedCustomer();
    }
  }

  destroySelectedCustomer() {
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.customerForm.reset();
  }

  goBack(event?: PointerEvent) {
    event?.preventDefault();
    this.reset();
    if (this.customerForm) {
      this.destroySelectedCustomer();
    }
    this.showCustomerForm = false;
    this.goToFiles();
  }

  reset(): void {
    this.clearValidators();

    this.uploadForm.reset(this.initialUploadFormValues);
    this.inputs = [];
  }

  private clearValidators(): void {
    this.utils.clearValidators(this.initialUploadFormValues, this.uploadForm, ['documentType']);
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

    this.utils.clearFormFields(fieldsToExclude, this.uploadForm);
  }

  private getFullCustomerList(codeBudget: string): Observable<CustomerExpertise[]> {
    this.customerSearchPending = true;
    return this.searchDossierService.getCustomers(codeBudget).pipe(
      tap((res) => this.dossierList = res),
      finalize(() => this.customerSearchPending = false)
    );
  }

  private documentTypeMapper(docType: any): ValueLabelItem {
    return {
      label: docType.labelSousFamille,
      value: docType.labelSousFamille,
      icon: docType.displayClient ? 'visibility' : 'visibility_off'
    };
  }
}
