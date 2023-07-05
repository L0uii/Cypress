import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from 'services/utils.service';

@Pipe({
  name: 'creator'
})
export class CreatorPipe implements PipeTransform {
  constructor(public utils: UtilsService) {
  }

  transform(element) {
    if (element) {
      const regexPoint = /\./g;
      return this.utils.capitalizeAll(element.replace(regexPoint, ' '));
    }
  }

}
