import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  constructor() {}

  transform(element): string {
    if (element) {
      return new Date(element).toLocaleDateString('fr');
    }
  }

}
