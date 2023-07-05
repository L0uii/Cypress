import { MailService } from 'services/mail.service';
import {UserService} from 'services/user.service';
import {GeranceAssociesService} from 'services/gerance-associes.service';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {AuthenticationService,SearchService} from '@alfresco/adf-core';
import {FetchDataService} from 'services/fetch-data.service';
import {CustomMatPaginatorIntl} from 'services/custom-mat-paginator-intl';
import {FixedMatTableDataSource, nextSearchState} from 'utils/paginator';
import {SearchEntries, SearchParams, SearchResult, SortBy} from 'models/search';
import {GroupService} from 'services/group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from 'services/snackbar.service';
import {PreviewService} from 'services/preview.service';
import {UpdateResultsService} from 'services/update-results.service';
import {DownloadService} from 'services/download.service';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {Columns} from 'enums/columns.enum';
import {ContextSearchExpertise} from 'models/context-search-expertise';
import {FilePropertiesGeranceAssocies} from 'models/file-properties-gerance-associes';
import {FilePropertiesExpertise} from 'models/file-properties-expertise';
import {FilePropertiesArchives} from 'models/file-properties-archives';
import {FilePropertiesConseil} from 'models/file-properties-conseil';
import {GroupsEnums} from 'enums/groups.enums';
import { filter, takeUntil, tap, switchMap } from 'rxjs/operators';
import {AlertData, AlertMessageService} from 'app/modules/shared/alert-message/alert-message.service';
import {DeleteDocumentService} from 'components/delete-document/delete-document.service';
import {Pagination} from '@alfresco/js-api';import {ExpertiseService} from '../../services/expertise.service';

