import {startWith, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CLASSEMENT, ConseilClassment, ConseilDocuments, CustomerConseil, ProduitConseil} from 'models/conseil';
import {SnackbarService} from 'services/snackbar.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {DateAdapter} from '@angular/material/core';
import {UtilsService} from 'services/utils.service';
import {GroupService} from 'services/group.service';
import {UserService} from 'services/user.service';
import paginate from 'jw-paginate';
import {ConseilService} from 'services/conseil.service';
import {FilePropertiesConseil} from '../../../models/file-properties-conseil';
import {GroupsEnums} from '../../../enums/groups.enums';
import {extensions} from 'consts/file-extensions';
import {FetchConseilProdListService} from 'services/fetch-conseil-prod-list.service';
import {Pager} from '../../../models/pager';

@Component({
  selector: 'app-form-conseil',
  templateUrl: './form-conseil.component.html',
  styleUrls: ['./form-conseil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormConseilComponent implements OnInit, OnChanges, OnDestroy {
  files: string[];
  fileList: Array<File>;
  filePreviewList: Array<File>;
  extensions: string[] = extensions;
  showSend = false;
  showForm = false;
  showFiles = true;
  showMetadataOptions = true;
  sameMetadata: boolean; // = true; [JdV] JIRA EGD-177
  sameCustomer = false;
  metadata = [];
  metadataCustomer = {};
  data = {};
  isUserCGP: boolean;
  matriculeUser: string;
  minDate: Date;
  uploadForm: UntypedFormGroup;
  customerForm: UntypedFormGroup;
  showDirectory = true;
  showCustomerForm = false;
  showSelectedCustomer = false;
  classements = {
    documentType: CLASSEMENT.sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille))
  };

  inputs = [];
  inputVisibility = {
    produit: false,
    nature: false,
    fournisseur: false
  };
  initialPage = 1;
  pageSize = 1;
  maxPages = 10;
  pager: Pager;
  pageOfItems: string[];
  ngUnsubscribe$ = new Subject();
  conseilFullProdList: ProduitConseil[];
  filteredDocumentType = this.classements.documentType;
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  private partenairesList: string[];
  private categoriesList: string[];
  private produitsList: string[];

  constructor(
    private utils: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private snack: SnackbarService,
    private _adapter: DateAdapter<any>,
    private userService: UserService,
    private conseilService: ConseilService,
    private groupService: GroupService,
    private fetchConseilProdListService: FetchConseilProdListService
  ) {
    this.minDate = this.utils.getMinDate();
    this.uploadForm = this.conseilService.initializeUploadForm();
    this.customerForm = this.conseilService.initializeCustomerForm();
    this.fetchConseilProdListService.getProdList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(conseilProdList => {
        this.conseilFullProdList = conseilProdList;
        this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
        this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
        this.produitsList = this.conseilFullProdList.map(conseilProd => conseilProd.produit);
      });
    this.pager = {
      currentPage: 0,
      endIndex: 0,
      endPage: 0,
      pageSize: 0,
      pages: [],
      startIndex: 0,
      startPage: 0,
      totalItems: 0,
      totalPages: 0
    };
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.matriculeUser = this.userService.currentUser.matricule;
    this.isUserCGP = this.groupService.isInGroups([GroupsEnums.isUserConseilCGP]);
    if (this.pager.currentPage > 1 && this.sameCustomer) {
      this.showDirectory = false;
    }

    this.uploadForm.get('partenaire').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.partenaireHandler(newValue);
    });

    this.uploadForm.get('categorie').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.categorieHandler(newValue);
    });

    this.uploadForm.get('produit').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.produitHandler(newValue);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.files.currentValue !== changes.files.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  reset() {
    this.uploadForm.reset(this.conseilService.initializeUpdateDocumentForm());
    this.inputVisibility = {
      produit: false,
      nature: false,
      fournisseur: false
    };
    this.inputs = [];
  }

  onFocus(value: number) {
    this.autoComplete['_results'][value].openPanel();
  }

  filesLoaded(value: { files: Array<File>, sameCustomer: boolean, sameMetadata: boolean }) {
    this.fileList = value.files;
    this.sameMetadata = (typeof value.sameMetadata === 'undefined') ? true : value.sameMetadata;

    if (this.sameMetadata) {
      this.filePreviewList = value.files;
    } else {
      this.filePreviewList = [value.files[0]];
    }

    this.sameCustomer = (typeof value.sameCustomer === 'undefined') ? true : value.sameCustomer;
    this.files = this.sameMetadata ? [this.fileList.map(el => el.name).join(', ')] : this.fileList.map(el => el.name);
    if (this.files && this.files.length) {
      this.setPage(this.initialPage);
      this.showFiles = false;
      this.showForm = true;
      this.data = {};
      this.metadata = [];
      this.metadataCustomer = [];
    }
  }

  goToFiles() {
    this.showForm = false;
    this.showFiles = true;
  }

  paginate(data: { form: any; customer?: any }) {
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

  send(data: { customer?: CustomerConseil, form: FilePropertiesConseil }) {
    this.showForm = false;
    this.showFiles = false;
    this.showSend = true;
    this.metadata.push(data.form);
    if (this.pager.currentPage === 1 && this.sameCustomer && data.hasOwnProperty('customer')) {
      this.metadataCustomer = data.customer;
    }
    if (this.sameCustomer) {
      const { aTraiter } = data.form;
      const same = Array(this.fileList.length).fill(Object.assign(data.form, this.metadataCustomer));
      const different = this.metadata.map(el => Object.assign(el, this.metadataCustomer));

      let formToSend: any = {};
      formToSend = this.sameMetadata ? same : different;
      formToSend = formToSend.map(f => {
        return {
          ...f,
          aTraiter
        }
      });

      this.data = {fileList: this.fileList, form: formToSend};
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
    this.sameMetadata = undefined;
    this.sameCustomer = undefined;
    this.data = {};
    this.metadata = [];
    this.metadataCustomer = {};
  }

  setPage(page: number) {
    this.pager = paginate(this.files.length, page, this.pageSize, this.maxPages);
    this.pageOfItems = this.files.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  filterDocumentType(key: string, value: string) {
    this.filteredDocumentType = this.conseilService.filterDocumentType(key, value, this.classements);
    return this.filteredDocumentType;
  }

  selectDocType(key: string, value: string) {
    if (value) {
      const result = this.filterDocumentType(key, value);
      if (result.length !== 1) {
        this.inputs = [];
        this.uploadForm.controls['documentType'].setErrors({'incorrect': true});
        this.uploadForm.controls['documentType'].markAsDirty();
      } else if (result.length === 1) {
        setTimeout(() => {
          this.selectInputs(result[0]);
        }, 1000);
      }
    } else {
      this.reset();
    }
  }

  selectInputs(data: ConseilClassment) {
    if (data) {
      this.uploadForm.patchValue({
        famille: data.famille,
        sousFamille: data.sousFamille
      });
      this.inputs = this.conseilService.toFormGroup(data.listeMetadatas);
      data.listeMetadatas.forEach(metadata => {
          if (metadata.name === 'nature' || metadata.name === 'fournisseur' || metadata.name === 'produit') {
            this.inputVisibility[metadata.name] = true;
          }
        }
      );
    }
    this.inputs.forEach(element => {
      const input = element.name;
      const control = new UntypedFormControl('', element.obligatoire ? Validators.required : null);
      this.uploadForm.addControl(input, control);
    });
    this.matchMetadataToInput(this.inputs);
  }

  matchMetadataToInput(inputs: ConseilDocuments[]) {
    inputs.forEach(element => {
      const input = element.name;
      element.obligatoire ?
        this.uploadForm.controls[input].setValidators([Validators.required]) :
        this.uploadForm.controls[input].clearValidators();
    });
    this.inputs = inputs;
  }

  addCustomer(customer: CustomerConseil) {
    this.showDirectory = false;
    if (customer) {
      this.showCustomerForm = false;
      this.showSelectedCustomer = true;
      const {numeroClient, nomClient, codePostal, codeBudget} = customer;
      this.customerForm.patchValue({
        numeroClient,
        nomClient,
        codePostal,
        codeBudget
      });
    } else {
      this.showCustomerForm = true;
      this.customerForm.controls['numeroClient'].setValidators([Validators.maxLength(8)]);
      this.customerForm.controls['nomClient'].setValidators([Validators.required]);
      this.customerForm.controls['codePostal'].setValidators([
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.required,
        this.utils.validateNumber
      ]);
      this.customerForm.controls['codeBudget'].setValidators([
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.required,
        this.utils.validateNumber
      ]);
    }
  }

  saveMetadataFromInput() {
    // The form values will be normalized prior to the request by a ConseilService method called 'generateDocumentProperties'.
    // This method is also used in the update of a document, where there's a checkbox related to aTraiter in which checked means 'non' and unchecked means 'oui'
    this.uploadForm.patchValue({
      matriculeCollab: this.matriculeUser,
      aTraiter: !this.isUserCGP
    });
    if (this.customerForm) {
      this.customerForm.patchValue({
        numeroClient: this.customerForm.value.numeroClient ? this.customerForm.value.numeroClient : '00000000'
      });
    }
    if (this.sameCustomer) {
      if (this.pager.currentPage === 1) {
        if (this.uploadForm.valid) {
          if (this.customerForm.valid) {
            this.pager.currentPage < this.pager.totalItems ?
              this.paginate({form: {...this.uploadForm.value}, customer: {...this.customerForm.value}}) :
              this.send({form: {...this.uploadForm.value}, customer: {...this.customerForm.value}});
            this.reset();
            this.destroySelectedCustomer();
          }
        } else {
          if (this.uploadForm.invalid) {
            this.snack.openWarn('Les informations du document sont incomplètes ou invalides.');
          }
          if (!this.customerForm || this.customerForm.invalid) {
            this.snack.openWarn('Les informations concernant le client sont incomplètes ou invalides.');
          }
        }
      } else {
        if (this.uploadForm.valid) {
          this.pager.currentPage < this.pager.totalItems ?
            this.paginate({form: {...this.uploadForm.value}}) :
            this.send({form: {...this.uploadForm.value}});
          this.reset();
        } else {
          this.snack.openWarn('Les informations saisies sont incomplètes ou invalides');
        }
      }
    } else {
      if (this.uploadForm.valid && this.customerForm.valid) {
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
  }

  destroySelectedCustomer() {
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.customerForm.reset();
    this.showCustomerForm = false;
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

  private partenaireHandler(newValue: string) {
    if (!newValue) {
      this.uploadForm.get('categorie').setValue('', {emitEvent: false});
      this.uploadForm.get('produit').setValue('');
      this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
      this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
      this.produitsList = [...new Set([...this.conseilFullProdList].map(docType => docType.produit))];
    } else {
      this.categoriesList = [...new Set(this.conseilFullProdList
        .filter(categorie => categorie.fournisseur === newValue)
        .map(conseilProd => conseilProd.nature))];
      if(this.uploadForm.get('categorie').value){
        this.produitsList = [...new Set(this.conseilFullProdList
          .filter(categorie => categorie.fournisseur === newValue && categorie.nature === this.uploadForm.get('categorie').value)
          .map(conseilProd => conseilProd.produit))];
      } else {
        this.produitsList = [...new Set(this.conseilFullProdList
          .filter(categorie => categorie.fournisseur === newValue)
          .map(conseilProd => conseilProd.produit))];
      }
      if (this.categoriesList.length === 1) {
        this.uploadForm.get('categorie').setValue(this.categoriesList[0]);
      }
    }
  }

  private categorieHandler(newValue: string) {
    if (newValue) {
      if (this.uploadForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => value.nature === newValue && value.fournisseur === this.uploadForm.get('partenaire').value)
          .map(produit => produit.produit))];
      } else {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => value.nature === newValue)
          .map(produit => produit.produit))];
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.nature === newValue)
          .map(produit => produit.fournisseur))];
        if(this.partenairesList.length === 1) {
          this.uploadForm.get('partenaire').setValue(this.partenairesList[0], {emitEvent: false});
        }
      }
      if (this.produitsList.length === 1) {
        this.uploadForm.get('produit').setValue(this.produitsList[0]);
      }
    } else {
      if (this.uploadForm.get('partenaire').value) {
        this.categoriesList = [...new Set([...this.conseilFullProdList]
          .filter(classement => classement.fournisseur === this.uploadForm.get('partenaire').value)
          .map(produit => produit.nature))];
      } else {
        this.categoriesList = [...new Set([...this.conseilFullProdList].map(docType => docType.nature))];
      }
      this.uploadForm.get('produit').setValue('');
    }
  }

  private produitHandler(newValue: string) {
    if (newValue) {
      if (!this.uploadForm.get('categorie').value) {
        this.categoriesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.nature))];
        this.uploadForm.get('categorie').setValue(this.categoriesList[0], {emitEvent: false});
      }
      if (!this.uploadForm.get('partenaire').value) {
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.fournisseur))];
        this.uploadForm.get('partenaire').setValue(this.partenairesList[0], {emitEvent: false});
      }
    } else {
      if (this.uploadForm.get('categorie').value && this.uploadForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.fournisseur === this.uploadForm.get('partenaire').value
          && produit.nature === this.uploadForm.get('categorie').value)
          .map(produit => produit.produit))];
      } else if(this.uploadForm.get('categorie').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.nature === this.uploadForm.get('categorie').value)
          .map(produit => produit.produit))];
      } else if(this.uploadForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.fournisseur === this.uploadForm.get('partenaire').value)
          .map(produit => produit.produit))];
      } else {
        this.produitsList = [...new Set([...this.conseilFullProdList].map(docType => docType.produit))];
      }
    }
  }

}
