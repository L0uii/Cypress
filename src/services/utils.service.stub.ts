import { FormControl, FormGroup } from '@angular/forms';
export const utilsServiceStub = () => ({
  setDays: () => {},
  setMonths: () => {},
  setYears: () => {},
  setDate: (
    term,
    day,
    month,
    year
  ) => ({}),
  setYearsToCome: () => {},
  setYearsToComeMR: () => {},
  setMonthsNameToNumber: () => {},
  removeAccents: (arg: string) => arg,
  isJSON: message => ({}),
  removeDuplicates: (list, term) => [],
  formatNommageConseil: file => ({}),
  formatNommage: file => ({}),
  showProgress: percentage => ({}),
  decamelize: (arg, string) => ({}),
  getDateNow: () => ({}),
  formatFilename: name => ({}),
  getContentType: name => ({}),
  validateEmail: value => ({}),
  validateDateLimits: {},
  validateNumber: {},
  removeSpecialCharacters: description => ({}),
  capitalize: recipient1FirstName => ({}),
  remove: (file, fileList) => ({}),
  capitalizeAll: arg => ({}),
  formatURL: saisie => (saisie),
  sortStrings: (strA: string, strB: string, isDescending?: boolean) => ({}),
  loadAndDecompress: (key: string) => ({}),
  compressAndSave: (key: string, obj: any) => undefined,
  getMissingPartOfDate: (date) => '',
  createArrayOfNumbers: (qty: number) => [ '1', '2', '3' ],
  clearValidators: () => undefined,
  getFormGroupFromStringArray: (values: string[]) => new FormGroup({
    'field1': new FormControl('')
  }),
  getDateQuery: () => '2000-01-01',
  getMinDate: () => new Date(),
  getHeaderTicket: () => '0$0',
  getDateRangeQuery:() => `AND TO`,
  clearFormFields: () => {}
});
