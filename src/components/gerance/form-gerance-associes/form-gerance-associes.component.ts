import { takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import {Component, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import {SnackbarService} from 'services/snackbar.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {DateAdapter} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {UtilsService} from 'services/utils.service';
import {UserService} from 'services/user.service';
import {CLASSEMENT_GERANCEASSOCIES, COMMON_GERANCEASSOCIES} from 'models/gerance-associes';
import {CLASSEMENT_GERANCEPARTENAIRES, COMMON_GERANCEPARTENAIRES} from 'models/gerance-partenaires';
import moment from 'moment-es6';
import paginate from 'jw-paginate';
import {GeranceAssociesService} from 'services/gerance-associes.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from 'services/group.service';
import {GroupsEnums} from 'enums/groups.enums';
import { Subject } from 'rxjs';
import { Produit } from 'models/produit';

interface Form {
  domainContainerApplication: string,
  domainContainerFamille: string,
  domainContainerSociete: string,
  domainContainerSousFamille: string,
  domainContainerBranche: string,
  nommage: string,
  sousDossier: string,
  matriculeCollab: string,
  codeClient: string,
  codeBudget: string,
  documentType: string,
  dateDocument: string,
  dateValidite: string,
  categorieProduit: string,
  produit: string,
  numeroAssocie: string,
  nomAssocie: string,
  codeManager: string,
  nomManager: string,
  codeAgent: string,
  nomAgent: string,
  contact: string,
  description: string,
  author: string,
  atraiter: string,
  typeDossierAssocie: string,
  attributionCollaborateurAssocie: string,
  statutDocumentAssocie: string,
}


@Component({
  selector: 'app-form-gerance-associes',
  templateUrl: './form-gerance-associes.component.html',
  styleUrls: ['./form-gerance-associes.component.scss'],
  providers: [DatePipe]
})
export class FormGeranceAssociesComponent implements OnInit, OnChanges {

  files: string[] = undefined;
  fileList: Array<File>;
  filePreviewList: Array<File>;
  extensions = undefined;
  showSend = false;
  showForm = false;
  showFiles = true;

  sameMetadata = true;
  sameCustomer = false;
  metadata = [];
  metadataCustomer = {};
  data = {};
  @ViewChild('categorie') categorieProduitInput: ElementRef<HTMLInputElement>;
  @ViewChild('nomProduit') produitInput: ElementRef<HTMLInputElement>;
  @ViewChild('partenaireCheckbox') partenaireCheckbox: ElementRef;
  @ViewChild('associeCheckbox') associeCheckbox: ElementRef;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  @ViewChild('documentTypeInput') documentTypeInput: ElementRef;
  // Pagination formulaire
  readonly initialPage = 1;
  readonly pageSize = 1;
  readonly maxPages = 10;
  pager: any = {};
  pageOfItems: any[];
  readonly geranceSousFamilles = [
    'gerance_assoc_checklist_souscription',
    'gerance_assoc_bulletin_retrait',
    'gerance_assoc_checklist_successions_donations'
  ];

  fullName: string;
  matriculeUser: string;
  codeBudgetUser: string;
  minDate: Date = new Date('1970-01-01T00:00:00.000');
  uploadForm: UntypedFormGroup;
  customerForm: UntypedFormGroup;
  showDirectory = true;
  showCustomerForm = false;
  showSelectedCustomer = false;
  numeroAssocie: string;
  inputValidators = {
    typeDocument: false,
    dateDocument: false,
    dateValidite: false
  };
  classements = {
    associes: cloneDeep(CLASSEMENT_GERANCEASSOCIES)
      .filter(el => !el.sousFamille.includes('gerance_assoc_reprise'))
      .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille)),
    partenaires: cloneDeep(CLASSEMENT_GERANCEPARTENAIRES)
      .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille)),
    categorieProduit: [],
    produit: []
  };
  filteredDocumentType = this.classements.associes;
  filteredProduit = this.classements.produit;
  filteredCategorieProduit = this.classements.categorieProduit;
  filteredListProduit: any;
  inputs = [];
  inputVisibility = {
    dateDocument: false,
    dateValidite: false,
    categorieProduit: false,
    produit: false,
    numeroAssocie: false,
    nomAssocie: false,
    codeManager: false,
    nomManager: false,
    codeAgent: false,
    nomAgent: false,
    codeClient: false,
    contact: false,
    description: false
  };
  noPluralforSinglDoc: boolean;
  associe = true;
  partenaire = false;
  isUserGeranceAssociesAssociesBO: boolean;

  private ngUnsubscribe$ = new Subject();

  private fullProductList: Produit[] = [];
  productCategoryList: string[] = [];
  productList: string[] = [];

  private initialUploadFormValues: any;
  private initialCustomerFormValues: any;

  constructor(
    private utils: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private snack: SnackbarService,
    private userService: UserService,
    private _adapter: DateAdapter<any>,
    private geranceService: GeranceAssociesService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.geranceService
      .getFullProduitList()
      .subscribe((res) => {
        this.fullProductList = res;
        this.initProdListCat();
      });

    const {firstName, lastName, matricule} = this.userService.currentUser;
    this.fullName = !!lastName ? `${firstName} ${lastName}` : firstName;
    this.matriculeUser = matricule;
    this.buildUploadForm();
    this.buildCustomerForm();
  }

  selectInputs(data) {
    if (data) {
      this.inputs = data.listeMetadatas;
      this.inputs.forEach(element => {
        this.uploadForm.controls[element.name].setValidators(element.obligatoire ? [Validators.required] : null);
      });

      const { numeroAssocie, nomAssocie, codeBudget } = this.customerForm.value;
      this.uploadForm.patchValue({
        ...this.initialUploadFormValues,
        numeroAssocie,
        codeClient: numeroAssocie,
        nomAssocie: nomAssocie,
        codeBudget: codeBudget,
        documentType: data.labelSousFamille,
        domainContainerFamille: data.famille,
        domainContainerSousFamille: data.sousFamille,
        nommage: `${this.datePipe.transform(Date.now(), 'dd-MM-yyyy')} - ${data.sousFamille}`,
        typeDossierAssocie: this.geranceService.getTypeDossierAssocie(data.sousFamille, this.filteredDocumentType),
        //Even though it seems counter intuitive the oui is the correct value here
        atraiter: 'oui'
      })

      if (this.geranceSousFamilles.includes(data.sousFamille?.toLowerCase())) {
        this.uploadForm.patchValue({statutDocumentAssocie: 'Projet'});
      }
    }
  }

  private buildCustomerForm(): void {
    this.customerForm = this.formBuilder.group({
      numeroAssocie: ['', Validators.required],
      nomAssocie: [''],
      codeBudget: ['', Validators.required]
    });

    this.initialCustomerFormValues = this.customerForm.value;
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.classements.associes.forEach(doc =>
      Array.prototype.push.apply(doc.listeMetadatas, COMMON_GERANCEASSOCIES)
    );
    this.classements.partenaires.forEach(doc =>
      Array.prototype.push.apply(doc.listeMetadatas, COMMON_GERANCEPARTENAIRES)
    );
    this.extensions = this.geranceService.getExtensions();
    if (this.pager.currentPage > 1 && this.sameCustomer) {
      this.showDirectory = false;
    }
    this.isUserGeranceAssociesAssociesBO = this.groupService.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO);

    this.inputsSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (changes.hasOwnProperty(property)) {
        const change = changes[property];
        if (property === 'metadataCustomer') {
          if (change.currentValue['numeroAssocie']) {
            this.numeroAssocie = this.metadataCustomer['numeroAssocie'];
          }
        }
      }
    }
  }

  onFocus(event: MouseEvent, trigger: MatAutocompleteTrigger): void {
    event.preventDefault();
    trigger.openPanel();
  }

  // Est executée quand l'utilisateur a ajouté des documents valides au formulaire
  filesLoaded(value) {
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

  hide() {
    return Object.keys(this.inputVisibility)
      .forEach(v => this.inputVisibility[v] = false);
  }

  changeProfil(event: MatCheckboxChange, checkbox: string) {
    this.reset();

    if (event.checked && checkbox === 'associe') {
      this.partenaire = false;
      this.partenaireCheckbox['checked'] = false;
      this.filteredDocumentType = this.classements.associes;
    }
    if (!event.checked && checkbox === 'associe') {
      this.associe = false;
      this.associeCheckbox['checked'] = false;
      this.filteredDocumentType = this.classements.partenaires;
    }
    if (event.checked && checkbox === 'partenaire') {
      this.associe = false;
      this.associeCheckbox['checked'] = false;
      this.filteredDocumentType = this.classements.partenaires;
    }
    if (!event.checked && checkbox === 'partenaire') {
      this.partenaire = false;
      this.partenaireCheckbox['checked'] = false;
      this.filteredDocumentType = this.classements.associes;
    }

    // Reinitialisation missing controlFormValue
    const {firstName, lastName} = this.userService.currentUser;
    this.fullName = !!lastName ? `${firstName} ${lastName}` : firstName;
    this.filteredDocumentType = this.associe ? this.classements.associes : this.classements.partenaires;
    this.uploadForm.patchValue({
      author: this.fullName,
      matriculeCollab: this.matriculeUser,
      documentType: '',
      domainContainerFamille: '',
      domainContainerSousFamille: '',
    });
    this.uploadForm.controls['documentType'].setErrors({'incorrect': true});
    this.uploadForm.controls['documentType'].markAsDirty();
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

  send(data: { form: Form, customer?: any }) {
    this.showForm = false;
    this.showFiles = false;
    this.showSend = true;
    this.metadata.push(data.form);
    if (this.pager.currentPage === 1 && this.sameCustomer && data.hasOwnProperty('customer')) {
      this.metadataCustomer = data.customer;
    }
    if (this.sameCustomer) {
      const same = Array(this.fileList.length).fill({...this.metadataCustomer, ...data.form});
      const different = this.metadata.map(el => ({ ...this.metadataCustomer, ...el }));

      this.data = this.sameMetadata ?
        {fileList: this.fileList, form: same} :
        {fileList: this.fileList, form: different};
    } else {
      this.data = this.sameMetadata ?
        {fileList: this.fileList, form: Array(this.fileList.length).fill(data.form)} :
        {fileList: this.fileList, form: this.metadata};
    }
    this.destroySelectedCustomer();
    this.reset();
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

    this.uploadForm.reset(this.initialUploadFormValues, { emitEvent: false });
    this.customerForm.reset(this.initialCustomerFormValues, { emitEvent: false });
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

  // Filtrer type de document
  filterDocumentType(value) {
    if (value) {
      const classement = this.associe ? this.classements.associes : this.classements.partenaires;
      return this.filteredDocumentType = classement
        .filter(el => this.utils.containSearchTerm(el.labelSousFamille, value))
        .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille));
    } else {
      const classement = this.associe ? this.classements.associes : this.classements.partenaires;
      return this.filteredDocumentType = classement;
    }
  }

  // Affecte la value du type de document au clic sur la valeur du select
  selectDocType(value, trigger) {
    if (value) {
      const result = this.filterDocumentType(value);
      if (result.length !== 1) {
        this.inputs = [];
        this.uploadForm.controls['documentType'].setErrors({'incorrect': true});
        this.uploadForm.controls['documentType'].markAsDirty();
        this.inputValidators.typeDocument = true;
      } else if (result.length === 1) {
        setTimeout(() => {
          this.selectInputs(result[0]);
          trigger.closePanel();
        }, 1100);
      }
    } else {
      this.reset();
      this.filteredDocumentType = this.associe ? this.classements.associes : this.classements.partenaires;
      this.inputValidators.typeDocument = true;
    }
  }

  saveMetadataFromInput(event) {
    event.preventDefault();
    if (this.geranceSousFamilles.includes(this.uploadForm.value.domainContainerSousFamille?.toLowerCase())) {
      this.uploadForm.patchValue({statutDocumentAssocie: 'Projet'});
    }
    // Même métadonnées client
    if (this.sameCustomer) {
      if (this.pager.currentPage === 1) {
        if (this.uploadForm.valid) {
          if (this.customerForm.valid) {
            // Un seul doc -> envoi, sinon pagination
            // envoi du formulaire client dans un objet séparé pour le sauvegarder comme client unique
            this.pager.currentPage < this.pager.totalItems ?
              this.paginate({form: {...this.uploadForm.value, ...this.customerForm.value}}) :
              this.send({form: {...this.uploadForm.value, ...this.customerForm.value}});
            this.reset();
            this.initProdListCat();
            this.showSelectedCustomer = false;
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
          this.initProdListCat();
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
        this.initProdListCat();
        this.destroySelectedCustomer();
      } else {
        this.snack.openWarn('Les informations saisies sont incomplètes ou invalides');
      }
    }
  }

  addCustomer(customer) {
    this.showDirectory = false;
    if (customer) {
      this.showSelectedCustomer = true;
      this.numeroAssocie = customer.numeroAssocie;
      this.customerForm.patchValue({
        numeroAssocie: customer.numeroAssocie,
        nomAssocie: customer.nomAssocie,
        codeBudget: '11640'
      });
      this.uploadForm.patchValue(
        {
          numeroAssocie: this.customerForm.get('numeroAssocie').value,
          codeClient: this.customerForm.get('numeroAssocie').value,
          nomAssocie: this.customerForm.get('nomAssocie').value,
          codeBudget: this.customerForm.get('codeBudget').value,
          nommage: `${this.datePipe.transform(Date.now(), 'dd-MM-yyyy')} - ${this.uploadForm.get('domainContainerSousFamille').value}`
        });
    } else {
      this.showCustomerForm = true;
      this.customerForm.patchValue({codeBudget: this.codeBudgetUser});
    }
  }

  setNumeroAssocie(numero: string) {
    if (numero) {
      this.numeroAssocie = numero;
    }
  }

  private buildUploadForm(): void {
    this.uploadForm = this.formBuilder.group({
      domainContainerApplication: [this.associe ? 'Associe' : 'Partenaire'],
      domainContainerFamille: [''],
      domainContainerSociete: [this.associe ? 'Associes' : 'Partenaires'],
      domainContainerSousFamille: [''],
      domainContainerBranche: ['GERANCE'],
      nommage: [''],
      sousDossier: [''],
      matriculeCollab: [this.matriculeUser],
      codeClient: [''],
      codeBudget: ['11640'],
      documentType: ['', Validators.required],
      dateDocument: [''],
      dateValidite: [''],
      categorieProduit: [''],
      produit: [''],
      numeroAssocie: [''],
      nomAssocie: [''],
      codeManager: [''],
      nomManager: [''],
      codeAgent: [''],
      nomAgent: [''],
      contact: [''],
      description: [''],
      author: [this.fullName],
      atraiter: [''],
      typeDossierAssocie: [''],
      attributionCollaborateurAssocie: [''],
      statutDocumentAssocie: [''],
      isFinished: [false]
    });

    this.initialUploadFormValues = this.uploadForm.value;
  }

  destroySelectedCustomer() {
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.customerForm.reset();
  }

  initProdListCat() {
    this.productCategoryList = this.geranceService.getProductCategoryList(this.fullProductList);
    this.productList = this.geranceService.getProductList(this.fullProductList);
  }

  goBack(event?: MouseEvent) {
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

    this.uploadForm.reset(this.initialUploadFormValues, { emitEvent: false });
    this.inputs = [];
    this.filteredDocumentType = this.associe ? this.classements.associes : this.classements.partenaires;
  }

  private clearValidators() {
    this.utils.clearValidators(this.initialUploadFormValues, this.uploadForm, ['documentType']);
  }

  private inputsSubscription(): void {
    this.productCategoryControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((newValue) => this.productCategoryChanges(newValue));
    this.productControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((newValue) => this.productChanges(newValue));
    this.isFinishedControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      //The oui and non are the correct values even though they seem counter intuitive
      .subscribe(newValue => this.atraiterControl.patchValue(newValue ? 'non' : 'oui', { emitEvent: false }))
  }

  private productCategoryChanges(newValue: string) {
    if (this.productControl.value) {
      this.productControl.patchValue('', { emitEvent: false });
    }
    this.productList = this.geranceService.getProductList(this.fullProductList, newValue);
  }

  private productChanges(newValue: string) {
    this.productCategoryList = this.geranceService.getProductCategoryList(this.fullProductList, newValue);

    if (newValue) {
      this.productCategoryControl.patchValue(this.productCategoryList[0], { emitEvent: false });
    }
  }

  private get productCategoryControl(): AbstractControl {
    return this.uploadForm.get('categorieProduit');
  }

  private get productControl(): AbstractControl {
    return this.uploadForm.get('produit')
  }
  private get isFinishedControl(): AbstractControl {
    return this.uploadForm.get('isFinished')
  }
  private get atraiterControl(): AbstractControl {
    return this.uploadForm.get('atraiter')
  }
}
