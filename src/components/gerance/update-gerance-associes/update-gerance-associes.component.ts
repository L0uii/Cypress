import { cloneDeep } from 'lodash';
import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DateAdapter } from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../services/utils.service';
import {SnackbarService} from '../../../services/snackbar.service';
import {UpdateResultsService} from '../../../services/update-results.service';
import {UserService} from '../../../services/user.service';
import {GeranceAssociesService} from '../../../services/gerance-associes.service';
import {CLASSEMENT_GERANCEASSOCIES, COMMON_GERANCEASSOCIES} from '../../../models/gerance-associes';
import {CLASSEMENT_GERANCEPARTENAIRES} from '../../../models/gerance-partenaires';
import {CustomerGeranceAssocies} from '../../../models/customer-gerance-associes';
import {ClassementGeranceAssocies} from '../../../models/classement-gerance-associes';
import {CustomerDocumentPropertiesGerance} from '../../../models/customer-document-properties';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {UpdateDocumentService} from '../../../services/update-document.service';
import { forkJoin, EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-gerance-associes',
  templateUrl: './update-gerance-associes.component.html',
  styleUrls: ['./update-gerance-associes.component.scss']
})
export class UpdateGeranceAssociesComponent implements OnInit {

  uuids: string[] = [];
  documents: any = [];
  minDate: Date;
  matriculeUser: string;
  classements = {
    associes:  cloneDeep(CLASSEMENT_GERANCEASSOCIES),
    partenaires: cloneDeep(CLASSEMENT_GERANCEPARTENAIRES),
    produit: []
  };
  filteredDocumentType: any[] = this.classements.associes.filter(el => !el.sousFamille.includes('gerance_assoc_reprise'))
    .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille));
  updateCustomer: UntypedFormGroup;
  updateDocument: UntypedFormGroup;
  inputs = [];
  numeroDossier = '';

  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;
  updateLaunched = false;
  updatePending = false;
  successList = [];
  failList = [];
  updateFailed = false;
  updateSuccess = false;
  // affichage form
  showDirectory = true;
  showSelectedCustomer = false;
  showCustomerForm = false;
  fullName: string;
  matricule: string;
  isMustTreated = true;
  disabled: boolean;
  labelSousFamille: string;
  isNumeroAssocieInvalid: boolean = false;
  private initialUpdateDocumentFormValues: UntypedFormGroup;

  isLoadingDocument: boolean = false;

  constructor(
    private router: Router,
    private utils: UtilsService,
    private snack: SnackbarService,
    private route: ActivatedRoute,
    private updateService: UpdateResultsService,
    private formBuilder: UntypedFormBuilder,
    private _adapter: DateAdapter<any>,
    private userService: UserService,
    private geranceAssociesService: GeranceAssociesService,
    private updateDocumentService: UpdateDocumentService
  ) {
    this.geranceAssociesService.getFullProduitList()
      .subscribe(list => {
        this.classements.produit = list;
      });

    this.minDate = this.utils.getMinDate();
    this.updateCustomer = this.formBuilder.group({
      numeroAssocie: ['', Validators.required],
      nomAssocie: [''],
      atraiter: [''],
      codeBudget: [''],
    });
    this.updateDocument = this.formBuilder.group({
      documentType: ['', Validators.required],
      famille: [''],
      sousFamille: [''],
      matriculeCollab: ['000000'],
      codeBudget: ['11640'],
      codeClient: [''],
      atraiter: ['']
    });
  }

  async ngOnInit() {
    this._adapter.setLocale('fr');
    this.classements.associes.forEach(doc =>
      Array.prototype.push.apply(doc.listeMetadatas, COMMON_GERANCEASSOCIES)
    );
    this.matriculeUser = this.userService.currentUser.matricule;
    this.route.params.subscribe(params => {
      this.uuids = params.nodeId.split(',');
      if (this.uuids.length > 0) {
        this.fullInit();
      }
    });
    this.checkNumeroAssocie();
  }

  onFocus(value: number) {
    this.autoComplete['_results'][value].openPanel();
  }

  close(refreshList?: boolean) {
    if (refreshList) {
      this.updateService.refreshDocumentList.next(this.updateService.baseSearchTabId);
    }
    this.router.navigate([{ outlets: { view: null } }]);
  }

  fullInit() {
    this.initializePropertiesClient(this.uuids);
    this.initializePropertiesDocument(this.uuids);
  }

  setCustomer(customer: CustomerGeranceAssocies) {
    if (customer) {
      this.showDirectory = false;
      this.showSelectedCustomer = true;
      this.updateCustomer.patchValue({nomAssocie: customer.nomAssocie});
      this.updateCustomer.patchValue({numeroAssocie: customer.numeroAssocie});
      this.updateCustomer.patchValue({codeBudget: customer.codeBudget});
    } else {
      this.destroyCustomer();
      this.showCustomerForm = true;
      this.showDirectory = false;
    }
  }

  destroyCustomer() {
    this.updateCustomer.reset();
    this.showDirectory = true;
    this.showSelectedCustomer = false;
    this.showCustomerForm = false;
  }

  // Filtrer type de document
  filterDocumentType(key: string, value: string): void {
    if (value) {
      this.filteredDocumentType = this.classements.associes
        .filter(el => !el.sousFamille.includes('gerance_assoc_reprise'))
        .filter(el => this.utils.containSearchTerm(el[key], value))
        .sort((a, b) => this.utils.sortStrings(a[key], b[key]));
    }
  }

  // Affecte la value du type de document au clic sur la valeur du select
  selectDocType(key: string, value: string): void {
    this.utils.clearValidators(this.initialUpdateDocumentFormValues, this.updateDocument, ['documentType']);
    this.filterDocumentType(key, value);
    if (this.filteredDocumentType.length !== 1) {
      this.updateDocument.controls['documentType'].setErrors({'incorrect': true});
      this.updateDocument.controls['documentType'].markAsDirty();
    }

    const { firstName, lastName, matricule } = this.userService.currentUser;
    this.fullName = `${firstName} ${lastName}`;
    this.matricule = matricule;

    this.updateDocument.patchValue({
      author: this.fullName,
      matriculeCollab: this.matricule,
      codeBudget: ['11640']
    });
  }

  selectInputs(data: ClassementGeranceAssocies): void {
    const oldValues = { ...this.updateDocument.value };
    if (data) {
      this.inputs = [];
      this.updateDocument.patchValue({documentType: data.labelSousFamille});
      this.updateDocument.patchValue({famille: data.famille});
      this.updateDocument.patchValue({sousFamille: data.sousFamille});
      this.updateDocument.patchValue({typeDossierAssocie : this.geranceAssociesService.getTypeDossierAssocie(data.sousFamille)});
      this.inputs = data.listeMetadatas
        .sort((a, b) => a.order - b.order);
      data.listeMetadatas.forEach(element => {
        const input = element.name;
        const value = oldValues[input] != null ? oldValues[input] : '';
        this.updateDocument.controls[input] = element.obligatoire ?
          new UntypedFormControl(value, Validators.required) :
          new UntypedFormControl(value);
      });
      const { firstName, lastName, matricule } = this.userService.currentUser;
      this.fullName = `${firstName} ${lastName}`;
      this.matricule = matricule;

      this.updateDocument.patchValue({
        author: this.fullName,
        matriculeCollab: this.matricule,
        atraiter: this.updateDocument.value.atraiter,
        codeBudget: '11640',
        domainContainerSociete: 'Associes',
        domainContainerBranche: 'GERANCE',
        domainContainerApplication: 'Associe'
      });

      const sousFamilles = [
        "gerance_assoc_checklist_souscription",
        "gerance_assoc_bulletin_retrait",
        "gerance_assoc_checklist_successions_donations"
      ]

      if(sousFamilles.includes(data.sousFamille)){
        this.updateDocument.patchValue({statutDocumentAssocie : 'Projet'});
      }
      const produit = this.inputs;
      const listProduits = produit.filter(input => input.name === 'produit');
      if (listProduits[0]) {
        Object.assign(listProduits[0], {options: this.classements.produit.map(x => x.labelProduit)});
      }
      const categorieProduit = this.inputs;
      const listCategorieProduits = categorieProduit.filter(input => input.name === 'categorieProduit');
      if (listCategorieProduits[0]) {
        Object.assign(listCategorieProduits[0], {
          options:
            this.utils.removeDuplicates(this.classements.produit.map(el => el.labelCategorie)
              .sort((a, b) => this.utils.sortStrings(a, b)), 'labelCategorie')
        });
      }
      this.updateDocument.patchValue({nommage: oldValues.nommage});
    }
  }

  checkCategorieProduit(inputName, option) {
    if (inputName === 'produit') {
      this.updateDocument.patchValue({
        categorieProduit: this.classements.produit
          .filter(x => x.labelProduit === option)[0].labelCategorie
      });
    }
  }

  reset() {
    //this.updateDocument.reset();
    this.initialUpdateDocumentFormValues = this.updateDocument.value;
    this.updateDocument.reset(this.initialUpdateDocumentFormValues);
    this.inputs = [];
  }

  updatingDocumentForm() {
    const nommage = this.updateDocument.value.dateDocument + ' - ' + this.updateDocument.value.documentType;
    this.updateDocument.patchValue({nommage: nommage});
    if (this.updateDocument.value.famille) {
      this.updateDocument.patchValue({domainContainerFamille: this.updateDocument.value.famille});
    }

    if (this.updateDocument.value.sousFamille) {
      this.updateDocument.patchValue({
        domainContainerSousFamille: this.updateDocument.value.sousFamille,
        typeDossierAssocie : this.geranceAssociesService.getTypeDossierAssocie(this.updateDocument.value.sousFamille)
      });
    }
    if (!this.updateDocument.value.documentType) {
      this.updateDocument.patchValue({documentType: this.labelSousFamille});
    }
    if (this.updateCustomer.value.numeroAssocie) {
      this.updateDocument.patchValue({numeroAssocie: this.updateCustomer.get('numeroAssocie').value});
    }

    if (this.updateCustomer.value.nomAssocie) {
      this.updateDocument.patchValue({nomAssocie: this.updateCustomer.value.nomAssocie});
    }

    if (this.updateCustomer.value.numeroAssocie) {
      this.updateDocument.patchValue({codeClient: this.updateCustomer.value.numeroAssocie});
    }

    this.updateCustomer.patchValue({atraiter: this.isMustTreated});
  }

  send() {
    this.updatingDocumentForm();
    if (this.updateDocument.invalid || this.updateCustomer.invalid) {
      this.snack.openInfo('Vous devez remplir les champs obligatoires pour envoyer votre fichier.');
    } else {

      this.updateLaunched = true;
      this.updatePending = true;
      const form = {
        ...this.updateDocument.value,
        ...this.updateCustomer.value,
        matriculeCollab: this.matriculeUser
      };

      forkJoin(this.documents.map(doc => {
        const {id, title} = doc;

        const documentProperties = this.geranceAssociesService.generateDocumentProperties(form, title);
        return this.updateDocumentService.update(id, documentProperties)
        .pipe(
          tap(() => this.successList.push(title)),
          catchError((resp) => {
            const error = this.utils.isJSON(resp.message) ? JSON.parse(resp.message).label : resp.message;
            this.failList.push(title, error);
            return EMPTY;
          })
        )
      }))
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
  }

  // Vérifie que le numéro client est valide / affiche un message
  checkNumeroAssocie() {
    this.updateCustomer.get('numeroAssocie').valueChanges.subscribe(val => {
      this.isNumeroAssocieInvalid = val === '000000' || !val;
    });
  }

  initializePropertiesClient(uuids: Array<string>) {
    forkJoin(uuids.map(nodeId => this.geranceAssociesService.getPropertiesFormDocument(nodeId)))
      .subscribe((resp: any) => {
        const customer = resp.map(el => el.customerProperties);
        const firstCustomer = customer[0];
        if (customer.every(v => this.utils.isEqual(v, firstCustomer))) {
          const {nomAssocie, numeroAssocie, codeBudget} = firstCustomer;
          this.updateCustomer.patchValue({
            nomAssocie,
            numeroAssocie,
            codeBudget
          });
          this.showSelectedCustomer = true;
        }
        this.documents = resp.map(el => {
          return {...el.documentProperties, ...el.document}
        });
      });
  }

  initializePropertiesDocument(uuids: string[]): void {
    this.isLoadingDocument = true;

    forkJoin(uuids.map(nodeId => this.geranceAssociesService.getPropertiesFormDocument(nodeId)))
      .pipe(finalize(() => this.isLoadingDocument = false))
      .subscribe((resp: CustomerDocumentPropertiesGerance[]) => this.handleProduct(resp));
  }

  private handleProduct(resp: CustomerDocumentPropertiesGerance[]) {
    const metadata = resp.map(el => el.documentProperties);
    this.documents = resp.map(el => {
      return { ...el.documentProperties, ...el.document };
    });
    const firstMetadata = metadata[0];
    if (metadata.every(v => this.utils.isEqual(v, firstMetadata))) {
      const documentProperties = resp[0].documentProperties;

      this.filterDocumentType('sousFamille', documentProperties['fiducial:domainContainerSousFamille']);
      if (!!this.filteredDocumentType[0]) {
        const { labelSousFamille, famille, sousFamille, listeMetadatas } = this.filteredDocumentType[0];

        if (resp[0]['fiducial:domainContainerApplication'] !== 'Associe') {
          this.labelSousFamille = labelSousFamille;
          this.updateDocument.patchValue({ documentType: labelSousFamille });
        }
        this.updateDocument.patchValue({
          famille,
          sousFamille,
          typeDossierAssocie: this.geranceAssociesService.getTypeDossierAssocie(sousFamille)
        });
        this.inputs = this.geranceAssociesService.toFormGroup(listeMetadatas);
        for (const key in listeMetadatas) {
          if (Object.prototype.hasOwnProperty.call(listeMetadatas, key)) {
            const element = listeMetadatas[key];
            const formControl = new UntypedFormControl(
              documentProperties[element.metadata] ?? '',
              element.obligatoire ? Validators.required : null
            );

            if (this.updateDocument.contains(element.name)) {
              this.updateDocument.setControl(
                element.name,
                formControl
              );
            } else {
              this.updateDocument.addControl(
                element.name,
                formControl
              );
            }
          }
        }

        this.showCustomerForm = false;
        this.showDirectory = false;
      } else {
        this.updateDocument.patchValue({
          famille: documentProperties['fiducial:domainContainerFamille'],
          sousFamille: documentProperties['fiducial:domainContainerSousFamille'],
          typeDossierAssocie: this.geranceAssociesService.getTypeDossierAssocie(documentProperties['fiducial:domainContainerSousFamille'])
        });
      }
      const produit = this.inputs.filter(input => input.name === 'produit');
      if (produit[0]) {
        Object.assign(produit[0], {
          options: this.classements.produit.map(x => x.labelProduit)
            .sort((a, b) => this.utils.sortStrings(a, b))
        });
      }
      const categorieProduit = this.inputs;
      const listCategorieProduits = categorieProduit.filter(input => input.name === 'categorieProduit');
      if (listCategorieProduits[0]) {
        Object.assign(listCategorieProduits[0], {
          options: this.utils.removeDuplicates(this.classements.produit.map(el => el.labelCategorie)
            .sort((a, b) => this.utils.sortStrings(a, b)), 'labelCategorie')
        });
      }
    }
    this.filteredDocumentType = this.classements.associes.filter(el => !el.sousFamille.includes('gerance_assoc_reprise'))
      .sort((a, b) => this.utils.sortStrings(a.labelSousFamille, b.labelSousFamille));
    return resp;
  }

  toggle($event: MatCheckboxChange) {
    this.isMustTreated = $event.checked;
  }

  clearInput() {
    this.updateDocument.patchValue({documentType: ''});
  }
}
