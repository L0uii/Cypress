import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT} from 'models/mr';

@Pipe({
  name: 'categorieMr'
})
export class CategorieMrPipe implements PipeTransform {

  transform(element): string {
    if (element) {
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = CLASSEMENT.filter(el => el.famille.match(regex));
      return filter.length > 0 ? filter[0].labelFamille : element;
    }
  }

}
