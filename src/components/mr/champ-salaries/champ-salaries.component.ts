import { endpoints } from './../../../endpoints/endpoints';
import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';
import {UtilsService} from 'services/utils.service';

@Component({
  selector: 'app-champ-salaries',
  templateUrl: './champ-salaries.component.html',
  styleUrls: ['./champ-salaries.component.scss']
})
export class ChampSalariesComponent implements OnChanges, OnDestroy {
  @Input() input: any;
  @Input() isRequired: boolean;
  @Input() numeroDossier: string;
  @Output() selected = new EventEmitter();

  basicAuth = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);
  chargement = this.router.url.includes('telechargement');
  consultation = this.router.url.includes('consultation');
  update = this.router.url.includes('update');
  liste = [];
  filteredListe = this.liste;
  errors = {
    numero: false,
    numeroUpdate: false,
    API: false,
    results: false
  };
  @ViewChildren(MatAutocompleteTrigger) autoComplete: QueryList<MatAutocompleteTrigger>;

  constructor(private router: Router, private utils: UtilsService) {
  }

  onFocusSalarie(event, trigger) {
    event.preventDefault();
    trigger.openPanel();
  }

  filterEmployes(value) {
    if (value) {
      this.filteredListe = this.liste
        .filter(el =>
          this.utils.removeAccents(el).toLowerCase().indexOf(this.utils.removeAccents(value).toLowerCase()) !== -1)
        .sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
    } else {
      this.filteredListe = this.liste;
    }
  }

  async searchEmployees() {
    const isNumber = /^\d+$/;
    if (this.numeroDossier && isNumber.test(this.numeroDossier.trim())) {
      return await fetch(endpoints.frontGEDEmployeeList, {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Basic ' + this.basicAuth,
          clientCode: this.numeroDossier
        })
      }).then(resp => resp.json()).then(response => {
        if (response) {
          if (response.status === 500) {
            this.errors.API = true;
          } else if (response.length > 0) {
            this.liste = this.sortMaidenNames(response);
            this.filteredListe = this.liste;
          }
        } else {
          this.errors.results = true;
        }
      }).catch(error => this.errors.API = true);
    } else {
      this.update ? this.errors.numeroUpdate = true : this.errors.numero = true;
    }
  }

  sortMaidenNames(employeeList) {
    let filteredEmployeeList = new Array;
    employeeList.forEach(employee => {
      const { employeeName, employeeFirstName, employeeCommonName} = employee;
      if(employeeCommonName != null && !employeeName.includes(employeeCommonName)) { //If the commmon name is not null and the employee name does not already contain the common name then we have a specific case
        if(employeeCommonName.includes(employeeName)) { //If the common name contains the name we don't need to display both
          filteredEmployeeList.push(`${employeeCommonName} ${employeeFirstName}`);
        } else { //If not, then we display both
          filteredEmployeeList.push(`${employeeCommonName} ${employeeFirstName} ${employeeName}`);
        }
      } else { //Main case when the employee did not change name
        filteredEmployeeList.push(`${employeeName} ${employeeFirstName}`);
      }
    });
    return filteredEmployeeList;
  }

  select(value) {
    this.selected.emit(value);
  }

  destroyEmployee() {
    this.errors.API = false;
    this.errors.results = false;
    this.update ? this.errors.numeroUpdate = false : this.errors.numero = false;
    this.liste = [];
    this.filteredListe = [];
    this.input.value = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (changes.hasOwnProperty(property)) {
        const change = changes[property];
        if (property === 'numeroDossier') {
          if (!change.currentValue) {
            this.destroyEmployee();
            this.update ? this.errors.numeroUpdate = true : this.errors.numero = true;
            return;
          }
          if (change.currentValue !== change.previousValue) {
            if (!change.isFirstChange) {
              this.destroyEmployee();
            }
            this.update ? this.errors.numeroUpdate = !change.currentValue : this.errors.numero = !change.currentValue;
            this.searchEmployees();
            return;
          }
        }
        if (property === 'input') {
          if (change.currentValue.value === '') {
            this.destroyEmployee();
            this.searchEmployees();
            return;
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroyEmployee();
  }

}
