import {Pipe, PipeTransform} from '@angular/core';
import {CLASSEMENT, CLASSEMENT_REPRISE} from 'models/conseil';

@Pipe({
  name: 'typeDocumentConseil'
})
export class TypeDocumentConseilPipe implements PipeTransform {

  transform(element): string {
    if (element) {
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = CLASSEMENT.concat(CLASSEMENT_REPRISE).filter(el => el.sousFamille.match(regex));
      return filter.length > 0 ? filter[0].labelSousFamille : element;
    }
  }

}
