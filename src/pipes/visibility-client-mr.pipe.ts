import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT} from 'models/mr';

@Pipe({
  name: 'visibilityClientMr'
})
export class VisibilityClientMrPipe implements PipeTransform {

  transform(element) {
    if (element) {
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = CLASSEMENT.filter(el => el.sousFamille.match(regex));
      let formated;
      if (filter.length > 0) {
        formated = filter[0].displayClient;
      } else {
        formated = 'Non renseigné';
      }
      return formated;
    }
  }
}
