import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reconduction'
})
export class ReconductionPipe implements PipeTransform {

  transform(element): unknown {
    if (element) {
      return element === '0' ? 'Oui' : 'Non';
    }
    return null;
  }

}
