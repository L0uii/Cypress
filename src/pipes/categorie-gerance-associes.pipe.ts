import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT_GERANCEASSOCIES} from '../models/gerance-associes';
import {CLASSEMENT_GERANCEPARTENAIRES} from '../models/gerance-partenaires';

@Pipe({
  name: 'categorieGeranceAssociesTypeDocument'
})
export class CategorieGeranceAssociesPipe implements PipeTransform {

  transform(element: string): string {
    if (element) {
      const classement = CLASSEMENT_GERANCEASSOCIES.concat(CLASSEMENT_GERANCEPARTENAIRES);
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = classement.filter(el => el.sousFamille.match(regex));
      return filter.length > 0 ? filter[0].labelSousFamille : element;
    }
  }
}
