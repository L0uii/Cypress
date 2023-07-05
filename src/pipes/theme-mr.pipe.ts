import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT} from 'models/mr';
import {cloneDeep} from 'lodash';

@Pipe({
  name: 'themeMr'
})
export class ThemeMrPipe implements PipeTransform {

  transform(element): string {
    if (element) {
      const regexFamille = new RegExp(`\\b${element.Famille}\\b`, 'i');
      const regexSousFamille = new RegExp(`\\b${element.SousFamille}\\b`, 'i');
      const filter = cloneDeep(CLASSEMENT).filter(el => el.famille.match(regexFamille) && el.sousFamille.match(regexSousFamille));
      return filter.length > 0 ? `${filter[0].onglet} > ${filter[0].labelFamille}` : '';
    }
  }

}


