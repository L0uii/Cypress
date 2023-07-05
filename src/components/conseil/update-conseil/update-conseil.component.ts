import { UpdateDocumentService } from 'services/update-document.service';
import { catchError, startWith, takeUntil, tap, finalize } from 'rxjs/operators';
import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from 'services/snackbar.service';
import {UpdateResultsService} from 'services/update-results.service';
import {CLASSEMENT, ConseilClassment, ConseilMetaData, CustomerConseil, DossierConseil, ProduitConseil} from 'models/conseil';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UtilsService} from 'services/utils.service';
import {ConseilService} from 'services/conseil.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {DateAdapter} from '@angular/material/core';
import {UserService} from 'services/user.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {FetchConseilProdListService} from 'services/fetch-conseil-prod-list.service';
import {EMPTY, forkJoin, Observable, Subject} from 'rxjs';
import * as Sentry from "@sentry/angular-ivy";

@Component({
  selector: 'app-update-conseil',
  templateUrl: './update-conseil.component.html',
  styleUrls: ['./update-conseil.component.scss']
})
export class UpdateConseilComponent implements OnInit, OnDestroy {
  uuids: string[] = [];
  documents: DossierConseil['documentProperties'][] = [];
  minDate: Date;
  matriculeUser = this.userService.currentUser.matricule;
  updateDocumentForm: UntypedFormGroup;
  updateCustomerForm: UntypedFormGroup;
  classements = {
    documentType: CLASSEMENT.sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille))
  };
  filteredDocumentType = this.classements.documentType;
  inputs = [];
  inputVisibility = {
    fournisseur: false,
    nature: false,
    produit: false
  };
  isCodeBudgetInvalid: boolean;
  isCodeClientInvalid: boolean;
  showDirectory = true;
  showSelectedCustomer = false;
  showCustomerForm = false;
  updateLaunched = false;
  updatePending = false;
  updateFailed = false;
  updateSuccess = false;
  disabled = false;
  showLists = false;
  failList: { title: string, error: string }[] = [];
  successList: string[] = [];
  ngUnsubscribe$ = new Subject();
  conseilFullProdList: ProduitConseil[];
  isLoadingDocument = false;
  private partenairesList: string[];
  private categoriesList: string[];
  private produitsList: string[];

  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  @ViewChild('aTraiterCheckbox') aTraiterCheckbox: ElementRef;
  @ViewChild('contratNature') contratNatureInput: ElementRef<HTMLInputElement>;
  @ViewChild('partenaire') fournisseurInput: ElementRef<HTMLInputElement>;
  @ViewChild('nomProduit') produitInput: ElementRef<HTMLInputElement>;

  constructor(
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private updateService: UpdateResultsService,
    private utils: UtilsService,
    private conseilService: ConseilService,
    private userService: UserService,
    private _adapter: DateAdapter<any>,
    private fetchConseilProdListServiceService: FetchConseilProdListService,
    private updateDocumentService: UpdateDocumentService
  ) {
    this.minDate = this.utils.getMinDate();
    this.updateDocumentForm = this.conseilService.initializeUpdateDocumentForm();
    this.updateCustomerForm = this.conseilService.initializeCustomerForm();
    this.fetchConseilProdListServiceService.getProdList().subscribe(conseilProdList => {
      this.conseilFullProdList = conseilProdList;
      this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
      this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
      this.produitsList = this.conseilFullProdList.map(conseilProd => conseilProd.produit);
    });
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');
    });
    this.checkCodeBudget();
    this.checkNumeroClient();
    this.updateDocumentForm.get('partenaire').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.partenaireHandler(newValue);
    });

    this.updateDocumentForm.get('categorie').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.categorieHandler(newValue);
    });

    this.updateDocumentForm.get('produit').valueChanges.pipe(
      startWith(''),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(newValue => {
      this.produitHandler(newValue);
    });

    this.fullInit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
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

  fullInit() {
    this.initializePropertiesDocument(this.uuids);
    this.initializePropertiesClient(this.uuids);
  }

  reset() {
    this.updateDocumentForm.reset(this.conseilService.initializeUpdateDocumentForm());
    this.inputs = [];
  }

  addCustomer(customer: CustomerConseil) {
    if (customer) {
      this.showDirectory = false;
      this.showSelectedCustomer = true;
      const {numeroClient, nomClient, codePostal, codeBudget} = customer;
      this.updateCustomerForm.patchValue({
        numeroClient,
        nomClient,
        codePostal,
        codeBudget
      });
    } else {
      this.destroyCustomer();
      this.showCustomerForm = true;
      this.showDirectory = false;
    }
  }

  destroyCustomer() {
    this.showDirectory = true;
    this.showCustomerForm = false;
    this.showSelectedCustomer = false;
    this.updateDocumentForm.reset(this.conseilService.initializeUpdateDocumentForm());
  }

  filterDocumentType(key: string, value: string) {
    this.filteredDocumentType = this.conseilService.filterDocumentType(key, value, this.classements);
    return this.filteredDocumentType;
  }

  selectDocType(key: string, value: string) {
    if (value) {
      const exclude: string[] = ['documentType', 'famille', 'sousFamille'];
      Object.keys(this.updateDocumentForm.controls).forEach(item => {
        if (exclude.findIndex(q => q === item) === -1) {
          this.updateDocumentForm.get(item).reset();
        }
      });
      this.updateDocumentForm.get('aTraiter').patchValue(true);
      this.filterDocumentType(key, value);
      if (this.filteredDocumentType.length !== 1) {
        this.updateDocumentForm.controls['documentType'].setErrors({'incorrect': true});
        this.updateDocumentForm.controls['documentType'].markAsDirty();
      } else {
        setTimeout(() => {
          this.selectInputs(this.filteredDocumentType[0]);
        }, 1000);
      }
    } else {
      this.filteredDocumentType = this.classements.documentType;
      this.reset();
    }
  }

  selectInputs(data: ConseilClassment) {
    const oldValues = this.updateDocumentForm.value;
    this.updateDocumentForm.patchValue({
      famille: data.famille,
      sousFamille: data.sousFamille
    });
    this.inputs = this.conseilService.toFormGroup(data.listeMetadatas);
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

  matchMetadataToInput(inputs: ConseilMetaData[]) {
    inputs.forEach(element => {
      const input = element.name;
      element.obligatoire ?
        this.updateDocumentForm.controls[input].setValidators([Validators.required]) :
        this.updateDocumentForm.controls[input].clearValidators();
    });
    this.inputs = inputs;
  }

  initializePropertiesDocument(uuids: string[]): void {
    this.isLoadingDocument = true;
    forkJoin(uuids.map(nodeId => this.conseilService.getPropertiesFormDocument(nodeId)))
      .pipe(finalize(() => this.isLoadingDocument = false))
      .subscribe(resp => this.handleDocument(resp));
  }

  private handleDocument(resp: DossierConseil[]): void {
    const {documentProperties} = resp[0];
    const {listeMetadatas} = this.filteredDocumentType[0];
    const metadata = resp.map(el => el.documentProperties);
    this.documents = resp.map(el => {
      return {
        ...el.documentProperties,
        ...el.document
      }});
    if (metadata.every(v => v === metadata[0])) {
      this.filterDocumentType('sousFamille', documentProperties['fiducial:domainContainerSousFamille']);
      if (this.filteredDocumentType.length) {
        const { labelSousFamille, famille, sousFamille } = this.filteredDocumentType[0];
        this.updateDocumentForm.patchValue({
          documentType: labelSousFamille,
          famille,
          sousFamille
        });
        this.inputs = this.conseilService.toFormGroup(listeMetadatas);
        for (const key in listeMetadatas) {
          if (Object.prototype.hasOwnProperty.call(listeMetadatas, key)) {
            const element = listeMetadatas[key];
            this.inputVisibility[element.name] = true;
            if (element.name === 'partenaire' || element.name === 'categorie' || element.name === 'produit') {
              if (documentProperties[element.metadata]) {
                const input = element.name;
                this.updateDocumentForm.get(input).setValue(documentProperties[element.metadata]);
              }
            } else {
              this.updateDocumentForm.addControl(
                element.name,
                new UntypedFormControl(documentProperties[element.metadata] ?? '', element.obligatoire ? Validators.required : null)
              );
            }
          }
        }
      }
    }
  }

  send() {
    if ((this.uuids.length === 1 && this.updateDocumentForm.invalid) || this.updateCustomerForm.invalid) {
      this.snack.openInfo('Vous devez remplir les champs obligatoires pour envoyer votre fichier.');
      return;
    }

    this.updateLaunched = true;
    this.updatePending = true;

    forkJoin(
      this.documents.map(document => this.mapToUpdateRequest(document))
    )
    .pipe(finalize(() => {
      this.updatePending = false;

      if (this.failList.length > 0) {
        this.updateFailed = true;
      } else {
        this.updateSuccess = true;
      }
    }))
    .subscribe();
  }

  private mapToUpdateRequest(document: any): Observable<any> {
    const aTraiter = !this.isCodeBudgetInvalid && !this.isCodeClientInvalid && this.updateDocumentForm.get('aTraiter').value;
        let formValues = {
          ...this.updateCustomerForm.value,
          matriculeCollab: this.matriculeUser,
          aTraiter
        };

    if (this.uuids.length === 1) {
      formValues = {
        ...this.updateDocumentForm.value,
        ...formValues
      };
    }
    const {id, title} = document;
    const documentProperties = this.conseilService.generateDocumentProperties(formValues, title, true);
    return this.updateDocumentService.update(id, documentProperties)
    .pipe(
      tap(res => {
        this.successList.push(title);
        Sentry.captureMessage(`document updated: ${id}`, 'log');
      }),
      catchError(error => {
        const erreur = this.utils.isJSON(error.message) ? JSON.parse(error.message).label : error.message;
        this.failList.push({title, error: erreur});
        return EMPTY;
      })
    )
  }

  checkCodeBudget() {
    this.updateCustomerForm.get('codeBudget').valueChanges.subscribe(val => {
      this.isCodeBudgetInvalid = this.conseilService.getDRFromCodeBudget(val) === 'DR_INCONNUE';
    });
  }

  checkNumeroClient() {
    this.updateCustomerForm.get('numeroClient').valueChanges.subscribe(val => {
      this.isCodeClientInvalid = val === '00000000' || !val;
    });
  }

  initializePropertiesClient(uuids: string[]) {
    forkJoin(uuids.map(nodeId => this.conseilService.getPropertiesFormDocument(nodeId)))
      .subscribe(resp => {
        const customer = resp.map(el => Object.assign({}, el.customerProperties));
        if (customer.every(v => JSON.stringify(v) === JSON.stringify(customer[0]))) {
          const {numeroClient, nomClient, codeBudget, codePostal} = customer[0];

          this.updateCustomerForm.patchValue({
            numeroClient,
            nomClient,
            codeBudget,
            codePostal
          });
          this.showSelectedCustomer = true;
          this.showDirectory = false;
          this.showCustomerForm = false;
        }
        this.documents = resp.map(el => {
          return {
            ...el.documentProperties,
            ...el.document
          }
        });
      });
  }

  toggle($event: MatCheckboxChange) {
    this.updateDocumentForm.get('aTraiter').patchValue($event.checked);
  }

  private partenaireHandler(newValue: string) {
    if (!newValue) {
      this.updateDocumentForm.get('categorie').setValue('', {emitEvent: false});
      this.updateDocumentForm.get('produit').setValue('');
      this.partenairesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.fournisseur))];
      this.categoriesList = [...new Set(this.conseilFullProdList.map(conseilProd => conseilProd.nature))];
      this.produitsList = [...new Set([...this.conseilFullProdList].map(docType => docType.produit))];
    } else {
      this.categoriesList = [...new Set(this.conseilFullProdList
        .filter(categorie => categorie.fournisseur === newValue)
        .map(conseilProd => conseilProd.nature))];
      if(this.updateDocumentForm.get('categorie').value){
        this.produitsList = [...new Set(this.conseilFullProdList
          .filter(categorie => categorie.fournisseur === newValue && categorie.nature === this.updateDocumentForm.get('categorie').value)
          .map(conseilProd => conseilProd.produit))];
      } else {
        this.produitsList = [...new Set(this.conseilFullProdList
          .filter(categorie => categorie.fournisseur === newValue)
          .map(conseilProd => conseilProd.produit))];
      }
      if (this.categoriesList.length === 1) {
        this.updateDocumentForm.get('categorie').setValue(this.categoriesList[0]);
      }
    }
  }

  private categorieHandler(newValue: string) {
    if (newValue) {
      if (this.updateDocumentForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => value.nature === newValue && value.fournisseur === this.updateDocumentForm.get('partenaire').value)
          .map(produit => produit.produit))];
      } else {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(value => value.nature === newValue)
          .map(produit => produit.produit))];
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.nature === newValue)
          .map(produit => produit.fournisseur))];
        if(this.partenairesList.length === 1) {
          this.updateDocumentForm.get('partenaire').setValue(this.partenairesList[0], {emitEvent: false});
        }
      }
      if (this.produitsList.length === 1) {
        this.updateDocumentForm.get('produit').setValue(this.produitsList[0]);
      }
    } else {
      this.updateDocumentForm.get('produit').setValue('');
      if (this.updateDocumentForm.get('partenaire').value) {
        this.categoriesList = [...new Set([...this.conseilFullProdList]
          .filter(classement => classement.fournisseur === this.updateDocumentForm.get('partenaire').value)
          .map(produit => produit.nature))];
      } else {
        this.categoriesList = [...new Set([...this.conseilFullProdList].map(docType => docType.nature))];
      }
    }
  }

  private produitHandler(newValue: string) {
    if (newValue) {
      if (!this.updateDocumentForm.get('categorie').value) {
        this.categoriesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.nature))];
        this.updateDocumentForm.get('categorie').setValue(this.categoriesList[0], {emitEvent: false});
      }
      if (!this.updateDocumentForm.get('partenaire').value) {
        this.partenairesList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.produit === newValue)
          .map(produit => produit.fournisseur))];
        this.updateDocumentForm.get('partenaire').setValue(this.partenairesList[0], {emitEvent: false});
      }
    } else {
      if (this.updateDocumentForm.get('categorie').value && this.updateDocumentForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.fournisseur === this.updateDocumentForm.get('partenaire').value
          && produit.nature === this.updateDocumentForm.get('categorie').value)
          .map(produit => produit.produit))];
      } else if(this.updateDocumentForm.get('categorie').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.nature === this.updateDocumentForm.get('categorie').value)
          .map(produit => produit.produit))];
      } else if(this.updateDocumentForm.get('partenaire').value) {
        this.produitsList = [...new Set([...this.conseilFullProdList]
          .filter(produit => produit.fournisseur === this.updateDocumentForm.get('partenaire').value)
          .map(produit => produit.produit))];
      } else {
        this.produitsList = [...new Set([...this.conseilFullProdList].map(docType => docType.produit))];
      }
    }
  }
}
