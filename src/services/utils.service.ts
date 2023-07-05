import {Injectable} from '@angular/core';
import {AuthenticationService} from '@alfresco/adf-core';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {SnackbarService} from 'services/snackbar.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {TypeDocumentConseilPipe} from 'pipes/type-document-conseil.pipe';

import LzString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  progressSource = new Subject<number>();
  progress = this.progressSource.asObservable();
  ticket: string;

  nextClickConseil: boolean;
  nextClickConseilChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private snack: SnackbarService,
    private auth: AuthenticationService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.nextClickConseilChange.subscribe((value) => {
      this.nextClickConseil = value;
    });
  }

  getDateNow(): string {
    const today = new Date();
    const dd = String(today.getDate());
    const mm = String(today.getMonth() + 1);
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  isRequiredControl(formGroup: UntypedFormGroup, controlName: string): boolean {
    const {controls} = formGroup;
    const control = controls[controlName];
    const {validator} = control;
    if (validator) {
      const validation = validator(new UntypedFormControl());
      return validation !== null && validation.required === true;
    }
    return false;
  }

  showProgress(progress: number): void {
    this.progressSource.next(progress);
  }

  validateEmail(email: string): boolean {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
  }

  validateNumber(field: UntypedFormControl): null | { validateNumber: { valid: boolean } } {
    return !isNaN(field.value) || field.value === '' ? null : {
      validateNumber: {
        valid: false
      }
    };
  }

  remove(value: any, array: any[]): any[] {
    const index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }

  removeDuplicates(array: any[], key: string): any[] {
    return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  }

  capitalize(s: string): string {
    return typeof s !== 'string' ? '' : s.charAt(0).toUpperCase() + s.slice(1);
  }

  capitalizeAll(s: string): string {
    return typeof s !== 'string' ? '' : s.toLowerCase().split(' ').map(word => this.capitalize(word)).join(' ');
  }

  removeAccents(str?: string): string {
    if (str && typeof str === 'string') {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/æ/g, 'ae')
        .replace(/Æ/g, 'AE')
        .replace(/œ/g, 'oe')
        .replace(/Œ/g, 'OE');
    } else {
      return;
    }
  }

  removeMostAccents(str: string): string {
    const map = {
      'a': 'à|á|ã|â|ä|À|Á|Ã|Â|Ä',
      'e': 'ê|é|è|ë|É|È|Ê|Ë',
      'i': 'í|ì|î|Ï|Í|Ì|Î|Ï',
      'o': 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
      'u': 'ù|ú|û|ü|Ú|Ù|Û|Ü',
      'c': 'ç|Ç',
      'n': 'ñ|Ñ'
    };

    for (const pattern in map) {
      if (Object.prototype.hasOwnProperty.call(map, pattern)) {
        const element = map[pattern];
        str = str.replace(new RegExp(element, 'g'), pattern);
      }
    }
    return str;
  }

  removeSpecialCharacters(str: string): string {
    if (str) {
      return this.removeAccents(str)
        .replace(/(?:\r\n|\r|\n|\t)/g, ' ')
        .replace(/\u20AC/g, '&euro;')
        .replace(/\u00A3/g, '&livre;')
        .replace(/\u0024/g, '&dollar;')
        .replace(/–/g, '-')
        .replace(/_/g, '_')
        .replace(/\/|µ|%|¨|\u002A|\u003F|!|:|;|,|{|\u005B|\u005D|}/g, '')
        .replace(/`|~|²|\u002B|\u00A6|\u007C|\u005E|@|=|\u0028|\u0029|"|#|\u00AB|\u00BB|¤|§|/g, '')
        .replace(/\u2019/g, '\'')
        .replace(/\s/g, ' ');
    }
  }

  formatFilename(fileName: string): string {
    if (fileName) {
      const filteredFileName = this.removeAccents(fileName);
      return this.removeMostAccents(filteredFileName)
        .replace(/°/g, '')
        .replace(/(?:\r\n|\r|\n|\t)/g, ' ')
        .replace(/\u20AC/g, ' euros')
        .replace(/\$/g, ' dollars')
        .replace(/\u00A3/g, ' livre;')
        .replace(/–/g, '-');
    }
  }

  formatNommage(file: any): string {
    const name = file.Nommage ? file.Nommage.replace(/[\/]/g, '-') : file.name.includes('.') ? file.name.split('.').shift() : file.name;
    const extension = file.name.includes('.') ? file.name.split('.').pop() : 'pdf';
    return `${name}.${extension}`;
  }

  formatNommageConseil(file: any): string {
    const name = `${file.Acheteur} - ${new TypeDocumentConseilPipe().transform(file.TypeDocument)}`;
    const extension = file.name.includes('.') ? file.name.split('.').pop() : 'pdf';
    return `${name}.${extension}`;
  }

  setDate(metadata: string, day: string, month: string, year: string): string {
    let searchQuery = '';
    if (year && month && !day) {
      const days = moment(year + '-' + month, 'YYYY-MM').daysInMonth();
      searchQuery = `${searchQuery} AND ${metadata}:[${year}-${month}-01 TO ${year}-${month}-${days}]`;
    }
    if (year && !month && !day) {
      searchQuery = `${searchQuery} AND ${metadata}:[${year}-01-01 TO ${year}-12-31]`;
    }
    if (year && month && day) {
      searchQuery = `${searchQuery} AND ${metadata}:${year}-${month}-${day}*`;
    }
    if (!year) {
      searchQuery = '';
    }
    if (year && !month && day) {
      searchQuery = '';
    }
    return searchQuery;
  }

  decamelize(str: string, separator: string): string {
    separator = typeof separator === 'undefined' ? '_' : separator;

    return str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .toLowerCase();
  }

  // Return the content-type given the file name
  getContentType(filename: string): string {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'eml':
        return 'message/rfc822';
      case 'pdf':
        return 'application/pdf';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'doc':
        return 'application/msword';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'xml':
        return 'application/xml';
      case 'jpeg':
        return 'image/jpeg';
      case 'jpg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'ods':
        return 'application/vnd.oasis.opendocument.spreadsheet';
      case 'odt':
        return 'application/vnd.oasis.opendocument.text';
      case 'odp':
        return 'application/vnd.oasis.opendocument.presentation';
      default:
        return 'application/pdf';
    }
  }

  isJSON(str: string): boolean {
    try {
      const json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected(dataSource: any, selection: any): boolean {
    const numSelected = selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle(dataSource: any, selection: any): void {
    this.isAllSelected(dataSource, selection) ? selection.clear() : dataSource.data.forEach(row => selection.select(row));
  }

  formatURL(url: string) {
    return url.replace(/\u0026/g, '%26').replace(/\u0027/g, '%27');

  }

  isDateValid(year: string, month: string, day: string, description: string): boolean {
    const missingPart = this.getMissingPartOfDate(year, month, day);

    if (!!missingPart) {
      const dateParts = {
        month: 'un mois',
        year: 'une année',
        year_month: 'une année et un mois'
      };
      this.snack.openWarn(`Veuillez sélectionner ${dateParts[missingPart]} pour la ${description ?? 'date de document'}`);
      return false;
    }

    return true;
  }

  getMissingPartOfDate(year: string, month: string, day: string): string {
    if (!!year) {
      if (!!day && !month) {
        return 'month';
      }
    } else {
      if (!!day) {
        if (!month) {
          return 'year_month';
        } else {
          return 'year';
        }
      } else if (!!month) {
        return 'year';
      }
    }
    return null;
  }

  formatDate(year: string, month: string, day: string): string {
    if (year) {
      if (month) {
        if (day) {
          return `${year}-${month}-${day}`;
        }
        return `${year}-${month}`;
      } else if (day) {
        return null;
      }
      return year;
    }

    return null;
  }

  formatFullDate(date: string): string {
    const {year, month, day} = this.getDateParts(date);
    return this.formatDate(year, month, day);
  }

  isEqual(objA: object, objB: object): boolean {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    for (const key of Object.keys(objA)) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  }

  formatAlfrescoDate(date: Date): string {
    return date.toISOString().split('.')[0];
  }

  shortestDate(): string {
    return this.formatAlfrescoDate(new Date(1));
  }

  subtractMonth(numberOfMonths: number): string {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - numberOfMonths);
    currentDate.setHours(23, 59, 59);

    return this.formatAlfrescoDate(currentDate);
  }

  sortStrings(strA: string, strB: string, isDescending?: boolean): number {
    const stringsToCompare = [strA, strB];
    if (isDescending) {
      stringsToCompare.reverse();
    }
    return stringsToCompare[0].localeCompare(stringsToCompare[1], 'fr', {ignorePunctuation: true});
  }

  containSearchTerm(baseValue: string, searchTerm: string): boolean {
    baseValue = this.removeAccents(baseValue).toLowerCase().trim();
    searchTerm = this.removeAccents(searchTerm).toLowerCase().trim();
    return baseValue.includes(searchTerm);
  }

  removeEmptyProperties = (obj: Object): Object => {
    const newObject = {};

    Object.keys(obj).forEach(key => {
      if (obj[key] || obj[key]?.length) {
        newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  getDateQuery(dateInputValue: string, description: string, ...metadatas: string[]): string {
    if (!dateInputValue || dateInputValue === '0-0-0') {
      return null;
    }
    const {year, month, day} = this.getDateParts(dateInputValue);
    if (this.isDateValid(year, month, day, description)) {
      return `AND (${metadatas.map(m => `${this.setDateNew(year, month, day, m)}`).join(' OR ')})`;
    }
    return null;
  }

  getDateRangeQuery(param: DateRangeQueryParams): string {
    const {startDate, endDate, metadata, description} = param;

    if ((!startDate || startDate === '0-0-0') && (!endDate || endDate === '0-0-0')) {
      return null;
    }

    if (!this.isDateRangeValid(startDate, endDate, description)) {
      return null;
    }

    const startDateFormatted = this.formatFullDate(startDate);
    const endDateFormatted = this.formatFullDate(endDate);

    if (startDateFormatted) {
      if (endDateFormatted) {
        return `AND ${metadata}:[${startDateFormatted} TO ${endDateFormatted}]`;
      }
      return `AND ${metadata}:[${startDateFormatted} TO MAX]`;
    } else if (endDateFormatted) {
      return `AND ${metadata}:[MIN TO ${endDateFormatted}]`;
    }
    return null;
  }

  setDateNew(year: string, month: string, day: string, metadata: string,): string {
    if (year) {
      if (month) {
        if (day) {
          return `=${metadata}:${year}-${month}-${day}*`;
        } else {
          const days = moment(year + '-' + month, 'YYYY-MM').daysInMonth();
          return `${metadata}:[${year}-${month}-01 TO ${year}-${month}-${days}]`;
        }
      } else {
        if (!day) {
          return `${metadata}:[${year}-01-01 TO ${year}-12-31]`;
        }
      }
    }
    return null;
  }

  isEmpty(obj: object): boolean {
    for (const key in obj) {
      if (!!obj[key]) {
        return false;
      }
    }
    return true;
  }

  getDateParts(date: string): { year: string, month: string, day: string } {
    const dateParts = date?.split('-').map(d => d === '0' ? null : d);
    return {
      year: dateParts[0],
      month: dateParts[1],
      day: dateParts[2]
    };
  }

  getYearRangeQuery(yearRange: string, description: string, metadata: string): string {
    if (!yearRange || yearRange === '0-0') {
      return null;
    }

    const rangeParts = yearRange.split('-').map(y => y === '0' ? null : +y);
    const minYear = rangeParts[0];
    const maxYear = rangeParts[1];

    if (maxYear && minYear > maxYear) {
      this.snack.openError(`La date renseignée pour ${description} n'est pas cohérente. Merci de modifier votre sélection`);
      return null;
    }

    const minYearQuery = minYear ? `${minYear}-01-01` : 'MIN';
    const maxYearQuery = maxYear ? `${maxYear}-12-31` : 'MAX';

    return `AND ${metadata}:[${minYearQuery} TO ${maxYearQuery}]`;
  }

  getFormGroupFromStringArray(array: string[]): UntypedFormGroup {
    return this.formBuilder.group(
      array.map((m) => {
        return {
          [m]: '',
        };
      }).reduce((acc, cur) => {
        return {...acc, ...cur};
      })
    );
  }

  createArrayOfNumbers(length: number, startAt: number = 1, paddingPattern: string = '0'): string[] {
    return [...Array(length).keys()].map((a) => a + startAt).map(n => `${n}`.padStart(2, paddingPattern));
  }

  loadAndDecompress(key: string): any {
    return key in localStorage
      ? JSON.parse(LzString.decompress(localStorage.getItem(key)))
      : {};
  }

  getNonEmptyPropertiesFromFormGroup(formValues: UntypedFormGroup): any {
    return Object.fromEntries(Object.entries(formValues.value).filter(([key, value]) => value));
  }

  compressAndSave(key: string, obj: any): void {
    localStorage.setItem(key, LzString.compress(JSON.stringify(obj)));
  }

  clearValidators(initialFormValues: any, form: UntypedFormGroup, excludedMetadataList: string[]) {
    const formControlNames = Object.keys(initialFormValues)
      .filter(i => !excludedMetadataList.includes(i));
    formControlNames.forEach(f => {
      form.get(f).clearValidators();
    });
  }

  clearFormFields(fieldsToExclude: any[], form: UntypedFormGroup): void {
    const filledFields = Object.keys(this.getNonEmptyPropertiesFromFormGroup(form));
    const fieldsToClear = filledFields.filter(f => !fieldsToExclude.includes(f));

    for (const field of fieldsToClear) {
      form.get(field).setValue('', { emitEvent: false });
    }
  }

  getHeaderTicket(): string {
    return this.auth.getEcmUsername() + '$' + this.auth.getTicketEcm();
  }

  getMinDate(): Date {
    return new Date('1970-01-01T00:00:00.000');
  }

  private isDateRangeValid(startDate: string, endDate: string, description: string): boolean {
    if (
      !this.isFullDateValid(startDate, `${description} (début)`) ||
      !this.isFullDateValid(endDate, `${description} (fin)`)
    ) {
      return false;
    }

    if (!this.formatFullDate(startDate) || !this.formatFullDate(endDate)) {
      return true;
    }

    if (this.getDateFromString(startDate) > this.getDateFromString(endDate)) {
      this.snack.openError(`La date renseignée pour ${description} n'est pas cohérente. Merci de modifier votre sélection`);
      return false;
    }
    return true;
  }

  private isFullDateValid(date: string, description: string) {
    const {year, month, day} = this.getDateParts(date);
    return this.isDateValid(year, month, day, description);
  }

  private getDateFromString(date: string): Date {
    const {year, month, day} = this.getDateParts(date);
    return new Date(+year, (month ? +month - 1 : 0), (+day ?? 1));
  }
}

interface DateRangeQueryParams {
  startDate: string;
  endDate: string;
  metadata: string;
  description: string;
}
