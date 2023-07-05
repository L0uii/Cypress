import { finalize } from 'rxjs/operators';
import { RhExportService } from './../../services/rh-export.service';
import { GroupsEnums } from './../../enums/groups.enums';
import { GroupService } from './../../services/group.service';
import { SnackbarService } from './../../services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit, ViewEncapsulation } from '@angular/core';
import {Component} from '@angular/core';
import { UntypedFormGroup, FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UtilsService } from 'services/utils.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-home-rh-export',
  templateUrl: './home-rh-export.component.html',
  styleUrls: ['./home-rh-export.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeRhExportComponent implements OnInit {

  exportType: string;
  currentTab: string;

  isDap = false;

  mainForm: UntypedFormGroup;
  exportedDocumentForm: UntypedFormGroup;
  exportedOptionalDocumentForm: UntypedFormGroup;

  isPending = false;

  documentTypeList = [
    'Document A',
    'Document B',
    'Document C',
    'Document D',
    'Document E'
  ];

  maxDocuments = 5;

  exportedDocumentLabelMapper = {};
  exportedOptionalDocumentLabelMapper = {};

  matriculeList: string[] = [];

  selectedCsvFile: string;

  constructor(
    private route: ActivatedRoute,
    private snack: SnackbarService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private rhExportService: RhExportService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.setSubspace();
    this.buildMainForm();
    this.getLists();
  }

  getLists() {
    this.isPending = true;
    forkJoin({
      rhExportListeDeMarcheFormation: this.rhExportService.getRhExportListeDeMarcheFormation(),
      rhExportListeDeMarcheFormationDAP: this.rhExportService.getRhExportListeDeMarcheFormationDAP()
    })
      .pipe(finalize(() => this.isPending = false))
      .subscribe(lists => {
        this.exportExportedOptionalDocumentForm(lists.rhExportListeDeMarcheFormation.sort((a, b) => this.utils.sortStrings(a['label'], b['label'], false)));
        this.buildExportedDocumentForm(lists.rhExportListeDeMarcheFormationDAP.sort((a, b) => this.utils.sortStrings(a['label'], b['label'], false)));
      })
  }

  export() {
    this.isPending = true;
    this.rhExportService.exportDocuments()
      .pipe(finalize(() => this.isPending = false))
  }

  newSearch() {
    this.snack.openInfo('Functionality yet to be implemented');
  }

  private setSubspace() {
    const tabMapper = {
      'perte-marche': 'Perte de marché',
      'autre-type': 'Autres types de documents',
      bulletins: 'Bulletins'
    };
    this.currentTab = this.route.snapshot.url[0]?.path ?? 'perte-marche';
    this.exportType = tabMapper[this.currentTab];
    this.isDap = this.groupService.isInGroups([GroupsEnums.isUserExportDap]);
  }

  private buildMainForm() {
    this.mainForm = this.formBuilder.group({
      dateDebut: [''],
      dateFin: [''],
      matricules: [''],
      listeMatricules: ['']
    });
  }

  private buildExportedDocumentForm(list) {
    let formEntries = {};
    list.forEach(item => formEntries[item.famille] = item.label);
    this.exportedDocumentLabelMapper = formEntries;

    this.exportedDocumentForm = this.formBuilder.group(this.getEntriesFromMapper(list));
  }

  private exportExportedOptionalDocumentForm(list) {
    let formEntries = {};
    list.forEach(item => formEntries[item.famille] = item.label);
    this.exportedOptionalDocumentLabelMapper = formEntries;

    this.exportedOptionalDocumentForm = this.formBuilder.group(this.getEntriesFromMapper(list));
  }

  private getEntriesFromMapper(list): object {
    let values = {};
    list.forEach(item => {
      values[item.famille] = [item.option];
    });

    return values;
  }

  loadCsv(inputElement: HTMLInputElement): void {
    const file = inputElement.files[0];
    this.selectedCsvFile = file.name;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const matricules = xlsx.utils.sheet_to_txt(worksheet)
        .split('\n')
        .map(m => m.trim());

      if (matricules.some(m => isNaN(Number.parseInt(m)))) {
        this.snack.openError('Invalid CSV file');
        return;
      }

      // For testing purposes
      // TODO: remove when the implementation of page is done
      console.log('Matricules: ', matricules);
      this.matriculeList = matricules;
    }

    reader.readAsArrayBuffer(file);
  }

  clearCsv(): void {
    this.matriculeList = [];
    this.selectedCsvFile = undefined;
  }
}
