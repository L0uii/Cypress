import { ConseilService } from 'services/conseil.service';
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {SnackbarService} from 'services/snackbar.service';
import {AuthenticationService} from '@alfresco/adf-core';
import {environment} from 'environments/environment';
import {UtilsService} from 'services/utils.service';
import {FetchDataService} from 'services/fetch-data.service';
import {SearchParams, SearchResult} from 'models/search';
import {ConseilCustomer} from '../../../models/conseil';

@Component({
  selector: 'app-conseil-customer',
  templateUrl: './conseil-customer.component.html',
  styleUrls: ['./conseil-customer.component.scss']
})
export class ConseilCustomerComponent implements OnInit {
  @Output() sync = new EventEmitter();
  uploadForm: UntypedFormGroup;
  customer = '';
  directory = [];
  searchParams: SearchParams = {
    searchQuery: '',
    maxItems: 100,
    skipCount: 0
  };
  id: string;
  showCustomerInfo = false;
  isNewCustomer = false;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private snack: SnackbarService,
    private auth: AuthenticationService,
    private utils: UtilsService,
    private searchData: FetchDataService,
    private formBuilder: UntypedFormBuilder,
    private conseilService: ConseilService
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.uploadForm = this.formBuilder.group({
      numeroClient: ['', [Validators.maxLength(8), Validators.required]],
      nom: ['', Validators.required],
      codePostal: ['', [Validators.maxLength(5), Validators.minLength(5), Validators.required]],
      codeBudget: ['', [Validators.maxLength(5), Validators.minLength(5), Validators.required]],
    });
  }

  send(): void {
    if (this.uploadForm.valid) {
      const { numeroClient, codePostal, codeBudget } = this.uploadForm.value;
      const inputNom: string = this.uploadForm.value.nom;

      const splitNom = inputNom.split(' ');
      const prenom = splitNom[0].toUpperCase().trim();
      const nom = splitNom.slice(1, splitNom.length).join(' ').toUpperCase().trim();

      const documentProperties = JSON.stringify({
        'cmis:name': numeroClient,
        'cm:author': this.auth.getEcmUsername(),
        'cm:isContentIndexed': true,
        'fiducial:domainContainerBranche': 'documentlibrary',
        'fiducial:domainContainerSociete': 'Liste_clients_conseil',
        'fiducial:domainContainerApplication': 'Conseil',
        'fiducial:domainContainerFamille': 'Conseil',
        'fiducial:domainContainerSousFamille': 'Clients',
        'liste:NumeroDossier': numeroClient,
        'liste:Nom': nom,
        'liste:Preom': prenom,
        'contact:cp': codePostal,
        'fp:codeBudget': codeBudget
      });

      const send = this.isNewCustomer ?
        this.conseilService.createCustomer(documentProperties) :
        this.conseilService.updateCustomer(this.id, documentProperties);

      send.subscribe(
        response => {
          this.snack.openSuccess(`Le client '${nom}' a été ${this.isNewCustomer ? 'créé' : 'modifié'} avec succès.`);
          this.formDirective.resetForm();
          this.initializeForm();
          this.showCustomerInfo = false;
        },
        error => {
          this.snack.openInfo(`Erreur lors de la ${this.isNewCustomer ? 'création' : 'modification'} du client.`);
        }
      );
    } else {
      this.snack.openInfo(`Vous devez remplir toutes les informations pour ${this.isNewCustomer ? 'créer' : 'modifier'} un client`);
    }
  }

  closeDirectory(): void {
    this.customer = '';
    this.directory = [];
  }

  searchCustomers(): void {
    if (this.customer) {
      this.initializeForm();
      this.searchParams.searchQuery = ` AND (liste:NumeroDossier:"${this.customer}*"`;
      this.searchParams.searchQuery += ` OR liste:Nom:"${this.utils.removeAccents(this.customer)}*")`;
      this.searchData.conseilCustomers(this.searchParams).subscribe((res) => this.handleSearchCustomers(res));
    }
  }

  handleSearchCustomers(resp: SearchResult) {
    const {entries} = resp;
    this.directory = entries;
    this.isNewCustomer = this.directory.length <= 0;
  }

  select(customer: ConseilCustomer): void {
    this.id = customer.id;
    this.uploadForm.patchValue({
      numeroClient: customer.NumeroDossier,
      codeBudget: customer.CodeBudget,
      codePostal: customer.CodePostal,
      nom: `${customer.Prenom ? customer.Prenom + ' ' : ''}${customer.Nom}`
    });
    this.showCustomerInfo = true;
    this.sync.emit(this.uploadForm);
    this.closeDirectory();
  }

  showNewCustomer(): void {
    this.initializeForm();
    this.closeDirectory();
    this.isNewCustomer = true;
    this.showCustomerInfo = true;
  }

  setCustomerNumber(event: Event): void {
    event.preventDefault();
    this.uploadForm.patchValue({numeroClient: '00000000'});
  }

}
