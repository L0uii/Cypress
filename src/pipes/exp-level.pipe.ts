import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expLevel'
})
export class ExpLevelPipe implements PipeTransform {

  transform(value: any): string {
    if (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 3) {
      return '0 à 3 ans';
    } else if (parseInt(value, 10) > 3 && parseInt(value, 10) <= 7) {
      return '3 à 7 ans';
    } else if (parseInt(value, 10) > 7) {
      return '+ 7 ans';
    } else {
      return '';
    }
  }
}
