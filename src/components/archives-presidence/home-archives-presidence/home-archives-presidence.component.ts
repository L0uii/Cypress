import {Component, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepicker } from '@angular/material/datepicker';
import {LabelValue, METADATAS} from 'models/archives-presidence';
import {SearchResult, SortBy} from 'models/search';
import {ArchivesPresidenceService} from 'services/archives-presidence.service';
import {UpdateResultsService} from 'services/update-results.service';
import {UtilsService} from 'services/utils.service';
import {SPACE} from '@angular/cdk/keycodes';
import moment from 'moment-es6';
import {cloneDeep} from 'lodash';
import {Columns} from 'enums/columns.enum';

@Component({
  selector: 'app-home-archives-presidence',
  templateUrl: './home-archives-presidence.component.html',
  styleUrls: ['./home-archives-presidence.component.scss'],
})
export class HomeArchivesPresidenceComponent implements OnInit {
  // Toggle sideNav
  sideNavOpen = false;

  // SortBy
  filterFields = this.archivesPresidenceService.sortBy;
  filtersOrder = this.archivesPresidenceService.order;
  selectedSortByField = this.filterFields[0].label;
  selectedSortByOrder = this.filtersOrder[0].label;
  sortBy: SortBy = {
    field: this.filterFields[0].value,
    ascending: this.filtersOrder[0].value
  };

  // inputs
  metadatas = cloneDeep(METADATAS);
  inputs: any = this.metadatas.slice(0).reduce((o, key) => Object.assign(o, {[key.name]: {...key, value: undefined, actif: false}}), {});
  separatorKeysCodes: number[] = [SPACE];
  // Listes valeurs
  classements = {};
  filtered = {};


  // Onglets
  tabs: Home.Tabs = {
    CONSULTATION: {
      name: 'Archives',
      fetchFn: 'getArchivesPresidence',
      columns: [
        Columns.Select,
        Columns.Titre_AP,
        Columns.Date_AP,
        Columns.Nature_AP,
        Columns.Annee_AP,
        Columns.Dossier_AP,
        Columns.Localisation_AP,
        Columns.Thematique_AP,
        Columns.Remarques_AP,
        Columns.Options_AP
      ]
    }
  };
  // valeurs inputs
  searchQuery = '';

  currentYear = new Date().getFullYear();

  constructor(
    private archivesPresidenceService: ArchivesPresidenceService,
    private utils: UtilsService,
    private updateService: UpdateResultsService,
  ) {
  }

  onSync(key: string): any {
    return ({pagination: {totalItems}}: SearchResult) => {
      this.tabs[key].count = totalItems;
    };
  }

  onFocus(event: Event, trigger: any): void {
    event.preventDefault();
    trigger.openPanel();
  }

  // Affichage side nav
  refreshNav(value: any): void {
    this.sideNavOpen = value;
  }

  toggleNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
  }

  setSortByField(field: LabelValue): void {
    this.sortBy.field = field.value;
    this.selectedSortByField = field.label;
    this.updateService.triggerRefreshChange(true);
  }

  setSortByOrder(order: LabelValue): void {
    this.sortBy.ascending = order.value;
    this.selectedSortByOrder = order.label;
    this.updateService.triggerRefreshChange(true);
  }

  filterSideNavFields = (input: any): boolean => {
    return input.position === 'sidenav';
  };

  // Mat-chip
  add(event: MatChipInputEvent): void {
    const { input, value } = event;
    if (value?.trim()) {
      if (this.inputs['keywords']['value']) {
        this.inputs['keywords']['value'].push(value.trim());
      } else {
        this.inputs['keywords']['value'] = [value.trim()];
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.search();
  }

  remove(value: any): void {
    const array = this.inputs['keywords'].value;
    const index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    this.search();
  }

  // Mat-datepicker year
  setYear(input: any, selectedDate: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    const date = new UntypedFormControl(moment());
    const ctrlValue = date.value;
    ctrlValue.year(selectedDate.year());
    ctrlValue.month(11);
    ctrlValue.date(31);
    this.inputs[input].value = ctrlValue;
    this.inputs[input]['typedDate'] = selectedDate.format('YYYY');
    datepicker.close();
    this.search();
  }

  // Autocomplete select
  filterOptions(value: string, array: string): any[] {
    if (value) {
      return this.filtered[array] = this.classements[array].filter(el =>
        this.utils.removeAccents(el.label).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    } else {
      return this.filtered[array] = this.classements[array]
        .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true}));
    }
  }

  setValue(value: string, input: string): void {
    if (value) {
      this.inputs[input].value = value;
      this.search();
    }
  }

  search(): void {
    let searchQuery = '';
    for (const key in this.inputs) {
      if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
        const input = this.inputs[key];
        input.actif = input.value || false;
        if (input.value) {
          if (input.type === 'year' || input.type === 'date') {
            searchQuery = `${searchQuery} AND ${input.metadata}:${moment(input.value).format('YYYY-MM-DD')}*`;
          } else if (input.type === 'tags') {
            const keywords = input.value.forEach(keyword => {
              searchQuery = `${searchQuery} AND ${input.metadata}:${keyword}*`;
            });
          } else if (input.name === 'titre') {
            searchQuery = `${searchQuery} AND (${input.metadata}:${input.value}* OR cm:content:${input.value}*)`;
          } else if (input.name === 'sommaire') {
            searchQuery = `${searchQuery} AND (${input.metadata}:${input.value}* OR cm:content:${input.value}*)`;
          } else if (input.type === 'dateRange') {
            const dateQuery = this.utils.getDateQuery(
              input.value,
              input.label,
              input.metadata
            );
            if (dateQuery) {
              searchQuery = `${searchQuery} ${dateQuery }`
            } else {
              input.actif = false;
              return;
            }
          } else {
            searchQuery = `${searchQuery} AND ${input.metadata}:${input.value.trim()}*`;
          }
        }

      }
    }
    this.searchQuery = searchQuery;
    return;
  }

  clearAll(): void {
    for (const key in this.inputs) {
      if (Object.prototype.hasOwnProperty.call(this.inputs, key)) {
        this.inputs[key].value = undefined;
        this.inputs[key].actif = false;
        if (this.inputs[key]['typedValue']) {
          this.inputs[key]['typedValue'] = undefined;
        }
        if (this.inputs[key]['typedDate']) {
          this.inputs[key]['typedDate'] = '';
        }
      }
    }
    this.filtered = this.classements;
    this.searchQuery = '';
    this.search();
  }

  clearInput(input: string): void {
    this.inputs[input].value = undefined;
    this.inputs[input].actif = false;
    if (this.inputs[input]['typedValue']) {
      this.inputs[input]['typedValue'] = undefined;
    }
    if (this.inputs[input]['typedDate']) {
      this.inputs[input]['typedDate'] = '';
    }
    if (this.inputs[input]['options']) {
      this.filtered[input] = this.classements[input];
    }
    this.search();
  }

  init(): void {
    this.metadatas.forEach(metadata => {
      const hasOptions = metadata.type === 'optionsArray' || metadata.type === 'optionsObject';
      if (hasOptions) {
        const options =
          metadata.type === 'optionsArray' ?
            metadata['options']
              .map(el => ({label: el, value: this.utils.removeAccents(el.toUpperCase()).replace(/\s|\//g, '_')}))
              .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true})) :
            metadata.type === 'optionsObject' ?
              metadata['options']
                .sort((a, b) => a.label.localeCompare(b.label, 'fr', {ignorePunctuation: true})) :
              null;
        this.classements[metadata.name] = options;
        this.filtered[metadata.name] = options;
      }
    });
  }

  ngOnInit() {
    this.init();
    this.search();
  }
}
