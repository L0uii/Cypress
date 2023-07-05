import { Observable } from 'rxjs';
import { UtilsService } from 'services/utils.service';
import { MailService } from 'services/mail.service';
import { DownloadService } from 'services/download.service';
import { MissingDocumentByOnglet, MissingDocuments, MissingDocumentsByEmployee, MissingDocumentsMrService, SimpleMissingDocuments } from 'services/missing-documents-mr.service';
import { LabelValue } from 'models/archives-presidence';
import { ExpertiseService } from 'services/expertise.service';
import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { SearchDossierExpertiseService } from 'services/search-dossier-expertise.service';
import { finalize, switchMap, tap, takeUntil, take, filter, distinctUntilChanged, map } from 'rxjs/operators';
import { CustomerExpertise } from 'models/customer-expertise';
import { UserService } from 'services/user.service';
import { of, Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

interface CustomerMissingDocuments extends CustomerExpertise {
  email?: string;
}

@Component({
  selector: 'app-missing-documents-mr',
  templateUrl: './missing-documents-mr.component.html',
  styleUrls: ['./missing-documents-mr.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MissingDocumentsMrComponent implements OnDestroy {

  form: UntypedFormGroup;
  showDirectory = true;
  eventsDossier: Subject<void> = new Subject<void>();
  customerSearchPending: boolean;
  documentsSearchPending: boolean;
  showButtons: boolean = false;
  customer: CustomerMissingDocuments;
  profileTypes: LabelValue[] = [
    {label: 'Entreprise individuelle', value: 'EntrepriseIndividuelle'},
    {label: 'Société', value: 'Societe'},
    {label: 'Autres personnes morales', value: 'AutresPersonnesMorales'},
  ];
  documentTypes: LabelValue[] = [
    { label: 'Documents comptables, fiscaux et de gestion', value: 'ComptaFiscalGestion'},
    { label: 'Documents sociaux', value: 'Social'}
  ];
  dossierList: CustomerExpertise[] = [];

  missingDocumentsList: MissingDocuments[] = [];
  private missingDocumentsByType: { [documentType: string]: MissingDocuments[] } = {};
  missingDocumentsByOnglet: MissingDocumentByOnglet[];

  missingDocumentsByEmployee: MissingDocumentsByEmployee[];
  private allDocumentsByEmployee: MissingDocumentsByEmployee[];
  missingDocumentsByEmployeeByOnglet: {
    name: string;
    documents: MissingDocumentByOnglet[];
    missingCount: number;
  }[];

  ngUnsubscribe$ = new Subject();

  filterDocumentsToggle = new UntypedFormControl(false);

  missingDocumentsStatus: 'SomeMissing' | 'AllMissing' | 'NoneMissing';
  private readonly selectedCustomerSessionKey = 'GED.selectedCustomer';

  constructor(
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private searchDossierExpertiseService: SearchDossierExpertiseService,
    private missingDocumentsService: MissingDocumentsMrService,
    private expertiseService: ExpertiseService,
    private file: DownloadService,
    private mailService: MailService,
    private utils: UtilsService
  ) {
    this.form = this.fb.group({
      profileType: [null, Validators.required],
      documentType: [null, Validators.required]
    })
    this.getCustomersSubscription();
    this.documentTypeSubscription();
    this.formSubscription();
    this.slideToggleSubscription();

    if(sessionStorage.getItem(this.selectedCustomerSessionKey)) {
     this.addCustomer(JSON.parse(sessionStorage.getItem(this.selectedCustomerSessionKey)));
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  addCustomer(customer: CustomerExpertise): void {
    this.customer = customer
    this.expertiseService.getCustomerEmail(customer.numeroDossier)
      .pipe(take(1))
      .subscribe((email) => this.customer.email = email);
    this.showDirectory = false;
    sessionStorage.setItem(this.selectedCustomerSessionKey, JSON.stringify(customer));
  }

  clearCustomer(): void {
    this.eventsDossier.next();
    this.customer = null;
    this.showDirectory = true;
    this.missingDocumentsList = [];
    this.missingDocumentsByType = {};
    this.missingDocumentsByOnglet = [];
    sessionStorage.removeItem(this.selectedCustomerSessionKey);
  }

  reset(): void {
    this.clearCustomer();
    this.form.reset({
      profileType: null,
      documentType: null
    });
    this.showButtons = false;
  }

  envoyerEmailClient(): void {
    const { email, numeroDossier } = this.customer;
    const missingDocuments = this.missingDocumentsList.filter(m => m.isMissing && m.showOnEmail);

    if (this.isSocial) {
      this.mailService.sendEmailMissingDocumentsSocial(email, numeroDossier, missingDocuments);
    } else {
      const { profileType, documentType } = this.getFiltersLabels();
      this.mailService.sendEmailMissingDocuments(
        email,
        numeroDossier,
        missingDocuments,
        profileType,
        documentType
      );
    }
  }

  telechargerMissingCsv() {
    this.telechargerCsv(true);
  }

  telechargerPresentCsv() {
    this.telechargerCsv(false);
  }

  getMissingDocumentsByOnglet(missingDocumentsList: MissingDocuments[], showMissingOnly?: boolean): MissingDocumentByOnglet[] {
    const ongletOrderMapper = {
      'Comptabilité / Gestion': 1,
      'Fiscal': 2,
      'Juridique': 3,
      'Généralités': 4,
      'Fiducial': 5
    };

    return [...missingDocumentsList]
      .sort((a) => a.isMissing ? -1 : 1)
      .sort((a, b) => this.utils.sortStrings(a.nomDocument, b.nomDocument))
      .reduce((acc, cur) => {
        const { nomDocument, isMissing, commentaires, onglet } = cur;

        if (!showMissingOnly || showMissingOnly && isMissing) {
          const ongletData = acc.find((a) => a.onglet === onglet);
          if (ongletData) {
            ongletData.docList.push({
              name: nomDocument,
              isMissing,
              commentaires,
            });
          } else {
            acc.push({
              onglet,
              docList: [{
                name: nomDocument,
                isMissing,
                commentaires,
              }],
              order: ongletOrderMapper[onglet]
            });
          }
        }
        return acc;
      }, [])
      .sort((a, b) => a.order - b.order);
  }

  private getMissingDocumentsByEmployee(showMissingOnly: boolean) {
    if (!showMissingOnly) {
      this.missingDocumentsByEmployee = this.allDocumentsByEmployee.slice();
      this.missingDocumentsByEmployeeByOnglet = this.getMissingDocumentsByEmployeeByOnglet();
    } else {
      this.missingDocumentsByEmployee = this.allDocumentsByEmployee.filter(a => a.missingCount > 0).map(
        m => {
          const { name, missingCount } = m;
          const documents = m.documents.filter(d => d.isMissing);

          return {
            name,
            documents,
            missingCount
          }
        }
      )
      this.missingDocumentsByEmployeeByOnglet = this.getMissingDocumentsByEmployeeByOnglet();
    }
  }

  private getCustomersSubscription(): void {
    this.userService.selectedCodeBudgetRef
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        switchMap(
          (codeBudget: string) => {
            if (this.customer) {
              this.reset();
            }
            this.customerSearchPending = true;
            return this.searchDossierExpertiseService.getCustomers(codeBudget)
             .pipe(finalize(() => this.customerSearchPending = false));
          }
        )
      )
      .subscribe((res) => this.dossierList = res);
  }

  private documentTypeSubscription(): void {
    this.documentTypeControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        this.showButtons = false;

        if (value === 'Social') {
          this.profileTypeControl.setValue(null, { emitEvent: false });
          this.profileTypeControl.disable();
          return;
        }

        if (this.profileTypeControl.disabled) {
          this.profileTypeControl.enable();
        }
      });
  }

  private formSubscription(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        distinctUntilChanged((a, b) => this.utils.isEqual(a, b)),
        filter(value => {
          if (value.documentType === 'Social') {
            return true;
          }
          return value.documentType && value.profileType;
        }),
        tap(() => this.missingDocumentsList = []),
        switchMap(value => {
          this.showButtons = false;
          if (value.documentType === 'Social') {
            return this.getMissingDocumentsSocial();
          }
          return this.getMissingDocumentsComptables(value.profileType);
        })
      )
      .subscribe(rows => {
        this.filterDocumentsToggle.patchValue(false, { emitEvent: false });
        this.missingDocumentsList = rows;
        this.getMissingStatus(rows);
        this.missingDocumentsByOnglet = this.getMissingDocumentsByOnglet(rows);
        if (this.documentTypeControl.value === 'Social') {
          this.showButtons = this.allDocumentsByEmployee.length > 0;
        } else {
          this.showButtons = this.missingDocumentsStatus !== 'NoneMissing';
        }
      })
  }

  private slideToggleSubscription() {
    this.filterDocumentsToggle.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(value => {
        this.missingDocumentsByOnglet = this.getMissingDocumentsByOnglet(this.missingDocumentsList, value);
        if (this.isSocial) {
          this.getMissingDocumentsByEmployee(value);
        }
      });
  }

  private getMissingDocumentsComptables(profileType: string) {
    if (profileType in this.missingDocumentsByType) {
      return of(this.missingDocumentsByType[profileType]);
    }

    this.documentsSearchPending = true;

    return this.missingDocumentsService.getMissingDocumentsComptables(profileType, this.customer)
      .pipe(
        tap(res => this.missingDocumentsByType[profileType] = res),
        finalize(() => this.documentsSearchPending = false)
      );
  }

  private getMissingDocumentsSocial(): Observable<MissingDocuments[]> {
    if ('Social' in this.missingDocumentsByType) {
      return of(this.missingDocumentsByType['Social']);
    }

    this.documentsSearchPending = true;

    return this.missingDocumentsService.getMissingDocumentsSocial(this.customer)
      .pipe(
        tap(res => {
          this.missingDocumentsByType['Social'] = res.documentList;
          this.allDocumentsByEmployee = res.byEmployeeList;
          this.missingDocumentsByEmployee = this.allDocumentsByEmployee.slice();
          this.missingDocumentsByEmployeeByOnglet = this.getMissingDocumentsByEmployeeByOnglet();
        }),
        finalize(() => this.documentsSearchPending = false),
        map((res) => res.documentList)
      );
  }

  private getMissingDocumentsByEmployeeByOnglet() {
    return this.missingDocumentsByEmployee.map(m => {
      const { name, documents, missingCount } = m;
      return {
        name,
        documents: this.getMissingDocumentsByOnglet(documents),
        missingCount
      }
    });
  }

  private getFiltersLabels() {
    const profileType = this.profileTypes.find(p => p.value === this.profileTypeControl.value).label;
    const documentType = this.documentTypes.find(p => p.value === this.documentTypeControl.value).label;

    return { profileType, documentType };
  }

  private telechargerCsv(isMissing: boolean) {
    if (this.isSocial) {
      this.file.downloadCSVForMissingDocumentsSocial(
        this.missingDocumentsList,
        this.customer.numeroDossier,
        this.missingDocumentsByEmployee,
        isMissing
      )
    } else {
      const { profileType, documentType } = this.getFiltersLabels();
      this.file.downloadCSVForMissingDocuments(
          this.missingDocumentsList,
          this.customer.numeroDossier,
          profileType,
          documentType,
          this.documentTypeControl.value,
          isMissing
        );
    }
  }

  private getMissingStatus(rows: MissingDocuments[]) {
    const missingDocs = rows.filter(r => r.isMissing);
    if (missingDocs.length === 0) {
      this.missingDocumentsStatus = 'NoneMissing';
    } else if (missingDocs.length === rows.length) {
      this.missingDocumentsStatus = 'AllMissing';
    } else {
      this.missingDocumentsStatus = 'SomeMissing';
    }
  }

  private get documentTypeControl() {
    return this.form.get('documentType');
  }
  private get profileTypeControl() {
    return this.form.get('profileType');
  }

  private get isSocial() {
    return this.documentTypeControl.value === 'Social';
  }
}
