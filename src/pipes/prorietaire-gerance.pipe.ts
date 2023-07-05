import {Pipe, PipeTransform} from '@angular/core';
import {PROPRIETAIRES} from 'components/gerance/upload-gerance/upload-gerance.component';

@Pipe({
  name: 'proprietaireGerance'
})
export class ProrietaireGerancePipe implements PipeTransform {

 transform(element): string {
    if (element) {
      const regex = new RegExp(`\\b${element}\\b`, 'i');
      const filter = PROPRIETAIRES.filter(el => el.value.match(regex));
      return filter.length > 0 ? filter[0].label : element;
    }
  }

}
