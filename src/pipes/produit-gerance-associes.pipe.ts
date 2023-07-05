import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT_PRODUITS} from 'models/classement-produits';


@Pipe({
  name: 'produitsGeranceAssocies'
})
export class ProduitsGeranceAssociesPipe implements PipeTransform {

  transform(element: string): string {
    if (element) {
      const classement = CLASSEMENT_PRODUITS;
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = classement.filter(el => el.labelProduit.match(regex));
      return filter.length > 0 ? filter[0].labelProduit : element;
    }
  }
}