@Component({
  selector: 'app-base-search-tab',
  templateUrl: './base-search-tab.component.html',
  styleUrls: ['./base-search-tab.component.scss'],
  providers: [
    SearchService,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class BaseSearchTabComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @Input() sortBy: SortBy = {field: 'created', ascending: false};
  @Input() name: string;
  @Input() fn: string;
  @Input() columns: Columns[];
  @Input() searchQuery: string;
  @Input() isGroupBy: boolean;
  @Input() space: string;
  @Input() savedSearch: string;
  @Input() isOpen: boolean;
  @Input() pageSize: number;
  @Input() tab: string;
  @Input() codeClient: string;
  @Input() pending: boolean;
  @Input() context: ContextSearchExpertise;
  @Input() limitSelection = 30;
  @Input() keywords: string[];
  @Input() dossierList: { nomDossier: string, numeroDossier: string }[];
  @Input() refresh$: Subject<boolean>;
  @Input() homeRowName: string;
  @Output() changeDocument = new EventEmitter<Array<FilePropertiesConseil | FilePropertiesExpertise | FilePropertiesGeranceAssocies | FilePropertiesArchives>>();
  @Output() changeGeranceAssociesATraiter = new EventEmitter<Array<FilePropertiesGeranceAssocies>>();
  @Output() changeGeranceAssociesStatDoc = new EventEmitter<Array<FilePropertiesGeranceAssocies>>();
  @Output() totalPending = new EventEmitter();
  @Output() syncSideNav = new EventEmitter();
  @Output() sync = new EventEmitter();
  @Output() changeHomeCategory = new EventEmitter();
  showInputSave = false;
  searchName: string;
  showADV = false;
  showConseil = false;
  showFidusign = false;
  showExpertise = false;
  showSofiral = false;
  showGeranceAssocies = false;
  showArchives = false;
  moduleHasToolbar = false;
  selectedIndexMetiers = -1;
  fixedMatTableDataSource = new FixedMatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  selected: number;
  searchParams: SearchParams = {
    searchQuery: '',
    maxItems: 100,
    skipCount: 0,
    sortBy: this.sortBy
  };
  resultLength: number; // Number of elements returned by the api
  ColumnsType = Columns;
  apiPagination: Pagination;
  hidePageSize = this.showFidusign;
  lastSearch: SearchParams = null;
  codeBudgets = [];
  show = false;
  isUserConseilSiege: boolean;
  isUserConseilBO: boolean;
  isUserConseilCGP: boolean;
  isUserConseilPlateForm: boolean;
  isUserArchives: boolean;
  isUserGeranceAssociesPartenaire: boolean;
  isUserGeranceAssociesAssociesBO: boolean;
  isUserGeranceAssociesAssociesSUPP: boolean;
  isUserGeranceAssociesAssociesRECL: boolean;
  isUserGeranceAssociesAssociesCONSULT: boolean;
  isUserGeranceAssociesAssociesCONSULT_RECL: boolean;
  isUserGeranceAssociesPartenaireBO: boolean;
  isUserGeranceAssociesPartenaireSUPP: boolean;
  isDocGeranceAssocies: boolean;
  isDocGeranceAssociesReclamation: boolean;
  isATraiter = false;

  isDocGeranceAssociesWithStat: boolean;
  isGeranceAssociesATraiter = false;
  isUserGeranceAssociesAssociesCONTROL: boolean;

  readonly rights: Array<string>;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  entries: SearchEntries[];
  destroy$ = new Subject();
  triggerSearch$ = new Subject();

  private isDialogOpened: boolean;
  private baseSearchTabId = Math.floor(Math.random() * Date.now());

  get totalItems(): number {
    return this.fixedMatTableDataSource.totalItems ?? 0;
  }

  constructor(
    private searchData: FetchDataService,
    private preview: PreviewService,
    private router: Router,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private snack: SnackbarService,
    private alertMessageService: AlertMessageService,
    private file: DownloadService,
    private updateService: UpdateResultsService,
    private groupService: GroupService,
    private deleteDocumentService: DeleteDocumentService,
    private geranceAssociesService: GeranceAssociesService,
    private authenticationService: AuthenticationService,
    private expertiseService: ExpertiseService,
    private userService: UserService,
    private mailService: MailService
  ) {
    this.rights = this.groupService.rights;
    this.updateService.mustRefreshChange
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean))
      .subscribe(() => this.searchResetingTable());
    this.searchSubscription();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && !changes['isOpen'].firstChange) {
      return;
    }

    if (changes['dossierList']) {
      this.completeWithName();
    }

    const searchQueryChange = changes['searchQuery'];
    if (searchQueryChange) {
      const routerUrl = this.router.url;
      if (routerUrl.includes('expertise-consulting') || routerUrl.includes('sofiral')) {
        if (!searchQueryChange.firstChange || (!searchQueryChange.previousValue && searchQueryChange.currentValue)) {
          this.triggerSearch$.next();
        }
      } else {
        this.triggerSearch$.next();
      }
    }
    if (this.fixedMatTableDataSource) {
      this.paginateToFirstPage();
    }
    this.selection.changed
      .pipe(takeUntil(this.destroy$))
      .subscribe(selection => {

        if (this.space === 'expertise_home') {
          const selectedDocuments = selection.source.selected.map(selected => this.addIdToDocument(selected));
          const selectedDocumentsOutside = this.deleteDocumentService.documentsToBeDeleted
            .filter(documentsToBeDeleted => documentsToBeDeleted.baseSearchTabId !== this.baseSearchTabId);
          this.deleteDocumentService.documentsToBeDeleted = [...selectedDocumentsOutside, ...selectedDocuments];
        }

        if (selection.source.selected.length > 0) {
          if (this.deleteDocumentService.documentsToBeDeleted.length > this.limitSelection) {
            this.openAlert();
          }

          if (selection.source.selected[0].TypeDocumentGerance) {
            this.isDocGeranceAssocies = selection.source.selected.every(type => type.TypeDocumentGerance.indexOf('gerance_assoc') !== -1);
            this.isDocGeranceAssociesReclamation = selection.source.selected.every(
              type => type.TypeDocumentGerance.indexOf('gerance_assoc_reclamations') !== -1);
          }
          this.selected = selection.source.selected.length;
        }
      });
  }

  async ngOnInit() {
    if (this.refresh$) {
      this.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.searchResetingTable());
    }

    this.updateService.refreshDocumentList$
      .pipe(
        takeUntil(this.destroy$),
        filter(baseSearchTabId => baseSearchTabId === this.baseSearchTabId))
      .subscribe(() => this.searchResetingTable());

    this.isATraiter = this.route.routeConfig.path.startsWith('traitement');

    switch (this.space) {
      case 'adv':
        this.showADV = true;
        this.moduleHasToolbar = true;
        break;
      case 'conseil':
        this.showConseil = true;
        this.moduleHasToolbar = true;
        this.isUserConseilSiege = this.rights.includes(GroupsEnums.isUserConseilDRSiege);
        this.isUserConseilBO = this.rights.includes(GroupsEnums.isUserConseilBO);
        this.isUserConseilCGP = this.rights.includes(GroupsEnums.isUserConseilCGP);
        this.isUserConseilPlateForm = this.rights.includes(GroupsEnums.isUserConseilDRPlateforme);
        break;
      case 'fidusign':
        this.showFidusign = true;
        break;
      case 'expertise':
        this.showExpertise = true;
        this.moduleHasToolbar = true;
        break;
      case 'sofiral':
        this.showSofiral = true;
        this.moduleHasToolbar = true;
        break;
      case 'gerance_associes':
        this.moduleHasToolbar = true;
        this.showGeranceAssocies = true;
        this.isUserGeranceAssociesPartenaire = this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaire);
        this.isUserGeranceAssociesAssociesBO = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesBO);
        this.isUserGeranceAssociesAssociesSUPP = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesSUPP);
        this.isUserGeranceAssociesAssociesCONSULT = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT);
        this.isUserGeranceAssociesAssociesCONSULT_RECL = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONSULT_RECL);
        this.isUserGeranceAssociesAssociesRECL = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesRECL);
        this.isUserGeranceAssociesPartenaireBO = this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaireBO);
        this.isUserGeranceAssociesPartenaireSUPP = this.rights.includes(GroupsEnums.isUserGeranceAssociesPartenaireSUPP);
        this.isUserGeranceAssociesAssociesCONTROL = this.rights.includes(GroupsEnums.isUserGeranceAssociesAssociesCONTROL);
        this.isGeranceAssociesATraiter = this.route.routeConfig.path.startsWith('traitement');
        break;
      case 'archives_presidence':
        this.showArchives = true;
        this.isUserArchives = this.rights.includes(GroupsEnums.isUserArchivesPresidenceCONSULT);
        break;
      default:
        break;
    }
  }

  private searchResetingTable(): void {
    this.lastSearch = null;
    this.triggerSearch$.next();
  }

  deleteDocument(element: FilePropertiesArchives | FilePropertiesGeranceAssocies | FilePropertiesExpertise): void {
    this.deleteDocumentService.documentsToBeDeleted = [element];
    this.router.navigate([{outlets: {view: ['delete']}}]);
  }

  ngAfterViewInit() {
    this.fixedMatTableDataSource.paginator = this.paginator;
    this.fixedMatTableDataSource.sort = this.sort.toArray()[0];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.triggerSearch$.complete();
  }

  deleteDocuments(selectedDocuments: FilePropertiesArchives[]): void {
    this.deleteDocumentService.documentsToBeDeleted = selectedDocuments;
    this.router.navigate([{outlets: {view: ['delete']}}]);
  }

  copyToClipboard(event: PointerEvent, data: string): void {
    event.preventDefault();
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = data;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.openSuccess(`Numéro dossier copié !`);
  }

  // We only merge
  shouldMergeData(searchParams: SearchParams): boolean {
    if (this.lastSearch) {
      return this.lastSearch.searchQuery === searchParams.searchQuery &&
        this.lastSearch.maxItems === searchParams.maxItems &&
        this.lastSearch.sortBy.field === searchParams.sortBy.field &&
        this.lastSearch.sortBy.ascending === searchParams.sortBy.ascending;
    }
  }

  saveSearch(): void {
    let favourites: { name: string, query: string, keywords: string[] }[];
    const data = localStorage.getItem('favourites');

    if (data != null) {
      favourites = JSON.parse(data);
    } else {
      favourites = [];
    }

    favourites.push({
      name: this.searchName,
      query: this.searchQuery,
      keywords: this.keywords
    });
    localStorage.setItem('favourites', JSON.stringify(favourites));
    this.showInputSave = false;
    this.searchName = '';
  }

  updateConseil(selection: Array<FilePropertiesConseil>) {
    this.emitChangeDocument(this.changeDocument, selection);
  }

  updateGeranceAssocies(selection: Array<FilePropertiesGeranceAssocies>): void {
    this.emitChangeDocument(this.changeDocument, selection);
  }

  updateGeranceAssociesATraiter(selection: Array<FilePropertiesGeranceAssocies>): void {
    this.emitChangeDocument(this.changeGeranceAssociesATraiter, selection);
  }

  updateGeranceAssociesStatDoc(selection: Array<FilePropertiesGeranceAssocies>): void {
    this.emitChangeDocument(this.changeGeranceAssociesStatDoc, selection);
  }

  updateExpertise(selection: Array<FilePropertiesExpertise>): void {
    this.emitChangeDocument(this.changeDocument, selection);
  }

  handleSearchResponse(resp: SearchResult) {
    const initialQuery = {...this.searchParams};
    const {entries, pagination} = resp;
    const {count, totalItems, maxItems} = pagination;
    this.pending = false;

    if (maxItems > totalItems) {
      pagination.hasMoreItems = false;
    }

    if (count < maxItems) {
      pagination.totalItems = pagination.hasMoreItems ? totalItems - (maxItems - count) : count;
    }

    if (this.shouldMergeData(initialQuery)) {
      if (this.totalItems === totalItems && totalItems <= this.pageSize) {
        this.fixedMatTableDataSource.data = entries;
      } else {
        this.fixedMatTableDataSource.data = this.fixedMatTableDataSource.data.concat(entries);
      }
    } else {
      this.fixedMatTableDataSource.data = entries;
    }

    this.lastSearch = initialQuery;
    this.apiPagination = pagination;
    this.resultLength = count;
    this.fixedMatTableDataSource.totalItems = totalItems;
    this.fixedMatTableDataSource.paginator = this.paginator;
    if (!!this.dossierList) {
      this.completeWithName();
    }
    this.totalPending.emit(totalItems);
    this.sync.emit(resp);
  }

  updateArchives(selection: Array<FilePropertiesArchives>): void {
    const uuids = selection.map(el => el.id).join();
    this.router.navigate(['archives-presidence/modification', uuids]);
  }

  isDocWithStat(element: any): void {
    this.isDocGeranceAssociesWithStat = element.TypeDocumentGerance
      .includes('gerance_assoc_checklist_souscription') || element.TypeDocumentGerance
      .includes('gerance_assoc_bulletin_retrait') || element.TypeDocumentGerance.includes('gerance_assoc_checklist_successions_donations');
  }

  priseEnCharge(element: any) {
    const {firstName, lastName} = this.userService.currentUser;
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    this.geranceAssociesService.priseEnCharge(element.id, fullName)
      .then(res => {
        if (res.split(';')[0] === element.id) {
          this.snack.openSuccess('La prise en charge de ce document est enregistrée.');
          element.PriseEnChargePar = fullName;
          return;
        }
        this.snack.openError(`Une erreur s'est produite lors de l'exécution de l'action. Merci de renouveler votre "Prise en charge" ultérieurement.`);
      });
  }

  async transfer(element: FilePropertiesExpertise, category: string) {
    const response = await this.expertiseService.transfer(element.id, category);
    response.ok ? this.snack.openWarn('La demande de transfert a été prise en compte.') :
      this.snack.openWarn('La demande de transfert n\'a pas fonctionné.');
  }

  private searchSubscription(): void {
    this.triggerSearch$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.selection.clear();
          this.searchParams.searchQuery = this.searchQuery;
          this.searchParams.sortBy = this.sortBy;
          if (!this.shouldMergeData(this.searchParams)) {
            this.searchParams.skipCount = 0;
          }
          this.pending = true;
        }),
        switchMap(() => this.searchData.callMethodByName(this.fn, this.searchParams))
      )
      .subscribe((res) => this.handleSearchResponse(res));
  }

  paginateToFirstPage(): void {
    if (this.fixedMatTableDataSource.paginator) {
      this.fixedMatTableDataSource.paginator.firstPage();
    }
  }

  applyFilter(filterValue: string): void {
    this.lastSearch = null;
    this.fixedMatTableDataSource.filter = filterValue.trim().toLowerCase();
    this.paginateToFirstPage();
  }

  completeWithName(): void {
    this.fixedMatTableDataSource.data.forEach(element => {
      const dossier = this.dossierList.find(c => c.numeroDossier === element?.CodeClient);
      element.NomDossier = dossier?.nomDossier ?? 'Inconnu';
    });
  }

  onPaginationChange(pageEvent: PageEvent): void {
    const result = nextSearchState(this.apiPagination, pageEvent);
    if (!result) {
      return;
    }
    this.searchParams.skipCount = result.skipCount;
    this.triggerSearch$.next();
  }

  isDocReclamation(element: any): void {
    this.isDocGeranceAssociesReclamation = element.TypeDocumentGerance.includes('gerance_assoc_reclamations');
  }

  private addIdToDocument(document: Object): Object {
    return {...document, baseSearchTabId: this.baseSearchTabId};
  }

  downloadCSVForMR(data: FilePropertiesExpertise[], dossier: string): void {
    this.file.downloadCSVForMR(data, dossier);
  }

  downloadZIP(files: File[], user: string): void {
    this.file.downloadZIP(files, user);
  }

  downloadCSVForGeranceAssocies(file: File): void {
    this.file.downloadCSVForGeranceAssocies(file);
  }

  getCSV(data: any): void {
    this.file.getCSV(data);
  }

  showResource(resourceId: string): void {
    this.preview.showResource(resourceId);
  }

  showDocument(element: any, keywords: any[]): void {
    this.preview.showDocument(element, keywords);
  }

  openInNewTab(id: string): void {
    this.preview.openInNewTab(id);
  }

  download(file: FilePropertiesExpertise, isFacture: boolean): void {
    this.file.download(file, isFacture);
  }

  private openAlert(): void {
    if (this.isDialogOpened) {
      return;
    }

    const data: AlertData = {
      message: `Vous avez dépassé le nombre de documents pouvant être sélectionné : ${this.limitSelection} documents maximum`
    };

    this.isDialogOpened = true;
    this.alertMessageService.openAlertMessage({data: data})
      .afterClosed()
      .toPromise()
      .then(() => {
        this.selection.deselect(this.selection.selected[this.selection.selected.length - 1]);
        this.isDialogOpened = false;
      });
  }

  deselectAll(): void {
    this.selection.deselect(...this.selection.selected);
  }

  emitGeranceAgent(nom: string, code: string): void {
    this.geranceAssociesService.setAgentData(nom, code);
  }

  emitGeranceManager(nom: string, code: string): void {
    this.geranceAssociesService.setManagerData(nom, code);
  }

  repondreClient(customer: any) {
    this.expertiseService.getCustomerEmail(customer.CodeClient)
      .pipe(take(1))
      .subscribe((email) => this.mailService.sendClientResponseEmail(email, customer.CollecteMessage));
  }

  private emitChangeDocument(eventEmitter: EventEmitter<any>, selection: Array<FilePropertiesConseil
    | FilePropertiesExpertise
    | FilePropertiesGeranceAssocies
    | FilePropertiesArchives>)
    : void {
    this.updateService.baseSearchTabId = this.baseSearchTabId;
    eventEmitter.emit(selection);
  }

}
